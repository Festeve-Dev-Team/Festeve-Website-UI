import { useState } from 'react';
import Link from '@components/ui/link';
import Scrollbar from '@components/common/scrollbar';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import Subscription from '@components/common/subscription';

const social = [
  {
    id: 0,
    link: 'https://www.facebook.com',
    icon: <IoLogoFacebook />,
    className: 'facebook',
    title: 'text-facebook',
  },
  {
    id: 1,
    link: 'https://twitter.com',
    icon: <IoLogoTwitter />,
    className: 'twitter',
    title: 'text-twitter',
  },
  {
    id: 2,
    link: 'https://www.youtube.com',
    icon: <IoLogoYoutube />,
    className: 'youtube',
    title: 'text-youtube',
  },
  {
    id: 3,
    link: 'https://www.instagram.com',
    icon: <IoLogoInstagram />,
    className: 'instagram',
    title: 'text-instagram',
  },
];

export default function MobileMenu() {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { data: menuData } = useCategoriesQuery({});
  const { closeSidebar } = useUI();
  const { t } = useTranslation('menu');
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    menuName,
    menuIndex,
    className = '',
  }: any) => {
    // Handle special cases for Clothing and Essentials
    if (data.label === 'Clothing' || data.label === 'Essentials') {
      return (
        <li className={`mb-0.5 ${className}`}>
          <div className="relative flex items-center justify-between">
            <div
              className="w-full text-[15px] menu-item relative py-3 ltr:pl-5 rtl:pr-5 ltr:md:pl-6 rtl:md:pr-6 ltr:pr-4 rtl:pl-4 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleArrowClick(menuName)}
            >
              <span className="block w-full">
                {t(`${data.label}`)}
              </span>
            </div>
            <div
              className="absolute top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer ltr:left-0 rtl:right-0 ltr:pr-5 rtl:pl-5"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                  }`}
              />
            </div>
          </div>
          {/* Custom launch notice for Clothing and Essentials */}
          {activeMenus.includes(menuName) && (
            <div className="px-5 py-4 bg-gray-50 border-l-4 border-brand">
              {data.label === 'Clothing' ? (
                <div>
                  <h3 className="text-lg font-bold text-heading mb-2">The celebrations are about to begin</h3>
                  <p className="text-sm text-body mb-4">
                    <i>Festeve.in goes live on September 1st, 2025.</i><br />
                    Until then, we're weaving together traditions, flavors, and celebrations — just for you.
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-heading">Notify Me When We Launch</h4>
                    <Subscription showTitle={false} className="px-0 bg-opacity-0" />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-heading mb-2">Essentials for every celebration — big or small</h3>
                  <p className="text-sm text-body mb-4">
                    Whether it's a festival, a family gathering, or a personal milestone, we've got everything covered.
                    <br />
                    <i>Launching on September 1st, 2025.</i>
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-heading">Join the Festive Waitlist</h4>
                    <Subscription showTitle={false} className="px-0 bg-opacity-0" />
                  </div>
                </div>
              )}
            </div>
          )}
        </li>
      );
    }

    // Regular menu items
    return data.label && (
      <li className={`mb-0.5 ${className}`}>
        <div className="relative flex items-center justify-between">
          <Link
            href={data.path}
            className="w-full text-[15px] menu-item relative py-3 ltr:pl-5 rtl:pr-5 ltr:md:pl-6 rtl:md:pr-6 ltr:pr-4 rtl:pl-4 transition duration-300 ease-in-out"
          >
            <span className="block w-full" onClick={closeSidebar}>
              {t(`${data.label}`)}
            </span>
          </Link>
          {data.columns && data.columns.length > 0 && (
            <div
              className="absolute top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer ltr:left-0 rtl:right-0 ltr:pr-5 rtl:pl-5"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                  }`}
              />
            </div>
          )}
        </div>
        {data.columns && data.columns.length > 0 && (
          <SubMenu
            dept={dept}
            data={data.columns}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );
  };

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className="pt-0.5">
        {data?.map((column: any, index: number) => {
          return column.columnItems?.map((menu: any, subIndex: number) => {
            const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}-${subIndex}`;

            return (
              <>
                <ListMenu
                  dept={dept}
                  data={menu}
                  menuName={menuName}
                  key={menuName}
                  menuIndex={subIndex}
                  className={dept > 1 && 'ltr:pl-4 rtl:pr-4'}
                />
                {menu.columnItemItems?.map((subItem: any, subItemIndex: number) => {
                  const subMenuName: string = `${menuName}-sub-${subItemIndex}`;
                  return (
                    <ListMenu
                      dept={dept + 1}
                      data={subItem}
                      menuName={subMenuName}
                      key={subMenuName}
                      menuIndex={subItemIndex}
                      className="ltr:pl-8 rtl:pr-8"
                    />
                  );
                })}
              </>
            );
          });
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-gray-100 flex justify-between items-center relative ltr:pl-5 rtl:pr-5 ltr:md:pl-7 rtl:md:pr-7 flex-shrink-0 py-0.5">
          <Logo />

          <button
            className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-black mt-1 md:mt-0.5" />
          </button>
        </div>

        <Scrollbar className="flex-grow mb-auto menu-scrollbar">
          <div className="flex flex-col px-0 py-7 lg:px-2 text-heading">
            <ul className="mobileMenu">
              {menuData
                ?.filter((menu: any) => menu.label !== 'Food' && menu.label !== 'Gifting')
                .map((menu: any, index: number) => {
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
        </Scrollbar>

        <div className="flex items-center justify-center flex-shrink-0 bg-white border-t border-gray-100 px-7 gap-x-1">
          {social?.map((item, index) => (
            <a
              href={item.link}
              className={`text-heading p-5 opacity-60 ltr:first:-ml-4 rtl:first:-mr-4 transition duration-300 ease-in hover:opacity-100 ${item.className}`}
              target="_blank"
              key={index}
            >
              <span className="sr-only">{t(`${item.title}`)}</span>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
