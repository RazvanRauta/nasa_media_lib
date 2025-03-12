import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../pages/Home";
import type { SearchContextType } from "../stores/search/search-context";

export const Route = createFileRoute("/")({
	component: Home,
	validateSearch: () => ({}) as SearchContextType,
});
