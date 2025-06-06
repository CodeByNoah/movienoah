export const getImagePath = (backdrop_path) => {
  // if (data.belongs_to_collection && data.belongs_to_collection.poster_path) {
  //   return `https://image.tmdb.org/t/p/w300${data.belongs_to_collection.poster_path}`;
  // }
  if (!backdrop_path) {
    return "https://ykhxkcfzqggpcaciqnen.supabase.co/storage/v1/object/public/stuff//depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
  }
  return `https://image.tmdb.org/t/p/w300${backdrop_path || ""}`;
};
