import React, { useState } from 'react';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import { useUI } from '@contexts/ui.context';
import Router from 'next/router';

interface PromoCodeInputProps {
    onApplyPromoCode: (promoCode: string) => Promise<boolean>;
    onDownload: () => void;
    isApplying?: boolean;
    isApplied?: boolean;
    className?: string;
    onCloseModal?: () => void; // Optional callback to close modal/popup
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
    onApplyPromoCode,
    onDownload,
    isApplying = false,
    isApplied = false,
    className = '',
    onCloseModal,
}) => {
    const { isAuthorized } = useUI();
    const [promoCode, setPromoCode] = useState('');
    const [error, setError] = useState('');

    const handleApplyPromoCode = async () => {
        // Check authentication first - redirect to signin page
        if (!isAuthorized) {
            // Close modal/popup before redirecting
            if (onCloseModal) {
                onCloseModal();
            }
            // Redirect to signin page instead of opening modal
            Router.push('/signin');
            return;
        }

        // Only check for promo code if user is authenticated
        if (!promoCode.trim()) {
            setError('Please enter a promo code');
            return;
        }

        setError('');
        try {
            const success = await onApplyPromoCode(promoCode.trim());
            if (!success) {
                setError('Invalid promo code. Please try again.');
            } else {
                // Clear the promo code input on success
                setPromoCode('');
            }
        } catch (err: any) {
            // Better error handling with specific messages
            let errorMessage = 'Failed to apply promo code. Please try again.';

            if (err?.message) {
                errorMessage = err.message;
            }

            // If it's an authentication error, redirect to signin page
            if (err?.message?.includes('log in') || err?.message?.includes('authenticated')) {
                // Close modal/popup before redirecting
                if (onCloseModal) {
                    onCloseModal();
                }
                Router.push('/signin');
                return;
            }

            setError(errorMessage);
        }
    };

    const handleDownload = () => {
        onDownload();
        // Reset state after download
        setPromoCode('');
        setError('');

        // Close modal/popup after download starts since it opens in new tab
        if (onCloseModal) {
            // Add slight delay to ensure download starts before closing
            setTimeout(() => {
                onCloseModal();
            }, 500);
        }
    };

    if (isApplied) {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="flex items-center space-x-2 text-green-600">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-sm font-medium">Promo code applied successfully!</span>
                </div>
                <Button
                    variant="slim"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleDownload}
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                    </svg>
                    Download Now
                </Button>
            </div>
        );
    }

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="space-y-2">
                <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700">
                    Enter Promo Code to Download
                </label>
                <div className="flex space-x-2">
                    <Input
                        id="promo-code"
                        name="promo-code"
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                        disabled={isApplying}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleApplyPromoCode();
                            }
                        }}
                    />
                    <Button
                        variant="slim"
                        onClick={handleApplyPromoCode}
                        loading={isApplying}
                        disabled={isApplying || (isAuthorized && !promoCode.trim())}
                        className="px-6"
                    >
                        {!isAuthorized ? 'Login to Apply' : 'Apply'}
                    </Button>
                </div>
                {error && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{error}</span>
                    </p>
                )}
            </div>
            <div className="text-xs text-gray-500">
                {!isAuthorized ? (
                    <span className="flex items-center space-x-1">
                        <svg
                            className="w-4 h-4 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Please login to apply promo code and download this e-book.</span>
                    </span>
                ) : (
                    <span>This is a downloadable e-book. Apply a valid promo code to download.</span>
                )}
            </div>
        </div>
    );
};

export default PromoCodeInput;
