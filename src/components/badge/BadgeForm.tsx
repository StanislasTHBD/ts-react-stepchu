import React, { useState, useEffect } from "react";
import Badge from "../../models/Badge";
import BadgeService from "../../services/BadgeService";
import BadgeColor from "../../models/BadgeColor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

function BadgeForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: Badge | null;
}) {
  const initialBadgeColors: BadgeColor[] = [
    {
      type: "Neutre",
      minPoints: 0,
      maxPoints: 1000,
      image: "",
    },
    {
      type: "Bronze",
      minPoints: 1001,
      maxPoints: 2000,
      image: "",
    },
    {
      type: "Argent",
      minPoints: 2001,
      maxPoints: 3000,
      image: "",
    },
    {
      type: "Or",
      minPoints: 3001,
      maxPoints: 4000,
      image: "",
    },
    {
      type: "Platine",
      minPoints: 4001,
      maxPoints: 5000,
      image: "",
    },
  ];

  const initialFormData: Badge = initialData || {
    name: "",
    description: "",
    badgeColors: initialBadgeColors,
  };

  const [formData, setFormData] = useState<Badge>(initialFormData);
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

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { files } = e.target;
    if (files && files[0]) {
      try {
        const imageFile = files[0];
        if (imageFile.type === "image/svg+xml") {
          const updatedBadgeColors = [...formData.badgeColors];

          const storageRef = ref(
            storage,
            `badge_images/${imageFile.lastModified}_${imageFile.name}`
          );
          const uploadTask = uploadBytes(storageRef, imageFile);

          const uploadResult = await uploadTask;
          const imageURL = await getDownloadURL(uploadResult.ref);

          updatedBadgeColors[index].image = imageURL;

          setFormData({ ...formData, badgeColors: updatedBadgeColors });
        } else {
          alert("Le fichier sélectionné n'est pas au format SVG.");
          console.error("Le fichier sélectionné n'est pas au format SVG.");
        }
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
      }
    }
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
        await BadgeService.updateBadge({
          id: initialData.id as string,
          name: formData.name,
          description: formData.description,
          badgeColors: formData.badgeColors,
        });
      } else {
        await BadgeService.createBadge(formData);
      }
      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting badge:", error);
    } finally {
      setIsLoading(false);
    }
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
            <div className="text-center text-black">Chargement en cours...</div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg mx-auto p-4"
            >
              <div className="modal-header flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {initialData ? "Modifier Badge" : "Créer Badge"}
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
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
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
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description :
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  autoComplete="description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Couleurs du badge :
                </label>
                {formData.badgeColors.map((badgeColor, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 mb-8 bg-custom-blue bg-opacity-70 p-4 rounded-md"
                  >
                    <div>
                      <label
                        htmlFor={`type-${index}`}
                        className="block text-custom-secondary text-sm font-bold mb-2"
                      >
                        Type de badge:
                      </label>
                      <span className="text-custom-secondary text-sm">
                        {badgeColor.type}
                      </span>
                    </div>
                    <div>
                      <label
                        htmlFor={`minPoints-${index}`}
                        className="block text-custom-secondary text-sm font-bold mb-2"
                      >
                        Points minimum:
                      </label>
                      <span className="text-custom-secondary text-sm">
                        {badgeColor.minPoints}
                      </span>
                    </div>
                    <div>
                      <label
                        htmlFor={`image-${index}`}
                        className="block text-custom-secondary text-sm font-bold mb-2"
                      >
                        Image (SVG):
                      </label>
                      {badgeColor.image &&
                      typeof badgeColor.image === "string" ? (
                        <img
                          src={badgeColor.image}
                          alt={`Badge Color ${index}`}
                          className="w-16 h-16"
                        />
                      ) : (
                        <p className="m-2 text-custom-secondary">
                          Pas d'image disponible
                        </p>
                      )}
                      <label
                        htmlFor={`file-upload-${index}`}
                        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                      >
                        {initialData ? "Changer l'image" : "Mettre une image"}
                      </label>
                      <input
                        type="file"
                        id={`file-upload-${index}`}
                        accept=".svg"
                        onChange={(e) => handleImageChange(e, index)}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`maxPoints-${index}`}
                        className="block text-custom-secondary text-sm font-bold mb-2"
                      >
                        Points maximum:
                      </label>
                      <span className="text-custom-secondary text-sm">
                        {badgeColor.maxPoints}
                      </span>
                    </div>
                  </div>
                ))}
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

export default BadgeForm;
