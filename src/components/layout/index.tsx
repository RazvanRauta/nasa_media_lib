import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevelopmentTools } from "../utils/development-tools/TanStackRouterDevelopmentTools";

import type { JSX } from "react";
import StarWarp from "./StarWarp";

export const LayoutComponent = (): JSX.Element => {
	return (
		<>
			<div className="min-h-full">
				<main className="w-svw h-svh">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<Outlet />
					</div>
				</main>
			</div>

			<StarWarp />

			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
			<TanStackRouterDevelopmentTools position="bottom-right" />
		</>
	);
};
