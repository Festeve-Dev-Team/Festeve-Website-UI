import { useMutation } from '@tanstack/react-query';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useAccountDetailsQuery } from '@framework/auth/use-account-details';
import { useUI } from '@contexts/ui.context';
import { showToast } from '@utils/toast';

export interface ApplyPromoInputType {
    promoCode: string;
    productId: string;
}

async function applyPromo(input: { promoCode: string; userId: string; productId: string }) {
    return http.post(API_ENDPOINTS.APPLY_PROMO, input);
}

export const useApplyPromoMutation = () => {
    const { data: userData, isLoading: isUserDataLoading } = useAccountDetailsQuery();
    const { isAuthorized } = useUI();

    return useMutation({
        mutationFn: async (input: ApplyPromoInputType) => {
            // Better authentication check
            if (!isAuthorized) {
                throw new Error('Please log in to apply promo code');
            }

            // Wait for user data if it's still loading
            if (isUserDataLoading) {
                throw new Error('Loading user data, please try again in a moment');
            }

            if (!userData?._id) {
                throw new Error('User data not available. Please try logging in again.');
            }

            return applyPromo({
                promoCode: input.promoCode,
                userId: userData._id,
                productId: input.productId,
            });
        },
        onSuccess: (data) => {
            // Follow the same pattern as login: data.data contains the response
            const message = data?.data?.message || 'Promo code applied successfully!';
            showToast(message, 'success');
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Failed to apply promo code. Please try again.';

            showToast(errorMessage, 'error');
        },
    });
};
