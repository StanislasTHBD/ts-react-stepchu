import { useState, useEffect } from 'react';
import NewsletterList from './NewsletterList';
import NewsletterForm from './NewsletterForm';
import NewsletterService from '../../services/NewsletterService';
import Newsletter from '../../models/Newsletter';

function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const newslettersData = await NewsletterService.getAllNewsletters();
      if (newslettersData !== undefined) {
        setNewsletters(newslettersData as Newsletter[]);
        // console.log(newslettersData);
      } else {
        console.log("newslettersData is undefined");
      }
    } catch (error) {
      console.error("Error loading newsletters:", error);
    }
  };

  const handleCreateOrUpdate = () => {
    fetchNewsletters();
  };

  const handleDelete = async (id: string, pdfUrl: string | null) => {
      try {
      await NewsletterService.deleteNewsletter(id, pdfUrl);
      fetchNewsletters();
      } catch (error) {
      console.error("Error deleting newsletter:", error);
      }
  };

  const openModal = (newsletter: Newsletter | null) => {
    setSelectedNewsletter(newsletter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNewsletter(null);
    setIsModalOpen(false);
  };

  return (
    <div className='p-4'>
        <h1 className="text-2xl font-bold mb-4">Liste Newsletters</h1>
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => openModal(null)}
        >
            Créer Newsletter
        </button>
        <NewsletterList newsletters={newsletters} onEdit={openModal} onDelete={handleDelete} />
        <NewsletterForm
            isOpen={isModalOpen}
            onClose={() => {
            closeModal();
            handleCreateOrUpdate();
            }}
            initialData={selectedNewsletter}
        />
    </div>
  );
}

export default NewsletterPage;
