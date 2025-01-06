import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => {
      toast.error("Cabin could not be edited");
    },
  });

  return { isEditing, editCabin };
}

export default useCreateCabin;
