import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  //Da bi namestili invalidate nakon brisanja, odnosno da se opet fethcuje data treba nam queryClient
  const queryClient = useQueryClient();
  //useMutation je hook koji sluzi za kreiranje, azuriranje, birsanje podataka na serveru
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      //cash je zastareo, ponovo fetchuj
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
