import React from 'react';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
  data: any;
}
type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

// Helper component to render level 3 menu items
const NestedMenuItem: React.FC<{
  item: MenuItem;
  t: any;
  isLast?: boolean;
}> = ({ item, t, isLast = false }) => {
  const itemStyles = "block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300 text-body text-sm";

  const borderStyles = isLast ? 'border-b border-gray-300 pb-3.5 mb-3' : '';

  return (
    <li className={borderStyles}>
      <Link
        href={item.path}
        className={itemStyles}
      >
        {t(item.label)}
      </Link>
    </li>
  );
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  const { t } = useTranslation('menu');

  // Helper function to determine route for level 2 items
  const getLevel2Route = (columnItem: MenuItem) => {
    const label = columnItem.label.toLowerCase();
    // For level 2 items like Men, Women, Kids - route to dedicated pages
    if (label === 'men' || label === 'women' || label === 'kids') {
      return `/${label}`;
    }
    // For other level 2 items, keep existing behavior
    return columnItem.path;
  };

  // Use columns as-is (limited to 3 levels)
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
                {/* Level 2: Main Category - route to dedicated pages for men/women/kids */}
                <li className="mb-1.5">
                  <Link
                    href={getLevel2Route(columnItem)}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                  >
                    {t(columnItem.label)}
                  </Link>
                </li>

                {/* Level 3: Subcategories (limited to level 3) */}
                {columnItem?.columnItemItems?.map((item: any, index: number) => (
                  <React.Fragment key={item.id}>
                    <NestedMenuItem
                      item={item}
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
