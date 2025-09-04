import React, { useState } from 'react';
import StarIcon from '@components/icons/star-icon';
import ChevronUpIcon from '@components/icons/chevron-up-icon';
import ChevronDownIcon from '@components/icons/chevron-down-icon';
import { useUI } from '@contexts/ui.context';

type Purohit = {
    id: string;
    name: string;
    phone: string;
    location: {
        city: string;
        state: string;
        pincode: string;
    };
    experienceYears: number;
    skills: string[];
    rituals?: string[];
    bio?: string;
    customSkills?: Record<string, any>;
    languages?: string[];
    averageRating?: number;
    availability?: {
        date: string;
        timeSlots: string[];
    }[];
    ratings?: Array<{
        userId: string;
        rating: number;
        review?: string;
        date: Date;
    }>;
    isActive?: boolean;
    chargesCommission?: boolean;
    commissionType?: 'percentage' | 'flat';
    commissionValue?: number;
};

interface Props {
    purohit: Purohit;
    variant: 'grid' | 'list';
}

const PurohitCard: React.FC<Props> = ({ purohit, variant }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isAuthorized, openModal, setModalView } = useUI();

    const handleCardClick = () => {
        if (!isAuthorized) {
            setModalView("LOGIN_VIEW");
            openModal();
            return;
        }
        setIsExpanded(!isExpanded);
    };

    const {
        name,
        phone,
        location,
        experienceYears,
        skills,
        rituals,
        bio,
        customSkills,
        languages,
        averageRating,
        availability
    } = purohit;

    return (
        <div className={`border rounded-lg drop-shadow-md hover:shadow-sm duration-200 overflow-hidden ${variant === 'list' ? 'w-full' : 'w-full md:w-96'}`}>
            {/* Header - Always visible */}
            <div className="p-4 bg-white cursor-pointer" onClick={handleCardClick}>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-600 mt-1 mr-6">
                                    {location.city}, {location.state}
                                </p>
                                {averageRating && averageRating > 0 && <>
                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                    <span className="ml-1 text-sm text-gray-600">{averageRating}/5</span>
                                </>}
                            </div>
                        </div>
                        {bio && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{bio}</p>}
                    </div>
                    <button
                        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                        }}
                    >
                        {isExpanded ? (
                            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                    </button>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="p-4 bg-gray-50 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm"><strong>Phone:</strong> {phone}</p>
                            <p className="text-sm"><strong>Experience:</strong> {experienceYears} years</p>
                            {customSkills?.specialization && (
                                <p className="text-sm"><strong>Specialization:</strong> {customSkills.specialization}</p>
                            )}
                            <p className="text-sm"><strong>Languages:</strong> {languages?.length > 0 ? languages.join(', ') : 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-sm"><strong>Skills:</strong> {skills?.length > 0 ? skills.join(', ') : 'Not specified'}</p>
                            <p className="text-sm"><strong>Rituals:</strong> {rituals?.length > 0 ? rituals.join(', ') : 'Not specified'}</p>
                            {customSkills?.languagesFluent?.length > 0 && (
                                <p className="text-sm"><strong>Languages Fluent:</strong> {customSkills.languagesFluent.join(', ')}</p>
                            )}
                        </div>
                    </div>

                    {availability?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-medium text-sm mb-2">Availability:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {availability.map((slot, idx) => (
                                    <div key={idx} className="text-sm bg-white p-2 rounded">
                                        {new Date(slot.date).toLocaleDateString()}:
                                        <span className="text-gray-600"> {slot.timeSlots.join(', ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PurohitCard;