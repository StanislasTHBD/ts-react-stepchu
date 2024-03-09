import React from 'react';
import TotalUsersCard from './TotalUsersCard';
import TotalNewslettersCard from './TotalNewslettersCard';
import TotalQuizzesCard from './TotalQuizzesCard';
import TotalBadgesCard from './TotalBadgesCard';
import TotalChallengesCard from './TotalChallengesCard';
import TotalSecurityQuestionsCard from './TotalSecurityQuestionsCard';
import TotalPointsCard from './TotalPointsCard';
import TotalStepsCard from './TotalStepsCard';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <TotalStepsCard />
        <TotalUsersCard />
        <TotalNewslettersCard />
        <TotalChallengesCard />
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
          Evenements
        </div>
      </div>
    <TotalQuizzesCard />
     <TotalBadgesCard />
     <TotalPointsCard />
     <TotalSecurityQuestionsCard />
    </div>
  );
};

export default DashboardPage;
