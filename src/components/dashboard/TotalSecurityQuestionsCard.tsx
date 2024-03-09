import React, { useEffect, useState } from 'react';
import QuestionSecurity from '../../models/QuestionSecurity';
import QuestionSecurityService from '../../services/QuestionSecurityService';

const TotalSecurityQuestionsCard: React.FC = () => {
  const [totalSecurityQuestions, setTotalSecurityQuestions] = useState<number>(0); 

  useEffect(() => {
    const fetchTotalSecurityQuestions = async () => {
      try {
        const securityQuestions: QuestionSecurity[] = await QuestionSecurityService.getAllQuestionSecuritys();
        setTotalSecurityQuestions(securityQuestions.length); 
      } catch (error) {
        console.error('Error fetching total security questions:', error);
      }
    };

    fetchTotalSecurityQuestions(); 
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        Questions de sécurité: {totalSecurityQuestions}
      </div>
    </div>
  );
};

export default TotalSecurityQuestionsCard;
