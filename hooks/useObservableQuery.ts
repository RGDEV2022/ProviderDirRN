import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useObserveQuery<TData = unknown>(queryKey: string[]) {
  const options: UseQueryOptions<TData> = {
    queryKey: queryKey,
    enabled: false,
  };
  return useQuery<TData>(options);
}
