interface Utilisateur {
    id?: string;
    name: string; // Nom générer par le chu
    securityQuestion?: string; // Question de sécurité choisie par l'utilisateur
    securityAnswer?: string; // Réponse à la question de sécurité
    phoneId?: string; // Récuperation de l'identifiant unique du téléphone de l'utilisateur
}

export default Utilisateur;