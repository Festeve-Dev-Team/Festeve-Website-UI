import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@components/ui/container";
import Subscription from "@components/common/subscription";
import FoodContent from "@components/food/food-content";

export default function FoodPage() {
	return (
		<>
			<FoodContent />
			<Container>
				<Subscription />
			</Container>
		</>
	);
}

FoodPage.Layout = Layout;

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
