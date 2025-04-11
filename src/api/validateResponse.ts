async function validateResponse(response: Response): Promise<Response> {
  if (!response.ok) throw new Error(await response.text());
  return response;
}

export default validateResponse;
