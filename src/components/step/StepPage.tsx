import { useEffect, useState } from 'react';
import Steps from '../../models/Steps';
import StepService from '../../services/StepService';
import StepList from './StepList';


function StepPage() {
    const [steps, setSteps] = useState<Steps[]>([]);
 
    useEffect(() => {
        fetchSteps();
    }, []);

    const fetchSteps = async () => {
        try {
            const stepsData = await StepService.getAllSteps();
            if (stepsData !== undefined) {
                setSteps(stepsData as Steps[]);
            } else {
                console.log("stepsData is empty");
            }
        } catch (error) {
            console.error("Error loading steps:", error);
        }
    };

  return (
    <div className='p-4'>
        <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste Steps</h1>
        <StepList steps={steps} />
    </div>
  )
}

export default StepPage