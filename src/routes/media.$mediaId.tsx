/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import {
	ErrorComponent,
	createFileRoute,
	useRouter,
	type ErrorComponentProps,
} from "@tanstack/react-router";
import {
	useQueryErrorResetBoundary,
	useSuspenseQuery,
} from "@tanstack/react-query";

export class PostNotFoundError extends Error {
	public constructor() {
		super();
		this.name = "PostNotFoundError";
	}
}

export const Route = createFileRoute("/media/$mediaId")({
	loader: ({ context: { queryClient }, params: { mediaId } }) => {
		// return queryClient.ensureQueryData(postQueryOptions(postId));
	},
	errorComponent: PostErrorComponent,
	component: PostComponent,
});

export function PostErrorComponent({
	error,
}: ErrorComponentProps): React.ReactNode {
	const router = useRouter();
	if (error instanceof PostNotFoundError) {
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

function PostComponent(): React.ReactNode {
	const { mediaId } = Route.useParams();
	// const { data: post } = useSuspenseQuery(postQueryOptions(postId));

	return (
		<>
			<h4 className="text-xl font-bold underline">{mediaId}</h4>
		</>
	);
}
