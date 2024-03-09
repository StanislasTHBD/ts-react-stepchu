import React from 'react';
import * as XLSX from 'xlsx';

import StepService from '../../services/StepService';
import Steps from '../../models/Steps';

const ExportStepsToExcel: React.FC = () => {
  const exportToExcel = async () => {
    try {
      const steps: Steps[] = await StepService.getAllSteps();
      const data: any[] = [];
      
      data.push(["Date", "Nombre de pas", "Utilisateur"]);

      steps.forEach(step => {
        data.push([
          step.date,
          step.steps,
          step.user.name,
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
