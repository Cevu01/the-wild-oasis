import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  //data: cabins sadrzi podatke koje je funkcija getCabins vratila
  //kad kod se desi invalidate(odnosno kada state postane stale) ova komponenta re-fetchuje cabins sa supabase-a
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}
