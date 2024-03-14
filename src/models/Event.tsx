import EventType from "./EventType";

interface Event {
    id?: string;
    title: string;
    quantity: number;
    start: string;
    end: string;
    type?: EventType;
}

export default Event;