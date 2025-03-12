export const cleanEmptyParameters = <T extends Record<string, unknown>>(
    search: T
  ) => {
    const newSearch = { ...search }
    Object.keys(newSearch).forEach(key => {
      const value = newSearch[key]
      if (
        value === undefined ||
        value === '' ||
        (typeof value === 'number' && isNaN(value))
      )
        delete newSearch[key]
    })
  
    if (search['page'] == 1) delete newSearch['page']
    if(search['yearStart'] == 0) delete newSearch['yearStart']
    if(search['yearEnd'] == 0) delete newSearch['yearEnd']
    if(search['query'] === '') delete newSearch['query']
  
    return newSearch
  }