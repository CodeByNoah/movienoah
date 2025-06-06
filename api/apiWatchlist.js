import { supabase } from "@/_lib/supabaseClient";

export async function insertMovie(movieId, watchlistId) {
  console.log(watchlistId);

  const { data: currentData, error: currentDataError } = await supabase
    .from("watchlists")
    .select("movies")
    .eq("id", watchlistId)
    .single();
  if (currentDataError) {
    throw currentDataError;
  }

  const newMovieId = Number(movieId);
  console.log("Current Movies:", currentData.movies);

  let movies = Array.isArray(currentData.movies) ? currentData.movies : [];

  if (movies.includes(newMovieId)) {
    return alert("This movie already exists in our watchlist");
  }

  const finalData = [...movies, newMovieId];
  const { data, error } = await supabase
    .from("watchlists")
    .update({
      movies: finalData,
    })
    .eq("id", watchlistId)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMovieApi({ movieId, watchlistId }) {
  console.log(movieId);
  console.log(watchlistId);

  const { data: currentData, error: currentDataError } = await supabase
    .from("watchlists")
    .select("movies")
    .eq("id", watchlistId)
    .single();
  if (currentDataError) {
    throw currentDataError;
  }
  const newMovieId = Number(movieId);

  const finalData = currentData.movies.filter((movie) => movie !== newMovieId);
  const { data, error } = await supabase
    .from("watchlists")
    .update({
      movies: finalData,
    })
    .eq("id", watchlistId)
    .single();

  if (error) throw error;
  return data;
}

// export async function getMovies() {
//   const { data, error } = await supabase
//     .from("watchlists")
//     .select("movies")
//     .eq("id", 13)
//     .single();
//
//   if (error) throw error;
//
//   return data;
// }

export async function getInfo(watchlistId) {
  const { data: currentData, error: currentDataError } = await supabase
    .from("watchlists")
    .select("*")
    .eq("id", watchlistId)
    .single();
  if (currentDataError) {
    throw currentDataError;
  }
  return currentData;
}

export async function updateWatchlistapi(
  watchlistId,
  name,
  description,
  movies,
) {
  const { data, error } = await supabase
    .from("watchlists")
    .update({
      movies: movies,
      name: name,
      description: description,
    })
    .eq("id", watchlistId)
    .single();

  if (error) throw error;
  return data;
}

export async function createWatchlistapi({
  watchlistName,
  watchlistdescription,
  userId,
}) {
  const { data, error } = await supabase
    .from("watchlists")
    .insert([
      {
        name: watchlistName,
        description: watchlistdescription,
        movies: [],
        user_id: userId,
      },
    ])
    .select();
  if (error) {
    throw error;
  }
  return data[0];
}

export async function deleteWatchlistapi({ watchlistId }) {
  const { error, data } = await supabase
    .from("watchlists")
    .delete()
    .eq("id", watchlistId);
  if (error) throw error;
  console.log(data);

  return data;
}
