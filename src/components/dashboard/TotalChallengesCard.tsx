import React, { useEffect, useState } from "react";
import Challenge from "../../models/Challenge";
import ChallengeService from "../../services/ChallengeService";

const TotalChallengesCard: React.FC = () => {
  const [totalChallenges, setTotalChallenges] = useState<number>(0);

  useEffect(() => {
    const fetchTotalChallenges = async () => {
      try {
        const challenges: Challenge[] =
          await ChallengeService.getAllChallenges();
        setTotalChallenges(challenges.length);
      } catch (error) {
        console.error("Error fetching total challenges:", error);
      }
    };

    fetchTotalChallenges();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 min-w-min">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        <p className="text-2xl">Challenges</p>
        <p className="text-3xl m-4 text-left md:text-right">
          {totalChallenges}
        </p>
      </div>
    </div>
  );
};

export default TotalChallengesCard;
