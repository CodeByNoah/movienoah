import { supabase } from "@/_lib/supabaseClient";

export async function createUserProfileapi({
  name,
  profile_picture = "https://media.istockphoto.com/id/1495088043/nl/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=2048x2048&w=is&k=20&c=oBcs66ou2cB5_lCvXPegpL8DDzgNUp3EhWTvBGOX5xI=",
  userId,
}) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        name: name,
        id: userId,
        profile_picture: profile_picture,
      },
    ])
    .select();
  if (error) {
    throw error;
  }
  return data[0];
}

export async function getUserName(userId) {
  const { data: name, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId);
  if (error) {
    console.error("Error fetching watchlists...", error);
  } else {
    console.log("this is name ", name);

    return name[0].name;
  }
}
