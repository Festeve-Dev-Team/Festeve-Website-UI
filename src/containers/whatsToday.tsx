import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsTodayProps {
    className?: string;
}

const WhatsToday: React.FC<WhatsTodayProps> = ({ className = "py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4" }) => {

    const [expanded, setExpanded] = useState(false);
    const charLimit = 100;
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, mollitia nam. Iusto totam fuga harum ab error facere reprehenderit illo impedit nulla magnam sapiente, id rem iure perspiciatis velit dicta voluptatem? Voluptate tenetur obcaecati nesciunt ex? Sed dolore cumque suscipit dolores dignissimos eaque nesciunt in? Natus rem consequatur dolore porro eum, dolor nulla quod odit molestiae aspernatur culpa assumenda magnam beatae! Velit quibusdam sunt veritatis. Nam necessitatibus qui hic totam dolor id molestias ipsum a atque fugit eius perspiciatis debitis explicabo animi officiis facere repellat vero culpa, voluptas ipsam? Earum possimus maxime doloremque officia vero atque numquam a? Nam nostrum, voluptatum minus quis dolorum commodi sint. Ipsa nostrum alias doloremque dolorum sequi, ea, expedita inventore, tempora minus tenetur earum id quaerat. Nostrum, rerum! Quas, quasi assumenda, repudiandae nihil alias, expedita laudantium eveniet impedit tenetur id iusto amet enim! Optio labore fugiat ab, facere voluptatem odit debitis totam aperiam, est soluta accusantium adipisci illo non possimus cum voluptatum! Quam suscipit minima dolorum illum dolorem dicta eum, fuga aut, asperiores, sequi debitis. Nostrum necessitatibus odio, adipisci, architecto totam aut saepe ex similique voluptatibus cupiditate debitis eaque at explicabo sunt nesciunt cumque id quo neque provident, expedita illo. Ratione provident omnis aliquid atque!";
    const textRef = useRef<HTMLParagraphElement>(null);

    // Determine if the text needs to be truncated
    const shouldTruncate = text.length > charLimit;
    const displayText = shouldTruncate && !expanded
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
            <div className="text-center text-green-900 font-bold text-xl">What&apos;s Today</div>

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
                        className="text-green-900"
                    >
                        {formattedDate}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.p
                            ref={textRef}
                            key={expanded ? "expanded" : "collapsed"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                margin: 0,
                                padding: '16px 50px',
                                textAlign: "center",
                                wordWrap: "break-word",
                                color: 'green'
                            }}
                            className="text-green-900"
                        >
                            {displayText}
                        </motion.p>
                    </AnimatePresence>

                    {shouldTruncate && (
                        <motion.div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingRight: "32px",
                                marginTop: "-20px",
                                marginBottom: "20px"
                            }}
                        >
                            <motion.button
                                onClick={toggleExpanded}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                style={{
                                    border: "none",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                            >
                                {expanded ? "...Read Less" : "...Read More"}
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default WhatsToday;