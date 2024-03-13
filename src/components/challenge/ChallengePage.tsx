import { useEffect, useState } from 'react';
import Challenge from '../../models/Challenge';
import ChallengeList from './ChallengeList'
import ChallengeService from '../../services/ChallengeService';
import ChallengeForm from './ChallengeForm';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function ChallengePage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const challengesData = await ChallengeService.getAllChallenges();
            if (challengesData !== undefined) {
                setChallenges(challengesData as Challenge[]);
            } else {
                console.log("challengesData is empty");
            }
        } catch (error) {
            console.error("Error loading challenges:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = () => {
        fetchChallenges();
      };

    const openModal = (challenge: Challenge | null) => {
        setSelectedChallenge(challenge);
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
      setSelectedChallenge(null);
      setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        try {
        await ChallengeService.deleteChallenge(id);
        fetchChallenges();
        } catch (error) {
        console.error("Error deleting challenge:", error);
        }
    }; 

    if (loading) {
        return <LoadingScreen />;
    }

  return (
    <div className='p-4'>
        <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste Challenge</h1>
        <button
            className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => openModal(null)}
        >
            Créer Challenge
        </button>
        <ChallengeList challenges={challenges} onEdit={openModal} onDelete={handleDelete} />
        <ChallengeForm 
            isOpen={isModalOpen}
            onClose={() => {
            closeModal();
            handleCreateOrUpdate();
            }}
            initialData={selectedChallenge}
        />
    </div>
  )
}

export default ChallengePage