import React, { useState } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card'; // Importar o componente Card
import { UserData } from '@/App'; // Importar a interface UserData
import { Check, Coffee, UtensilsCrossed, Cookie, Moon } from 'lucide-react'; // Importar ícones de check e refeições

interface FoodPreferencesProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const FoodPreferences: React.FC<FoodPreferencesProps> = ({ userData, updateUserData, navigateTo }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateDiet = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Salvar dados temporários para simular a geração da dieta
      updateUserData('foodPreferences', {
        breakfast: { proteins: ['Ovos'], carbs: ['Pão integral'], fruits: ['Banana'] },
        lunch: { proteins: ['Peito de frango'], carbs: ['Arroz integral'] },
        snack: { proteins: ['Whey Protein'], carbs: ['Aveia'], fruits: ['Morango'] },
        dinner: { proteins: ['Salmão'], carbs: ['Batata doce'] }
      });

      setIsLoading(false);
      navigateTo('dietResult');
    }, 1500);
  };

  const handleBack = () => {
    navigateTo('goals');
  };

  const mealIcons = {
    'Café da Manhã': <Coffee className="w-5 h-5 text-gray-600" />,
    'Almoço': <UtensilsCrossed className="w-5 h-5 text-gray-600" />,
    'Lanche da Tarde': <Cookie className="w-5 h-5 text-gray-600" />,
    'Jantar': <Moon className="w-5 h-5 text-gray-600" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-5 py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="text-primary text-2xl font-bold">NutriDigital</div>
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">Quais são seus alimentos preferidos?</h1>
      <p className="text-base text-text-secondary mb-8 text-center">
        Selecione os alimentos que você mais gosta para cada refeição. Isso nos ajudará a criar uma dieta deliciosa e personalizada para você.
      </p>

      {/* Card de Aviso - Placeholder */}
      <Card className="bg-tips-general-bg border-2 border-dashed border-tips-general-border rounded-xl p-10 text-center mb-10 w-full">
        <div className="text-6xl mb-5">🚧</div>
        <h3 className="text-2xl font-semibold text-text-primary mb-3">
          Sistema de Alimentos em Desenvolvimento
        </h3>
        <p className="text-base text-text-secondary leading-relaxed mb-5 max-w-2xl mx-auto">
          A seleção de alimentos será implementada na próxima fase do desenvolvimento. 
          Por enquanto, você pode avançar para visualizar a estrutura da dieta gerada.
        </p>
        <div className="inline-flex items-center gap-2 bg-primary-light px-5 py-3 rounded-lg text-sm text-primary font-semibold">
          <Check size={16} />
          <span>Estrutura e Design Completos</span>
        </div>
      </Card>

      {/* Preview das Seções (mockup) */}
      <div className="mb-10 w-full">
        <h3 className="text-lg font-semibold text-text-primary mb-5">
          Próxima Implementação: Sistema de Seleção de Alimentos
        </h3>
        
        <div className="flex flex-col space-y-3">
          {['Café da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'].map((meal, index) => (
            <Card 
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center opacity-60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                  {mealIcons[meal as keyof typeof mealIcons]}
                </div>
                <span className="text-base font-medium text-text-primary">
                  {meal}
                </span>
              </div>
              <span className="text-sm text-text-tertiary">
                Em breve...
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="flex gap-3 mt-10 w-full">
        <Button variant="secondary" onClick={handleBack} disabled={isLoading} className="flex-1 py-3.5">
          Voltar
        </Button>
        <Button 
          onClick={handleGenerateDiet} 
          disabled={isLoading}
          className="flex-[2] py-3.5 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              Gerar minha dieta
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FoodPreferences;