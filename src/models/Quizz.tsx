import QuestionQuizz from "./QuestionQuizz";

interface Quizz {
    id?: string;
    title: string;
    description: string;
    questions: QuestionQuizz[];
}
  
export default Quizz;
  