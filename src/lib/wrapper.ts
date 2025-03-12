async function wrapperFetchJsonResponse<T>(
  response: Response,
): Promise<{ status: number; data?: T | null }> {
  const status = response.status
  return {
    status,
    data: [
      400,
      401,
      403,
      404,
      500,
      501,
      502,
      503,
  
    ].includes(status)
      ? null
      : await response.json() as T,
  };
}

export default wrapperFetchJsonResponse;
