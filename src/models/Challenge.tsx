import Badge from "./Badge";
import Utilisateur from "./Utilisateur";

interface Challenge {
    id?: string;
    name: string;
    description: string;
    participants?: Utilisateur[];
    badge: Badge;
    startDate: string;
    endDate: string;
}

export default Challenge;