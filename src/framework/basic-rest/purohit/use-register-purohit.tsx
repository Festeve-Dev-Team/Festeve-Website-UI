import { useMutation } from '@tanstack/react-query';
import http from "@framework/utils/http";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { showToast } from '@utils/toast';

interface LocationDto {
    city: string;
    state: string;
    pincode: string;
}

interface AvailabilityDto {
    date: Date;
    timeSlots: string[];
}

export interface PurohitRegistrationInput {
    // Required fields
    name: string;
    phone: string;
    location: LocationDto;
    experienceYears: number;
    skills: string[];

    // Optional fields
    availability?: AvailabilityDto[];
    bio?: string;
    customSkills?: Record<string, any>;
    rituals?: string[];
    languages?: string[];
    chargesCommission?: boolean;
    commissionType?: 'percentage' | 'flat';
    commissionValue?: number;
    isActive?: boolean;
}

async function registerPurohit(input: PurohitRegistrationInput) {
    // Use axios directly with full URL to bypass the base URL
    const { data } = await http.post(API_ENDPOINTS.PUROHITS, input);
    return data;
}

export const usePurohitRegistrationMutation = () => {
    return useMutation({
        mutationFn: registerPurohit,
        onSuccess: () => {
            showToast('Registration submitted successfully! We will contact you soon.', 'success');
        },
        onError: (error: any) => {
            console.error('Purohit registration error:', error);

            // Handle specific error cases
            if (error?.response?.status === 401) {
                showToast('Please log in to register as a Purohit.', 'error');
                return;
            }

            // Handle nested error message structure
            const message =
                error?.response?.data?.message?.message ||
                error?.response?.data?.message ||
                error?.message ||
                'Registration failed. Please try again.';

            showToast(typeof message === 'string' ? message : 'Registration failed. Please try again.', 'error');
        }
    });
};
