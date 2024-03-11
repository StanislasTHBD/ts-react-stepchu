import Quizz from "./Quizz";

interface Evenement {
    id?: string;
    name: string;
    description: string;
    steps: string;
    Quizzes : Quizz[];
    quantity: number;
    dateDebut: Date;
    dateFin: Date;
}
  
export default Evenement;
