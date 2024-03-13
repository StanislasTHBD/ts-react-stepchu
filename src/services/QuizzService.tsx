import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { firestore } from "../firebase";
import Quizz from "../models/Quizz";

class QuizzService {
    async getAllQuizzes() {
        try {
            const quizzes = await getDocs(collection(firestore, 'quizzes'));
            return quizzes.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Quizz[];
        } catch (error) {
            console.error("Error loading quizzes:", error);
            throw error;
        }
    }

    async createQuizz(quizz: Quizz) {
        try {
            const quizzData = {
                title: quizz.title,
                description: quizz.description,
                questions: quizz.questions,
                badge: quizz.badge,
            };

            const quizzRef = await addDoc(collection(firestore, 'quizzes'), quizzData);
            console.log("Quizz document written with ID:", quizzRef.id);
            window.alert("Le Quizz a été crée avec succès!");
            return quizzRef.id;
        } catch (error) {
            console.error("Error creating quizz:", error);
            throw error;
        }
    }

    async updateQuizz(quizz: Quizz) {
        try {
            const quizzData = {
                title: quizz.title,
                description: quizz.description,
                questions: quizz.questions,
                badge: quizz.badge,
            };

            const quizzRef = doc(firestore, 'quizzes', quizz.id || '');
            await updateDoc(quizzRef, quizzData);
            console.log("Quizz document updated with ID:", quizz.id);
            window.alert("Le Quizz a été modifié avec succès!");
        } catch (error) {
            console.error("Error updating quizz:", error);
            throw error;
        }
    }

    async deleteQuizz(id: string) {
        try {
            const quizzRef = doc(firestore, 'quizzes', id);
            await deleteDoc(quizzRef);
            console.log("Quizz document deleted with ID:", id);
            window.alert("Le Quizz a été supprimé avec succès!");
        } catch (error) {
            console.error("Error deleting quizz:", error);
            throw error;
        }
    }
}

export default new QuizzService();
