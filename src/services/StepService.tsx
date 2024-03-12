import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import Steps from "../models/Steps";
import Utilisateur from "../models/Utilisateur";
import UtilisateurService from "./UtilisateurService";

class StepService {
  async getAllSteps(): Promise<Steps[]> {
    try {
      const stepsCollection = collection(firestore, "steps");
      const stepSnapshot = await getDocs(stepsCollection);

      return stepSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Steps[];
    } catch (error) {
      console.error("Error loading steps:", error);
      throw error;
    }
  }

  async getUserForStep(userId: string): Promise<Utilisateur | null> {
    try {
      const utilisateur = await UtilisateurService.getUserById(userId);
      return utilisateur;
    } catch (error) {
      console.error("Error fetching user for step:", error);
      return null;
    }
  }

  async clearSteps(): Promise<void> {
    try {
      const stepsCollection = collection(firestore, "steps");
      const stepSnapshot = await getDocs(stepsCollection);

      // Iterate over each document and delete it
      stepSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("Steps collection cleared successfully.");
    } catch (error) {
      console.error("Error clearing steps:", error);
      throw error;
    }
  }
}

export default new StepService();
