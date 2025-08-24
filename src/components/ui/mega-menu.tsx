import React from 'react';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
  subItems?: MenuItem[];      // Level 4 items
  nestedItems?: MenuItem[];   // Level 5 items
  data: any;
}
type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

// Helper component to render nested menu items recursively
const NestedMenuItem: React.FC<{
  item: MenuItem;
  level: number;
  t: any;
  isLast?: boolean;
}> = ({ item, level, t, isLast = false }) => {
  const getItemStyles = (level: number) => {
    const baseStyles = "block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300";

    switch (level) {
      case 4: // Level 4 - Smaller, indented
        return `${baseStyles} text-xs text-gray-600 pl-8 xl:pl-12 2xl:pl-16`;
      case 5: // Level 5 - Smallest, more indented
        return `${baseStyles} text-xs text-gray-500 pl-12 xl:pl-16 2xl:pl-20`;
      default: // Level 3 (existing)
        return `${baseStyles} text-body text-sm`;
    }
  };

  const getBorderStyles = (level: number, isLast: boolean) => {
    if (isLast && level === 3) {
      return 'border-b border-gray-300 pb-3.5 mb-3';
    }
    return '';
  };

  return (
    <>
      <li className={getBorderStyles(level, isLast)}>
        <Link
          href={item.path}
          className={getItemStyles(level)}
        >
          {t(item.label)}
        </Link>
      </li>

      {/* Render Level 4 items (subItems) */}
      {item.subItems?.map((subItem, index) => (
        <NestedMenuItem
          key={subItem.id}
          item={subItem}
          level={4}
          t={t}
          isLast={index === item.subItems!.length - 1}
        />
      ))}

      {/* Render Level 5 items (nestedItems) */}
      {item.nestedItems?.map((nestedItem, index) => (
        <NestedMenuItem
          key={nestedItem.id}
          item={nestedItem}
          level={5}
          t={t}
          isLast={index === item.nestedItems!.length - 1}
        />
      ))}
    </>
  );
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  const { t } = useTranslation('menu');

  // Add dummy data to demonstrate 4th and 5th levels
  const enhancedColumns = columns;

  // Calculate number of columns
  const columnCount = enhancedColumns?.length || 0;

  // Determine grid columns based on number of columns (2-5 columns)
  const getGridClass = (colCount: number) => {
    if (colCount <= 2) return 'grid-cols-2';
    if (colCount === 3) return 'grid-cols-3';
    if (colCount === 4) return 'grid-cols-4';
    if (colCount >= 5) return 'grid-cols-5';
    return 'grid-cols-2'; // fallback
  };

  const gridClass = getGridClass(columnCount);

  // Get container width based on column count
  const getContainerClass = (colCount: number) => {
    const baseClasses = "absolute bg-gray-200 megaMenu shadow-header top-full -mt-1";
    if (colCount <= 2) {
      return `${baseClasses} ltr:-left-28 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0`;
    } else if (colCount === 3) {
      return `${baseClasses} ltr:-left-40 rtl:-right-40 ltr:xl:-left-10 rtl:xl:-right-10`;
    } else if (colCount === 4) {
      return `${baseClasses} ltr:-left-52 rtl:-right-52 ltr:xl:-left-20 rtl:xl:-right-20`;
    } else {
      return `${baseClasses} ltr:-left-64 rtl:-right-64 ltr:xl:-left-32 rtl:xl:-right-32`;
    }
  };

  const containerClass = getContainerClass(columnCount);

  return (
    <div className={containerClass}>
      <div className={`grid ${gridClass}`}>
        {enhancedColumns?.map((column, index) => (
          <ul
            className={`pt-6 pb-7 2xl:pb-8 2xl:pt-7 ${columnCount <= 2
              ? 'even:bg-gray-150'
              : index % 2 === 1
                ? 'bg-gray-150'
                : ''
              }`}
            key={column.id}
          >
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                {/* Level 2: Main Category (existing behavior) */}
                <li className="mb-1.5">
                  <Link
                    href={columnItem.path}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                  >
                    {t(columnItem.label)}
                  </Link>
                </li>

                {/* Level 3: Subcategories (existing behavior maintained) */}
                {columnItem?.columnItemItems?.map((item: any, index: number) => (
                  <React.Fragment key={item.id}>
                    <NestedMenuItem
                      item={item}
                      level={3}
                      t={t}
                      isLast={index === columnItem.columnItemItems!.length - 1}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
