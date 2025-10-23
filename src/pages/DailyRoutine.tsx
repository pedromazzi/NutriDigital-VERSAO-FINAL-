import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card'; // Importar o componente Card
import { UserData } from '@/App'; // Importar a interface UserData
import { validateMealTimesOrder } from '@/utils/validation';
import { Coffee, UtensilsCrossed, Sandwich, Soup } from 'lucide-react';

interface DailyRoutineProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const DailyRoutine: React.FC<DailyRoutineProps> = ({ userData, updateUserData, navigateTo }) => {
  const [mealTimes, setMealTimes] = useState(userData.mealTimes);
  const [timeOrderError, setTimeOrderError] = useState('');

  useEffect(() => {
    const allTimesFilled = Object.values(mealTimes).every(time => time !== '');
    if (allTimesFilled) {
      if (!validateMealTimesOrder(mealTimes)) {
        setTimeOrderError('Os horários das refeições devem estar em ordem cronológica.');
      } else {
        setTimeOrderError('');
      }
    } else {
      setTimeOrderError(''); // Clear error if not all times are filled yet
    }
  }, [mealTimes]);

  const handleTimeChange = (meal: keyof typeof mealTimes, value: string) => {
    setMealTimes(prev => ({ ...prev, [meal]: value }));
  };

  const handleAdvance = () => {
    const allTimesFilled = Object.values(mealTimes).every(time => time !== '');
    if (!allTimesFilled) {
      setTimeOrderError('Todos os horários das refeições devem ser preenchidos.');
      return;
    }

    if (!validateMealTimesOrder(mealTimes)) {
      setTimeOrderError('Os horários das refeições devem estar em ordem cronológica.');
      return;
    }

    updateUserData('mealTimes', mealTimes);
    navigateTo('goals');
  };

  const isButtonDisabled = !Object.values(mealTimes).every(time => time !== '') || timeOrderError !== '';

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg-primary px-5 py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="text-primary text-2xl font-bold">NutriDigital</div>
        <ProgressBar currentStep={3} totalSteps={5} />
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">Defina os horários das suas refeições</h1>
      <p className="text-base text-text-secondary mb-8 text-center">
        Defina os horários para suas refeições diárias para um plano de dieta mais preciso.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 w-full">
        <Card className="flex items-center gap-3 p-5 bg-white rounded-lg border border-border-light shadow-card">
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-2xl">
            <Coffee size={24} className="text-primary" />
          </div>
          <Input
            label="Café da Manhã"
            type="time"
            value={mealTimes.breakfast}
            onChange={(e) => handleTimeChange('breakfast', e.target.value)}
            className="flex-grow"
            labelClassName="sr-only" // Hide label visually, but keep for accessibility
          />
        </Card>
        <Card className="flex items-center gap-3 p-5 bg-white rounded-lg border border-border-light shadow-card">
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-2xl">
            <UtensilsCrossed size={24} className="text-primary" />
          </div>
          <Input
            label="Almoço"
            type="time"
            value={mealTimes.lunch}
            onChange={(e) => handleTimeChange('lunch', e.target.value)}
            className="flex-grow"
            labelClassName="sr-only"
          />
        </Card>
        <Card className="flex items-center gap-3 p-5 bg-white rounded-lg border border-border-light shadow-card">
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-2xl">
            <Sandwich size={24} className="text-primary" />
          </div>
          <Input
            label="Lanche da Tarde"
            type="time"
            value={mealTimes.snack}
            onChange={(e) => handleTimeChange('snack', e.target.value)}
            className="flex-grow"
            labelClassName="sr-only"
          />
        </Card>
        <Card className="flex items-center gap-3 p-5 bg-white rounded-lg border border-border-light shadow-card">
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-2xl">
            <Soup size={24} className="text-primary" />
          </div>
          <Input
            label="Jantar"
            type="time"
            value={mealTimes.dinner}
            onChange={(e) => handleTimeChange('dinner', e.target.value)}
            className="flex-grow"
            labelClassName="sr-only"
          />
        </Card>
      </div>
      {timeOrderError && <p className="text-red-500 text-sm mt-2 text-center">{timeOrderError}</p>}

      {/* Dica sobre Rotina */}
      <Card className="p-5 bg-tips-general-bg border border-tips-general-border rounded-lg mb-8 w-full">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-text-primary text-base mb-2">Dica: A importância da rotina alimentar</h4>
            <p className="text-sm leading-relaxed text-text-secondary">
              Manter horários regulares para suas refeições ajuda a regular seu metabolismo, 
              controlar a fome ao longo do dia e evitar excessos. Tente respeitar os horários 
              que você definiu, com uma variação máxima de 30 minutos para cada refeição.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex gap-3 mt-10 w-full">
        <Button variant="secondary" onClick={() => navigateTo('physicalActivity')} className="flex-1 py-3.5">
          Voltar
        </Button>
        <Button variant="primary" onClick={handleAdvance} disabled={isButtonDisabled} className="flex-[2] py-3.5">
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default DailyRoutine;