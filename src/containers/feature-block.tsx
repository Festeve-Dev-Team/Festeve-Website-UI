import TextInformation from "@components/common/text-information";

const defaultData = [
	{
		id: 1,
		icon: "/assets/images/feature/delivery.svg",
		title: "service-fast-shipping",
		description: "service-fast-shipping-desc",
	},
	{
		id: 2,
		icon: "/assets/images/feature/product.svg",
		title: "service-easy-shop",
		description: "service-easy-shop-desc",
	},
	{
		id: 3,
		icon: "/assets/images/feature/saving.svg",
		title: "service-support",
		description: "service-support-desc",
	},
	{
		id: 4,
		icon: "/assets/images/feature/risk-free.svg",
		title: "service-hassle-free",
		description: "service-hassle-free-desc",
	},
];

interface FeatureItem {
	id: number;
	icon: string;
	title: string;
	description: string;
}

interface Props {
	className?: string;
	data?: FeatureItem[];
	backgroundColor?: string;
}

const FeatureBlock: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
	data = defaultData,
	backgroundColor = "bg-gray-200",
}) => {
	return (
		<div
			className={`${className} ${backgroundColor} feature-block-wrapper border border-gray-300 rounded-md w-full max-w-[1920px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-12 xl:gap-0 overflow-hidden py-12 xl:py-0 sm:px-4 md:px-8 lg:px-16 xl:px-0 mx-auto`}
		>
			{data?.map((item) => (
				<TextInformation item={item} key={item.id} />
			))}
		</div>
	);
};

export default FeatureBlock;
