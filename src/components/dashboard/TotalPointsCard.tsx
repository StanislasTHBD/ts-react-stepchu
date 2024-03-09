import React, { useEffect, useState } from 'react';
import PointService from '../../services/PointService';
import Point from '../../models/Point';

const TotalPointsCard: React.FC = () => {
  const [totalPoints, setTotalPoints] = useState<number>(0); 

  useEffect(() => {
    const fetchTotalPoints = async () => {
      try {
        const points: Point[] = await PointService.getAllPoints(); 
        setTotalPoints(points.length); 
      } catch (error) {
        console.error('Error fetching total points:', error);
      }
    };

    fetchTotalPoints();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        Points: {totalPoints}
      </div>
    </div>
  );
};

export default TotalPointsCard;
