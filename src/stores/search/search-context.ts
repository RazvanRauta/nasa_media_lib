import { createContext } from "react";

export interface SearchContextType {
	query: string;
	yearStart?: string;
	yearEnd?: string;
	page?: string;
}

export interface SearchActionsContextType {
	setQuery: (data: SearchContextType) => void;
}

export const SearchContext = createContext<SearchContextType>({
	query: "",
	page: "1",
});

export const SearchActionsContext = createContext<SearchActionsContextType>({
	setQuery: () => {},
});
