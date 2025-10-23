import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData
import { Check } from 'lucide-react'; // Importar ícone de check

interface PhysicalActivityProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const PhysicalActivity: React.FC<PhysicalActivityProps> = ({ userData, updateUserData, navigateTo }) => {
  const [practicesActivity, setPracticesActivity] = useState<boolean | null>(userData.practicesActivity);
  const [activityLevel, setActivityLevel] = useState<UserData['activityLevel']>(userData.activityLevel);
  const [activityLevelError, setActivityLevelError] = useState('');

  useEffect(() => {
    if (practicesActivity === false) {
      setActivityLevel(null); // Reset activity level if "Não" is selected
      updateUserData('activityLevel', null);
    }
  }, [practicesActivity, updateUserData]);

  const handleAdvance = () => {
    if (practicesActivity === null) {
      setActivityLevelError('Selecione se você pratica atividade física.');
      return;
    }
    
    if (practicesActivity === true && !activityLevel) {
      setActivityLevelError('Selecione o nível de intensidade da sua atividade.');
      return;
    }
    setActivityLevelError('');
    updateUserData('practicesActivity', practicesActivity);
    updateUserData('activityLevel', practicesActivity ? activityLevel : null);
    navigateTo('dailyRoutine');
  };

  const isButtonDisabled = practicesActivity === null || (practicesActivity === true && !activityLevel);

  const activityLevelsOptions: {
    value: UserData['activityLevel'];
    label: string;
    description: string;
  }[] = [
    {
      value: 'Sedentario',
      label: 'Sedentário',
      description: 'Pouca ou nenhuma atividade física'
    },
    {
      value: 'Leve',
      label: 'Leve',
      description: 'Caminhadas leves, yoga'
    },
    {
      value: 'Moderado',
      label: 'Moderado',
      description: 'Corrida, musculação moderada'
    },
    {
      value: 'Intenso',
      label: 'Intenso',
      description: 'HIIT, treinos pesados'
    },
    {
      value: 'Muito Intenso',
      label: 'Muito Intenso',
      description: 'Treinos diários intensos, atletas'
    }
  ];

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
            onClick={() => {
              setPracticesActivity(true);
              setActivityLevelError(''); // Clear error when selecting "Sim"
            }}
            className={practicesActivity === true ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            Sim
          </Button>
          <Button
            variant={practicesActivity === false ? 'primary' : 'secondary'}
            onClick={() => {
              setPracticesActivity(false);
              setActivityLevel(null); // Limpar seleção de nível
              setActivityLevelError(''); // Clear error when selecting "Não"
            }}
            className={practicesActivity === false ? 'bg-gray-400 hover:bg-gray-500' : ''}
          >
            Não
          </Button>
        </div>
        {practicesActivity === null && activityLevelError && <p className="text-red-500 text-xs mt-2 text-center">{activityLevelError}</p>}


        {practicesActivity === true && (
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Qual o nível de intensidade da sua atividade?</h2>
            <div className="space-y-4">
              {activityLevelsOptions.map((level) => (
                <Card
                  key={level.value}
                  onClick={() => {
                    setActivityLevel(level.value);
                    setActivityLevelError(''); // Clear error when selecting a level
                  }}
                  selected={activityLevel === level.value}
                  variant="goal" // Usando variant="goal" para um estilo de seleção claro
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{level.label}</h3>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                  {activityLevel === level.value && (
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white">
                      <Check size={16} />
                    </div>
                  )}
                </Card>
              ))}
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