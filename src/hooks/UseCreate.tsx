import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCreate(
  resource: string,
  enrich?: (values: any) => any
) {
  return useMutation({
    mutationFn: async (values: any) => {
      const enriched = enrich ? { ...values, ...enrich(values) } : values;
      return axios.post(`http://localhost:3001/${resource}`, enriched);
    },
  });
}
