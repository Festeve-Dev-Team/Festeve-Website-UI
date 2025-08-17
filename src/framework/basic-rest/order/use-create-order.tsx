import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "@tanstack/react-query";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CreateOrderInput {
  shippingAddress: ShippingAddress;
  paymentProvider: string;
  paymentMethod: string;
  items: OrderItem[];
  notes?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data?: {
    order: Order;
  };
}

async function createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
  const { data } = await http.post(API_ENDPOINTS.CREATE_ORDERS, input);
  return data;
}

export const useCreateOrderMutation = () => {
  return useMutation<CreateOrderResponse, Error, CreateOrderInput>({
    mutationFn: createOrder,
    onSuccess: (data) => {
      return data;
    },
  });
};