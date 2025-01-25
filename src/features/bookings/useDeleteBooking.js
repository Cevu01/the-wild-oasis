import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  //Da bi namestili invalidate nakon brisanja, odnosno da se opet fethcuje data treba nam queryClient
  const queryClient = useQueryClient();
  //useMutation je hook koji sluzi za kreiranje, azuriranje, birsanje podataka na serveru
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      //cash je zastareo, ponovo fetchuj
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
