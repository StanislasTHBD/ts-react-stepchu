import { useState, useEffect } from "react";
import UtilisateurList from "./UtilisateurList";
import Utilisateur from "../../models/Utilisateur";
import UtilisateurService from "../../services/UtilisateurService";
import UtilisateurForm from "./UtilisateurForm";
import ImportUserToExcel from "./ImportUserToExcel";

function UtilisateurPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUtilisateur, setSelectedUtilisateur] =
    useState<Utilisateur | null>(null);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const utilisateursData = await UtilisateurService.getAllUtilisateurs();
      if (utilisateursData !== undefined) {
        setUtilisateurs(utilisateursData as Utilisateur[]);
      } else {
        console.log("utilisateursData is empty");
      }
    } catch (error) {
      console.error("Error loading utilisateurs:", error);
    }
  };

  const handleCreateOrUpdate = () => {
    fetchUtilisateurs();
  };

  const openModal = (utilisateur: Utilisateur | null) => {
    setSelectedUtilisateur(utilisateur);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUtilisateur(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await UtilisateurService.deleteUtilisateur(id);
      fetchUtilisateurs();
    } catch (error) {
      console.error("Error deleting utilisateur:", error);
    }
  };

  const handleClearUsers = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir vider la table des utilisateurs ?"
    );
    if (confirmation) {
      try {
        await UtilisateurService.clearAllUtilisateurs();
        setUtilisateurs([]);
        console.log("All utilisateurs have been cleared.");
      } catch (error) {
        console.error("Error clearing utilisateurs:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-custom-secondary">
        Liste Utilisateurs
      </h1>
      <ImportUserToExcel />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        onClick={() => handleClearUsers()}
      >
        Supprimer les Utilisateurs
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => openModal(null)}
      >
        Créer Utilisateur
      </button>
      <UtilisateurList
        utilisateurs={utilisateurs}
        onEdit={openModal}
        onDelete={handleDelete}
      />
      <UtilisateurForm
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          handleCreateOrUpdate();
        }}
        initialData={selectedUtilisateur}
      />
    </div>
  );
}

export default UtilisateurPage;
