import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@components/ui/container";
import Subscription from "@components/common/subscription";
import PurohitContent from "@components/purohit/purohit-content";

export default function PurohitsPage() {
	return (
		<>
			<PurohitContent />
			<Container>
				<Subscription />
			</Container>
		</>
	);
}

PurohitsPage.Layout = Layout;

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
