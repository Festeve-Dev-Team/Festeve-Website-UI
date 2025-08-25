import { useState, useCallback } from 'react';
import { showToast } from '@utils/toast';

interface UsePromoCodeOptions {
    productId: string;
    downloadUrl: string;
}

interface PromoCodeState {
    isApplying: boolean;
    isApplied: boolean;
    appliedCode: string | null;
}

export const usePromoCode = ({ productId, downloadUrl }: UsePromoCodeOptions) => {
    const [state, setState] = useState<PromoCodeState>({
        isApplying: false,
        isApplied: false,
        appliedCode: null,
    });

    const applyPromoCode = useCallback(async (promoCode: string): Promise<boolean> => {
        setState(prev => ({ ...prev, isApplying: true }));

        try {
            // TODO: Replace with actual API call when provided
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation - replace with actual API logic
            const isValid = promoCode.length >= 3; // Simple validation for demo

            if (isValid) {
                setState(prev => ({
                    ...prev,
                    isApplying: false,
                    isApplied: true,
                    appliedCode: promoCode,
                }));
                showToast('Promo code applied successfully!', 'success');
                return true;
            } else {
                setState(prev => ({ ...prev, isApplying: false }));
                return false;
            }
        } catch (error) {
            setState(prev => ({ ...prev, isApplying: false }));
            console.error('Error applying promo code:', error);
            return false;
        }
    }, []);

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
        applyPromoCode,
        downloadFile,
        resetState,
    };
};

// TODO: Replace this with actual API call when provided
export const applyPromoCodeAPI = async (productId: string, promoCode: string) => {
    // This is a placeholder for the actual API call
    // Replace with the actual API endpoint when provided
    const response = await fetch('/api/apply-promo-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            promoCode,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to apply promo code');
    }

    return response.json();
};
