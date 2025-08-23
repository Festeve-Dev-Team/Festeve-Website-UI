import SectionHeader from "@components/common/section-header";
import ProductsBlock from "@containers/products-block";
import { useTranslation } from "next-i18next";
import { useProductsQuery } from "@framework/product/get-all-products-2";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Spinner from "@components/ui/loaders/spinner";
import ErrorPage from "src/pages/404";
import Alert from "@components/ui/alert";

import { useMemo } from "react";

const TrendingProductFeedWithTabs: React.FC<any> = () => {
  const { t } = useTranslation("common");

  const { data, isLoading, isError } = useProductsQuery({
    limit: 10,
  });
  
  const safeProducts = useMemo(() => {
    if (!data || !data.products || !Array.isArray(data.products)) return [];
    return data.products;
  }, [data]);

  if (isLoading) return <div className="flex items-center justify-center"><Spinner text="Loading Products..." /></div>;
  if (isError) return <ErrorPage />;
  if (!data || !data.products || !Array.isArray(data.products)) return <Alert message="No Products found." />;

  return (
    <div className="mb-12 md:mb-14 xl:mb-16">
      <SectionHeader
        sectionHeading="text-trending-products"
        className="pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5"
      />

      <TabGroup as="div" className="">
        <TabList as="ul" className="tab-ul">
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p className="">{t("tab-all-collection")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-flash-sale")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-best-sellers")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-featured")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p className="">{t("tab-new-collection")}</p>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProductsBlock
              products={safeProducts.slice(0, 10)}
              loading={isLoading}
              uniqueKey="all-products"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={safeProducts.slice(5, 15)}
              loading={isLoading}
              uniqueKey="flash-sale"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={safeProducts.slice(12, 22)}
              loading={isLoading}
              uniqueKey="best-sellers"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={safeProducts.slice(8, 18)}
              loading={isLoading}
              uniqueKey="featured"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={safeProducts.slice(12, 18)}
              loading={isLoading}
              uniqueKey="featured"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TrendingProductFeedWithTabs;
