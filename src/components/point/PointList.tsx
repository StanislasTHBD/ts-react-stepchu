import Point from '../../models/Point';

function PointList({
  points,
  onEdit,
  onDelete
}: {
  points: Point[];
  onEdit: (point: Point) => void;
  onDelete: (id: string) => void;
}) {
    const handleDeleteClick = (id: string) => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce point ?");
        if (confirmation) {
          onDelete(id);
        }
      };

  return (
    <div className={`grid ${points.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {points.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-center">Aucun point</p>
        </div>
      ) : (
        points.map((point) => (
          <div key={point.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold">{point.name}</p>
            <p className="text-sm text-gray-600">Points: {point.number}</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                onClick={() => onEdit(point)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                onClick={() => {
                    if (point.id !== undefined) {
                        handleDeleteClick(point.id as string);
                    } else {
                        console.error("id is undefined");
                    }
                    }}
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

export default PointList;
