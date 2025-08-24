import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { privacyPolicy } from '@settings/privacy-settings';
import { Link } from 'react-scroll';
import { Element as ScrollElement } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function PrivacyPage() {
  const { t } = useTranslation('privacy');
  return (
    <>
      <div className="px-4 mt-12 border-b border-gray-300 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row">
            <nav className="mb-8 md:w-72 xl:w-3/12 md:mb-0">
              <ol className="sticky z-10 md:top-16 lg:top-28">
                {privacyPolicy?.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={500}
                      to={makeTitleToDOMId(item.title)}
                      activeClass="text-heading font-semibold"
                      className="block cursor-pointer py-3 lg:py-3.5  text-sm lg:text-base  text-gray-700 uppercase"
                    >
                      {(index + 1) +
                        ' ' +
                        t(`${item.title}`)}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            {/* End of section scroll spy menu */}

            <div className="pt-0 md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 lg:pt-2">
              {privacyPolicy?.map((item) => (
                <ScrollElement
                  key={item.title}
                  name={makeTitleToDOMId(item.title)}
                  className="mb-10"
                >
                  <h2 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl text-heading">
                    {t(`${item.title}`)}
                  </h2>

                  {/* Main description if exists */}
                  {item.description && (
                    <div className="mb-2 text-sm leading-7 text-heading lg:text-base lg:leading-loose">
                      {t(`${item.description}`)}
                    </div>
                  )}

                  {/* Subsections if they exist */}
                  {item.subSections && item.subSections.map((subSection, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="mb-3 text-base font-semibold md:text-lg text-heading">
                        {t(`${subSection.title}`)}
                      </h3>
                      {subSection.items && (
                        <ul className="list-disc pl-6 text-sm leading-7 lg:text-base lg:leading-loose">
                          {t(`${subSection.items}`).split('\\n').map((item, idx) => (
                            <li key={idx} className="mb-2">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* Items if they exist */}
                  {item.items && (
                    <ul className="list-disc pl-6 mb-6 text-sm leading-7 lg:text-base lg:leading-loose">
                      {Number(item.id) === privacyPolicy.length ? (
                        <>
                          <li className="mb-2">
                            Email: <a
                              href="mailto:support@festeve.in"
                              className="text-sky-500 underline cursor-pointer font-semibold ml-2"
                            >
                              support@festeve.in
                            </a>
                          </li>
                          <li className="mb-2">
                            Phone: (+91) 91330 79089
                          </li>
                          <li className="mb-2">
                            Address: Madhapur, Hyderabad
                          </li>
                        </>
                      )
                        :
                        <>
                          {t(`${item.items}`).split('\\n').map((listItem, idx) => (
                            <li key={idx} className="mb-2">{listItem}</li>
                          ))}
                        </>
                      }
                    </ul>
                  )}

                  {/* Note if exists */}
                  {item.note && (
                    <div className="mt-4 text-sm italic text-gray-600 lg:text-base">
                      {t(`${item.note}`)}
                    </div>
                  )}
                </ScrollElement>
              ))}
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
    </>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'privacy',
        'footer',
      ])),
    },
  };
};
