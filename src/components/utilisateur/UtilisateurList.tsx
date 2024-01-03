import Utilisateur from '../../models/Utilisateur';

function UtilisateurList({
  utilisateurs,
  onEdit,
  onDelete
}: {
  utilisateurs: Utilisateur[];
  onEdit: (utilisateur: Utilisateur) => void;
  onDelete: (id: string) => void;
}) {
  const handleDeleteClick = (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette utilisateur ?");
    if (confirmation) {
      onDelete(id);
    }
  };

  return (
    <div className={`grid ${utilisateurs.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {utilisateurs.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-center">Aucun utilisateur</p>
        </div>
      ) : (
        utilisateurs.map((utilisateur) => (
          <div key={utilisateur.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold">{utilisateur.name}</p>
            {utilisateur.securityQuestion && (
              <p className="text-sm text-gray-600">Question de sécurité : {utilisateur.securityQuestion}</p>
            )}
            {utilisateur.securityAnswer && (
              <p className="text-sm text-gray-600">Réponse à la question de sécurité : {utilisateur.securityAnswer}</p>
            )}
            {utilisateur.phoneId && (
              <p className="text-sm text-gray-600">Identifiant du téléphone : {utilisateur.phoneId}</p>
            )}
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                onClick={() => onEdit(utilisateur)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                onClick={() => {
                  if (utilisateur.id !== undefined) {
                    handleDeleteClick(utilisateur.id as string);
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

export default UtilisateurList;