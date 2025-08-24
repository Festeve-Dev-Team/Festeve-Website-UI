import React, { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useTranslation } from 'next-i18next';
import { useEventsQuery } from '@framework/events/get-all-events';
import { processEventsForCalendar } from '@utils/event-helpers';
import Spinner from '@components/ui/loaders/spinner';

const CalendarModal: React.FC = () => {
    const { t } = useTranslation("common");

    // Fetch events with error handling
    const { data: events, isLoading, isError, error } = useEventsQuery({
        limit: 100 // Get up to 100 events
    });

    // Process events for calendar display
    const calendarEvents = useMemo(() => {
        if (!events) return [];

        try {
            return processEventsForCalendar(events);
        } catch (err) {
            console.error('Error processing events for calendar:', err);
            return [];
        }
    }, [events]);

    // Handle event click
    const handleEventClick = (info: any) => {
        const eventData = info.event.extendedProps?.originalEvent;
        if (eventData) {
            // Create a detailed event info popup
            const eventDetails = `
Event: ${info.event.title}
Description: ${eventData.description}
Date: ${new Date(eventData.date).toLocaleDateString()}
${eventData.purohitRequired ? '🕉️ Purohit Required' : ''}
${eventData.ritualNotes ? `\nRitual Notes: ${eventData.ritualNotes}` : ''}
${eventData.extraData?.theme ? `\nTheme: ${eventData.extraData.theme}` : ''}
${eventData.extraData?.dressCode ? `\nDress Code: ${eventData.extraData.dressCode}` : ''}
      `.trim();

            alert(eventDetails);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg overflow-hidden">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {t("text-calendar") || "Calendar"}
                </h2>
                <p className="text-gray-600">
                    {t("text-calendar-description") || "Upcoming events and reminders"}
                </p>

                {/* Loading Alert */}
                {isLoading && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center">
                        <div className="flex items-center">
                            <div className="relative w-4 h-4 mr-3">
                                <div className="w-4 h-4 rounded-full absolute border-2 border-solid border-blue-200"></div>
                                <div className="w-4 h-4 rounded-full animate-spin absolute border-2 border-solid border-blue-600 border-t-transparent"></div>
                            </div>
                            <span className="text-blue-700 text-sm">Loading events...</span>
                        </div>
                    </div>
                )}

                {/* Error Alert */}
                {isError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                        <span className="text-red-700 text-sm">
                            Failed to load events: {error?.message || 'Unknown error'}
                        </span>
                    </div>
                )}

            </div>

            <div className="calendar-container overflow-x-auto">
                <div className="min-w-[700px] border border-gray-200 rounded-lg p-4">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth'
                        }}
                        height="auto"
                        dayMaxEvents={3}
                        aspectRatio={1.35}
                        events={calendarEvents}
                        eventClick={handleEventClick}
                        eventDisplay="block"
                        dayMaxEventRows={3}
                        moreLinkClick="day"
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;
