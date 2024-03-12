import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import Utilisateur from "../models/Utilisateur";
import StepService from "./StepService";

class UtilisateurService {
  async getAllUtilisateurs() {
    try {
      const utilisateurs = await getDocs(collection(firestore, "utilisateurs"));
      return utilisateurs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Utilisateur[];
    } catch (error) {
      console.error("Error loading users:", error);
      throw error;
    }
  }

  async createUtilisateur(utilisateur: Utilisateur) {
    try {
      const utilisateurData: any = {
        name: String(utilisateur.name),
      };

      if (utilisateur.securityQuestion !== undefined) {
        utilisateurData.securityQuestion = utilisateur.securityQuestion;
      }

      if (utilisateur.securityAnswer !== undefined) {
        utilisateurData.securityAnswer = utilisateur.securityAnswer;
      }

      if (utilisateur.phoneId !== undefined) {
        utilisateurData.phoneId = utilisateur.phoneId;
      }

      const utilisateurRef = await addDoc(
        collection(firestore, "utilisateurs"),
        utilisateurData
      );
      console.log("Document written with ID:", utilisateurRef.id);
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

      if (utilisateur.securityQuestion !== undefined) {
        utilisateurData.securityQuestion = utilisateur.securityQuestion;
      }

      if (utilisateur.securityAnswer !== undefined) {
        utilisateurData.securityAnswer = utilisateur.securityAnswer;
      }

      if (utilisateur.phoneId !== undefined) {
        utilisateurData.phoneId = utilisateur.phoneId;
      }

      await updateDoc(utilisateurRef, utilisateurData);
      console.log("Document updated with ID:", utilisateur.id);
    } catch (error) {
      console.error("Error updating utilisateur:", error);
      throw error;
    }
  }

  async resetUtilisateurFields(id: string) {
    try {
      const utilisateurRef = doc(firestore, "utilisateurs", id);
      const utilisateurData = {
        securityQuestion: "",
        securityAnswer: "",
      };

      await updateDoc(utilisateurRef, utilisateurData);
      console.log("Utilisateur fields reset for ID:", id);
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
    } catch (error) {
      console.error("Error clearing utilisateurs:", error);
      throw error;
    }
  }
}

export default new UtilisateurService();
