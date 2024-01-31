import Quizz from "./Quizz";

interface CompletedQuizz {
    quizz: Quizz; // Référence au quizz complété
    userPoints: number; // Points obtenus par l'utilisateur pour ce quizz
}

export default CompletedQuizz;
