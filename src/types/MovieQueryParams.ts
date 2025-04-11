export default interface MovieQueryParams {
  count?: number;
  title?: string;
  page?: number;
  genre?: string;
  toString: () => string;
}
