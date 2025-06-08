import { useMutation } from "@tanstack/react-query";
import { insertMovie } from "@/api/apiWatchlist";

const useAddToWatchlist = (movieId) => {
  const { mutate: addMovieToWatchlist, isLoading: mutateLoading } = useMutation(
    {
      mutationFn: ({ movieId, watchlistId }) =>
        insertMovie(movieId, watchlistId),
      mutationKey: ["addToWatchlist", movieId],
    },
  );

  return { addMovieToWatchlist, mutateLoading };
};

export default useAddToWatchlist;
