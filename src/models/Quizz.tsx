import Badge from "./Badge";
import QuestionQuizz from "./QuestionQuizz";

interface Quizz {
    id?: string;
    title: string;
    description: string;
    questions: QuestionQuizz[];
    badge: Badge;
}
  
export default Quizz;
  