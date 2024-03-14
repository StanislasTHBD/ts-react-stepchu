import Event from "../../models/Event";

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function EventList({
  events,
  onEdit,
  onDelete
}: {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}) {
  const handleDeleteClick = (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette événement?");
    if (confirmation) {
      onDelete(id);
    }
  };

  return (
    <div className={`grid ${events.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {events.length === 0 ? (
        <div className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-custom-secondary">Aucun événement</p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold text-custom-secondary">{event.title}</p>
            <p className="text-lg font-semibold text-custom-secondary">{event.quantity}</p>
            {event.type && (
              <p className="text-lg text-custom-secondary">Type: {event.type?.name}</p>
            )}
            <p className="text-sm text-custom-secondary">Date de début: {formatDate(event.start)}</p>
            <p className="text-sm text-custom-secondary">Date de fin: {formatDate(event.end)}</p>
         
            <div className="mt-2">
              <button
                className="bg-custom-orange text-custom-secondary px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                onClick={() => onEdit(event)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-custom-secondary px-4 py-2 rounded hover:bg-red-700 mt-2"
                onClick={() => handleDeleteClick(event.id as string)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;
