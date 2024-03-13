import React, { useEffect, useState } from "react";
import PointService from "../../services/PointService";
import Point from "../../models/Point";

const TotalPointsCard: React.FC = () => {
  const [totalPoints, setTotalPoints] = useState<number>(0);

  useEffect(() => {
    const fetchTotalPoints = async () => {
      try {
        const points: Point[] = await PointService.getAllPoints();
        setTotalPoints(points.length);
      } catch (error) {
        console.error("Error fetching total points:", error);
      }
    };

    fetchTotalPoints();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 min-w-min">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        <p className="text-2xl">Points</p>
        <p className="text-3xl m-4 text-left md:text-right">{totalPoints}</p>
      </div>
    </div>
  );
};

export default TotalPointsCard;
