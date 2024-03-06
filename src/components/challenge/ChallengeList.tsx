import Challenge from '../../models/Challenge';

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function ChallengeList({
    challenges,
    onEdit,
    onDelete
  }: {
    challenges: Challenge[];
    onEdit: (challenge: Challenge) => void;
    onDelete: (id: string) => void;
  }) {
    const handleDeleteClick = (id: string) => {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce challenge ?");
      if (confirmation) {
        onDelete(id);
      }
    };

  return (
    <div className={`grid ${challenges.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
    {challenges.length === 0 ? (
    <div className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
    <p className="text-lg text-custom-secondary font-semibold text-center">Aucun challenge</p>
  </div>
    ) : (
        challenges.map((challenge) => (
            <div key={challenge.id} className="bg-custom-blue bg-opacity-80 text-custom-secondary shadow-md rounded-lg p-4">
                <p className="text-lg font-semibold">{challenge.name}</p>
                <p className="text-sm text-custom-secondary">Description: {challenge.description}</p>
                <p className="text-sm text-custom-secondary">Badge : {challenge.badge?.name}</p>
                <p className="text-sm text-custom-secondary">Début : {formatDate(challenge.startDate)}</p>
                <p className="text-sm text-custom-secondary">Fin : {formatDate(challenge.endDate)}</p>
                <div className="mt-2">
                    <button
                        className="bg-custom-orange text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                        onClick={() => onEdit(challenge)}
                    >
                        Modifier
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                        onClick={() => {
                        if (challenge.id !== undefined) {
                            handleDeleteClick(challenge.id as string);
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

export default ChallengeList;
