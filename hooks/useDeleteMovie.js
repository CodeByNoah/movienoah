import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovieApi } from "@/api/apiWatchlist";

const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteMovie, isLoading: mutateDeleteLoading } = useMutation({
    mutationFn: ({ movieId, watchlistId }) =>
      deleteMovieApi({ movieId, watchlistId }),
    mutationKey: ["deletemovie"],
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlistData"]);
      queryClient.invalidateQueries(["getwatchlist"]);
    },
  });
  return { deleteMovie, mutateDeleteLoading };
};

export default useDeleteMovie;
