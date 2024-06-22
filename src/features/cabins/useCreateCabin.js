import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";


export function useCreateCabin(reset) {

    const queryClient = useQueryClient();
    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New Cabin Successfully Created!");

            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
            reset();
        },
        onError: error => toast.error(error.message)
    });

    return {isCreating, createCabin};
}
