import { useCallback } from 'react';
import useFetch from '../../lib/use-fetch';
import type { RequestConfigType } from '../../types/request-config';
import { API_URL } from '../../lib/config';
import wrapperFetchJsonResponse from '../../lib/wrapper';
import type { NasaApiResponse } from '../../types/nasa-response';


export interface SearchQuery {
    q: string,
    media_type: "image" | "video",
    year_start?: string,
    year_end?: string,
    page: string,
    page_size: string,
}


export function useSearchForImagesService() {
  const fetch = useFetch();

  return useCallback(
    async (query: SearchQuery, requestConfig?: RequestConfigType) => {
        const requestUrl = new URL(`${API_URL}/search`);

     Object.entries(query).forEach(([key, value]) => {
        if(value){
       requestUrl.searchParams.append(key, String(value));
        }
     });
     const response = await fetch(requestUrl, {
        method: 'GET',
        ...requestConfig,
      });

      return wrapperFetchJsonResponse<NasaApiResponse>(response);

   
    },
    [fetch],
  );
}