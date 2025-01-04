import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin), // isto je mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully crated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //sa reset brisemo input polja
      //resizeTo(), ovde nemamo pristup reset funkciji, ali na mestu gde mozivamo createCabin mozemo da definisemo onSuccess: () => reset()
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
