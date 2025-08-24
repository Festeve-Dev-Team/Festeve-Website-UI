import Link from "@components/ui/link";
import Image from "next/legacy/image";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { LinkProps } from "next/link";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BannerProps {
  banner: any;
  variant?: "rounded" | "default";
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps["href"];
  disableBorderRadius?: boolean;
  showTitleOnHover?: boolean;
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function BannerCard({
  banner,
  className,
  variant = "rounded",
  effectActive = false,
  classNameInner,
  href,
  disableBorderRadius = false,
  showTitleOnHover = false,
}: BannerProps) {
  const { width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });

  const [isHovered, setIsHovered] = useState(false);
  const { title, image } = banner;
  const selectedImage = getImage(width, image);

  return (
    <div className={cn("mx-auto", className)}>
      <Link
        href={href}
        className={cn("h-full group flex justify-center relative overflow-hidden", classNameInner)}
      >
        <div
          className="relative w-full h-full"
          onMouseEnter={() => showTitleOnHover && setIsHovered(true)}
          onMouseLeave={() => showTitleOnHover && setIsHovered(false)}
        >
          <Image
            src={selectedImage.url}
            width={selectedImage.width}
            height={selectedImage.height}
            alt={title}
            quality={100}
            className={cn("bg-gray-300 object-cover block", {
              "rounded-md": variant === "rounded" && !disableBorderRadius,
            })}
            priority={true}
          />
          {effectActive && (
            <div className="absolute top-0 ltr:-left-[100%] rtl:-right-[100%] h-full w-1/2 z-5 block transform ltr:-skew-x-12 rtl:skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 ltr:group-hover:animate-shine rtl:group-hover:animate-shineRTL" />
          )}

          {showTitleOnHover && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-4 right-4 z-10"
                >
                  <div className="bg-black bg-opacity-70 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <h3 className="text-white text-lg font-semibold capitalize tracking-wide">
                      {title}
                    </h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </Link>
    </div>
  );
}
