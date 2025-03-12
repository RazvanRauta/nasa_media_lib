import { Link } from "@tanstack/react-router";
import type { SearchContextType } from "../../stores/search/search-context";

export const NotFoundComponent = () => {
	return (
		<div className="container flex items-center justify-center h-screen">
			<div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 px-4 py-4 mx-auto bg-gray-800 border border-gray-400 rounded-md bg-opacity-30 bg-clip-padding backdrop-filter backdrop-blur-sm">
				<h1 className="text-2xl">Not Found</h1>
				<Link className="underline" search={{} as SearchContextType} to="/">
					Start Over
				</Link>
			</div>
		</div>
	);
};
