import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import Utilisateur from "../models/Utilisateur";
import StepService from "./StepService";

class UtilisateurService {
  async getAllUtilisateurs(searchTerm: string = "") {
    try {
      let utilisateursQuery = query(collection(firestore, "utilisateurs"));
      
      // Apply search filter if searchTerm is provided
      if (searchTerm) {
        utilisateursQuery = query(utilisateursQuery, where("name", ">=", searchTerm), where("name", "<=", searchTerm + "\uf8ff"));
      }
  
      const utilisateurs = await getDocs(utilisateursQuery);
      
      return utilisateurs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Utilisateur[];
    } catch (error) {
      console.error("Error loading users:", error);
      throw error;
    }
  }

  async getUserById(userId: string): Promise<Utilisateur | null> {
    try {
      const utilisateurDoc = await getDoc(doc(firestore, "utilisateurs", userId));
      
      if (utilisateurDoc.exists()) {
        const userData = utilisateurDoc.data();
        const utilisateur: Utilisateur = {
          id: utilisateurDoc.id,
          name: userData.name,
          // securityAnswer: userData.securityAnswer || undefined,
          password: userData.password || undefined,
          phoneId: userData.phoneId || undefined
        };
        return utilisateur;
      } else {
        console.error(`Utilisateur avec l'ID ${userId} non trouvé.`);
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }
  }

  async createUtilisateur(utilisateur: Utilisateur) {
    try {
      const utilisateurData: any = {
        name: String(utilisateur.name),
      };

      // if (utilisateur.securityQuestion !== undefined) {
      //   utilisateurData.securityQuestion = utilisateur.securityQuestion;
      // }

      // if (utilisateur.securityAnswer !== undefined) {
      //   utilisateurData.securityAnswer = utilisateur.securityAnswer;
      // }

      if (utilisateur.password !== undefined) {
        utilisateurData.password = utilisateur.password;
      }

      if (utilisateur.phoneId !== undefined) {
        utilisateurData.phoneId = utilisateur.phoneId;
      }

      const utilisateurRef = await addDoc(
        collection(firestore, "utilisateurs"),
        utilisateurData
      );
      console.log("Document written with ID:", utilisateurRef.id);
      window.alert("L'utilisateur a été crée avec succès!");
      return utilisateurRef.id;
    } catch (error) {
      console.error("Error creating utilisateur:", error);
      throw error;
    }
  }

  async updateUtilisateur(utilisateur: Utilisateur) {
    try {
      const utilisateurRef = doc(
        firestore,
        "utilisateurs",
        utilisateur.id || ""
      );
      const utilisateurData: any = {
        name: utilisateur.name,
      };

      // if (utilisateur.securityQuestion !== undefined) {
      //   utilisateurData.securityQuestion = utilisateur.securityQuestion;
      // }

      // if (utilisateur.securityAnswer !== undefined) {
      //   utilisateurData.securityAnswer = utilisateur.securityAnswer;
      // }

      if (utilisateur.password !== undefined) {
        utilisateurData.password = utilisateur.password;
      }

      if (utilisateur.phoneId !== undefined) {
        utilisateurData.phoneId = utilisateur.phoneId;
      }

      await updateDoc(utilisateurRef, utilisateurData);
      console.log("Document updated with ID:", utilisateur.id);
      window.alert("L'utilisateur a été modifié avec succès!");
    } catch (error) {
      console.error("Error updating utilisateur:", error);
      throw error;
    }
  }

  async resetUtilisateurFields(id: string) {
    try {
      const utilisateurRef = doc(firestore, "utilisateurs", id);
      const utilisateurData = {
        // securityQuestion: "",
        // securityAnswer: "",
        password: "",
      };

      await updateDoc(utilisateurRef, utilisateurData);
      console.log("Utilisateur fields reset for ID:", id);
      window.alert("Le mot de passe de l'utilisateur a été effacé avec succès!");
    } catch (error) {
      console.error("Error resetting utilisateur fields:", error);
      throw error;
    }
  }

  async deleteUtilisateur(id: string) {
    try {
      const utilisateurRef = doc(firestore, "utilisateurs", id);
      await deleteDoc(utilisateurRef);
      console.log("Document written with ID:", id);
      window.alert("L'utilisateur a été supprimé avec succès!");
    } catch (error) {
      console.error("Error deleting utilisateur:", error);
      throw error;
    }
  }

  async clearAllUtilisateurs() {
    try {
      const utilisateursCollection = collection(firestore, "utilisateurs");
      const snapshot = await getDocs(utilisateursCollection);

      const deletionPromises = snapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });
      StepService.clearSteps();
      await Promise.all(deletionPromises);
      console.log("All utilisateurs have been deleted.");
      window.alert("Les utilisateurs et leurs steps ont été effacé avec succès!");
    } catch (error) {
      console.error("Error clearing utilisateurs:", error);
      throw error;
    }
  }
}

export default new UtilisateurService();
