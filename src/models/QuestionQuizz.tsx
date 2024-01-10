import QuestionAnswerQuizz from "./QuestionAnswerQuizz";

interface QuestionQuizz {
    id?: string;
    text: string;
    answers: QuestionAnswerQuizz[];
}
  
export default QuestionQuizz;
  