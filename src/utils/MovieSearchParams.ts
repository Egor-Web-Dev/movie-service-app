import MovieQueryParams from "../types/MovieQueryParams";

class MovieSearchParams implements MovieQueryParams {
  readonly count?: number;
  readonly title?: string;
  readonly page?: number;
  readonly genre?: string;

  constructor({ count, title, page, genre }: MovieQueryParams) {
    this.count = count;
    this.title = title;
    this.page = page;
    this.genre = genre;
  }

  toString(): string {
    const searchParams = new URLSearchParams();

    Object.entries(this).forEach(([key, value]) => {
      if (typeof value !== "undefined") searchParams.set(key, value);
    });

    return searchParams.toString();
  }
}

export default MovieSearchParams;
