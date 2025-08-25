import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsTodayProps {
    className?: string;
}

const WhatsToday: React.FC<WhatsTodayProps> = ({ className = "py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4" }) => {

    const [expanded, setExpanded] = useState(false);
    const charLimit = 300;

    // Festival information content
    const festivalContent = () => (
        <div className="space-y-6 text-left" style={{ color: '#111827' }}>
            <div>
                <h3 className="font-bold text-xl mb-3 text-amber-900 drop-shadow-sm">What (About the Festival)</h3>
                <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                        <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                        <span className="text-gray-900 leading-relaxed font-medium">Vinayaka Chaturthi is observed on the fourth day (Chaturthi) of the Shukla Paksha in the Hindu month of Bhadrapada (~August–September).</span>
                    </li>
                    <li className="mt-3">
                        <span className="font-bold text-amber-900 drop-shadow-sm">Duration:</span>
                        <div className="ml-4 mt-1 text-gray-900 leading-relaxed font-medium">
                            While the northern and western parts of India often observe the festival over 10 days, many southern regions mark it as a one-day event.
                        </div>
                    </li>
                    <li className="mt-3">
                        <span className="font-bold text-amber-900 drop-shadow-sm">Rituals:</span>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li className="flex items-start">
                                <span className="text-amber-900 mr-2 font-bold">○</span>
                                <span className="text-gray-900 leading-relaxed font-medium">Installation (Sthapana) of Ganesha idols</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-900 mr-2 font-bold">○</span>
                                <span className="text-gray-900 leading-relaxed font-medium">Daily aartis, prayers, and offerings of sweets (especially modak, Ganesha&apos;s favorite)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-900 mr-2 font-bold">○</span>
                                <span className="text-gray-900 leading-relaxed font-medium">Visarjan (immersion of idols) at the end of the festival, symbolizing life&apos;s impermanence.</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-3 text-amber-900 drop-shadow-sm">When (2025 Specifics)</h3>
                <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                        <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                        <span className="text-gray-900 leading-relaxed font-medium"><span className="font-bold text-amber-900">Festival Day:</span> Wednesday, 27 August 2025</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                        <span className="text-gray-900 leading-relaxed font-medium"><span className="font-bold text-amber-900">Tithi (Lunar Timing):</span> Begins on 26 August (afternoon), ends on 27 August (late afternoon)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                        <span className="text-gray-900 leading-relaxed font-medium"><span className="font-bold text-amber-900">Shubha Muhurat (Auspicious Puja Time):</span> Midday slot, approximately 11:05 AM to 1:45 PM</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                        <span className="text-gray-900 leading-relaxed font-medium"><span className="font-bold text-amber-900">Visarjan (Immersion):</span> Saturday, 6 September 2025—marking the festival&apos;s conclusion</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-3 text-amber-900 drop-shadow-sm">Why (Significance)</h3>
                <ul className="space-y-3 ml-4">
                    <li>
                        <span className="flex items-start">
                            <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                            <span className="font-bold text-amber-900 drop-shadow-sm">Celebration of Lord Ganesha&apos;s Birth</span>
                        </span>
                        <div className="ml-6 mt-1 text-gray-900 leading-relaxed font-medium">
                            Vinayaka Chaturthi, also called Ganesh Chaturthi, honors Lord Ganesha—beloved as the remover of obstacles and patron of wisdom, art, and beginnings
                        </div>
                    </li>
                    <li>
                        <span className="flex items-start">
                            <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                            <span className="font-bold text-amber-900 drop-shadow-sm">Cultural Harmony & Unity</span>
                        </span>
                        <div className="ml-6 mt-1 text-gray-900 leading-relaxed font-medium">
                            Popularized in modern India by Lokmanya Tilak during colonial times, the festival became a unifying community celebration across Western and Southern India.
                        </div>
                    </li>
                    <li>
                        <span className="flex items-start">
                            <span className="text-amber-900 mr-2 font-bold text-lg">●</span>
                            <span className="font-bold text-amber-900 drop-shadow-sm">Blessings & Prosperity</span>
                        </span>
                        <div className="ml-6 mt-1 text-gray-900 leading-relaxed font-medium">
                            Devotees believe that worshiping Ganesha during this time brings prosperity, spiritual wisdom, and the removal of life&apos;s blockages.
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );

    // Create text version for truncation logic
    const text = "Vinayaka Chaturthi is observed on the fourth day of Shukla Paksha in Bhadrapada month. Festival Day: Wednesday, 27 August 2025. This festival honors Lord Ganesha as the remover of obstacles and patron of wisdom, bringing prosperity and spiritual wisdom to devotees.";
    const textRef = useRef<HTMLParagraphElement>(null);

    // Determine if the text needs to be truncated
    const shouldTruncate = true; // Always show read more for festival content
    const displayText = !expanded
        ? text.substring(0, charLimit) + "..."
        : text;

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setFormattedDate(new Date().toLocaleDateString(undefined, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }));
    }, []);

    const toggleExpanded = () => {
        setExpanded(!expanded);

        if (expanded && textRef.current) {
            setTimeout(() => {
                textRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    };

    return (
        <div className={className}>
            <div className="text-center text-amber-900 font-bold text-2xl drop-shadow-lg">About the Festival</div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}
            >
                {/* Background image container with Next.js Image */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0
                }}>
                    <Image
                        src={"/assets/images/letter-bg.png"}
                        alt="Background"
                        fill
                        style={{ objectFit: "fill" }}
                        priority
                    />
                </div>

                <motion.div
                    animate={{
                        height: expanded ? "auto" : "auto",
                        transition: { duration: 0.5 }
                    }}
                    style={{
                        width: "100%",
                        minHeight: "40px",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        zIndex: 1,
                        color: "#222",
                        fontSize: "16px",
                        fontWeight: 500,
                        padding: "80px 32px",
                        background: "transparent",
                    }}
                >
                    <div
                        style={{
                            margin: '6px 50px',
                            textAlign: "right"
                        }}
                        className="text-amber-900 font-semibold drop-shadow-sm"
                    >
                        {formattedDate}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            ref={textRef}
                            key={expanded ? "expanded" : "collapsed"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                margin: 0,
                                padding: '16px 50px',
                                wordWrap: "break-word",
                            }}
                            className="text-gray-900"
                        >
                            {expanded ? (
                                festivalContent()
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-900 leading-relaxed font-semibold text-base">{displayText}</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {shouldTruncate && (
                        <motion.div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                                marginBottom: "20px"
                            }}
                        >
                            <motion.button
                                onClick={toggleExpanded}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                style={{
                                    // border: "2px solid #92400e",
                                    padding: "10px 24px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    color: expanded ? "rgba(251, 191, 36, 0.9)" : "#92400e",
                                    backgroundColor: expanded ? "#92400e" : "rgba(251, 191, 36, 0.15)",
                                    borderRadius: "6px",
                                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                                    minWidth: "120px"
                                }}
                                className={`transition-all duration-200 ${expanded
                                    ? "hover:bg-amber-800 hover:text-amber-100"
                                    : "hover:bg-amber-200 hover:text-amber-900"
                                    }`}
                            >
                                {expanded ? "Read Less" : "Read More"}
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default WhatsToday;