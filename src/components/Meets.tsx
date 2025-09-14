"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Play, Square } from 'lucide-react';

interface Meeting {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'active' | 'ended';
  meetUrl?: string;
}

const Meets: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Load events from localStorage (created by admin)
  useEffect(() => {
    const loadEvents = () => {
      const adminEvents = localStorage.getItem('admin-events');
      if (adminEvents) {
        const events = JSON.parse(adminEvents);
        const activeEvents = events.filter((event: any) => event.isActive);
        
        const meetingsData: Meeting[] = activeEvents.map((event: any) => ({
          id: event.id,
          name: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
          status: 'scheduled' as const,
          meetUrl: event.meetUrl
        }));
        
        setMeetings(meetingsData);
      }
    };

    loadEvents();
    // Reload events every 30 seconds to get updates from admin
    const interval = setInterval(loadEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Check and update meeting statuses
  useEffect(() => {
    const checkMeetingStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

      setMeetings(prevMeetings => 
        prevMeetings.map(meeting => {
          const startTime = meeting.startTime;
          const endTime = meeting.endTime;

          if (currentTimeString >= startTime && currentTimeString < endTime) {
            if (meeting.status === 'scheduled') {
              // Start the meeting
              startMeeting(meeting.id);
              return { ...meeting, status: 'active' as const };
            }
            return meeting;
          } else if (currentTimeString >= endTime && meeting.status === 'active') {
            // End the meeting
            endMeeting(meeting.id);
            return { ...meeting, status: 'ended' as const };
          }
          return meeting;
        })
      );
    };

    checkMeetingStatus();
    const interval = setInterval(checkMeetingStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentTime]);

  const startMeeting = (meetingId: string) => {
    // Simply update the status to active - the meetUrl is already available from admin
    setMeetings(prevMeetings =>
      prevMeetings.map(meeting =>
        meeting.id === meetingId
          ? { ...meeting, status: 'active' as const }
          : meeting
      )
    );
  };

  const endMeeting = (meetingId: string) => {
    // Simply update the status to ended
    setMeetings(prevMeetings =>
      prevMeetings.map(meeting =>
        meeting.id === meetingId
          ? { ...meeting, status: 'ended' as const }
          : meeting
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'ended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock size={16} />;
      case 'active':
        return <Play size={16} />;
      case 'ended':
        return <Square size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-orange-900 dark:text-neutral-100 flex items-center gap-2">
            <Video className="w-6 h-6" />
            Daily Meetings
          </h2>
          <p className="text-orange-700 dark:text-neutral-300 mt-1">
            Automated Google Meet sessions for learning
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-orange-600 dark:text-neutral-400">Current Time</div>
          <div className="text-lg font-mono font-semibold text-orange-800 dark:text-neutral-200">
            {currentTime.toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white dark:bg-neutral-800 rounded-lg border border-orange-200 dark:border-neutral-700 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-orange-900 dark:text-neutral-100">
                  {meeting.name}
                </h3>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}
              >
                {getStatusIcon(meeting.status)}
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-neutral-300">
                <Calendar className="w-4 h-4" />
                <span>Today</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-neutral-300">
                <Clock className="w-4 h-4" />
                <span>{meeting.startTime} - {meeting.endTime}</span>
              </div>

              {meeting.status === 'active' && meeting.meetUrl && (
                <div className="pt-2">
                  <a
                    href={meeting.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    Join Meeting
                  </a>
                </div>
              )}

              {meeting.status === 'scheduled' && (
                <div className="pt-2">
                  <div className="text-xs text-orange-600 dark:text-orange-400">
                    Meeting will start automatically at {meeting.startTime}
                  </div>
                </div>
              )}

              {meeting.status === 'ended' && (
                <div className="pt-2">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Meeting ended at {meeting.endTime}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 dark:bg-neutral-800 rounded-lg p-4 border border-orange-200 dark:border-neutral-700">
        <h4 className="font-semibold text-orange-900 dark:text-neutral-100 mb-2">
          Meeting Schedule
        </h4>
        <p className="text-sm text-orange-700 dark:text-neutral-300">
          All meetings are automatically scheduled to start at 8:00 PM and end at 10:00 PM daily. 
          The system will create Google Meet links and manage the sessions automatically.
        </p>
      </div>
    </div>
  );
};

export default Meets;
