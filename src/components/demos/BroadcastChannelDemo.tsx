import React, { useState } from "react";
import { useBroadcastChannel } from "../../hooks/useBroadcastChannel";
import { motion } from "framer-motion";

export default function BroadcastChannelDemo() {
  const { sendMessage, messages } = useBroadcastChannel("meme-channel");
  const [input, setInput] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-4"
    >
      <h3 className="text-lg font-semibold">Broadcast Channel API</h3>
      <p className="text-sm text-white/60">
        Send messages between tabs instantly 🚀
      </p>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded-md bg-white/10 text-white outline-none"
          placeholder="Say hi to other tabs"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white font-medium"
        >
          Send
        </button>
      </div>

      <div className="max-h-40 overflow-y-auto space-y-1 text-sm text-white/70 bg-white/5 p-3 rounded-md">
        {messages.length > 0 ? (
          messages.map((msg:any, i:any) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <span className="text-fuchsia-400">→</span> {msg}
            </motion.div>
          ))
        ) : (
          <p className="text-white/40">No messages yet. Open another tab!</p>
        )}
      </div>
    </motion.div>
  );
}
