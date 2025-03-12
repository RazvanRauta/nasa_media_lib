import { createQueryKeys } from "../../lib/query-key-factory";
import type { ImageSearchQueryParameters } from "./use-image-search.query";

export const imageSearchQueryKeys = createQueryKeys(['image-search'], {
    search: () => ({
      key: [],
      sub: {
        by: ({
            query,
            yearStart,
            yearEnd,
            page,
            pageSize,
            mediaType,
        }: ImageSearchQueryParameters & {
            mediaType: "image";
            pageSize: string;
        }) => ({
          key: [
            mediaType,
            yearStart,
            yearEnd,
            page,
            pageSize,
            query,
          ],
        }),
      },
    })
  });