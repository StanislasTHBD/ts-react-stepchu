import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import Challenge from "../models/Challenge";

class ChallengeService {
  async getAllChallenges(): Promise<Challenge[]> {
    try {
        const challengesCollection = collection(firestore, "challenges");
        const challengeSnapshot = await getDocs(challengesCollection);

        return challengeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Challenge[];
    } catch (error) {
        console.error("Error loading challenges:", error);
        throw error;
    }
  }

  async createChallenge(challenge: Challenge): Promise<string> {
    try {
        const challengesCollection = collection(firestore, "challenges");
        const challengeRef = await addDoc(challengesCollection, challenge);

        console.log("Challenge created with ID:", challengeRef.id);
        return challengeRef.id;
    } catch (error) {
        console.error("Error creating challenge:", error);
        throw error;
    }
  }

  async updateChallenge(challenge: Challenge): Promise<void> {
    try {
        if (!challenge.id) {
            throw new Error("Challenge ID is undefined.");
          }

        const challengeRef = doc(firestore, "challenges", challenge.id);
        const challengeData = { ...challenge };

        await updateDoc(challengeRef, challengeData);
        console.log("Challenge updated with ID:", challenge.id);
    } catch (error) {
        console.error("Error updating challenge:", error);
        throw error;
    }
  }

  async deleteChallenge(challengeId: string): Promise<void> {
    try {
        const challengeRef = doc(firestore, "challenges", challengeId);
        await deleteDoc(challengeRef);
        console.log("Challenge deleted with ID:", challengeId);
    } catch (error) {
        console.error("Error deleting challenge:", error);
        throw error;
    }
  }

}

export default new ChallengeService();
