import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => {
      toast.error("Cabin could not be created");
    },
  });

  return { isCreating, createCabin };
}

export default useCreateCabin;
