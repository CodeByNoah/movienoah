import { useQuery } from "@tanstack/react-query";
import { getUserWatchlistsApi } from "@/api/apiWatchlist";

export default function useUserWhatchlist(userId) {
  const { data: watchlists, error } = useQuery({
    queryFn: () => getUserWatchlistsApi(userId),
    queryKey: ["userWatchlist"],
    enabled: !!userId,
  });

  return { watchlists, error };
}
