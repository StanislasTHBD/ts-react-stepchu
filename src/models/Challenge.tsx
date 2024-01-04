import Utilisateur from "./Utilisateur";

interface Challenge {
    id?: string;
    name: string;
    description: string;
    participants?: Utilisateur[];
}

export default Challenge;