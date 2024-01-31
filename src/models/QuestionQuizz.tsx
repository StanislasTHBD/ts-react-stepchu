import QuestionAnswerQuizz from "./QuestionAnswerQuizz";
import Point from "./Point";

interface QuestionQuizz {
    id?: string;
    text: string;
    answers: QuestionAnswerQuizz[];
    point: Point;
}
  
export default QuestionQuizz;
  