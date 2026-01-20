"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference"
        >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold opacity-70">Scroll to Purge</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
        </motion.div>
    );
}
