import { Link, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { LayoutComponent } from "../components/layout";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: LayoutComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>Not Found</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});
