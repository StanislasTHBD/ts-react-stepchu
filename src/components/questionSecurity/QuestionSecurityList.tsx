// import QuestionSecurity from "../../models/QuestionSecurity";

// function QuestionSecurityList({
//   questionSecuritys,
//   onEdit,
//   onDelete
// }: {
//   questionSecuritys: QuestionSecurity[];
//   onEdit: (questionSecurity: QuestionSecurity) => void;
//   onDelete: (id: string) => void;
// }) {
//   const handleDeleteClick = (id: string) => {
//     const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette question de sécurité ?");
//     if (confirmation) {
//       onDelete(id);
//     }
//   };

//   return (
//     <div className={`grid ${questionSecuritys.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
//       {questionSecuritys.length === 0 ? (
//         <div className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
//           <p className="text-lg font-semibold text-center text-custom-secondary">Aucun question sécurité</p>
//         </div>
//       ) : (
//         questionSecuritys.map((questionSecurity) => (
//           <div key={questionSecurity.id} className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
//             <p className="text-lg font-semibold text-custom-secondary">{questionSecurity.name}</p>
           
//             <div className="mt-2">
//               <button
//                 className="bg-custom-orange text-custom-secondary px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
//                 onClick={() => onEdit(questionSecurity)}
//               >
//                 Modifier
//               </button>
//               <button
//                 className="bg-red-500 text-custom-secondary px-4 py-2 rounded hover:bg-red-700 mt-2"
//                 onClick={() => {
//                   if (questionSecurity.id !== undefined) {
//                     handleDeleteClick(questionSecurity.id as string);
//                   } else {
//                     console.error("id is undefined");
//                   }
//                 }}
//               >
//                 Supprimer
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default QuestionSecurityList;