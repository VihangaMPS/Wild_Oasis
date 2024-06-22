import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin(reset) {

    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin Successfully Edited!");

            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
            reset();
        },
        onError: error => toast.error(error.message)
    });

    return {isEditing, editCabin};
}