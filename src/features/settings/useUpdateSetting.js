import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () => {
      toast.error("Settings could not be updated");
    },
  });

  return { isUpdating, updateSetting };
}

export default useUpdateSetting;
