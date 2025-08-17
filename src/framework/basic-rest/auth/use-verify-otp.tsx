import { useUI } from "@contexts/ui.context";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

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
    },
    onError: (error) => {
      console.log(error, "verifyOtp error response");
    },
  });
};
