import React, { useEffect, useState } from 'react';
import Challenge from '../../models/Challenge';
import ChallengeService from '../../services/ChallengeService';


const TotalChallengesCard: React.FC = () => {
  const [totalChallenges, setTotalChallenges] = useState<number>(0);

  useEffect(() => {
    const fetchTotalChallenges = async () => {
      try {
        const challenges: Challenge[] = await ChallengeService.getAllChallenges();
        setTotalChallenges(challenges.length);
      } catch (error) {
        console.error('Error fetching total challenges:', error);
      }
    };

    fetchTotalChallenges(); 
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        Challenges: {totalChallenges}
      </div>
    </div>
  );
};

export default TotalChallengesCard;
