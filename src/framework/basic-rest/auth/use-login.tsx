import { useUI } from '@contexts/ui.context';
import http from "@framework/utils/http";
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  return http.post(API_ENDPOINTS.LOGIN, input);
}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.data.token);
      authorize();
      closeModal();
    },
    onError: (error) => {
      console.log(error, "login error response");
    },
  });
};
