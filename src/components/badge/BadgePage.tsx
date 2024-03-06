import { useState, useEffect } from 'react';
import Badge from '../../models/Badge';
import BadgeService from '../../services/BadgeService';
import BadgeList from './BadgeList';
import BadgeForm from './BadgeForm';

function BadgePage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const badgesData = await BadgeService.getAllBadges();
      if (badgesData !== undefined) {
        setBadges(badgesData as Badge[]);
      } else {
        console.log("badgesData is empty");
      }
    } catch (error) {
      console.error("Error loading badges:", error);
    }
  };

  const handleCreateOrUpdate = () => {
    fetchBadges();
  };

  const openModal = (badge: Badge | null) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBadge(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await BadgeService.deleteBadge(id);
      fetchBadges();
    } catch (error) {
      console.error("Error deleting badge:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste des Badges</h1>
      <button
        className="bg-blue-500 text-custom-secondary px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => openModal(null)}
      >
        Créer Badge
      </button>
      <BadgeList badges={badges} onEdit={openModal} onDelete={handleDelete} />
      <BadgeForm
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          handleCreateOrUpdate();
        }}
        initialData={selectedBadge}
      />
    </div>
  );
}

export default BadgePage;
