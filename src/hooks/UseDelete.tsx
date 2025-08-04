import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

export function useDelete(resource: string, key?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3001/${resource}/${id}`);
    },
    onSuccess: () => {
      message.success("Xoá thành công");
      queryClient.invalidateQueries({ queryKey: [key || resource] });
    },
    onError: () => {
      message.error("Xoá thất bại");
    },
  });

  return mutation;
}
