import React, { useState, useEffect } from 'react';
import UtilisateurService from '../../services/UtilisateurService';
import Utilisateur from '../../models/Utilisateur';
// import QuestionSecurityService from '../../services/QuestionSecurityService';
// import QuestionSecurity from '../../models/QuestionSecurity';

export default function UtilisateurForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: Utilisateur | null;
}) {
  const initialFormData: Utilisateur = initialData || {
    name: '',
    // securityQuestion: undefined,
    securityAnswer: '',
    phoneId: '',
    // badges: [],
    // completedQuizz: [],
  };
  
  const [formData, setFormData] = useState<Utilisateur>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  // const [securityQuestions, setSecurityQuestions] = useState<QuestionSecurity[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }

    // loadSecurityQuestions();
  }, [initialData]);

  // const loadSecurityQuestions = async () => {
  //   try {
  //     const questionsData = await QuestionSecurityService.getAllQuestionSecuritys();
  //     if (questionsData) {
  //       setSecurityQuestions(questionsData);
  //     } else {
  //       console.log("No security questions found.");
  //     }
  //   } catch (error) {
  //     console.error("Error loading security questions:", error);
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSecurityQuestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   const selectedSecurityQuestion = securityQuestions.find((question) => question.id === value);
  //   setFormData({ ...formData, [name]: selectedSecurityQuestion });
  // };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const validateAndSubmit = async () => {
    if (!formData.name) {
      console.error("Name is a required field.");
      return;
    }

    try {
      setIsLoading(true);
      if (initialData) {
        await UtilisateurService.updateUtilisateur({
          id: initialData.id as string,
          name: formData.name,
          // securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer,
          phoneId: formData.phoneId,
          // badges: [],
          // completedQuizz: [], 
        });
      } else {
        await UtilisateurService.createUtilisateur({
          name: formData.name,
          // securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer,
          phoneId: formData.phoneId,
          // badges: [],
          // completedQuizz: [], 
        });
      }

      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting utilisateur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndSubmit();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full flex items-center justify-center`}>
      <div className={`${isLoading ? 'bg-orange-500' : 'bg-white'} modal-dialog p-4 shadow-md rounded-md`}>
        <div className="modal-content">
          {isLoading ? (
            <div className="text-center text-black">Chargement en cours...</div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4">
              <div className="modal-header flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {initialData ? 'Modifier Utilisateur' : 'Créer Utilisateur'}
                </h3>
                <button
                  type="button"
                  className="modal-close text-gray-500 hover:text-gray-600"
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Nom :
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* <div className="mb-4">
                  <label htmlFor="securityQuestion" className="block text-gray-700 text-sm font-bold mb-2">
                    Question de sécurité :
                  </label>
                  <select
                    id="securityQuestion"
                    name="securityQuestion"
                    value={formData.securityQuestion?.id || ''}
                    onChange={handleSecurityQuestionChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Sélectionnez une question de sécurité</option>
                    {securityQuestions.map((question) => (
                      <option key={question.id} value={question.id}>
                        {question.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="securityAnswer" className="block text-gray-700 text-sm font-bold mb-2">
                    Réponse à la question de sécurité :
                  </label>
                  <input
                    type="text"
                    id="securityAnswer"
                    name="securityAnswer"
                    value={formData.securityAnswer}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneId" className="block text-gray-700 text-sm font-bold mb-2">
                    Identifiant du téléphone :
                  </label>
                  <input
                    type="text"
                    id="phoneId"
                    name="phoneId"
                    value={formData.phoneId}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div> */}
              </div>
              <div className="modal-footer flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  {initialData ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600"
                  onClick={onClose}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
