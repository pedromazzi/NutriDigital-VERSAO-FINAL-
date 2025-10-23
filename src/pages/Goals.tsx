import React, { useState } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData
import { Scale, Dumbbell, Heart } from 'lucide-react';

interface GoalsProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const Goals: React.FC<GoalsProps> = ({ userData, updateUserData, navigateTo }) => {
  const [selectedGoal, setSelectedGoal] = useState<'Emagrecimento' | 'Ganho de Massa' | 'Manutenção' | null>(userData.goal);

  const handleContinue = () => {
    if (selectedGoal) {
      updateUserData('goal', selectedGoal);
      navigateTo('foodPreferences');
    }
  };

  const isButtonDisabled = selectedGoal === null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-green-600">NutriDigital</div>
          <ProgressBar currentStep={4} totalSteps={5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Qual é o seu principal objetivo?</h1>
        <p className="text-gray-600 mb-8">
          Selecione uma das opções abaixo para começar.
        </p>

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 mb-8">
          <Card
            onClick={() => setSelectedGoal('Emagrecimento')}
            selected={selectedGoal === 'Emagrecimento'}
            variant="goal"
            className="flex flex-col items-center text-center p-6"
          >
            <Scale size={36} className="text-green-600 mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Emagrecimento</h3>
            <p className="text-sm text-gray-600">
              Planos focados em déficit calórico para uma perda de peso saudável e sustentável.
            </p>
          </Card>
          <Card
            onClick={() => setSelectedGoal('Ganho de Massa')}
            selected={selectedGoal === 'Ganho de Massa'}
            variant="goal"
            className="flex flex-col items-center text-center p-6"
          >
            <Dumbbell size={36} className="text-green-600 mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Ganho de Massa</h3>
            <p className="text-sm text-gray-600">
              Dietas com superávit calórico e alta proteína para maximizar o ganho de massa muscular.
            </p>
          </Card>
          <Card
            onClick={() => setSelectedGoal('Manutenção')}
            selected={selectedGoal === 'Manutenção'}
            variant="goal"
            className="flex flex-col items-center text-center p-6"
          >
            <Heart size={36} className="text-green-600 mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Manutenção</h3>
            <p className="text-sm text-gray-600">
              Alimentação balanceada para manter seu peso atual com saúde e energia.
            </p>
          </Card>
        </div>

        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={() => navigateTo('dailyRoutine')}>
            Voltar
          </Button>
          <Button fullWidth={false} onClick={handleContinue} disabled={isButtonDisabled}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Goals;