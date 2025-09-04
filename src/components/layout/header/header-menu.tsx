import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import MegaMenu from '@components/ui/mega-menu';
import classNames from 'classnames';
// import ListMenu from '@components/ui/list-menu'; // Commented for later use
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { megaMenuData } from '../../../framework/basic-rest/static/mega-menu';


interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Use megaMenuData as fallback when data is not available or loading
  const menuData = data && data.length > 0 ? data : megaMenuData;

  // Function to get the appropriate GIF based on item label
  const getGifForLabel = (label: string) => {
    const labelLower = label.toLowerCase();
    switch (labelLower) {
      case 'essentials':
        return '/assets/icons/essentials.gif';
      case 'clothing':
        return '/assets/icons/clothes.gif';
      case 'purohits':
        return '/assets/icons/guru.gif';
      case 'food':
        return '/assets/icons/frying-pan.gif';
      case 'e-books':
        return '/assets/icons/open-book.gif';
      default:
        return '/assets/icons/guru.gif'; // fallback
    }
  };

  return (
    <nav className={classNames(`headerMenu flex w-full relative`, className)}>
      {menuData?.filter((item: any) => item.label !== 'Food' && item.label !== 'Gifting').map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-4 ${item.subMenu ? 'relative' : ''
            }`}
          key={item.id}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            href={!item?.columns?.length ? `/${item?.data?.name?.toLowerCase()}` : item.path}
            className="relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
            onClick={(e) => {
              // For root items without columns, navigate to their pages
              if (!item?.columns?.length) {
                e.preventDefault();
                window.location.href = `/${item?.data?.name?.toLowerCase()}`;
              }
            }}
          >
            <div className="relative flex items-center justify-center min-h-[48px] w-[80px]">
              <AnimatePresence mode="wait">
                {hoveredItem === item.id ? (
                  <motion.div
                    key="gif"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center absolute inset-0"
                  >
                    <Image
                      src={getGifForLabel(item.label)}
                      alt={item.label}
                      width="24"
                      height="24"
                      className="inline-block w-12 h-12"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="label"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center absolute inset-0"
                  >
                    <span className="text-center">{item.label}</span>
                    {(item?.columns?.length || item.subMenu?.length) && (
                      <motion.span
                        className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end ml-2"
                        animate={{
                          rotate: hoveredItem === item.id ? -180 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <FaChevronDown className="transition duration-300 ease-in-out transform" />
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Mega menu for items with columns */}
          {item?.columns && Array.isArray(item.columns) && (
            <MegaMenu columns={item.columns} />
          )}

          {/* Original subMenu for other items - commented for later use */}
          {/* {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="absolute invisible bg-gray-200 opacity-0 group-hover:visible subMenu shadow-header ltr:left-0 rtl:right-0 group-hover:opacity-100">
              <ul className="py-5 text-sm text-body">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )} */}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
