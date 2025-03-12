import type {
  RegisteredRouter,
  RouteIds} from '@tanstack/react-router';
import {
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import { cleanEmptyParameters } from '../utils/clean-empty-parameters';

export function useFilters<T extends RouteIds<RegisteredRouter['routeTree']>>(
  routeId: T
) {
  const routeApi = getRouteApi<T>(routeId)
  const navigate = useNavigate()
  const filters = routeApi.useSearch()

  const setFilters = (partialFilters: Partial<typeof filters>) =>{
    void navigate({
      // @ts-expect-error - This is a bug in the type definitions
      search: previous => cleanEmptyParameters({ ...previous, ...partialFilters }),
    })
  }
 
    // @ts-expect-error - This is a bug in the type definitions
  const resetFilters = () => navigate({ search: {} })

  return { filters, setFilters, resetFilters }
}
