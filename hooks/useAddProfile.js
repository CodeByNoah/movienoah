import { useMutation } from "@tanstack/react-query";
import { createUserProfileapi } from "@/api/apiUser";

const useAddProfile = () => {
  const { mutate: addToProfiles, isLoading: mutateLoading } = useMutation({
    mutationFn: ({ userId, name, profile_picture }) =>
      createUserProfileapi({ userId, name, profile_picture }),
    mutationKey: ["addToProfile"],
  });

  return { addToProfiles, mutateLoading };
};

export default useAddProfile;
