import React, { useState, useEffect } from 'react';
import TotalUsersCard from './TotalUsersCard';
import TotalNewslettersCard from './TotalNewslettersCard';
import TotalQuizzesCard from './TotalQuizzesCard';
import TotalBadgesCard from './TotalBadgesCard';
import TotalChallengesCard from './TotalChallengesCard';
import TotalPointsCard from './TotalPointsCard';
import TotalStepsCard from './TotalStepsCard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import TotalEventsCard from './TotalEventsCard';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 300); 
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <TotalStepsCard />
      <TotalUsersCard />
      <TotalNewslettersCard />
      <TotalChallengesCard />
      <TotalEventsCard />
      <TotalQuizzesCard />
      <TotalBadgesCard />
      <TotalPointsCard />
      {/* <TotalSecurityQuestionsCard /> */}
    </div>
  );
};

export default DashboardPage;
