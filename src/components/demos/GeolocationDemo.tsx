import React, { useEffect, useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from "react-leaflet";
// @ts-ignore
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationName {
  city?: string;
  country?: string;
  road?: string;
  display_name?: string;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16, { animate: true });
  }, [center, map]);
  return null;
}

export default function GeolocationDemo() {
  const { coords, error } = useGeolocation();
  const [locationName, setLocationName] = useState<LocationName | null>(null);
  const [loadingName, setLoadingName] = useState(false);

  // Reverse geocoding
  useEffect(() => {
    if (!coords) return;

    const fetchLocationName = async () => {
      setLoadingName(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
        );
        const data = await res.json();
        setLocationName({
          city: data.address?.city || data.address?.town || data.address?.village,
          country: data.address?.country,
          road: data.address?.road,
          display_name: data.display_name,
        });
      } catch (err) {
        console.error("Geocoding failed", err);
      } finally {
        setLoadingName(false);
      }
    };

    fetchLocationName();
  }, [coords?.latitude, coords?.longitude]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center"
      >
        <p className="text-red-400 font-semibold">Geolocation Error</p>
        <p className="text-sm text-red-300 mt-1">{error}</p>
      </motion.div>
    );
  }

  if (!coords) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
      >
        <p className="text-white/80">Requesting location...</p>
        <div className="mt-3 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
        </div>
      </motion.div>
    );
  }

  const position: [number, number] = [coords.latitude, coords.longitude];
  const speedKmh = coords.speed ? (coords.speed * 3.6).toFixed(1) : "0.0";
  const heading = coords.heading ? Math.round(coords.heading) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-white tracking-tight">Live Location Tracker</h3>

      {/* Map */}
      <div className="h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* @ts-ignore */}
        <MapContainer center={position} zoom={16} style={{ height: "100%", width: "100%" }}>
          
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            
            
          />
          <Marker position={position}>
            <Popup>
              {loadingName ? "Loading..." : locationName?.display_name || "You are here"}
            </Popup>
          </Marker>
          <Circle
            center={position}
            pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.15 }}
          />
          <MapController center={position} />
        </MapContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Latitude" value={coords.latitude.toFixed(6)} icon="Lat" />
        <StatCard label="Longitude" value={coords.longitude.toFixed(6)} icon="Lng" />
        <StatCard
          label="Speed"
          value={`${speedKmh} km/h`}
          icon={coords.speed && coords.speed > 0.5 ? "Speed" : "Speed"}
        />
        <StatCard
          label="Accuracy"
          value={`±${coords.accuracy.toFixed(0)} m`}
          icon="Target"
        />
      </div>

      {/* Compass & Altitude */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heading !== null && (
          <motion.div
            animate={{ rotate: heading }}
            transition={{ type: "spring", stiffness: 60 }}
            className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-5 flex items-center justify-center border border-white/10 shadow-lg"
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              <div
                className="absolute top-0 left-1/2 w-1 h-10 bg-red-500 transform -translate-x-1/2 origin-bottom transition-transform"
                style={{ transform: `translateX(-50%) rotate(${heading}deg)` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                N
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-white/60 tracking-wider">Heading</p>
              <p className="text-2xl font-mono font-bold text-white">{heading}°</p>
            </div>
          </motion.div>
        )}

        {coords.altitude !== null && (
          <StatCard
            label="Altitude"
            value={`${coords.altitude.toFixed(1)} m`}
            icon="Mountain"
            className="md:col-span-1"
          />
        )}
      </div>

      {/* Location Name */}
      {locationName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg"
        >
          <p className="text-sm text-white/60 tracking-wider">Current Location</p>
          <p className="text-lg font-semibold text-white mt-1">
            {locationName.city || locationName.road || "Unknown area"},{" "}
            {locationName.country || "FI"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// BEAUTIFUL STAT CARD
function StatCard({
  label,
  value,
  icon,
  className = "",
}: {
  label: string;
  value: string;
  icon: string;
  className?: string;
}) {
  const icons: Record<string, string> = {
    Lat: "Lat",
    Lng: "Lng",
    Speed: "Speed",
    Target: "Target",
    Mountain: "Mountain",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative overflow-hidden
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-md
        border border-white/20
        rounded-2xl p-4
        shadow-lg
        transition-all duration-300
        ${className}
      `}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-white/60 tracking-wider uppercase">
            {label}
          </span>
          {/* <span className="text-lg" role="img" aria-label={label}>
            {icons[icon]}
          </span> */}
        </div>
        <p className="text-lg font-bold text-white font-mono tracking-tight break-all">
          {value}
        </p>
      </div>
    </motion.div>
  );
}