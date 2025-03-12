import type { FunctionComponent } from "../common/types";
import { ResultsGrid } from "../components/results-grid";
import { SearchImages } from "../components/search-images";
import SearchProvider from "../stores/search/search-provider";

export const Home = (): FunctionComponent => {
	return (
		<SearchProvider>
			<div className="container flex flex-col items-center">
				<SearchImages />
				<ResultsGrid />
			</div>
		</SearchProvider>
	);
};
