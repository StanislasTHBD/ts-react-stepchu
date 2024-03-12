import React from 'react';
import * as XLSX from 'xlsx';

import StepService from '../../services/StepService';
import UtilisateurService from '../../services/UtilisateurService';
import Steps from '../../models/Steps';
import Utilisateur from '../../models/Utilisateur';

const ExportStepsToExcel: React.FC = () => {
  const exportToExcel = async () => {
    try {
      const steps: Steps[] = await StepService.getAllSteps();
      const utilisateurs: Utilisateur[] = await UtilisateurService.getAllUtilisateurs();
      
      const data: any[] = [];
      
      data.push(["Date", "Nombre de pas", "Utilisateur"]);

      steps.forEach(step => {
        const user: Utilisateur | undefined = utilisateurs.find(u => u.id === step.userId);
        const nomUtilisateur = user ? user.name : "Utilisateur inconnu";
        data.push([
          step.date,
          step.steps,
          nomUtilisateur,
        ]);
      });

      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'DonnéeApplicationSteps');

      XLSX.writeFile(workbook, 'steps.xlsx');
    } catch (error) {
      console.error('Error exporting steps to Excel:', error);
    }
  };

  return (
    <button className="bg-custom-blue text-custom-secondary rounded-lg px-4 py-2 shadow-md hover:bg-custom-orange" onClick={exportToExcel}>
      Exporter les données sous Excel
    </button>
  );
};

export default ExportStepsToExcel;
