import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  //data: cabins sadrzi podatke koje je funkcija getCabins vratila
  //kad kod se desi invalidate(odnosno kada state postane stale) ova komponenta re-fetchuje cabins sa supabase-a
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { isLoading, bookings, error };
}
