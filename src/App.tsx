import React, { useState, useMemo } from "react";
import Layout from "./components/Layout";
import ApiCard from "./components/ApiCard";
import ApiModal from "./components/ApiModal";
import { apis } from "./data/apis";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Device",
  "Audio",
  "Network",
  "Storage",
  "Sensors",
  "System",
];

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId(null);
  const current = apis.find((a) => a.id === openId);
  const CurrentDemo = current?.Component || null;

  const filtered = useMemo(() => {
    return apis.filter((a) => {
      const matchQuery = a.title.toLowerCase().includes(query.toLowerCase());
      const matchCat =
        category === "All" ||
        (a.category && a.category.toLowerCase() === category.toLowerCase());
      return matchQuery && matchCat;
    });
  }, [query, category]);

  return (
    <Layout>
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search API..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-white/5 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                category === c
                  ? "bg-fuchsia-600 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((item) => (
          <ApiCard key={item.id} item={item} onTry={open} />
        ))}
      </motion.div>

      {/* Modal */}
      {/* @ts-ignore */}
      <ApiModal open={!!current} onClose={close} title={current?.title}>
        {CurrentDemo && <CurrentDemo />}
      </ApiModal>

      <div className="mt-10 text-center text-sm text-white/50 space-y-1">
        <p>
          💡 Pro tip: add your own hooks in <code>src/hooks</code> & register
          them in <code>src/data/apis.ts</code>.
        </p>
        <p>Then send a pull request to my repo 🤘</p>
      </div>
    </Layout>
  );
}
