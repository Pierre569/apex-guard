"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Pulsing Icon for "Live Techs"
const createPulsingIcon = () => {
    return L.divIcon({
        className: "custom-pulsing-icon",
        html: `<div class="w-4 h-4 bg-apex-green rounded-full animate-ping opacity-75"></div><div class="absolute top-0 w-4 h-4 bg-apex-green rounded-full border-2 border-white"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

// Mock Data: Recent Service Locations in NC (910 and surrounding)
const RECENT_JOBS = [
    { id: 1, lat: 35.0527, lng: -78.8784, title: "Termite Inspection", city: "Fayetteville" },
    { id: 2, lat: 35.1764, lng: -79.0286, title: "Pest Prevention", city: "Spring Lake" },
    { id: 3, lat: 34.9856, lng: -78.9667, title: "Rodent Control", city: "Hope Mills" },
    { id: 4, lat: 35.0932, lng: -78.7836, title: "Mosquito Defense", city: "Stedman" },
    { id: 5, lat: 35.1322, lng: -79.0831, title: "Wasp Removal", city: "Fort Liberty" },
];

export default function ServiceMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
         
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-[400px] w-full bg-neutral-900 animate-pulse rounded-xl flex items-center justify-center text-white/20">Loading Service Map...</div>;
    }

    return (
        <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
            {/* OVERLAY: Live Ops Status */}
            <div className="absolute top-4 left-4 z-[500] bg-black/80 backdrop-blur-md px-4 py-3 rounded-lg border border-apex-green/30 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-3 h-3 bg-apex-green rounded-full animate-ping absolute"></div>
                        <div className="w-3 h-3 bg-apex-green rounded-full relative"></div>
                    </div>
                    <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Apex Ops Center</p>
                        <p className="text-sm font-bold text-white">Live: 5 Techs Active</p>
                    </div>
                </div>
            </div>

            <MapContainer
                center={[35.0527, -78.8784]} // Fayetteville Center
                zoom={11}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
            >
                {/* DARK MATTER TILE LAYER (CartoDB) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* PRIMARY COVERAGE ZONE (Circle) */}
                <Circle
                    center={[35.0527, -78.8784]}
                    pathOptions={{ fillColor: '#05D5FA', color: '#05D5FA', weight: 1, fillOpacity: 0.1 }}
                    radius={15000} // 15km radius
                />

                {/* RECENT JOBS MARKERS */}
                {RECENT_JOBS.map((job) => (
                    <Marker
                        key={job.id}
                        position={[job.lat, job.lng]}
                        icon={createPulsingIcon()}
                    >
                        <Popup className="apex-popup">
                            <div className="p-1">
                                <h3 className="font-bold text-apex-navy text-sm">{job.title}</h3>
                                <p className="text-xs text-neutral-500">{job.city} • Just Now</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* OVERLAY: Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-[400]" />
        </div>
    );
}
