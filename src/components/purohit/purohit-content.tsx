import { useState } from 'react';
import PurohitCard from './purohit-card';
import Alert from '@components/ui/alert';
import { BsGridFill, BsList } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import { usePurohitsQuery } from '@framework/purohit/get-purohits';
import ErrorPage from 'src/pages/404';
import Spinner from '@components/ui/loaders/spinner';

const PurohitContent: React.FC = () => {
  const [gridView, setGridView] = useState(false);
  const { t } = useTranslation('common');
  const { data: userData, isLoading, isError } = usePurohitsQuery();

  const listViewHandel = () => {
    setTimeout(() => {
      setGridView(false);
    }, 300);
  };

  const gridViewHandel = () => {
    setTimeout(() => {
      setGridView(true);
    }, 300);
  };

  if(isLoading) return <div className="flex items-center justify-center"><Spinner text="Loading Purohits..." /></div>;
  if(isError) return <ErrorPage />;
  if (!userData.length) return <Alert message="No Purohits found." />;

  return (
    <div className="border-t border-gray-300 pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
      <div className="w-full xl:max-w-[1170px] mx-auto">
        <div className="flex items-center justify-between mb-6 xl:mb-8">
          <h2 className="font-bold text-heading text-lg md:text-xl lg:text-2xl xl:text-3xl">
            {t('text-purohits')}
          </h2>
          <div className="flex-shrink-0 flex items-center ltr:ml-2 rtl:mr-2">
            <button
              aria-label="list"
              className={`text-2xl relative top-[1px] transition-all ${!gridView ? 'text-heading' : 'text-body'
                }`}
              onClick={listViewHandel}
            >
              <BsList />
            </button>
            <button
              aria-label="grid"
              className={`text-lg transition-all ltr:ml-1.5 rtl:mr-1.5 ${gridView ? 'text-heading' : 'text-body'
                }`}
              onClick={gridViewHandel}
            >
              <BsGridFill />
            </button>
          </div>
        </div>

        <div
          className={`grid ${gridView
              ? 'md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'grid-cols-1 gap-4'
            }`}
        >
          {userData.map((purohit: any) => (
            <PurohitCard
              key={purohit.id}
              purohit={purohit}
              variant={gridView ? 'grid' : 'list'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurohitContent;