import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import Button from '@components/ui/button';
import Select from '@components/ui/select';
import { CheckBox } from '@components/ui/checkbox';
import { useTranslation } from 'next-i18next';
import { useUI } from '@contexts/ui.context';
import Router from 'next/router';

interface LocationFormData {
    city: string;
    state: string;
    pincode: string;
}

interface PurohitRegistrationFormData {
    // Required fields
    name: string;
    phone: string;
    location: LocationFormData;
    experienceYears: number;
    skills: string[];

    // Optional fields
    bio?: string;
    rituals?: string[];
    languages?: string[];
}

const AVAILABLE_SKILLS = [
    'Daily Pooja',
    'Griha Pravesh (Housewarming)',
    'Satyanarayan Vrat',
    'Ganesh Pooja',
    'Marriage / Upanayanam',
    'Shraddha / Pitru Karma',
    'Homam / Havan',
    'Festival-specific Poojas',
    'Vedic Chanting',
    'Astrological Consultation',
    'Spiritual Counseling'
];

const AVAILABLE_RITUALS = [
    'Daily Pooja',
    'Griha Pravesh',
    'Satyanarayan Vrat',
    'Ganesh Pooja',
    'Marriage Ceremonies',
    'Upanayanam',
    'Shraddha Karma',
    'Pitru Karma',
    'Homam',
    'Havan',
    'Diwali Pooja',
    'Vinayaka Chaturthi',
    'Durga Puja',
    'Navratri Celebrations',
    'Kali Pooja',
    'Lakshmi Pooja'
];

const AVAILABLE_LANGUAGES = [
    'Hindi',
    'Telugu',
    'Tamil',
    'Kannada',
    'Sanskrit',
    'English',
    'Bengali',
    'Gujarati',
    'Marathi',
    'Malayalam',
    'Odia',
    'Punjabi'
];

const INDIAN_STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
];

interface Props {
    onSubmit?: (data: PurohitRegistrationFormData) => void;
    isLoading?: boolean;
}

const PurohitRegistrationForm: React.FC<Props> = ({ onSubmit, isLoading = false }) => {
    const { t } = useTranslation('common');
    const { isAuthorized, openModal, setModalView } = useUI();
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedRituals, setSelectedRituals] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<PurohitRegistrationFormData>({
        mode: 'onChange',
        defaultValues: {
            skills: [],
            rituals: [],
            languages: [],
            location: {
                city: '',
                state: '',
                pincode: ''
            }
        }
    });

    const handleSkillChange = (skill: string, checked: boolean) => {
        const updatedSkills = checked
            ? [...selectedSkills, skill]
            : selectedSkills.filter(s => s !== skill);

        setSelectedSkills(updatedSkills);
        setValue('skills', updatedSkills);
    };

    const handleRitualChange = (ritual: string, checked: boolean) => {
        const updatedRituals = checked
            ? [...selectedRituals, ritual]
            : selectedRituals.filter(r => r !== ritual);

        setSelectedRituals(updatedRituals);
        setValue('rituals', updatedRituals);
    };

    const handleLanguageChange = (language: string, checked: boolean) => {
        const updatedLanguages = checked
            ? [...selectedLanguages, language]
            : selectedLanguages.filter(l => l !== language);

        setSelectedLanguages(updatedLanguages);
        setValue('languages', updatedLanguages);
    };

    const onFormSubmit = (data: PurohitRegistrationFormData) => {
        // Check authentication before submitting
        if (!isAuthorized) {
            setModalView("LOGIN_VIEW");
            openModal();
            return;
        }

        const formData = {
            ...data,
            skills: selectedSkills.length > 0 ? selectedSkills : data.skills,
            rituals: selectedRituals.length > 0 ? selectedRituals : undefined,
            languages: selectedLanguages.length > 0 ? selectedLanguages : undefined,
            experienceYears: Number(data.experienceYears)
        };
        onSubmit?.(formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header Message */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Register as a Purohit</h2>
                <p className="text-gray-600 mb-2">
                    Register as a Purohit and connect directly with devotees — no charges, no commissions.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    This is our humble seva, a mark of respect to Sanatana Dharma and to the purohits who guide our celebrations.
                </p>
                {!isAuthorized && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800 text-sm">
                            <strong>Please log in</strong> to register as a Purohit. You'll be redirected to the login page when you submit the form.
                        </p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            labelKey="Full Name"
                            type="text"
                            variant="solid"
                            {...register('name', {
                                required: 'Full name is required',
                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })}
                            errorKey={errors.name?.message}
                        />

                        <Input
                            labelKey="Contact Number"
                            type="tel"
                            variant="solid"
                            {...register('phone', {
                                required: 'Contact number is required',
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: 'Please enter a valid 10-digit mobile number'
                                }
                            })}
                            errorKey={errors.phone?.message}
                        />
                    </div>
                </div>

                {/* Location Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            labelKey="City"
                            type="text"
                            variant="solid"
                            {...register('location.city', {
                                required: 'City is required'
                            })}
                            errorKey={errors.location?.city?.message}
                        />

                        <Select
                            labelKey="State"
                            variant="solid"
                            {...register('location.state', {
                                required: 'State is required'
                            })}
                            errorKey={errors.location?.state?.message}
                        >
                            <option value="">Select State</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </Select>

                        <Input
                            labelKey="Pincode"
                            type="text"
                            variant="solid"
                            {...register('location.pincode', {
                                required: 'Pincode is required',
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: 'Please enter a valid 6-digit pincode'
                                }
                            })}
                            errorKey={errors.location?.pincode?.message}
                        />
                    </div>
                </div>

                {/* Experience */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            labelKey="Years of Experience"
                            type="number"
                            variant="solid"
                            {...register('experienceYears', {
                                required: 'Experience is required',
                                min: { value: 0, message: 'Experience cannot be negative' },
                                max: { value: 70, message: 'Please enter a valid experience' }
                            })}
                            errorKey={errors.experienceYears?.message}
                        />
                    </div>
                </div>

                {/* Skills & Services */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Services Offered (Required)</h3>
                    {selectedSkills.length === 0 && (
                        <p className="text-red-500 text-sm mb-3">Please select at least one skill</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {AVAILABLE_SKILLS.map((skill) => (
                            <div key={skill} className="flex items-center">
                                <CheckBox
                                    labelKey={skill}
                                    checked={selectedSkills.includes(skill)}
                                    onChange={(e) => handleSkillChange(skill, e.target.checked)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rituals */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rituals & Ceremonies (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {AVAILABLE_RITUALS.map((ritual) => (
                            <div key={ritual} className="flex items-center">
                                <CheckBox
                                    labelKey={ritual}
                                    checked={selectedRituals.includes(ritual)}
                                    onChange={(e) => handleRitualChange(ritual, e.target.checked)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages Known (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {AVAILABLE_LANGUAGES.map((language) => (
                            <div key={language} className="flex items-center">
                                <CheckBox
                                    labelKey={language}
                                    checked={selectedLanguages.includes(language)}
                                    onChange={(e) => handleLanguageChange(language, e.target.checked)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bio */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About You (Optional)</h3>
                    <TextArea
                        {...register('bio')}
                        placeholder="Tell devotees about your spiritual journey, specializations, and approach to conducting rituals..."
                        rows={4}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                    <Button
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading || selectedSkills.length === 0}
                        className="px-8 py-3 text-lg"
                    >
                        Register as Purohit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PurohitRegistrationForm;
