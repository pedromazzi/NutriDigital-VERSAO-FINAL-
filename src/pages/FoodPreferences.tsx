import React, { useState } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card'; // Importar o componente Card
import { UserData } from '@/App'; // Importar a interface UserData
import { Check } from 'lucide-react'; // Importar ícone de check para o badge

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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-green-600">NutriDigital</div>
          <ProgressBar currentStep={5} totalSteps={5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quais são seus alimentos preferidos?</h1>
        <p className="text-gray-600 mb-8">
          Selecione os alimentos que você mais gosta para cada refeição. Isso nos ajudará a criar uma dieta deliciosa e personalizada para você.
        </p>

        {/* Card de Aviso - Placeholder */}
        <Card className="bg-yellow-50 border-yellow-400 border-2 border-dashed rounded-xl p-10 text-center mb-10">
          <div className="text-6xl mb-5">🚧</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Sistema de Alimentos em Desenvolvimento
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-5 max-w-xl mx-auto">
            A seleção de alimentos será implementada na próxima fase do desenvolvimento. 
            Por enquanto, você pode avançar para visualizar a estrutura da dieta gerada.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg text-sm text-green-700 font-semibold">
            <Check size={16} />
            <span>Estrutura e Design Completos</span>
          </div>
        </Card>

        {/* Preview das Seções (mockup) */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-5">
            Próxima Implementação: Sistema de Seleção de Alimentos
          </h3>
          
          <div className="flex flex-col space-y-3">
            {['Café da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'].map((meal, index) => (
              <Card 
                key={index}
                className="flex justify-between items-center p-4 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                    {['☕', '🍽️', '🥪', '🌙'][index]}
                  </div>
                  <span className="text-base font-medium text-gray-800">
                    {meal}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Em breve...
                </span>
              </Card>
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={handleBack} disabled={isLoading}>
            Voltar
          </Button>
          <Button 
            onClick={handleGenerateDiet} 
            disabled={isLoading}
            className="w-auto px-6 py-3 flex items-center justify-center gap-2"
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
    </div>
  );
};

export default FoodPreferences;