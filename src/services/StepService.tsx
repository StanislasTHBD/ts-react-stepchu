import { collection, getDocs, } from "firebase/firestore";
import { firestore } from "../firebase";
import Steps from "../models/Steps";

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
}

export default new StepService();
