import React, { useEffect, useState } from "react";
import Badge from "../../models/Badge";
import BadgeService from "../../services/BadgeService";

const TotalBadgesCard: React.FC = () => {
  const [totalBadges, setTotalBadges] = useState<number>(0);

  useEffect(() => {
    const fetchTotalBadges = async () => {
      try {
        const badges: Badge[] = await BadgeService.getAllBadges();
        setTotalBadges(badges.length);
      } catch (error) {
        console.error("Error fetching total badges:", error);
      }
    };

    fetchTotalBadges();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 min-w-min">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        <p className="text-2xl">Badges</p>
        <p className="text-3xl m-4 text-left md:text-right">{totalBadges}</p>
      </div>
    </div>
  );
};

export default TotalBadgesCard;
