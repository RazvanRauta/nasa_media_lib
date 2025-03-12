import type { ReactNode } from "react";
import { useRef, useEffect } from "react";
import { SearchImagesForm } from "../forms/SearchImagesForm";

export const SearchImages = (): ReactNode => {
	const componentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (componentRef.current) {
			componentRef.current.style.transition =
				"transform 0.3s ease-in-out, width 0.3s ease-in-out";
		}
	}, []);

	return (
		<div
			ref={componentRef}
			className={`bg-gray-800 bg-opacity-30 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-400 px-4 py-4 mx-auto w-full max-w-2xl`}
		>
			<div className="container">
				<div className="flex flex-wrap items-center justify-center space-x-4">
					<h1 className="text-4xl text-center text-white">Search</h1>
					<img
						alt="search"
						className="w-12 h-12 md:w-16 md:h-16"
						src="/logo.png"
					/>
					<h1 className="text-4xl text-center text-white">Images</h1>
				</div>
				<SearchImagesForm />
			</div>
		</div>
	);
};
