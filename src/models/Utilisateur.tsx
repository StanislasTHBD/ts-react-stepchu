import Badge from "./Badge";
import CompletedQuizz from "./CompletedQuizz";
import QuestionSecurity from "./QuestionSecurity";

interface Utilisateur {
    id?: string;
    name: string; // Nom générer par le chu
    securityQuestion?: QuestionSecurity; // ID de la question de sécurité choisie par l'utilisateur
    securityAnswer?: string; // Réponse à la question de sécurité
    phoneId?: string; // Récuperation de l'identifiant unique du téléphone de l'utilisateur
    badges: Badge[]; // Badges obtenus par l'utilisateur
    completedQuizz: CompletedQuizz[]; // Tableau des quizz complétés par l'utilisateur

}

export default Utilisateur;