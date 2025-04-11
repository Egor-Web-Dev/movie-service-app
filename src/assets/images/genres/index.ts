import war from "./war.webp";
import drama from "./drama.webp";
import crime from "./crime.webp";
import scifi from "./scifi.webp";
import music from "./music.webp";
import comedy from "./comedy.webp";
import horror from "./horror.webp";
import action from "./action.webp";
import family from "./family.webp";
import history from "./history.webp";
import mystery from "./mystery.webp";
import western from "./western.webp";
import romance from "./romance.webp";
import fantasy from "./fantasy.webp";
import tvMovie from "./tv-movie.webp";
import standUp from "./stand-up.webp";
import thriller from "./thriller.webp";
import animation from "./animation.webp";
import adventure from "./adventure.webp";
import documentary from "./documentary.webp";
import missingPoster from "../missing-poster.webp";

type Genres = {
  [key: string]: string;
};

const genres: Genres = {
  horror,
  history,
  action,
  drama,
  fantasy,
  romance,
  music,
  thriller,
  western,
  war,
  mystery,
  scifi,
  comedy,
  documentary,
  family,
  animation,
  adventure,
  crime,
  "tv-movie": tvMovie,
  "stand-up": standUp,
};

const getGenreImage = (genre: string) => genres[genre] || missingPoster;
export default getGenreImage;
