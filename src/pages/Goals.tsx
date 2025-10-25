import React, { useState } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData
import { Scale, Dumbbell, Heart, Check } from 'lucide-react'; // Importar Check para o card selecionado
import { cn } from '@/lib/utils';

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-5 py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="text-primary text-2xl font-bold">NutriDigital</div>
        <ProgressBar currentStep={4} totalSteps={5} />
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">Qual é o seu principal objetivo?</h1>
      <p className="text-base text-text-secondary mb-8 text-center">
        Selecione uma das opções abaixo para começar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 w-full">
        <Card
          onClick={() => setSelectedGoal('Emagrecimento')}
          selected={selectedGoal === 'Emagrecimento'}
          variant="elevated"
          className="relative p-6 text-center"
        >
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto",
            selectedGoal === 'Emagrecimento' ? 'bg-primary-light text-primary' : 'bg-gray-100 text-text-primary'
          )}>
            <Scale size={36} />
          </div>
          <h3 className="font-semibold text-xl text-text-primary mb-2">Emagrecimento</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Planos focados em déficit calórico para uma perda de peso saudável e sustentável.
          </p>
          {selectedGoal === 'Emagrecimento' && (
            <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-base font-bold">
              <Check size={16} />
            </div>
          )}
        </Card>
        <Card
          onClick={() => setSelectedGoal('Ganho de Massa')}
          selected={selectedGoal === 'Ganho de Massa'}
          variant="elevated"
          className="relative p-6 text-center"
        >
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto",
            selectedGoal === 'Ganho de Massa' ? 'bg-primary-light text-primary' : 'bg-gray-100 text-text-primary'
          )}>
            <Dumbbell size={36} />
          </div>
          <h3 className="font-semibold text-xl text-text-primary mb-2">Ganho de Massa</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Dietas com superávit calórico e alta proteína para maximizar o ganho de massa muscular.
          </p>
          {selectedGoal === 'Ganho de Massa' && (
            <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-base font-bold">
              <Check size={16} />
            </div>
          )}
        </Card>
        <Card
          onClick={() => setSelectedGoal('Manutenção')}
          selected={selectedGoal === 'Manutenção'}
          variant="elevated"
          className="relative p-6 text-center"
        >
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto",
            selectedGoal === 'Manutenção' ? 'bg-primary-light text-primary' : 'bg-gray-100 text-text-primary'
          )}>
            <Heart size={36} />
          </div>
          <h3 className="font-semibold text-xl text-text-primary mb-2">Manutenção</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Alimentação balanceada para manter seu peso atual com saúde e energia.
          </p>
          {selectedGoal === 'Manutenção' && (
            <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-base font-bold">
              <Check size={16} />
            </div>
          )}
        </Card>
      </div>

      {selectedGoal && (
        <Card className="p-5 bg-primary-light border border-primary rounded-lg mb-8 animate-fadeIn w-full">
          <h3 className="text-base font-semibold text-text-primary mb-2">
            Dica para {selectedGoal}
          </h3>
          <p className="text-sm leading-relaxed text-text-primary">
            {selectedGoal === 'Emagrecimento' && 'Para emagrecer, foque em um déficit calórico moderado e aumente a ingestão de proteínas e fibras para saciedade.'}
            {selectedGoal === 'Ganho de Massa' && 'Para ganhar massa, priorize um superávit calórico com alta ingestão de proteínas e carboidratos complexos.'}
            {selectedGoal === 'Manutenção' && 'Para manter o peso, equilibre sua ingestão calórica com seu gasto energético, mantendo uma dieta variada.'}
          </p>
        </Card>
      )}

      <div className="flex gap-3 mt-10 w-full">
        <Button variant="secondary" onClick={() => navigateTo('dailyRoutine')} className="flex-1 py-3.5">
          Voltar
        </Button>
        <Button fullWidth onClick={handleContinue} disabled={isButtonDisabled} className="flex-[2] py-3.5">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Goals;