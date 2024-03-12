import { useState, useEffect } from 'react';
import QuizzService from '../../services/QuizzService';
import Quizz from '../../models/Quizz';
import QuizzForm from './QuizzForm';
import QuizzList from './QuizzList';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function QuizzPage() {
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedQuizz, setSelectedQuizz] = useState<Quizz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzesData = await QuizzService.getAllQuizzes();
      if (quizzesData !== undefined) {
        setQuizzes(quizzesData as Quizz[]);
      } else {
        console.log("quizzesData is empty");
      }
    } catch (error) {
      console.error("Error loading quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = () => {
    fetchQuizzes();
  };

  const openModal = (quizz: Quizz | null) => {
    setSelectedQuizz(quizz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedQuizz(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await QuizzService.deleteQuizz(id);
      fetchQuizzes();
    } catch (error) {
      console.error("Error deleting quizz:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste des Quizz</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => openModal(null)}
      >
        Créer Quizz
      </button>
      <QuizzList quizzes={quizzes} onEdit={openModal} onDelete={handleDelete} />
      <QuizzForm
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          handleCreateOrUpdate();
        }}
        initialData={selectedQuizz}
      />
    </div>
  );
}

export default QuizzPage;
