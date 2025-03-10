import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevelopmentTools } from "../utils/development-tools/TanStackRouterDevelopmentTools";

import { Disclosure } from "@headlessui/react";

export const LayoutComponent = (): JSX.Element => {
	return (
		<>
			<div className="min-h-full">
				<Disclosure as="nav" className="bg-gray-800">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-20 items-center justify-between">
							<div className="flex items-center">
								<div className="shrink-0">
									<img alt="Your Company" className="size-14" src="/logo.png" />
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4"></div>
								</div>
							</div>
						</div>
					</div>
				</Disclosure>

				<header className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
							NASA Image Search
						</h1>
					</div>
				</header>
				<main>
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<Outlet />
					</div>
				</main>
			</div>
			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
			<TanStackRouterDevelopmentTools position="bottom-right" />
		</>
	);
};
