import React, { useState } from "react";
import * as XLSX from "xlsx";
import UtilisateurService from "../../services/UtilisateurService";

function ImportUserToExcel() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (file) {
      try {
        const users = await importUsersFromXlsx(file);
        console.log("Utilisateurs importés depuis le fichier XLSX :", users);
        users.forEach((user) => {
          UtilisateurService.createUtilisateur({ name: user, phoneId: "" });
        });
      } catch (error) {
        console.error(
          "Erreur lors de l'importation des utilisateurs depuis le fichier XLSX :",
          error
        );
      }
    }
  };

  const importUsersFromXlsx = (file: File) => {
    return new Promise<string[]>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const users: string[] = [];

        XLSX.utils.sheet_to_json(worksheet).forEach((row: any) => {
          if (row.name) {
            users.push(row.name);
          }
        });

        resolve(users);
      };

      reader.onerror = (event) => {
        reject(event.target?.error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-2"
      >
        {file ? file.name : "Choisir un fichier"}
      </label>
      <button
        onClick={handleImport}
        disabled={!file}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Importer Utilisateurs
      </button>
    </div>
  );
}

export default ImportUserToExcel;
