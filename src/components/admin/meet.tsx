"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Clock, Users, Video } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  meetUrl: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  description: string;
}

const AdminMeetComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<Event>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: '',
    meetUrl: '',
    startTime: '20:00',
    endTime: '22:00',
    description: '',
    isActive: true
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('admin-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Default events
      const defaultEvents: Event[] = [
        {
          id: '1',
          name: 'Python Learning Session',
          meetUrl: 'https://meet.google.com/python-daily',
          startTime: '20:00',
          endTime: '22:00',
          isActive: true,
          description: 'Daily Python learning and coding session'
        },
        {
          id: '2',
          name: 'Java Learning Session',
          meetUrl: 'https://meet.google.com/java-daily',
          startTime: '20:00',
          endTime: '22:00',
          isActive: true,
          description: 'Daily Java learning and coding session'
        },
        {
          id: '3',
          name: 'Development Learning Session',
          meetUrl: 'https://meet.google.com/dev-daily',
          startTime: '20:00',
          endTime: '22:00',
          isActive: true,
          description: 'Daily development and project work session'
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem('admin-events', JSON.stringify(defaultEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('admin-events', JSON.stringify(events));
    }
  }, [events]);

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.meetUrl) {
      const event: Event = {
        id: Date.now().toString(),
        name: newEvent.name!,
        meetUrl: newEvent.meetUrl!,
        startTime: newEvent.startTime || '20:00',
        endTime: newEvent.endTime || '22:00',
        description: newEvent.description || '',
        isActive: newEvent.isActive ?? true
      };
      setEvents([...events, event]);
      setNewEvent({
        name: '',
        meetUrl: '',
        startTime: '20:00',
        endTime: '22:00',
        description: '',
        isActive: true
      });
      setShowAddForm(false);
    }
  };

  const handleEditEvent = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setEditingEvent(event);
      setIsEditing(id);
    }
  };

  const handleSaveEdit = () => {
    if (editingEvent.name && editingEvent.meetUrl) {
      setEvents(events.map(event => 
        event.id === isEditing ? { ...event, ...editingEvent } as Event : event
      ));
      setIsEditing(null);
      setEditingEvent({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditingEvent({});
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const toggleEventStatus = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, isActive: !event.isActive } : event
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-orange-900 dark:text-neutral-100 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Event Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-orange-200 dark:border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-orange-900 dark:text-neutral-100 mb-4">Add New Event</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-orange-700 dark:text-neutral-300 mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={newEvent.name || ''}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                className="w-full px-3 py-2 border border-orange-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                placeholder="Enter event name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 dark:text-neutral-300 mb-2">
                Meet URL
              </label>
              <input
                type="url"
                value={newEvent.meetUrl || ''}
                onChange={(e) => setNewEvent({ ...newEvent, meetUrl: e.target.value })}
                className="w-full px-3 py-2 border border-orange-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                placeholder="https://meet.google.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 dark:text-neutral-300 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={newEvent.startTime || '20:00'}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-orange-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 dark:text-neutral-300 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={newEvent.endTime || '22:00'}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-orange-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-orange-700 dark:text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full px-3 py-2 border border-orange-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                rows={3}
                placeholder="Enter event description"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddEvent}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Save size={16} />
              Save Event
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-neutral-800 rounded-lg border border-orange-200 dark:border-neutral-700 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-orange-900 dark:text-neutral-100">
                  {isEditing === event.id ? (
                    <input
                      type="text"
                      value={editingEvent.name || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                      className="px-2 py-1 border border-orange-200 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                    />
                  ) : (
                    event.name
                  )}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleEventStatus(event.id)}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    event.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {event.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-neutral-300">
                <Clock className="w-4 h-4" />
                <span>
                  {isEditing === event.id ? (
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={editingEvent.startTime || event.startTime}
                        onChange={(e) => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                        className="px-2 py-1 border border-orange-200 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={editingEvent.endTime || event.endTime}
                        onChange={(e) => setEditingEvent({ ...editingEvent, endTime: e.target.value })}
                        className="px-2 py-1 border border-orange-200 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                      />
                    </div>
                  ) : (
                    `${event.startTime} - ${event.endTime}`
                  )}
                </span>
              </div>

              <div className="text-sm text-orange-700 dark:text-neutral-300">
                {isEditing === event.id ? (
                  <textarea
                    value={editingEvent.description || event.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="w-full px-2 py-1 border border-orange-200 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                    rows={2}
                  />
                ) : (
                  event.description
                )}
              </div>

              <div className="text-sm text-orange-700 dark:text-neutral-300">
                <strong>Meet URL:</strong>
                {isEditing === event.id ? (
                  <input
                    type="url"
                    value={editingEvent.meetUrl || event.meetUrl}
                    onChange={(e) => setEditingEvent({ ...editingEvent, meetUrl: e.target.value })}
                    className="w-full mt-1 px-2 py-1 border border-orange-200 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-orange-900 dark:text-neutral-100"
                  />
                ) : (
                  <a
                    href={event.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate"
                  >
                    {event.meetUrl}
                  </a>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                {isEditing === event.id ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      <Save size={14} />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <p className="text-orange-700 dark:text-neutral-300">No events created yet.</p>
          <p className="text-sm text-orange-600 dark:text-neutral-400">Click "Add Event" to create your first event.</p>
        </div>
      )}
    </div>
  );
};

export default AdminMeetComponent;
