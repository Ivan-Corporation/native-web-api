import React, { useState } from "react";
import Layout from "./components/Layout";
import ApiCard from "./components/ApiCard";
import ApiModal from "./components/ApiModal";
import { apis } from "./data/apis";
import { motion } from "framer-motion";

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId(null);

  const current = apis.find((a) => a.id === openId);

  const CurrentDemo = current?.Component || null;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {apis.map((item) => (
          <ApiCard key={item.id} item={item} onTry={open} />
        ))}
      </motion.div>

      <ApiModal open={!!current} onClose={close} title={current?.title}>
        {CurrentDemo && <CurrentDemo />}
      </ApiModal>

      <div className="mt-10 text-center text-sm text-white/50 space-y-1">
        <p>
          💡 Pro tip: add your own hooks in <code>src/hooks</code> & register them in{" "}
          <code>src/data/apis.ts</code>.
        </p>
        <p>Then send a pull request to my repo 🤘</p>
      </div>
    </Layout>
  );
}
