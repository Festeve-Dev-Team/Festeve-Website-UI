import classNames from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ItemProps {
  icon: string;
  title: string;
  description: string;
  hoverDescription?: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const TextInformation: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation("common");
  const [isHovered, setIsHovered] = useState(false);

  const currentDescription = isHovered && item.hoverDescription
    ? item.hoverDescription
    : (t(item.description) || item.description);

  return (
    <div
      className={classNames(
        `text-center border-gray-300 xl:border-l xl:first:border-s-0 px-4 sm:px-2.5 2xl:px-8 3xl:px-12 xl:py-12 transition-all duration-300 cursor-pointer hover:bg-gray-50`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="mb-3.5 md:mb-5 xl:mb-3.5 2xl:mb-5 w-14 md:w-auto mx-auto"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={item.icon}
          alt={t(item.title)}
          width="78"
          height="78"
          className="inline-block"
        />
      </motion.div>

      <div className="-mb-1">
        <motion.h3
          className="text-heading text-base md:text-lg font-semibold mb-1.5 md:mb-2"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {t(item.title) || item.title}
        </motion.h3>

        <div className="text-body text-xs md:text-sm leading-6 md:leading-7 min-h-[3rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={isHovered ? 'hover' : 'normal'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {currentDescription}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TextInformation;
