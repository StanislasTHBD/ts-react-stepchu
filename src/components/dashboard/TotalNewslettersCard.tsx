import React, { useEffect, useState } from "react";
import NewsletterService from "../../services/NewsletterService";

const TotalNewslettersCard: React.FC = () => {
  const [totalNewsletters, setTotalNewsletters] = useState<number>(0);

  useEffect(() => {
    const fetchTotalNewsletters = async () => {
      try {
        const newsletters = await NewsletterService.getAllNewsletters();
        if (newsletters) {
          setTotalNewsletters(newsletters.length);
        }
      } catch (error) {
        console.error("Error fetching total newsletters:", error);
      }
    };

    fetchTotalNewsletters();
  }, []);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 min-w-min">
      <div className="bg-custom-blue text-custom-secondary rounded-lg shadow-md p-6">
        <p className="text-2xl">Newsletters</p>
        <p className="text-3xl m-4 text-left md:text-right">
          {totalNewsletters}
        </p>
      </div>
    </div>
  );
};

export default TotalNewslettersCard;
