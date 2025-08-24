import TextInformation from "@components/common/text-information";

const defaultData = [
	{
		id: 1,
		icon: "/assets/icons/delivery-truck.gif",
		title: "service-fast-shipping",
		description: "service-fast-shipping-desc",
		hoverDescription: "We deliver more than 2500+ products to 60,000+ pincodes all over India",
	},
	{
		id: 2,
		icon: "/assets/icons/shopping-bag.gif",
		title: "service-easy-shop",
		description: "service-easy-shop-desc",
		hoverDescription: "You can get all types of products segregated and decently organised in FestEve",
	},
	{
		id: 3,
		icon: "/assets/icons/helpdesk.gif",
		title: "service-support",
		description: "service-support-desc",
		hoverDescription: "We are here to assist you over live chat, Email and Call- round the clock",
	},
	{
		id: 4,
		icon: "/assets/icons/diagram.gif",
		title: "service-hassle-free",
		description: "service-hassle-free-desc",
		hoverDescription: "FestEve is here to help in Exchange and returns",
	},
];

interface FeatureItem {
	id: number;
	icon: string;
	title: string;
	description: string;
	hoverDescription?: string;
}

interface Props {
	className?: string;
	data?: FeatureItem[];
	backgroundColor?: string;
}

const FeatureBlock: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
	data = defaultData,
	backgroundColor = "bg-white-200",
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
