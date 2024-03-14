import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import Event from "../models/Event";
import EventType from "../models/EventType";

class EventService {
  async getAllEvents(): Promise<Event[]> {
    try {
      const eventsCollection = collection(firestore, "events1");
      const eventSnapshot = await getDocs(eventsCollection);

      return eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
    } catch (error) {
      console.error("Error loading events:", error);
      throw error;
    }
  }

  async getAllEventTypes(): Promise<EventType[]> {
    try {
      const typesCollection = collection(firestore, "eventTypes");
      const typesSnapshot = await getDocs(typesCollection);

      return typesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EventType[];
    } catch (error) {
      console.error("Error loading event types:", error);
      throw error;
    }
  }

  async createEvent(event: Event): Promise<string> {
    try {
      const eventsCollection = collection(firestore, "events1");
      const eventRef = await addDoc(eventsCollection, event);

      console.log("Event created with ID:", eventRef.id);
      window.alert("L'événement a été crée avec succès!");
      return eventRef.id;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  async updateEvent(event: Event): Promise<void> {
    try {
      if (!event.id) {
        throw new Error("Event ID is undefined.");
      }

      const eventRef = doc(firestore, "events1", event.id);
      const eventData = { ...event };

      await updateDoc(eventRef, eventData);
      console.log("Event updated with ID:", event.id);
      window.alert("L'événement a été modifié avec succès!");
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      const eventRef = doc(firestore, "events1", id);
      await deleteDoc(eventRef);
      console.log("Document written with ID:", id);
      window.alert("L'événement a été supprimé avec succès!");
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }
}

export default new EventService();
