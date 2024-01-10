function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold mb-6 text-center">
          À Propos
        </h1>
        <div className="text-gray-800">
          <p className="mb-6">
            Bienvenue sur le tableau de bord réservé aux administrateurs de notre application StepCHU !
          </p>
          <p className="mb-6">
          Notre objectif principal est de simplifier la gestion des challenges basés sur le nombre de pas. Avec notre tableau de bord, vous bénéficiez d'un outil puissant qui facilite l'administration de l'application de manière efficace, tout en offrant des fonctionnalités avancées pour superviser les défis et gérer les comptes des utilisateurs.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <p className="mb-6">
            Le tableau de bord que nous proposons offre une gamme complète de fonctionnalités avancées. Vous pouvez non seulement superviser les défis et gérer les comptes des utilisateurs, mais également profiter d'autres fonctionnalités essentielles pour une gestion totale de l'application. Notre mission est de vous simplifier la tâche et de vous permettre de gérer l'application de manière optimale.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Concepteur Développeur d'Application</h3>
              <p>Nom du Développeur 1</p>
              <p>Nom du Développeur 2</p>
              <p>Nom du Développeur 3</p>
              <p>Nom du Développeur 4</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Chef de Projet Digital</h3>
              <p>Nom du Chef de Projet Digital 1</p>
              <p>Nom du Chef de Projet Digital 2</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 mt-6">Contactez-Nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-center">Email : <span className='text-indigo-600'>admin@stepchu.com</span></p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-center">Téléphone : <span className='text-indigo-600'>+33 123 456 789</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
