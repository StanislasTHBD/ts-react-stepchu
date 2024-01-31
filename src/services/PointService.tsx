import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import Point from "../models/Point";

class PointService {
  async getAllPoints(): Promise<Point[]> {
    try {
        const pointsCollection = collection(firestore, "points");
        const pointSnapshot = await getDocs(pointsCollection);

        return pointSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Point[];
    } catch (error) {
        console.error("Error loading Points:", error);
        throw error;
    }
  }

  async createPoint(point: Point): Promise<string> {
    try {
        const pointsCollection = collection(firestore, "points");
        const pointRef = await addDoc(pointsCollection, point);

        console.log("Point created with ID:", pointRef.id);
        return pointRef.id;
    } catch (error) {
        console.error("Error creating point:", error);
        throw error;
    }
  }

  async updatePoint(point: Point): Promise<void> {
    try {
        if (!point.id) {
            throw new Error("Point ID is undefined.");
          }

        const pointRef = doc(firestore, "points", point.id);
        const pointData = { ...point };

        await updateDoc(pointRef, pointData);
        console.log("Point updated with ID:", point.id);
    } catch (error) {
        console.error("Error updating point:", error);
        throw error;
    }
  }

  async deletePoint(pointId: string): Promise<void> {
    try {
        const pointRef = doc(firestore, "points", pointId);
        await deleteDoc(pointRef);
        console.log("Point deleted with ID:", pointId);
    } catch (error) {
        console.error("Error deleting point:", error);
        throw error;
    }
  }

}

export default new PointService();
