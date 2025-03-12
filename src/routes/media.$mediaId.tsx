/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import {
	ErrorComponent,
	createFileRoute,
	useRouter,
	useRouterState,
	type ErrorComponentProps,
} from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { NotFoundComponent } from "../components/not-found";
import { MediaShow } from "../components/media-show";

export class MediaNotFoundError extends Error {
	public constructor() {
		super();
		this.name = "MediaNotFoundError";
	}
}

export const Route = createFileRoute("/media/$mediaId")({
	errorComponent: MediaErrorComponent,
	component: MediaComponent,
});

export function MediaErrorComponent({
	error,
}: ErrorComponentProps): React.ReactNode {
	const router = useRouter();

	if (error instanceof MediaNotFoundError) {
		return <div>{error?.message}</div>;
	}
	const queryErrorResetBoundary = useQueryErrorResetBoundary();

	React.useEffect(() => {
		queryErrorResetBoundary.reset();
	}, [queryErrorResetBoundary]);

	return (
		<div>
			<button
				onClick={async () => {
					await router.invalidate();
				}}
			>
				retry
			</button>
			<ErrorComponent error={error} />
		</div>
	);
}

function MediaComponent(): React.ReactNode {
	const { item, links, search } = useRouterState({
		select: (s) => s.location.state,
	});

	if (!item || !links) {
		return <NotFoundComponent />;
	}

	return <MediaShow item={item} links={links} search={search} />;
}
