import { createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { LayoutComponent } from "../components/layout";
import { NotFoundComponent } from "../components/not-found";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: LayoutComponent,
	notFoundComponent: NotFoundComponent,
});
