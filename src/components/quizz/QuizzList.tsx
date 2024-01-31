import Quizz from '../../models/Quizz';

function QuizzList({
  quizzes,
  onEdit,
  onDelete
}: {
  quizzes: Quizz[];
  onEdit: (quizz: Quizz) => void;
  onDelete: (id: string) => void;
}) {
  const handleDeleteClick = (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce quizz ?");
    if (confirmation) {
      onDelete(id);
    }
  };

  return (
    <div className={`grid ${quizzes.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {quizzes.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-center">Aucun quizz</p>
        </div>
      ) : (
        quizzes.map((quizz) => (
          <div key={quizz.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold">{quizz.title}</p>
            <p className="text-sm text-gray-600">Description : {quizz.description}</p>
            <p className="text-sm text-gray-600">Badge : {quizz.badge?.name}</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                onClick={() => onEdit(quizz)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                onClick={() => handleDeleteClick(quizz.id as string)}>
                Supprimer
              </button>
            </div>
            {quizz.questions.map((question, questionIndex) => (
              <div key={`${question.id}-${questionIndex}`} className="mt-4">
                <p className="text-sm text-gray-600"><span className="text-lg font-semibold">{questionIndex + 1} : </span>{question.text}</p>
                <p className="text-sm text-gray-600">Difficulté : {question.point?.name}</p>
                <p className="text-sm text-gray-600">Nombre de points : {question.point?.number}</p>
                <ul>
                  {question.answers.map((answer, answerIndex) => (
                    <li key={`${question.id}-${answerIndex}`}>
                      {answer.isCorrect ? (
                        <span className="text-green-600">✅ {answer.text}</span>
                      ) : (
                        <span className="text-red-600">❌ {answer.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default QuizzList;
