import type { ReactNode } from "react";
import { SearchImagesForm } from "../forms/SearchImagesForm";

export const SearchImages = (): ReactNode => {
	return (
		<div className="bg-gray-800 bg-opacity-30 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-400 px-4 py-8 container mx-auto w-full max-w-2xl">
			<div className="container">
				<h1 className="text-4xl text-white text-center">Search Images</h1>
				<SearchImagesForm />
			</div>
		</div>
	);
};
