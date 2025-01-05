import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings, // getSettings mora da vraca promise, odnoson da bude asyns funkcija
  });
  return { isLoading, error, settings };
}
