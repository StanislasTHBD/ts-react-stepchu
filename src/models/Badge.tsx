import BadgeColor from "./BadgeColor";

interface Badge {
    id?: string;
    name: string; // Nom du badge
    description: string; // Description du badge
    badgeColors: BadgeColor[]; // Couleur du badge
}

export default Badge;