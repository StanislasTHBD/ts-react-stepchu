// import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
// import { firestore } from "../firebase";
// import QuestionSecurity from "../models/QuestionSecurity";

// class QuestionSecurityService {
//     async getAllQuestionSecuritys() {
//         try {
//           const questionSecuritys = await getDocs(collection(firestore, 'questionSecuritys'));
//           return questionSecuritys.docs.map((doc) => ({
//             id: doc.id,
//             name: doc.data().name,
//           })) as QuestionSecurity[];
//         } catch (error) {
//           console.error("Error loading questionSecuritys:", error);
//           throw error;
//         }
//     }
      
//     async createQuestionSecurity(name: string) {
//         try {
//             const questionSecurityData: any = {
//                 name,
//             };
    
//             const questionSecurityRef = await addDoc(collection(firestore, 'questionSecuritys'), questionSecurityData);
//             console.log("Document written with ID:", questionSecurityRef.id);
//             return questionSecurityRef.id; 
//         } catch (error) {
//             console.error("Error creating questionSecurity:", error);
//             throw error;
//         }
//     }
    
//     async updateQuestionSecurity(id: string, name: string) {
//         try {
//             const questionSecurityRef = doc(firestore, 'questionSecuritys', id);
//             const questionSecurityData: any = {
//                 name,
//             };
    
//             await updateDoc(questionSecurityRef, questionSecurityData);
//             console.log("Document updated with ID:", id);
//         } catch (error) {
//             console.error("Error updating questionSecurity:", error);
//             throw error;
//         }
//     }
    
//     async deleteQuestionSecurity(id: string) {
//         try {
//             const questionSecurityRef = doc(firestore, 'questionSecuritys', id);
//             await deleteDoc(questionSecurityRef);
//             console.log("Document written with ID:", id);
//         } catch (error) {
//             console.error("Error deleting questionSecurity:", error);
//         }
//     }
// }

// export default new QuestionSecurityService();