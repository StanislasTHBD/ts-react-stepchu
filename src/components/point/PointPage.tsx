import { useEffect, useState } from 'react';
import Point from '../../models/Point';
import PointService from '../../services/PointService';
import PointList from './PointList';
import PointForm from './PointForm';

function PointPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      const pointsData = await PointService.getAllPoints();
      setPoints(pointsData);
    } catch (error) {
      console.error("Error loading points:", error);
    }
  };

  const handleCreateOrUpdate = () => {
    fetchPoints();
  };

  const openModal = (point: Point | null) => {
    setSelectedPoint(point);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPoint(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
    await PointService.deletePoint(id);
    fetchPoints();
    } catch (error) {
    console.error("Error deleting Point:", error);
    }
}; 

  return (
    <div className='p-4'>
      <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste des Points</h1>
      <button
        className="bg-blue-500 text-custom-secondary px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => openModal(null)}
      >
        Créer Point
      </button>
      <PointList
        points={points}
        onEdit={openModal}
        onDelete={handleDelete}
      />
      <PointForm
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          handleCreateOrUpdate();
        }}
        initialData={selectedPoint}
      />
    </div>
  );
}

export default PointPage;
