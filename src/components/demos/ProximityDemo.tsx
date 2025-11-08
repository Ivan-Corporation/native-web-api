import { useProximity } from "../../hooks/useProximity";

export default function ProximityDemo() {
  const { supported, near, distance } = useProximity();

  if (!supported)
    return <p className="text-yellow-400">Proximity Sensor not supported 😅</p>;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`w-24 h-24 rounded-full transition-all duration-500 ${
          near ? "bg-green-400 scale-125" : "bg-blue-400 scale-100"
        }`}
      />
      <p className="text-white/80">
        {distance ? `Distance: ${distance} cm` : "Move closer to the sensor..."}
      </p>
    </div>
  );
}
