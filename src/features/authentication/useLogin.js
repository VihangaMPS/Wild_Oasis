import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {login as loginAPI} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => loginAPI({email, password}),

        onSuccess: (user) => {
            queryClient.setQueriesData(['user'], user); // setting data in react query cache manually
            navigate('/dashboard', {replace: true});
        },
        onError: error => {
            console.log('Error', error);
            toast.error("Provided email or password are incorrect");
        }
    });

    return {login, isLoading};
}