import Utilisateur from '../../models/Utilisateur';
import UtilisateurService from '../../services/UtilisateurService';

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

  const handleResetFieldsClick = (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir réinitialiser les champs pour cet utilisateur ?");
    if (confirmation) {
      try {
        UtilisateurService.resetUtilisateurFields(id);
        console.log("Champs réinitialisés pour l'utilisateur avec l'ID:", id);
      } catch (error) {
        console.error("Erreur lors de la réinitialisation des champs pour l'utilisateur:", error);
      }
    }
  };

  return (
    <div className={`grid ${utilisateurs.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {utilisateurs.length === 0 ? (
        <div className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-center text-custom-secondary">Aucun utilisateur</p>
        </div>
      ) : (
        utilisateurs.map((utilisateur) => (
          <div key={utilisateur.id} className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold text-custom-secondary">{utilisateur.name}</p>
            {/* {utilisateur.securityQuestion && (
                <p className="text-sm text-custom-secondary">Question de sécurité : {utilisateur.securityQuestion.name}</p>
            )}
            {utilisateur.securityAnswer && (
              <p className="text-sm text-custom-secondary">Réponse à la question de sécurité : {utilisateur.securityAnswer}</p>
            )}
            {utilisateur.phoneId && (
              <p className="text-sm text-custom-secondary">Identifiant du téléphone : {utilisateur.phoneId}</p>
            )} */}
             
            <div className="mt-2">
            <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2 mt-2"
                onClick={() => handleResetFieldsClick(utilisateur.id as string)}
              >
                Réinitialiser
              </button>
              <button
                className="bg-custom-orange text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
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