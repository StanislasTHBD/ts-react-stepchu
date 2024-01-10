import React, { useState, useEffect } from 'react';
import QuizzService from '../../services/QuizzService';
import Quizz from '../../models/Quizz';

function QuizzForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: Quizz | null;
}) {
  const initialFormData: Quizz = initialData || {
    id: '',
    title: '',
    description: '',
    questions: [{ id: '', text: '', answers: [{ id: '', text: '', isCorrect: false }] }],
  };

  const [formData, setFormData] = useState<Quizz>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    const { value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].text = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    const { value, type, checked } = e.target;

    const updatedQuestions = [...formData.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];

    if (type === 'checkbox') {
      updatedAnswers[answerIndex].isCorrect = checked;
    } else {
      updatedAnswers[answerIndex].text = value;
    }

    updatedQuestions[questionIndex].answers = updatedAnswers;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    const updatedQuestions = [...formData.questions, { id: '', text: '', answers: [{ id: '', text: '', isCorrect: false }] }];
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const removeQuestion = (questionIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(questionIndex, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addAnswerChoice = (questionIndex: number) => {
    const updatedQuestions = [...formData.questions];
    const currentQuestion = updatedQuestions[questionIndex];
    if (currentQuestion.answers.length < 4) {
      currentQuestion.answers.push({ id: '', text: '', isCorrect: false });
      setFormData({ ...formData, questions: updatedQuestions });
    }
  };  

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...formData.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];

    updatedAnswers.splice(answerIndex, 1);

    updatedQuestions[questionIndex].answers = updatedAnswers;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const validateAndSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      formData.questions.length < 1 ||
      formData.questions.some(
        (question) =>
          !question.text ||
          question.answers.length < 2 ||
          question.answers.some((answer) => !answer.text)
      )
    ) {
      console.error("All fields must be filled, and each question must have between 2 and 4 answers with non-empty text.");
      return;
    }

    const invalidQuestions = formData.questions.filter(
      (question) => question.answers.length < 2 || question.answers.length > 4
    );

    if (invalidQuestions.length > 0) {
      console.error("Each question must have between 2 and 4 answers.");
      return;
    }

    if (formData.questions.some((question) => !question.answers.some((answer) => answer.isCorrect))) {
      console.error("At least one correct answer must be selected for each question.");
      return;
    }

    if (formData.questions.some((question) => !question.answers.some((answer) => answer.isCorrect === false))) {
      console.error("At least one answer in each question must be marked as 'false'.");
      return;
    }

    try {
      setIsLoading(true);
      if (initialData) {
        await QuizzService.updateQuizz(formData);
      } else {
        const createdQuizz = await QuizzService.createQuizz(formData);
        formData.id = createdQuizz;
      }

      onClose();
      clearForm();
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndSubmit();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} flex items-center justify-center`}>
      <div className={`${isLoading ? 'bg-orange-500' : 'bg-white'} modal-dialog p-4 shadow-md rounded-md`}>
        <div className="modal-content">
          {isLoading ? (
            <div className="text-center text-black">Chargement en cours...</div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4">
              <div className="modal-header flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {initialData ? 'Modifier Quizz' : 'Créer Quizz'}
                </h3>
                <button
                  type="button"
                  className="modal-close text-gray-500 hover:text-gray-600"
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Titre :
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    autoComplete="title"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Description :
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    autoComplete="description"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  {formData.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-4">
                      <label
                        htmlFor={`question-${questionIndex}`}
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Questions :
                      </label>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(e, questionIndex)}
                        placeholder={`Question ${questionIndex + 1}`}
                        id={`question-${questionIndex}`}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <div className="mt-4">
                        <p className="block text-gray-700 text-sm font-bold mb-2">
                          Réponses :
                        </p>
                      </div>
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="mb-2">
                          <div className="flex items-center mb-2">
                            <input
                              type="text"
                              value={answer.text}
                              onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)}
                              name={`answer-${questionIndex}-${answerIndex}`}
                              placeholder={`Réponse ${answerIndex + 1}`}
                              id={`answer-${questionIndex}-${answerIndex}`}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeAnswer(questionIndex, answerIndex)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ❌
                            </button>
                          </div>
                          <label className="ml-2">
                            <input
                              type="checkbox"
                              checked={answer.isCorrect}
                              onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)}
                              name={`correct-answer-${questionIndex}-${answerIndex}`}
                              className="mr-1"
                            />
                            Correcte
                          </label>
                        </div>
                      ))}
                      {question.answers.length < 4 && (
                        <button
                          type="button"
                          onClick={() => addAnswerChoice(questionIndex)}
                          className="mt-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                        >
                          Ajouter une réponse
                        </button>
                      )}
                      {formData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(questionIndex)}
                          className="mt-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
                        >
                          Supprimer la question
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.questions.length < 4 && (
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="mt-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700"
                    >
                      Ajouter une question
                    </button>
                  )}
                </div>
              </div>
              <div className="modal-footer flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  {initialData ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600"
                  onClick={onClose}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizzForm;
