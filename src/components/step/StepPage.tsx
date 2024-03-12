import { useEffect, useState } from 'react';
import Steps from '../../models/Steps';
import Utilisateur from '../../models/Utilisateur';
import StepService from '../../services/StepService';
import StepList from './StepList';
import ExportStepsToExcel from './ExportStepsToExcel';
import UtilisateurService from '../../services/UtilisateurService';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function StepPage() {
    const [steps, setSteps] = useState<Steps[]>([]);
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSteps();
        fetchUtilisateurs();
    }, []);

    const fetchSteps = async () => {
        try {
            const stepsData = await StepService.getAllSteps();
            if (stepsData !== undefined) {
                const stepsWithUsers = await Promise.all(stepsData.map(async (step) => {
                    const user = await StepService.getUserForStep(step.userId);
                    return { ...step, user };
                }));
                setSteps(stepsWithUsers);
            } else {
                console.log("stepsData is empty");
            }
        } catch (error) {
            console.error("Error loading steps:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUtilisateurs = async () => {
        try {
            const utilisateursData = await UtilisateurService.getAllUtilisateurs();
            setUtilisateurs(utilisateursData);
        } catch (error) {
            console.error("Error loading utilisateurs:", error);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className='p-4'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4 text-custom-secondary">Liste Steps</h1>
                <ExportStepsToExcel />
            </div>
            <StepList steps={steps} utilisateurs={utilisateurs} />
        </div>
    );
}

export default StepPage;
