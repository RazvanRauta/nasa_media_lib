import type { FunctionComponent } from "../common/types";
import { SearchImages } from "../components/search-images";
import SearchProvider from "../stores/search/search-provider";

export const Home = (): FunctionComponent => {
	return (
		<SearchProvider>
			<SearchImages />
		</SearchProvider>
	);
};
