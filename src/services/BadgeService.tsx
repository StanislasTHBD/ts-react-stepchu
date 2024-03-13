import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { firestore } from "../firebase";
import Badge from "../models/Badge";

class BadgeService {
    async getAllBadges() {
        try {
            const badges = await getDocs(collection(firestore, 'badges'));
            return badges.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Badge[];
        } catch (error) {
            console.error("Error loading badges:", error);
            throw error;
        }
    }

    async createBadge(badge: Badge) {
      try {
        const badgeData = {
          name: badge.name,
          description: badge.description,
          badgeColors: badge.badgeColors.map((color) => ({
            type: color.type,
            minPoints: color.minPoints,
            maxPoints: color.maxPoints,
            image: color.image,
          })),
        };
        const badgeRef = await addDoc(collection(firestore, 'badges'), badgeData);
        console.log("Document written with ID:", badgeRef.id);
        window.alert("Le Badge a été crée avec succès!");
        return badgeRef.id;
      } catch (error) {
        console.error("Error creating badge:", error);
        throw error;
      }
    }
  
    async updateBadge(badge: Badge) {
      try {
        const badgeData = {
          name: badge.name,
          description: badge.description,
          badgeColors: badge.badgeColors.map((color) => ({
            type: color.type,
            minPoints: color.minPoints,
            maxPoints: color.maxPoints,
            image: color.image,
          })),
        };
        const badgeRef = doc(firestore, 'badges', badge.id || '');
        await updateDoc(badgeRef, badgeData);
        console.log("Document updated with ID:", badge.id);
        window.alert("Le Badge a été modifié avec succès!");
      } catch (error) {
        console.error("Error updating badge:", error);
        throw error;
      }
    }
    
    async deleteBadge(id: string) {
        try {
            const badgeRef = doc(firestore, 'badges', id);
            await deleteDoc(badgeRef);
            console.log("Document written with ID:", id);
            window.alert("Le Badge a été supprimé avec succès!");
        } catch (error) {
            console.error("Error deleting badge:", error);
            throw error;
        }
    }
}

export default new BadgeService();