import React from 'react';
import Steps from '../../models/Steps';
import Utilisateur from '../../models/Utilisateur';

interface StepListProps {
  steps: Steps[];
  utilisateurs: Utilisateur[];
}

function formatDate(date: Date): string {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  const [year, month, day] = formattedDate.split('-');
  return `${day}/${month}/${year}`;
}

const StepList: React.FC<StepListProps> = ({ steps, utilisateurs }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <div className="bg-white divide-y divide-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-custom-blue bg-opacity-80 text-xs font-semibold text-custom-secondary uppercase tracking-wider">
            <div className="p-4 text-center">Date</div>
            <div className="p-4 text-center">Nombre de pas</div>
            <div className="p-4 text-center">Utilisateur</div>
          </div>
          {steps.map((step) => {
            const utilisateur = utilisateurs.find((user) => user.id === step.userId);
            const nomUtilisateur = utilisateur ? utilisateur.name : "Utilisateur inconnu";
            return (
              <div key={step.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 hover:bg-custom-orange">
                <div className="p-4 text-center">{formatDate(step.date)}</div>
                <div className="p-4 text-center">{step.steps}</div>
                <div className="p-4 text-center">{nomUtilisateur}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepList;
