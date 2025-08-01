// hooks/useUpdate.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

export function useUpdate(resource: string, extraFieldsFn?: (values: any) => any) {
  return useMutation({
    mutationFn: async ({ id, values }: { id: number | string; values: any }) => {
      const extra = extraFieldsFn ? extraFieldsFn(values) : {};
      return axios.put(`http://localhost:3001/${resource}/${id}`, {
        ...values,
        ...extra,
      });
    },
    onSuccess: () => message.success("Cập nhật thành công!"),
    onError: () => message.error("Cập nhật thất bại!"),
  });
}
