import { useCallback } from "react";

import type { FetchInitType, FetchInputType } from "../types/fetch-parameters";
import useFetchBase from "./use-fetch-base";

function useFetch() {
	const fetchBase = useFetchBase();

	const fetchWrapper = useCallback(
		async (input: FetchInputType, init?: FetchInitType) => {
			const response = await fetchBase(input, init);

			return response;
		},
		[fetchBase]
	);

	return fetchWrapper;
}

export default useFetch;
