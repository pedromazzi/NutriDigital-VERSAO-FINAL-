import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { UserData } from '@/App'; // Importar a interface UserData
import { validateMealTimesOrder } from '@/utils/validation';
import { Coffee, UtensilsCrossed, Cookie, Moon } from 'lucide-react'; // Importar ícones Lucide

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
    <div className="min-h-screen bg-gray-50 px-5 py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="text-primary text-2xl font-bold">NutriDigital</div>
        <ProgressBar currentStep={3} totalSteps={5} />
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">Defina os horários das suas refeições</h1>
      <p className="text-base text-text-secondary mb-8 text-center">
        Defina os horários para suas refeições diárias para um plano de dieta mais preciso.
      </p>

      {/* Grid de Horários */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 w-full">
        {/* Café da Manhã */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Coffee className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Café da Manhã
            </h3>
          </div>
          <input
            type="time"
            value={mealTimes.breakfast}
            onChange={(e) => handleTimeChange('breakfast', e.target.value)}
            className="w-full px-3 py-3 text-base border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Almoço */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Almoço
            </h3>
          </div>
          <input
            type="time"
            value={mealTimes.lunch}
            onChange={(e) => handleTimeChange('lunch', e.target.value)}
            className="w-full px-3 py-3 text-base border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Lanche da Tarde */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Lanche da Tarde
            </h3>
          </div>
          <input
            type="time"
            value={mealTimes.snack}
            onChange={(e) => handleTimeChange('snack', e.target.value)}
            className="w-full px-3 py-3 text-base border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Jantar */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Moon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Jantar
            </h3>
          </div>
          <input
            type="time"
            value={mealTimes.dinner}
            onChange={(e) => handleTimeChange('dinner', e.target.value)}
            className="w-full px-3 py-3 text-base border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      {timeOrderError && <p className="text-red-500 text-sm mt-2 text-center">{timeOrderError}</p>}

      {/* Dica sobre Rotina */}
      <div className="p-5 bg-tips-general-bg border border-tips-general-border rounded-lg mb-8 w-full">
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
      </div>

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