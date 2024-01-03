import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { firestore } from "../firebase";

class UtilisateurService {
    async getAllUtilisateurs() {
        try {
            const utilisateurs = await getDocs(collection(firestore, 'utilisateurs'));
            return utilisateurs.docs.map((doc) => ({
                id: doc.id,
              ...doc.data(),
            }));
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }
    
    async createUtilisateur(name: string, securityQuestion?: string, securityAnswer?: string, phoneId?: string) {
        try {
            const utilisateurData: any = {
                name,
            };
    
            if (securityQuestion !== undefined) {
                utilisateurData.securityQuestion = securityQuestion;
            }
    
            if (securityAnswer !== undefined) {
                utilisateurData.securityAnswer = securityAnswer;
            }
    
            if (phoneId !== undefined) {
                utilisateurData.phoneId = phoneId;
            }
    
            const utilisateurRef = await addDoc(collection(firestore, 'utilisateurs'), utilisateurData);
            console.log("Document written with ID:", utilisateurRef.id);
            return utilisateurRef.id; 
        } catch (error) {
            console.error("Error creating utilisateur:", error);
            throw error;
        }
    }
    
    async updateUtilisateur(id: string, name: string, securityQuestion?: string, securityAnswer?: string, phoneId?: string) {
        try {
            const utilisateurRef = doc(firestore, 'utilisateurs', id);
            const utilisateurData: any = {
                name,
            };
    
            if (securityQuestion !== undefined) {
                utilisateurData.securityQuestion = securityQuestion;
            }
    
            if (securityAnswer !== undefined) {
                utilisateurData.securityAnswer = securityAnswer;
            }
    
            if (phoneId !== undefined) {
                utilisateurData.phoneId = phoneId;
            }
    
            await updateDoc(utilisateurRef, utilisateurData);
            console.log("Document updated with ID:", id);
        } catch (error) {
            console.error("Error updating utilisateur:", error);
            throw error;
        }
    }
    
    async deleteUtilisateur(id: string) {
        try {
            const utilisateurRef = doc(firestore, 'utilisateurs', id);
            await deleteDoc(utilisateurRef);
            console.log("Document written with ID:", id);
        } catch (error) {
            console.error("Error deleting utilisateur:", error);
        }
    }
}

export default new UtilisateurService();