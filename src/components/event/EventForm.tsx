import React, { useState, useEffect } from "react";
import Event from "../../models/Event";
import EventType from "../../models/EventType";
import EventService from "../../services/EventService";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function EventForm({
  isOpen,
  onClose,
  initialData,
  types,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: Event | null;
  types: EventType[]; 
}) {
  const defaultDate = new Date().toISOString().split('T')[0];

  const initialFormData: Event = initialData || {
    title: "",
    quantity: 0,
    start: defaultDate,
    end: defaultDate,
    type: undefined,
  };

  const [formData, setFormData] = useState<Event>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const validateAndSubmit = async () => {
    if (!formData.title) {
      console.error("Title is a required field.");
      return;
    }
    try {
      setIsLoading(true);
      if (initialData) {
        await EventService.updateEvent(formData);
      } else {
        await EventService.createEvent(formData);
      }
      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedDate = value ? new Date(value).toISOString().split('T')[0] : '';
    setFormData({ ...formData, [name]: formattedDate });
  };

  const handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const typeId = e.target.value;
    const selectedType = types.find(type => type.id === typeId);
    setFormData({ ...formData, type: selectedType || types[0] });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndSubmit();
  };

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full flex items-center justify-center p-10`}
    >
      <div
        className={`${
          isLoading ? "bg-orange-500" : "bg-white"
        } modal-dialog p-4 shadow-md rounded-md overflow-y-auto max-h-full w-full max-w-2xl`}
      >
        <div className="modal-content">
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg mx-auto p-4"
            >
              <div className="modal-header flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {initialData ? "Modifier un Evenement" : "Créer un Evenement"}
                </h3>
                <button
                  type="button"
                  className="modal-close text-gray-500 hover:text-gray-600"
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Titre:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  autoComplete="title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Quantité:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  autoComplete="quantity"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type événement:
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type?.id || ''}
                  onChange={handleTypeChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Sélectionnez un type d'événement</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="start"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Date de début:
                </label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  value={formData.start}
                  onChange={handleDateChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="end"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Date de fin:
                </label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  value={formData.end}
                  onChange={handleDateChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="modal-footer flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  {initialData ? "Modifier" : "Créer"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventForm;
