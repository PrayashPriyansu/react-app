import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";

function useUpdate() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCurrentUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: (user) => {
      toast.success("User account successfully edited");
      queryClient.setQueryData((["user"], user));
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      toast.error("User account could not be edited");
    },
  });

  return { isUpdating, updateCurrentUser };
}

export default useUpdate;
