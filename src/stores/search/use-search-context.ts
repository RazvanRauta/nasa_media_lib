import { useContext } from "react";
import { SearchActionsContext, SearchContext } from "./search-context";

export function useSearchContext() {
    const searchContext = useContext(SearchContext);
    const searchActionsContext = useContext(SearchActionsContext);
    return {searchContext, searchActionsContext};
}