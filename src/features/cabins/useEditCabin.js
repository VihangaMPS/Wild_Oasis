import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin(reset,onCloseModal) {

    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin Successfully Edited!");

            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
            reset();
            onCloseModal?.();
        },
        onError: error => toast.error(error.message)
    });

    return {isEditing, editCabin};
}