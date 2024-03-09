import React, { useEffect, useState } from 'react';
import QuizzService from '../../services/QuizzService';
import Quizz from '../../models/Quizz';


const TotalQuizzesCard: React.FC = () => {
  const [totalQuizzes, setTotalQuizzes] = useState<number>(0);

  useEffect(() => {
    const fetchTotalQuizzes = async () => {
      try {
        const quizzes: Quizz[] = await QuizzService.getAllQuizzes(); 
        setTotalQuizzes(quizzes.length);
      } catch (error) {
        console.error('Error fetching total quizzes:', error);
      }
    };

    fetchTotalQuizzes(); 
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        Quizzes: {totalQuizzes}
      </div>
    </div>
  );
};

export default TotalQuizzesCard;
