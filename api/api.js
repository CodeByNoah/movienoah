const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("something went wrong on fetching popular movies.");
  }
  const data = await response.json();

  return data.results.slice(0, 10);
};

export const fetchMoviesDetails = async (movieID) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`,
  );

  const data = await response.json();
  return data;
};

export const fetchDirectorAndCasts = async (movieID, type) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("something went wrong on fetching crew.");
  }

  const data = await response.json();
  let casts = [];
  if (type === "director") {
    const director = data.crew.find((member) => member.job === "Director");

    return director.name;
  } else {
    data.cast.map((member, index) => {
      if (index < 4) {
        casts.push(member);
      }
    });
    return casts;
  }
};

export const fetchMovieByName = async (moovieName) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${moovieName}`,
  );
  if (!response.ok) {
    throw new Error("something went wrong on fetching search movie.");
  }

  const data = await response.json();
  return data.results;
};
