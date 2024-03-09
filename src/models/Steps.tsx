import Utilisateur from "./Utilisateur";

interface Steps {
    id?: string;
    date: Date; 
    steps: number; 
    user: Utilisateur;
}

export default Steps;
