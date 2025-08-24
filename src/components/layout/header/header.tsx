import React, { useRef, useState } from "react";
import SearchIcon from "@components/icons/search-icon";
import { motion, AnimatePresence } from 'framer-motion';
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { useAddActiveScroll } from "@utils/use-add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useCategoriesQuery } from "@framework/category/get-all-categories";

const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

const Header: React.FC = () => {
  const { openSearch, openModal, setModalView, isAuthorized } = useUI();
  const { data } = useCategoriesQuery({});
  const { t } = useTranslation("common");
  const siteHeaderRef = useRef<HTMLDivElement>(null);
  const [isCalendarHovered, setIsCalendarHovered] = useState(false);
  useAddActiveScroll(siteHeaderRef);

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  function handleCalendar() {
    setModalView("CALENDAR_VIEW");
    return openModal();
  }

  // if (isLoading) return <div className="flex items-center justify-center"><Spinner text="Loading..." /></div>;

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="relative z-20 w-full h-16 sm:h-20 lg:h-24"
    >
      <div className="fixed z-20 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-24 md:px-8 lg:px-6">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
          <Logo />

          <HeaderMenu
            data={data}
            className="hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10"
          />

          {/* <div className="flex-shrink-0 ltr:ml-auto rtl:mr-auto ltr:lg:mr-5 rtl:lg:ml-5 ltr:xl:mr-8 rtl:xl:ml-8 ltr:2xl:mr-10 rtl:2xl:ml-10">
            <LanguageSwitcher />
          </div> */}
          <div className="items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto">
            <button
              className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            <button
              className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none px-3 py-2"
              onClick={handleCalendar}
              aria-label="calendar-button"
              onMouseEnter={() => setIsCalendarHovered(true)}
              onMouseLeave={() => setIsCalendarHovered(false)}
            >
              <div className="relative flex items-center justify-center min-h-[48px] w-[50px]">
                <AnimatePresence mode="wait">
                  {isCalendarHovered ? (
                    <motion.div
                      key="calendar-gif"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="flex items-center justify-center absolute inset-0"
                    >
                      <img
                        src="/assets/icons/calendar.gif"
                        alt="Calendar"
                        width={24}
                        height={24}
                        className="w-12 h-12"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calendar-text"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="flex items-center justify-center absolute inset-0"
                    >
                      <span className="text-sm xl:text-base text-heading font-semibold text-center">
                        {t("text-calendar")}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
            <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className="text-sm font-semibold xl:text-base text-heading"
                btnProps={{
                  className:
                    "text-sm xl:text-base text-heading font-semibold focus:outline-none",
                  // @ts-ignore
                  children: t("text-sign-in"),
                  onClick: handleLogin,
                }}
              >
                <img
                  src={isAuthorized ? "/assets/icons/worker.gif" : "/assets/icons/login.gif"}
                  alt="Login"
                  width={24}
                  height={24}
                  className={isAuthorized ? "w-12 h-12" : "w-16 h-16"}
                />
                {t("text-account")}
              </AuthMenu>
            </div>
            {isAuthorized && <CartButton />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
