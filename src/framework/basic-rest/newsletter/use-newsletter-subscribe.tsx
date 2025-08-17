import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from '@tanstack/react-query';

export interface NewsletterInputType {
  email: string;
}

export interface NewsletterResponse {
  status: boolean;
  message: string;
  data?: any;
}

async function subscribeToNewsletter(input: NewsletterInputType): Promise<NewsletterResponse> {
  const response = await http.post(API_ENDPOINTS.NEWS_LETTER_SUBSCRIBE, input);
  return response.data;
}

export const useNewsletterSubscribeMutation = () => {
  return useMutation<NewsletterResponse, Error, NewsletterInputType>({
    mutationFn: subscribeToNewsletter,
    onSuccess: (data) => {
      return data;
    }
  });
};
