import { useUI } from "@contexts/ui.context";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { showToast } from "@utils/toast";

export interface VerifyOtpInputType {
  identifier: string;
  code: string;
  signupData: {
    name: string;
    email: string;
    phone: string;
    provider: string;
    providerUserId: string;
    password: string;
    profilePicture: string;
    referralCode?: string;
  };
}

async function verifyOtp(input: VerifyOtpInputType) {
  return http.post(API_ENDPOINTS.VERIFY_OTP, input);
}
export const useVerifyOtpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: async (input: VerifyOtpInputType) => {
      // Send verify otp request
      const verifyOtpResponse = await verifyOtp(input);

      return {
        verifyOtpResponse
      };
    },
    onSuccess: (data) => {
      // Assuming the token is in data.verifyOtpResponse.data.token
      Cookies.set("auth_token", data.verifyOtpResponse.data.token);
      authorize();
      closeModal();

      // Show success toast message
      const successMessage = data?.verifyOtpResponse?.data?.message || 'Registration completed successfully!';
      showToast(successMessage, 'success');
    },
    onError: (error: any) => {
      console.log(error, "verifyOtp error response");

      // Show error toast with proper nested error handling
      const errorMessage =
        error?.response?.data?.message?.message || // Handle nested error structure
        error?.response?.data?.message ||
        error?.message ||
        'OTP verification failed. Please try again.';

      showToast(errorMessage, 'error');
    },
  });
};
