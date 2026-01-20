"use client";
import React, { useState } from "react";

// components/NeighborhoodTicker.tsx
export default function NeighborhoodTicker() {
    const [alert] = useState("Monitoring local pest activity in Wilmington...");

    // Every time a bug is identified, this updates (Simulated for now)
    return (
        <div className="bg-red-600 text-white py-2 px-4 overflow-hidden whitespace-nowrap shadow-md">
            <div className="animate-marquee inline-block font-bold text-sm tracking-wide">
                ⚠️ ALERT: {alert} • ⚠️ RECENT: Termite swarm identified in 28403 • ⚠️ 5 Homeowners protected in the last 24 hours •
                ⚠️ ALERT: {alert} • ⚠️ RECENT: Termite swarm identified in 28403 • ⚠️ 5 Homeowners protected in the last 24 hours
            </div>
        </div>
    );
}
