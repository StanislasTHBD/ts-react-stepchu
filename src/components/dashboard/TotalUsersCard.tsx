import React, { useEffect, useState } from 'react';
import UtilisateurService from '../../services/UtilisateurService';

const TotalUsersCard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0); 

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const utilisateurs = await UtilisateurService.getAllUtilisateurs();
        setTotalUsers(utilisateurs.length);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        Utilisateurs: {totalUsers}
      </div>
    </div>
  );
};

export default TotalUsersCard;
