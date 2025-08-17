import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from '@tanstack/react-query';

export interface CreateCartInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCartResponse {
  success: boolean;
  message: string;
  data?: {
    cart: Cart;
  };
}

async function createCart(input: CreateCartInput): Promise<CreateCartResponse> {
  const response = await http.post(API_ENDPOINTS.CREATE_CART, input);
  return response.data;
}

export const useCreateCartMutation = () => {
  return useMutation<CreateCartResponse, Error, CreateCartInput>({
    mutationFn: createCart,
    onSuccess: (data) => {
      if (!data.success) {
        throw new Error(data.message || 'Failed to create cart');
      }
      return data;
    }
  });
};
