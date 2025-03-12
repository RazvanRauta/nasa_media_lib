import { useCallback } from "react";

import type { FetchInitType, FetchInputType } from "../types/fetch-parameters";

function useFetchBase() {
	return useCallback(async (input: FetchInputType, init?: FetchInitType) => {
		let headers: HeadersInit = {};

		if (!(init?.body instanceof FormData)) {
			headers = {
				...headers,
				"Content-Type": "application/json",
			};
		}

		return fetch(input, {
			...init,
			headers: {
				...headers,
				...init?.headers,
			},
		});
	}, []);
}

export default useFetchBase;
