import React, { useEffect, useState } from "react";
import StepService from "../../services/StepService";
import Steps from "../../models/Steps";

const TotalStepsCard: React.FC = () => {
  const [totalSteps, setTotalSteps] = useState<number>(0);

  useEffect(() => {
    const fetchTotalSteps = async () => {
      try {
        const steps: Steps[] = await StepService.getAllSteps();
        let totalCount = 0;
        steps.forEach((step) => {
          totalCount += step.steps;
        });
        setTotalSteps(totalCount);
      } catch (error) {
        console.error("Error fetching total steps:", error);
      }
    };

    fetchTotalSteps();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 min-w-min">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        <p className="text-2xl">Total Steps</p>
        <p className="text-3xl m-4 text-left md:text-right ">{totalSteps}</p>
      </div>
    </div>
  );
};

export default TotalStepsCard;
