import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import Text from '@components/ui/text';
import { useUI } from '@contexts/ui.context';
import FilterSidebar from '@components/shop/filter-sidebar';
import ListBox from '@components/ui/list-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';

const motionProps = {
  initial: { x: -300 },
  animate: { x: 0 },
  exit: { x: -300 },
  transition: { duration: 0.3 }
};

export default function SearchTopBar({ translationKey }: { translationKey?: string }) {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale, query } = useRouter();
  const dir = getDirection(locale);

  // Determine the page title based on context
  const getPageTitle = () => {
    if (translationKey) {
      return t(translationKey);
    }

    // For search pages, show the search query or "Search Results"
    if (query.q) {
      // Convert category slug to readable format (e.g., "clothing/men" -> "Clothing / Men")
      const searchQuery = String(query.q);
      const formatted = searchQuery
        .split('/')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' / ');
      return formatted;
    }

    return t('text-search-results') || 'Search Results';
  };

  return (
    <div className="flex justify-between items-center mb-7">
      <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        {getPageTitle()}
      </Text>
      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ltr:pl-2.5 rtl:pr-2.5">{t('text-filters')}</span>
      </button>
      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2 hidden lg:block">
          {/* 9,608 {t('text-items')} */}
        </div>
        <ListBox
          options={[
            { name: 'text-sorting-options', value: 'options' },
            { name: 'text-newest', value: 'newest' },
            { name: 'text-popularity', value: 'popularity' },
            { name: 'text-price-low-high', value: 'low-high' },
            { name: 'text-price-high-low', value: 'high-low' },
          ]}
        />
      </div>
      {/* TODO: need to use just one drawer component */}
      <Drawer placement={dir === 'rtl' ? 'right' : 'left'} open={displayFilter} onClose={closeFilter} {...motionProps}>
        <FilterSidebar />
      </Drawer>
    </div>
  );
}
