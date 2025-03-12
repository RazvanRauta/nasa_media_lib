import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
	ItemLinkType,
	type Datum,
	type ItemLink,
} from "../../types/nasa-response";
import type { SearchContextType } from "../../stores/search/search-context";

export const MediaShow = ({
	item,
	links,
	search,
}: {
	item: Datum;
	links: Array<ItemLink>;
	search: SearchContextType;
}): ReactNode => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleBackClick = () => {
		void navigate({ to: "/", search });
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const getUniqueImage = (): string => {
		const alternateLink = links.find(
			(link) => link.rel === ItemLinkType.Alternate
		)?.href;
		if (alternateLink) return alternateLink;

		const previewLink = links.find(
			(link) => link.rel === ItemLinkType.Preview
		)?.href;
		if (previewLink) return previewLink;

		const canonicalLink = links.find(
			(link) => link.rel === ItemLinkType.Canonical
		)?.href;
		if (canonicalLink) return canonicalLink;

		return "";
	};

	const imageUrl = getUniqueImage();

	return (
		<article className="container py-10 mx-auto">
			<button className="mb-4 btn btn-primary" onClick={handleBackClick}>
				<span className="mr-2">
					<svg
						className="inline-block w-6 h-6"
						fill="#000000"
						height="800px"
						id="Layer_1"
						version="1.1"
						viewBox="0 0 476.213 476.213"
						width="800px"
						xmlSpace="preserve"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5   57.427,253.107 476.213,253.107 " />
					</svg>
				</span>
				Back to Search Results
			</button>

			<div className="w-full border border-gray-700 shadow-xl card bg-base-100">
				{imageUrl && (
					<figure className="relative">
						<img
							alt={item.title}
							className="object-cover w-full h-96 cursor-zoom-in"
							src={imageUrl}
							onClick={openModal}
						/>
						<figcaption className="absolute bottom-0 left-0 p-2 text-white bg-black bg-opacity-50">
							{item.title}
						</figcaption>

						{item.nasa_id && (
							<a
								className="absolute top-0 right-0 m-2 btn btn-sm btn-circle"
								href={`https://images.nasa.gov/details-${item.nasa_id}`}
								rel="noopener noreferrer"
								target="_blank"
							>
								🔗
							</a>
						)}

						<button
							className="absolute bottom-0 right-0 m-2 btn btn-sm btn-circle"
							onClick={openModal}
						>
							🔍
						</button>
					</figure>
				)}

				<div className="card-body">
					<h2 className="text-3xl text-white card-title">{item.title}</h2>

					<p className="text-white">
						{item.location ? `Location: ${item.location}` : "Location Unknown"}
					</p>
					<p className="text-white">
						{item.photographer
							? `Photographer: ${item.photographer}`
							: "Photographer Unknown"}
					</p>
					<p className="text-white">
						{item.date_created
							? `Date: ${new Date(item.date_created).toISOString()}`
							: "Date Unknown"}
					</p>
					<p className="text-white">
						{item.keywords
							? `Keywords: ${item.keywords.join(", ")}`
							: "No Keywords"}
					</p>
					<p className="text-white">{item.description}</p>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
					<div className="relative bg-white rounded shadow-lg">
						<button
							className="absolute top-0 right-0 m-2 btn btn-sm btn-circle"
							onClick={closeModal}
						>
							✕
						</button>
						<img
							alt={item.title}
							className="object-contain max-h-[80vh] max-w-[80vw]"
							src={imageUrl}
						/>
					</div>
				</div>
			)}
		</article>
	);
};
