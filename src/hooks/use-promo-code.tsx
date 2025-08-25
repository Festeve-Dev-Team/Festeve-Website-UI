import { useState, useCallback } from 'react';
import { showToast } from '@utils/toast';
import { useApplyPromoMutation } from '@framework/promo/use-apply-promo';

interface UsePromoCodeOptions {
    productId: string;
    downloadUrl: string;
    onSuccess?: () => void; // Callback for successful promo application
}

interface PromoCodeState {
    isApplying: boolean;
    isApplied: boolean;
    appliedCode: string | null;
}

export const usePromoCode = ({ productId, downloadUrl, onSuccess }: UsePromoCodeOptions) => {
    const [state, setState] = useState<PromoCodeState>({
        isApplying: false,
        isApplied: false,
        appliedCode: null,
    });

    const { mutateAsync: applyPromoAPI, isPending } = useApplyPromoMutation();

    const applyPromoCode = useCallback(async (promoCode: string): Promise<boolean> => {
        setState(prev => ({ ...prev, isApplying: true }));

        try {
            // Call the real API endpoint
            await applyPromoAPI({
                promoCode,
                productId,
            });

            setState(prev => ({
                ...prev,
                isApplying: false,
                isApplied: true,
                appliedCode: promoCode,
            }));

            // Call success callback (e.g., to close modal)
            if (onSuccess) {
                onSuccess();
            }

            return true;
        } catch (error) {
            setState(prev => ({ ...prev, isApplying: false }));
            console.error('Error applying promo code:', error);
            return false;
        }
    }, [applyPromoAPI, productId]);

    const downloadFile = useCallback(() => {
        if (!state.isApplied || !downloadUrl) {
            showToast('Please apply a valid promo code first', 'error');
            return;
        }

        try {
            // Create a temporary link element and trigger download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = ''; // This will use the filename from the URL
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('Download started successfully!', 'success');

            // Reset the promo code state after download
            resetState();
        } catch (error) {
            console.error('Error downloading file:', error);
            showToast('Failed to download file. Please try again.', 'error');
        }
    }, [state.isApplied, downloadUrl]);

    const resetState = useCallback(() => {
        setState({
            isApplying: false,
            isApplied: false,
            appliedCode: null,
        });
    }, []);

    return {
        ...state,
        isApplying: state.isApplying || isPending, // Use either local state or API loading state
        applyPromoCode,
        downloadFile,
        resetState,
    };
};


