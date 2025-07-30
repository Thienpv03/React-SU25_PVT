import { useQuery } from "@tanstack/react-query";

export const useList = (resource: string, queryParams?: Record<string, any>) => {
  const queryString = queryParams
    ? "?" +
      new URLSearchParams(
        Object.entries(queryParams).filter(([_, v]) => v !== "")
      ).toString()
    : "";

  const fetchData = async () => {
    const res = await fetch(`http://localhost:3001/${resource}${queryString}`);
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [resource, queryParams],
    queryFn: fetchData,
  });

  return { data, isLoading, error };
};
