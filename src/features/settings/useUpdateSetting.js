import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting as updateSettingAPI} from "../../services/apiSettings.js";

export function useUpdateSetting() {

    const queryClient = useQueryClient();

    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: updateSettingAPI,
        onSuccess: () => {
            toast.success("Setting Successfully Edited!");

            queryClient.invalidateQueries({
                queryKey: ["settings"]
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isUpdating, updateSetting};
}