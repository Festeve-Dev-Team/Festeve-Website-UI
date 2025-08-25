import Input from '@components/ui/input';
import Select from '@components/ui/select';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { fadeInTop } from '@utils/motion/fade-in-top';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { PencilIcon } from '@components/icons/pencil-icon';
import cn from 'classnames';

interface SpecialDayReminder {
    specialDay: string;
    specialPersonName: string;
    dateDay: string;
    dateMonth: string;
    dateYear: string;
    relation: string;
    reminderTime: string;
    categories: string[];
}

const SPECIAL_DAYS = [
    'Birthday',
    'Wedding Anniversary',
    'House Warming',
    'Baby Shower',
    'Engagement',
    'Graduation',
    'Job Promotion'
];

const RELATIONS = [
    'Parent',
    'Sibling',
    'Spouse',
    'Child',
    'Friend',
    'Relative',
    'Colleague'
];

const REMINDER_TIMES = [
    '1 day before',
    '2 days before',
    '5 days before',
    'A week before'
];

const CATEGORIES = [
    'Food',
    'Clothing',
    'Gift',
    'Essentials',
    'Combos & Hampers'
];

const mockReminderData: SpecialDayReminder = {
    specialDay: 'Birthday',
    specialPersonName: 'Jane Doe',
    dateDay: '15',
    dateMonth: '08',
    dateYear: '1990',
    relation: 'Friend',
    reminderTime: '1 day before',
    categories: ['Gift', 'Food']
};

const SpecialDayReminder: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<SpecialDayReminder>({
        defaultValues: mockReminderData,
    });

    const watchFields = watch();

    const isFormValid =
        watchFields.specialDay &&
        watchFields.specialPersonName &&
        watchFields.dateDay &&
        watchFields.dateMonth &&
        watchFields.dateYear &&
        watchFields.relation &&
        watchFields.reminderTime &&
        (watchFields.categories?.length ?? 0) > 0;


    function onSubmit(input: SpecialDayReminder) {
        // updateUser(input);
        console.log({ input });
        setIsEditing(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    return <></>
    return (
        <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            //@ts-ignore
            variants={fadeInTop(0.35)}
            className={`w-full flex flex-col mt-4`}
        >
            <div className="flex justify-between items-center mb-6 xl:mb-8">
                <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading">
                    {t('common:text-special-day-reminder')}
                </h2>
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="flex items-center text-sm font-semibold text-heading transition-colors duration-200 focus:outline-none hover:text-accent-hover"
                    >
                        <PencilIcon />&nbsp;{t('common:button-edit')}
                    </button>
                )}
            </div>

            {!isEditing ? (
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
                        <div className="w-full sm:w-1/2">
                            <span className="text-sm text-heading font-semibold block mb-2">
                                {t('forms:label-special-day')}
                            </span>
                            <span className="text-sm text-body">{mockReminderData.specialDay}</span>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <span className="text-sm text-heading font-semibold block mb-2">
                                {t('forms:label-special-person')}
                            </span>
                            <span className="text-sm text-body">{mockReminderData.specialPersonName}</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
                        <div className="w-full sm:w-1/2">
                            <span className="text-sm text-heading font-semibold block mb-2">
                                {t('forms:label-date')}
                            </span>
                            <span className="text-sm text-body">
                                {mockReminderData.dateDay}/{mockReminderData.dateMonth}/{mockReminderData.dateYear}
                            </span>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <span className="text-sm text-heading font-semibold block mb-2">
                                {t('forms:label-relation')}
                            </span>
                            <span className="text-sm text-body">{mockReminderData.relation}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
                        <div className="w-full sm:w-1/2">
                            <span className="text-sm text-heading font-semibold block mb-2">
                                {t('forms:label-categories')}
                            </span>
                            <span className="text-sm text-body">{mockReminderData.categories.join(', ')}</span>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <span className="text-sm text-heading font-semibold block mb-2">
                                {t('forms:label-reminder-time')}
                            </span>
                            <span className="text-sm text-body">{mockReminderData.reminderTime}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center"
                    noValidate
                >
                    <div className="flex flex-col space-y-4">
                        {/* Special Day Dropdown */}
                        <Select
                            labelKey="Special Day"
                            inputClassName="p-4"
                            {...register('specialDay', { required: 'Please select a special day' })}
                            variant="solid"
                            errorKey={errors.specialDay?.message}
                        >
                            <option value="">Select a special day</option>
                            {SPECIAL_DAYS.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </Select>

                        {/* Special Person Name */}
                        <Input
                            labelKey="Name of your special person"
                            type="text"
                            variant="solid"
                            {...register('specialPersonName', {
                                required: 'Please enter the name',
                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })}
                            errorKey={errors.specialPersonName?.message}
                        />

                        {/* Date Input */}
                        <div className="flex flex-col">
                            <label className="text-sm md:text-base font-semibold text-heading mb-2">Date of the day</label>
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    placeholder="DD"
                                    variant="solid"
                                    className="w-20"
                                    maxLength={2}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    {...register('dateDay', {
                                        required: 'Required',
                                        pattern: { value: /^(0[1-9]|[12]\d|3[01])$/, message: 'Invalid day' }
                                    })}
                                    errorKey={errors.dateDay?.message}
                                />
                                <Input
                                    type="text"
                                    placeholder="MM"
                                    variant="solid"
                                    className="w-20"
                                    maxLength={2}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    {...register('dateMonth', {
                                        required: 'Required',
                                        pattern: { value: /^(0[1-9]|1[0-2])$/, message: 'Invalid month' }
                                    })}
                                    errorKey={errors.dateMonth?.message}
                                />
                                <Input
                                    type="text"
                                    placeholder="YYYY"
                                    variant="solid"
                                    className="w-28"
                                    maxLength={4}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    {...register('dateYear', {
                                        required: 'Required',
                                        pattern: { value: /^\d{4}$/, message: 'Invalid year' }
                                    })}
                                    errorKey={errors.dateYear?.message}
                                />
                            </div>
                        </div>

                        {/* Relation Dropdown */}
                        <Select
                            labelKey="Relation"
                            inputClassName="p-4"
                            {...register('relation', { required: 'Please select a relation' })}
                            variant="solid"
                            errorKey={errors.relation?.message}
                        >
                            <option value="">Select relation</option>
                            {RELATIONS.map(relation => (
                                <option key={relation} value={relation}>{relation}</option>
                            ))}
                        </Select>

                        {/* Reminder Time Dropdown */}
                        <Select
                            labelKey="When can we remind you?"
                            inputClassName="p-4"
                            {...register('reminderTime', { required: 'Please select when to remind you' })}
                            variant="solid"
                            errorKey={errors.reminderTime?.message}
                        >
                            <option value="">Select reminder time</option>
                            {REMINDER_TIMES.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </Select>

                        {/* Category Preferences */}
                        <div className="flex flex-col">
                            <label className="text-sm md:text-base font-semibold text-heading mb-2">Category preferences</label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(category => (
                                    <label key={category} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value={category}
                                            className="hidden"
                                            {...register('categories', { required: 'Please select at least one category' })}
                                        />
                                        <span className={cn(
                                            'px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-colors',
                                            {
                                                'bg-heading text-white': watchFields.categories?.includes(category),
                                                'bg-white text-body hover:bg-gray-100': !watchFields.categories?.includes(category)
                                            }
                                        )}>
                                            {category}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.categories && (
                                <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
                            )}
                        </div>
                        <div className="relative flex gap-x-3">
                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                className="h-12 mt-3 w-full sm:w-32"
                            >
                                {t('common:button-save')}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </motion.div>
    );
};

export default SpecialDayReminder;