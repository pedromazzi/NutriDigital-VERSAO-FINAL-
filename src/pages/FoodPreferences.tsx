import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Cookie, Moon, Check, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData, SelectedCategories } from '@/types';
import { MEAL_CATEGORIES } from '@/data/foodData'; // Importar MEAL_CATEGORIES

interface FoodPreferencesProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const FoodPreferences: React.FC<FoodPreferencesProps> = ({ userData, updateUserData, navigateTo }) => {
  const [activeTab, setActiveTab] = useState('breakfast');
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>(
    userData.selectedCategories || {
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: []
    }
  );
  const [intolerances, setIntolerances] = useState<string[]>(userData.intolerances || []);
  const [isLoading, setIsLoading] = useState(false);

  // Mapear MEAL_CATEGORIES para o formato esperado pelo componente
  const meals = [
    {
      id: 'breakfast',
      name: MEAL_CATEGORIES.breakfast.name,
      shortName: 'Café',
      time: userData?.mealTimes?.breakfast || '09:00',
      icon: Coffee,
      categories: MEAL_CATEGORIES.breakfast.categories.map(cat => cat.name)
    },
    {
      id: 'lunch',
      name: MEAL_CATEGORIES.lunch.name,
      shortName: 'Almoço',
      time: userData?.mealTimes?.lunch || '12:00',
      icon: UtensilsCrossed,
      categories: MEAL_CATEGORIES.lunch.categories.map(cat => cat.name)
    },
    {
      id: 'snack',
      name: MEAL_CATEGORIES.snack.name,
      shortName: 'Lanche',
      time: userData?.mealTimes?.snack || '16:00',
      icon: Cookie,
      categories: MEAL_CATEGORIES.snack.categories.map(cat => cat.name)
    },
    {
      id: 'dinner',
      name: MEAL_CATEGORIES.dinner.name,
      shortName: 'Jantar',
      time: userData?.mealTimes?.dinner || '19:00',
      icon: Moon,
      categories: MEAL_CATEGORIES.dinner.categories.map(cat => cat.name)
    }
  ];

  const activeMeal = meals.find(m => m.id === activeTab)!;

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const mealCategories = prev[activeTab as keyof SelectedCategories];
      const isSelected = mealCategories.includes(category);
      
      return {
        ...prev,
        [activeTab]: isSelected
          ? mealCategories.filter(c => c !== category)
          : [...mealCategories, category]
      };
    });
  };

  const toggleIntolerance = (intolerance: string) => {
    setIntolerances(prev => {
      if (prev.includes(intolerance)) {
        return prev.filter(i => i !== intolerance);
      }
      return [...prev, intolerance];
    });
  };

  const isCategorySelected = (category: string) => {
    return selectedCategories[activeTab as keyof SelectedCategories].includes(category);
  };

  const getTotalSelectedCategories = () => {
    return Object.values(selectedCategories).reduce((total, categories) => total + categories.length, 0);
  };

  const getMealSelectedCount = (mealId: string) => {
    return selectedCategories[mealId as keyof SelectedCategories].length;
  };

  const handleGenerateDiet = () => {
    const allMealsHaveSelection = Object.entries(selectedCategories).every(
      ([_, categories]) => categories.length > 0
    );

    if (!allMealsHaveSelection) {
      alert('Selecione pelo menos uma categoria de alimento para cada refeição.');
      return;
    }

    setIsLoading(true);
    
    // Salvar dados
    updateUserData('selectedCategories', selectedCategories);
    updateUserData('intolerances', intolerances);

    // A navegação para 'dietResult' agora acionará a geração da dieta em App.tsx
    setTimeout(() => {
      setIsLoading(false);
      navigateTo('dietResult');
    }, 1500);
  };

  const handleBack = () => {
    navigateTo('goals');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 max-w-4xl mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-primary text-2xl font-bold">
          NutriDigital
        </h1>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={5} totalSteps={5} className="mb-8" />

      {/* Título */}
      <h2 className="text-3xl font-bold text-text-primary mb-2">
        Quais categorias de alimentos você prefere?
      </h2>
      <p className="text-base text-text-secondary mb-8">
        Selecione as categorias de alimentos para cada refeição. Use as abas abaixo para navegar entre as refeições.
      </p>

      {/* Card de Progresso */}
      <div className="bg-primary-light border border-primary rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {getTotalSelectedCategories()}
          </div>
          <div>
            <p className="font-semibold text-text-primary">
              {getTotalSelectedCategories()} categorias selecionadas no total
            </p>
            <p className="text-sm text-text-secondary">
              Selecione pelo menos uma categoria por refeição
            </p>
          </div>
        </div>
      </div>

      {/* NOVO: Seção de Intolerâncias */}
      <Card className="p-6 mb-6"> {/* Usando o componente Card */}
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-secondary-orange flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              Possui alguma intolerância alimentar?
            </h3>
            <p className="text-sm text-text-secondary">
              Selecione suas intolerâncias para que possamos excluir esses alimentos da sua dieta.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => toggleIntolerance('gluten')}
            className={`flex-1 p-3 rounded-lg border-2 transition-all ${
              intolerances.includes('gluten')
                ? 'border-secondary-orange bg-secondary-orange-light'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${
                intolerances.includes('gluten') ? 'text-secondary-orange' : 'text-text-primary'
              }`}>
                Glúten
              </span>
              {intolerances.includes('gluten') && (
                <Check className="w-5 h-5 text-secondary-orange" />
              )}
            </div>
          </button>

          <button
            onClick={() => toggleIntolerance('lactose')}
            className={`flex-1 p-3 rounded-lg border-2 transition-all ${
              intolerances.includes('lactose')
                ? 'border-secondary-orange bg-secondary-orange-light'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${
                intolerances.includes('lactose') ? 'text-secondary-orange' : 'text-text-primary'
              }`}>
                Lactose
              </span>
              {intolerances.includes('lactose') && (
                <Check className="w-5 h-5 text-secondary-orange" />
              )}
            </div>
          </button>
        </div>
      </Card>

      {/* TABS - Abas das Refeições */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-8">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {meals.map((meal) => {
            const Icon = meal.icon;
            const isActive = activeTab === meal.id;
            const selectedCount = getMealSelectedCount(meal.id);

            return (
              <button
                key={meal.id}
                onClick={() => setActiveTab(meal.id)}
                className={`flex-1 min-w-[120px] px-4 py-4 flex flex-col items-center gap-2 transition-colors ${
                  isActive
                    ? 'bg-primary/5 border-b-2 border-primary'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                  {meal.shortName}
                </span>
                {selectedCount > 0 && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    {selectedCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {activeMeal.name}
            </h3>
            <p className="text-sm text-text-secondary">
              Selecione as categorias de alimentos que você gostaria de incluir:
            </p>
          </div>

          {/* Grid de Categorias */}
          <div className="grid grid-cols-2 gap-3">
            {activeMeal.categories.map((category) => {
              const isSelected = isCategorySelected(category);
              
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      isSelected ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {category}
                    </span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={isLoading}
          className="flex-1 py-3.5"
        >
          Voltar
        </Button>
        <Button
          onClick={handleGenerateDiet}
          disabled={isLoading || getTotalSelectedCategories() === 0}
          className="flex-[2] py-3.5 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            'Gerar minha dieta →'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FoodPreferences;