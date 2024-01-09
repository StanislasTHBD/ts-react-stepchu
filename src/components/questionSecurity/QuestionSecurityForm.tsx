import React, { useState, useEffect } from 'react';
import QuestionSecurity from '../../models/QuestionSecurity';
import QuestionSecurityService from '../../services/QuestionSecurityService';

export default function QuestionSecurityForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: QuestionSecurity | null;
}) {
  const initialFormData: QuestionSecurity = initialData || { name: '' };
  const [formData, setFormData] = useState<QuestionSecurity>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        await QuestionSecurityService.updateQuestionSecurity(
            initialData.id as string,
            formData.name,
        );
      } else {
        await QuestionSecurityService.createQuestionSecurity(
            formData.name,
        );
      }

      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting questionSecurity:", error);
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
                  {initialData ? 'Modifier Question Sécurité' : 'Créer Question Sécurité'}
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
