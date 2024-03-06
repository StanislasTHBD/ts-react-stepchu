import Newsletter from "../../models/Newsletter";

function NewsletterList({
  newsletters,
  onEdit,
  onDelete
}: {
  newsletters: Newsletter[];
  onEdit: (newsletter: Newsletter) => void;
  onDelete: (id: string, pdfUrl: string | null) => void;
}) {
  const handleDeleteClick = (id: string, pdfUrl: string | null) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette newsletter ?");
    if (confirmation) {
      onDelete(id, pdfUrl);
    }
  };
  
  return (
    <div className={`grid ${newsletters.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-4 mt-4`}>
      {newsletters.length === 0 ? (
        <div className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold text-center text-custom-secondary">Aucune newsletter</p>
        </div>
      ) : (
        newsletters.map((newsletter) => (
          <div key={newsletter.id} className="bg-custom-blue bg-opacity-80 shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold text-custom-secondary">{newsletter.name}</p>
            <p className="text-custom-secondary">{newsletter.description}</p>
            <div className="mt-2">
              <button
                className="bg-green-500 text-custom-secondary px-4 py-2 rounded hover:bg-green-700 mr-2"
                onClick={() => {
                  if (newsletter.pdfUrl) {
                    window.open(newsletter.pdfUrl, '_blank');
                  } else {
                    console.error("pdfUrl is undefined");
                  }
                }}
              >
                Voir PDF
              </button>
              <button
                className="bg-custom-orange text-custom-secondary px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
                onClick={() => onEdit(newsletter)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-custom-secondary px-4 py-2 rounded hover:bg-red-700 mt-2"
                onClick={() => {
                  if (newsletter.pdfUrl !== undefined) {
                    handleDeleteClick(newsletter.id as string, newsletter.pdfUrl);
                  } else {
                    console.error("pdfUrl is undefined");
                  }
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NewsletterList;
