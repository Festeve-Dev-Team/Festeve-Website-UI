import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import AccountDetails from "@components/my-account/account-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import SpecialDayReminder from "@components/my-account/special-day-reminder";

export default function AccountDetailsPage() {
	return (
		<AccountLayout>
			<AccountDetails />
			<hr className="mt-4 border-t-1 border-gray-700" />
			<SpecialDayReminder />
		</AccountLayout>
	);
}

AccountDetailsPage.Layout = Layout;

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
