import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData

interface PhysicalActivityProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const PhysicalActivity: React.FC<PhysicalActivityProps> = ({ userData, updateUserData, navigateTo }) => {
  const [practicesActivity, setPracticesActivity] = useState<boolean | null>(userData.practicesActivity);
  const [activityLevel, setActivityLevel] = useState<'Leve' | 'Moderado' | 'Intenso' | null>(userData.activityLevel);
  const [activityLevelError, setActivityLevelError] = useState('');

  useEffect(() => {
    if (practicesActivity === false) {
      setActivityLevel(null); // Reset activity level if "Não" is selected
      updateUserData('activityLevel', null);
    }
  }, [practicesActivity, updateUserData]);

  const handleAdvance = () => {
    if (practicesActivity === true && !activityLevel) {
      setActivityLevelError('Selecione o nível de intensidade da sua atividade.');
      return;
    }
    setActivityLevelError('');
    updateUserData('practicesActivity', practicesActivity);
    updateUserData('activityLevel', activityLevel);
    navigateTo('dailyRoutine');
  };

  const isButtonDisabled = practicesActivity === true && !activityLevel;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-green-600">NutriDigital</div>
          <ProgressBar currentStep={2} totalSteps={5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">Você pratica atividade física regularmente?</h1>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={practicesActivity === true ? 'primary' : 'secondary'}
            onClick={() => setPracticesActivity(true)}
            className={practicesActivity === true ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            Sim
          </Button>
          <Button
            variant={practicesActivity === false ? 'primary' : 'secondary'}
            onClick={() => setPracticesActivity(false)}
            className={practicesActivity === false ? 'bg-gray-400 hover:bg-gray-500' : ''}
          >
            Não
          </Button>
        </div>

        {practicesActivity === true && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Qual o nível de intensidade da sua atividade?</h2>
            <div className="space-y-4">
              <Card
                onClick={() => setActivityLevel('Leve')}
                selected={activityLevel === 'Leve'}
                variant="food-category"
              >
                <h3 className="font-medium text-gray-800">Leve</h3>
                <p className="text-sm text-gray-600">Caminhadas leves, yoga</p>
              </Card>
              <Card
                onClick={() => setActivityLevel('Moderado')}
                selected={activityLevel === 'Moderado'}
                variant="food-category"
              >
                <h3 className="font-medium text-gray-800">Moderado</h3>
                <p className="text-sm text-gray-600">Corrida, musculação moderada</p>
              </Card>
              <Card
                onClick={() => setActivityLevel('Intenso')}
                selected={activityLevel === 'Intenso'}
                variant="food-category"
              >
                <h3 className="font-medium text-gray-800">Intenso</h3>
                <p className="text-sm text-gray-600">HIIT, treinos pesados</p>
              </Card>
            </div>
            {activityLevelError && <p className="text-red-500 text-xs mt-2 text-center">{activityLevelError}</p>}
          </div>
        )}

        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={() => navigateTo('userInfo')}>
            Voltar
          </Button>
          <Button variant="primary" onClick={handleAdvance} disabled={isButtonDisabled}>
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalActivity;