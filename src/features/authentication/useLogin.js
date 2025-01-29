import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // ovako manuelno postavimo sta zelimo u cash(ovo nam nije potrebno ovde, radi i b ez ovoga)
      navigate("/dashboard", { replace: true }); // with replace: true , we erase the place we were earlier
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided email or password are incorect");
    },
  });

  return { login, isLoading };
}
