import { useState, useEffect } from 'react';
import Event from '../../models/Event';
import EventType from '../../models/EventType';
import EventService from '../../services/EventService';
import EventList from './EventList';
import EventForm from './EventForm';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEvents();
    fetchEventTypes();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await EventService.getAllEvents();
      if (eventsData !== undefined) {
        setEvents(eventsData as Event[]);
      } else {
        console.log("eventsData is empty");
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const typesData = await EventService.getAllEventTypes();
      if (typesData !== undefined) {
        setEventTypes(typesData as EventType[]);
      } else {
        console.log("typesData is empty");
      }
    } catch (error) {
      console.error("Error loading event types:", error);
    }
  };

  const handleCreateOrUpdate = async () => {
    await fetchEvents();
    await fetchEventTypes();
  };

  const openModal = (event: Event | null) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await EventService.deleteEvent(id);
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste des Événements</h1>
      <button
        className="bg-custom-blue text-custom-secondary px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => openModal(null)}
      >
        Créer Événement
      </button>
      <EventList events={events} onEdit={openModal} onDelete={handleDelete} />
      <EventForm
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          handleCreateOrUpdate();
        }}
        initialData={selectedEvent}
        types={eventTypes}
      />
    </div>
  );
}

export default EventPage;
