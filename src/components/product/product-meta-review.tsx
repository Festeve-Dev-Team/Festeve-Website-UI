import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";
import { Product } from "@framework/types";

interface Props {
	data: Product;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	const [expanded, setExpanded] = useState<number>(0);
	
	// Create meta sections from product data
	const metaSections = [
		{
			id: 1,
			title: "Product Details",
			content: (
				<div className="text-sm space-y-2">
					<p>{data.description}</p>
					{data.ingredients && data.ingredients.length > 0 && (
						<div>
							<strong>Ingredients:</strong>
							<ul className="list-disc pl-4 mt-1">
								{data.ingredients.map((ingredient, idx) => (
									<li key={idx}>{ingredient}</li>
								))}
							</ul>
						</div>
					)}
					{data.vendors && data.vendors.length > 0 && (
						<div>
							<strong>Available from Vendors:</strong>
							<ul className="list-disc pl-4 mt-1">
								{data.vendors.map((vendor, idx) => (
									<li key={idx}>{vendor}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)
		},
		{
			id: 2,
			title: "Additional Information",
			content: (
				<div className="text-sm space-y-2">
					{data.meta && Object.entries(data.meta).map(([key, value], idx) => (
						<div key={idx}>
							<strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value as string}
						</div>
					))}
					{data.linkedEvents && data.linkedEvents.length > 0 && (
						<div>
							<strong>Related Events:</strong>
							<ul className="list-disc pl-4 mt-1">
								{data.linkedEvents.map((event, idx) => (
									<li key={idx}>{event}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)
		},
		{
			id: 3,
			title: "Reviews",
			content: <ReviewForm />
		}
	];

	return (
		<>
			{metaSections.map((section, index) => (
				<Collapse
					i={index}
					key={section.title}
					title={section.title}
					translatorNS="review"
					content={section.content}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;
