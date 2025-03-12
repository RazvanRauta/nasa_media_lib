import { useCallback, useMemo, type PropsWithChildren } from "react";
import {
	SearchActionsContext,
	SearchContext,
	type SearchContextType,
} from "./search-context";
import { useFilters } from "../../hooks/use-filters";
import { Route } from "../../routes";

function SearchProvider({ children }: PropsWithChildren) {
	const { filters, setFilters } = useFilters(Route.fullPath);

	const search: SearchContextType = useMemo(
		() => ({
			query: filters.query || "",
			page: filters.page ? parseInt(filters.page, 10).toString() : "1",
			yearEnd: filters.yearEnd
				? parseInt(filters.yearEnd, 10).toString()
				: undefined,
			yearStart: filters.yearStart
				? parseInt(filters.yearStart, 10).toString()
				: undefined,
		}),
		[filters]
	);

	const setQuery = useCallback(
		(newSearch: SearchContextType) => {
			setFilters({
				query: newSearch.query,
				page: newSearch.page,
				yearEnd: newSearch.yearEnd,
				yearStart: newSearch.yearStart,
			});
		},
		[setFilters]
	);

	return (
		<SearchContext.Provider value={search}>
			<SearchActionsContext.Provider value={{ setQuery }}>
				{children}
			</SearchActionsContext.Provider>
		</SearchContext.Provider>
	);
}

export default SearchProvider;
