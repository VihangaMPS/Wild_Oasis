import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinAPI} from "../../services/apiCabins.js";
import toast from "react-hot-toast";


export function useDeleteCabin() {

    const queryClient = useQueryClient(); // using queryClientHook, we can invalidate data(re-fetching data) to refresh page

    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({ // when we want to delete
        mutationFn: (id) => deleteCabinAPI(id),
        onSuccess: () => { //after deleting a data row, with this function automatically reload
            toast.success('Cabin successfully deleted!');

            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isDeleting, deleteCabin};
}
