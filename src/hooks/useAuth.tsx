import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

interface AuthValues {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

interface UseAuthOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useAuth = (
  resource: "register" | "login",
  options?: UseAuthOptions
) => {
  const authUser = async (values: AuthValues) => {
    const res = await axios.post(`http://localhost:3001/${resource}`, values);
    return res.data;
  };

  return useMutation({
    mutationFn: authUser,
    onSuccess: (data) => {
      message.success("Thành công!");
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      message.error("Thất bại!");
      options?.onError?.(error);
    },
  });
};
