import { useState, useEffect } from 'react'
import QuestionSecurity from '../../models/QuestionSecurity';
import QuestionSecurityService from '../../services/QuestionSecurityService';
import QuestionSecurityList from './QuestionSecurityList';
import QuestionSecurityForm from './QuestionSecurityForm';


function QuestionSecurityPage() {
    const [questionSecuritys, setQuestionSecuritys] = useState<QuestionSecurity[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedquestionSecurity, setSelectedquestionSecurity] = useState<QuestionSecurity | null>(null);

    useEffect(() => {
      fetchQuestionSecuritys();
    }, []);
  
    const fetchQuestionSecuritys = async () => {
      try {
        const questionSecuritysData = await QuestionSecurityService.getAllQuestionSecuritys();
        if (questionSecuritysData !== undefined) {
           setQuestionSecuritys(questionSecuritysData as QuestionSecurity[]);
        } else {
          console.log("questionSecuritysData is empty");
        }
      } catch (error) {
        console.error("Error loading questionSecuritys:", error);
      }
    };

    const handleCreateOrUpdate = () => {
        fetchQuestionSecuritys();
      };

    const openModal = (questionSecurity: QuestionSecurity | null) => {
        setSelectedquestionSecurity(questionSecurity);
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
        setSelectedquestionSecurity(null);
      setIsModalOpen(false);
    };
    
    const handleDelete = async (id: string) => {
        try {
        await QuestionSecurityService.deleteQuestionSecurity(id);
        fetchQuestionSecuritys();
        } catch (error) {
        console.error("Error deleting questionSecurity:", error);
        }
    };

  return (
    <div className='p-4'>
        <h1 className="text-2xl font-bold mb-4">Liste Question Sécurité</h1>
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => openModal(null)}
        >
            Créer Question Sécurité
        </button>
        <QuestionSecurityList questionSecuritys={questionSecuritys} onEdit={openModal} onDelete={handleDelete} />
        <QuestionSecurityForm 
            isOpen={isModalOpen}
            onClose={() => {
            closeModal();
            handleCreateOrUpdate();
            }}
            initialData={selectedquestionSecurity}
        />
    </div>
  )
}

export default QuestionSecurityPage;