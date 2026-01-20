"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
            aria-label="Toggle theme"
        >
            <div className="relative z-10">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-apex-gold" />
                <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-apex-gold" />
            </div>
            <span className="sr-only">Toggle theme</span>

            {/* Hover glow effect */}
            <motion.div
                layoutId="theme-glow"
                className="absolute inset-0 rounded-full bg-apex-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            />
        </button>
    );
}
