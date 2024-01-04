import React, { useState, useEffect } from 'react';
import Challenge from '../../models/Challenge';
import ChallengeService from '../../services/ChallengeService';

export default function ChallengeForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: Challenge | null;
}) {
  const initialFormData: Challenge = initialData || { name: '', description: ''};
  const [formData, setFormData] = useState<Challenge>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const validateAndSubmit = async () => {
    if (!formData.name || !formData.description) {
      console.error("Name and description are required fields.");
      return;
    }

    try {
      setIsLoading(true);
      if (initialData) {
        const updatedChallenge: Challenge = {
            id: initialData.id,
            name: formData.name,
            description: formData.description,
          };
        await ChallengeService.updateChallenge(updatedChallenge);
      } else {
        const newChallenge: Challenge = {
            name: formData.name,
            description: formData.description,
          };
        await ChallengeService.createChallenge(newChallenge);
      }

      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting challenge:", error);
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
                  {initialData ? 'Modifier Challenge' : 'Créer Challenge'}
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
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Description :
                    </label>
                    <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
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
