import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Subscription from '@components/common/subscription';
import LoginForm from '@components/auth/login-form';
import PageHeader from '@components/ui/page-header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function SignInPage() {
  return (
    <>
      <Container>
        <div className="py-6">
          <LoginForm />
        </div>
      </Container>
    </>
  );
}

SignInPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'forms', 'menu', 'footer'])),
    },
  };
};
