import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

export interface SignUpInputType {
  name: string;
  email: string;
  phone: string;
  provider: string;
  providerUserId: string;
  password: string;
  profilePicture: string;
  referralCode?: string;
}
async function signUp(input: SignUpInputType) {
  const payload = {
    ...input,
    email: input.email.toLowerCase(),
    provider: input.provider || 'native',
    providerUserId: input.providerUserId || '',
    profilePicture: input.profilePicture || '',
  };

  return http.post(API_ENDPOINTS.SIGNUP, payload);
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: async (input: SignUpInputType) => {
      const signupResponse = await signUp(input);
      return { signupResponse };
    },
    onSuccess: (data) => {
      Cookies.set("auth_token", data.signupResponse.data.token);
      authorize();
      closeModal();
    },
  });
};
