import { Link } from "@tanstack/react-router";
import {
	ItemLinkType,
	type Datum,
	type ItemLink,
} from "../../../types/nasa-response";

export const ResultCard = ({
	item,
	links,
}: {
	item: Datum;
	links: Array<ItemLink>;
}) => {
	const imgSource =
		links.find((link) => link.rel === ItemLinkType.Preview)?.href || "";

	return (
		// @ts-expect-error type error
		<Link className="h-full" to={`/media/${item.nasa_id}`}>
			<div className="w-full h-full border border-gray-700 shadow-xl card bg-base-100">
				<figure>
					{imgSource ? (
						<img
							alt={item.title}
							className="object-cover w-full h-48"
							src={imgSource}
						/>
					) : (
						<div className="flex items-center justify-center h-48 bg-gray-400">
							<span className="text-gray-600">No Thumbnail</span>
						</div>
					)}
				</figure>
				<div className="card-body">
					<h2 className="text-white card-title line-clamp-2">{item.title}</h2>
					<p className="text-white">
						{item.location ? `Location: ${item.location}` : "Location Unknown"}
					</p>
					<p className="text-white">
						{item.photographer
							? `Photographer: ${item.photographer}`
							: "Photographer Unknown"}
					</p>
					<div className="justify-end card-actions">
						<button className="btn btn-primary">View Details</button>
					</div>
				</div>
			</div>
		</Link>
	);
};
