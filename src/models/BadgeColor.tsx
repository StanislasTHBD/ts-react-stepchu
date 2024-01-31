interface BadgeColor {
    id?: string;
    type: string; // Type de couleur (ex: "bronze")
    minPoints: number; // Valeur minimale de points
    maxPoints: number; // Valeur maximale de points
    image?: string; // Image de la couleur (optionnelle, stockée en SVG)
}

export default BadgeColor;