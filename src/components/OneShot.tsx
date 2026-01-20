"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface OneShotProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function OneShot({ children, delay = 0, className = "" }: OneShotProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
