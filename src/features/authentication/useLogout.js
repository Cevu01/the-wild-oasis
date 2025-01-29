import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // obrisemo cash iz svih querija!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      navigate("/login", { replace: true }); // with replace: true , we erase the place we were earlier
    },
    onError: (err) => {
      console.log(err);
      toast.error("User can not be loged out");
    },
  });

  return { logout, isLoading };
}
