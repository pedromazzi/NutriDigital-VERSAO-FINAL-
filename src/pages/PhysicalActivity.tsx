import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData } from '@/types'; // Importar a interface UserData do types/index.ts
import { Check, Activity, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="min-h-screen bg-gray-50 px-5 py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="text-primary text-2xl font-bold">NutriDigital</div>
        <ProgressBar currentStep={2} totalSteps={5} />
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">Você pratica atividade física regularmente?</h1>

      <div className="grid grid-cols-2 gap-3 mb-8 w-full">
        {/* Sim */}
        <button
          onClick={() => {
            setPracticesActivity(true);
            setActivityLevelError(''); // Clear error when selecting "Sim"
          }}
          className={cn(
            "p-4 border rounded-lg cursor-pointer font-semibold flex items-center justify-center gap-2 transition-all",
            practicesActivity === true 
              ? 'border-2 border-primary bg-primary/10' 
              : 'border-gray-200 hover:border-primary/50'
          )}
        >
          <Activity className="w-5 h-5" />
          Sim
        </button>

        {/* Não */}
        <button
          onClick={() => {
            setPracticesActivity(false);
            setActivityLevel(null); // Limpar seleção de nível
            setActivityLevelError(''); // Clear error when selecting "Não"
          }}
          className={cn(
            "p-4 border rounded-lg cursor-pointer font-semibold flex items-center justify-center gap-2 transition-all",
            practicesActivity === false 
              ? 'border-2 border-primary bg-primary/10' 
              : 'border-gray-200 hover:border-primary/50'
          )}
        >
          <Ban className="w-5 h-5" />
          Não
        </button>
      </div>
      {practicesActivity === null && activityLevelError && <p className="text-red-500 text-sm mt-2 text-center">{activityLevelError}</p>}


      {practicesActivity === true && (
        <div className="mb-8 animate-fadeIn w-full">
          <h2 className="text-xl font-semibold text-text-primary mb-4 text-center">Qual o nível de intensidade da sua atividade?</h2>
          <div className="flex flex-col gap-3">
            {activityLevelsOptions.map((level) => (
              <Card
                key={level.value}
                onClick={() => {
                  setActivityLevel(level.value);
                  setActivityLevelError(''); // Clear error when selecting a level
                }}
                selected={activityLevel === level.value}
                variant="outlined"
                className="flex items-center justify-between p-4"
              >
                <div>
                  <h3 className="font-medium text-text-primary text-base">{level.label}</h3>
                  <p className="text-sm text-text-secondary">{level.description}</p>
                </div>
                {activityLevel === level.value && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                    <Check size={16} />
                  </div>
                )}
              </Card>
            ))}
          </div>
          {activityLevelError && <p className="text-red-500 text-sm mt-2 text-center">{activityLevelError}</p>}
        </div>
      )}

      <div className="flex gap-3 mt-10 w-full">
        <Button variant="secondary" onClick={() => navigateTo('userInfo')} className="flex-1 py-3.5">
          Voltar
        </Button>
        <Button variant="primary" onClick={handleAdvance} disabled={isButtonDisabled} className="flex-[2] py-3.5">
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default PhysicalActivity;