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
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-green-600">NutriDigital</div>
          <ProgressBar currentStep={3} totalSteps={5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Defina os horários das suas refeições</h1>
        <p className="text-gray-600 mb-8">
          Defina os horários para suas refeições diárias para um plano de dieta mais preciso.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <Coffee size={24} className="text-green-600" />
            <Input
              label="Café da Manhã"
              type="time"
              value={mealTimes.breakfast}
              onChange={(e) => handleTimeChange('breakfast', e.target.value)}
              className="flex-grow"
              labelClassName="sr-only" // Hide label visually, but keep for accessibility
            />
          </div>
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <UtensilsCrossed size={24} className="text-green-600" />
            <Input
              label="Almoço"
              type="time"
              value={mealTimes.lunch}
              onChange={(e) => handleTimeChange('lunch', e.target.value)}
              className="flex-grow"
              labelClassName="sr-only"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <Sandwich size={24} className="text-green-600" />
            <Input
              label="Lanche da Tarde"
              type="time"
              value={mealTimes.snack}
              onChange={(e) => handleTimeChange('snack', e.target.value)}
              className="flex-grow"
              labelClassName="sr-only"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <Soup size={24} className="text-green-600" />
            <Input
              label="Jantar"
              type="time"
              value={mealTimes.dinner}
              onChange={(e) => handleTimeChange('dinner', e.target.value)}
              className="flex-grow"
              labelClassName="sr-only"
            />
          </div>
        </div>
        {timeOrderError && <p className="text-red-500 text-xs mt-2 text-center">{timeOrderError}</p>}

        {/* Dica sobre Rotina */}
        <Card className="p-4 bg-yellow-50 border-yellow-200 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Dica: A importância da rotina alimentar</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Manter horários regulares para suas refeições ajuda a regular seu metabolismo, 
                controlar a fome ao longo do dia e evitar excessos. Tente respeitar os horários 
                que você definiu, com uma variação máxima de 30 minutos para cada refeição.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={() => navigateTo('physicalActivity')}>
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

export default DailyRoutine;