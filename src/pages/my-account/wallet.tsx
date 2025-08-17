import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import WalletDetails from "@components/wallet/wallet-details";

export default function WalletPage() {
	return (
		<AccountLayout>
			<WalletDetails />
		</AccountLayout>
	);
}

WalletPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};