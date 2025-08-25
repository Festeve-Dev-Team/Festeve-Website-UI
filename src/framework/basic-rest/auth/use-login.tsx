import { useUI } from '@contexts/ui.context';
import http from "@framework/utils/http";
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { showToast } from '@utils/toast';

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

      // Show success toast message
      const successMessage = data?.data?.message || 'Login successful!';
      showToast(successMessage, 'success');
    },
    onError: (error: any) => {
      console.log(error, "login error response");

      // Show error toast with proper nested error handling
      const errorMessage =
        error?.response?.data?.message?.message || // Handle nested error structure
        error?.response?.data?.message ||
        error?.message ||
        'Login failed. Please check your credentials.';

      showToast(errorMessage, 'error');
    },
  });
};
