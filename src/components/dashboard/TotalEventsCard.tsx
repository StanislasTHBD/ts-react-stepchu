import React, { useEffect, useState } from "react";
import Event from "../../models/Event";
import EventService from "../../services/EventService";

const TotalEventsCard: React.FC = () => {
  const [totalEvents, setTotalEvents] = useState<number>(0);

  useEffect(() => {
    const fetchTotalEvents = async () => {
      try {
        const events: Event[] = await EventService.getAllEvents();
        setTotalEvents(events.length);
      } catch (error) {
        console.error("Error fetching total events:", error);
      }
    };

    fetchTotalEvents();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 min-w-min">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        <p className="text-2xl">Evenements</p>
        <p className="text-3xl m-4 text-left md:text-right">
          {totalEvents}
        </p>
      </div>
    </div>
  );
};

export default TotalEventsCard;
