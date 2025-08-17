import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from '@tanstack/react-query';

export interface NewsletterConfirmInputType {
  token: string;
}

export interface NewsletterConfirmResponse {
  status: boolean;
  message: string;
  data?: any;
}

async function confirmNewsletter(input: NewsletterConfirmInputType): Promise<NewsletterConfirmResponse> {
  const response = await http.post(API_ENDPOINTS.NEWS_LETTER_CONFIRM, input);
  return response.data;
}

export const useNewsletterConfirmMutation = () => {
  return useMutation<NewsletterConfirmResponse, Error, NewsletterConfirmInputType>({
    mutationFn: confirmNewsletter,
    onSuccess: (data) => {
      return data;
    }
  });
};
