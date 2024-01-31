import Badge from "../../models/Badge";
import BadgeColor from "../../models/BadgeColor";

function BadgeList({
  badges,
  onEdit,
  onDelete
}: {
  badges: Badge[];
  onEdit: (badge: Badge) => void;
  onDelete: (id: string) => void;
}) {
  const handleDeleteClick = (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce badge ?");
    if (confirmation) {
      onDelete(id);
    }
  };

  return (
    <div className={`grid ${badges.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {badges.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-center">Aucun badge</p>
        </div>
      ) : (
        badges.map((badge) => (
          <div key={badge.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold">{badge.name}</p>
            <p className="text-sm text-gray-600">Description: {badge.description}</p>
            <p className="text-lg text-gray-600">Badges:</p>
            <ul>
              {badge.badgeColors.map((color: BadgeColor, index: number) => (
                <li key={index}>
                  <strong>Type:</strong> {color.type}<br />
                  <strong>Points:</strong> {color.minPoints} - {color.maxPoints}<br />
                  {color.image && typeof color.image === 'string' ? (
                    <img src={color.image} alt={`Badge Color ${index + 1}`} className="w-16 h-16" />
                  ) : (
                    <p>Pas d'image disponible</p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                onClick={() => onEdit(badge)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                onClick={() => handleDeleteClick(badge.id as string)}
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

export default BadgeList;
