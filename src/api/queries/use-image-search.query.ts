/* eslint-disable camelcase */
import { useQuery } from "@tanstack/react-query";
import { useSearchForImagesService } from "../services/use-search-for-images.service";
import { imageSearchQueryKeys } from "./image-search-query-keys";

export interface ImageSearchQueryParameters {
	page: string;
	query: string;
	yearStart?: string;
	yearEnd?: string;
}

export const useImageSearchQuery = ({
	query,
	page,
	yearStart,
	yearEnd,
}: ImageSearchQueryParameters) => {
	const mediaType = "image";
	const pageSize = "6";
	const fetch = useSearchForImagesService();

	const queryFn = useQuery({
		refetchOnMount: false,
		enabled: query.length >= 3,
		queryKey: imageSearchQueryKeys.search().sub.by({
			query,
			yearStart,
			yearEnd,
			page,
			pageSize,
			mediaType,
		}).key,
		queryFn: async ({ signal }) => {
			const { status, data } = await fetch(
				{
					q: query,
					media_type: mediaType,
					year_start: yearStart,
					year_end: yearEnd,
					page,
					page_size: pageSize,
				},
				{
					signal,
				}
			);

			if (status === 200 && data) {
				return {
					data: data.collection.items,
					meta: {
						totalItems: data.collection.metadata.total_hits,
						totalPages: Math.ceil(
							data.collection.metadata.total_hits / parseInt(pageSize)
						),
						hasNextPage: data.collection.links.some(
							(link) => link.rel === "next"
						),
					},
				};
			}

			return {
				data: [],
				meta: {
					totalItems: 0,
					totalPages: 0,
					hasNextPage: false,
				},
			};
		},
		gcTime: 60 * 60 * 1000,
		staleTime: 60 * 60 * 1000,
	});
	return queryFn;
};
