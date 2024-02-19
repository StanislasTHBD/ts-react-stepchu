import React, { useState, useEffect } from 'react';
import Challenge from '../../models/Challenge';
import ChallengeService from '../../services/ChallengeService';
import Badge from '../../models/Badge';
import BadgeService from '../../services/BadgeService';

export default function ChallengeForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: Challenge | null;
}) {
  const defaultDate = new Date().toISOString().split('T')[0];

  const initialFormData: Challenge = initialData || { 
    name: '', 
    description: '', 
    badge: {} as Badge, 
    startDate: defaultDate,
    endDate: defaultDate,
  };

  const [formData, setFormData] = useState<Challenge>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
    loadBadges();
  }, [initialData]);

  const loadBadges = async () => {
    try {
      const badgeData = await BadgeService.getAllBadges();
      if (badgeData) {
        setBadges(badgeData);
      } else {
        console.log("No badges found.");
      }
    } catch (error) {
      console.error("Error loading badges:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedDate = value ? new Date(value).toISOString().split('T')[0] : ''; // Format date to "yyyy-MM-dd"
    setFormData({ ...formData, [name]: formattedDate });
  };
  

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const validateAndSubmit = async () => {
    if (!formData.name || !formData.description) {
      console.error("Name and description are required fields.");
      return;
    }
  
    // Vérifier si la date de début est antérieure à la date d'aujourd'hui
    const startDate = new Date(formData.startDate);
    const today = new Date();
    if (startDate < today) {
      console.error("Start date cannot be before today.");
      return;
    }
  
    // Vérifier si la date de fin est antérieure à la date de début
    const endDate = new Date(formData.endDate);
    if (endDate < startDate) {
      console.error("End date cannot be before start date.");
      return;
    }
  
    try {
      setIsLoading(true);
      if (initialData) {
        await ChallengeService.updateChallenge(formData);
      } else {
        await ChallengeService.createChallenge(formData);
      }
  
      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting challenge:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleBadgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedBadge = badges.find((badge) => badge.id === value);
    setFormData({ ...formData, [name]: selectedBadge });
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
              <div className="mb-4">
                  <label htmlFor="badge" className="block text-gray-700 text-sm font-bold mb-2">
                      Badge :
                  </label>
                  <select
                      id="badge"
                      name="badge"
                      value={formData.badge?.id || ''}
                      onChange={handleBadgeChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                      <option value="">Sélectionnez un Badge</option>
                      {badges.map((badge) => (
                      <option key={badge.id} value={badge.id}>
                          {badge.name}
                      </option>
                      ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Date de début :
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleDateChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Date de fin :
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleDateChange}
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
