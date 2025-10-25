import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Cookie, Moon, Check, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { UserData, SelectedCategories, FoodPreferencesData, MealPreferences } from '@/types';
import { MEAL_CATEGORIES, FOOD_RESTRICTIONS } from '@/data/foodData';

interface FoodPreferencesProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const FoodPreferences: React.FC<FoodPreferencesProps> = ({ userData, updateUserData, navigateTo }) => {
  const [activeTab, setActiveTab] = useState<keyof typeof MEAL_CATEGORIES>('breakfast');
  // O estado selectedCategories agora é para as categorias gerais (ex: 'Proteínas', 'Carboidratos')
  // O estado selectedFoods é para os alimentos específicos dentro dessas categorias
  const [selectedFoodCategories, setSelectedFoodCategories] = useState<SelectedCategories>(
    userData.selectedCategories || {
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: []
    }
  );
  const [selectedFoods, setSelectedFoods] = useState<FoodPreferencesData>(
    userData.foodPreferences || {
      breakfast: { proteins: [], carbs: [], fruits: [], fats: [], dairy: [] },
      lunch: { proteins: [], carbs: [], legumes: [], fats: [] },
      snack: { proteins: [], carbs: [], fruits: [], fats: [], dairy: [] },
      dinner: { proteins: [], carbs: [], legumes: [], fats: [] }
    }
  );
  const [intolerances, setIntolerances] = useState<string[]>(userData.intolerances || []);
  const [isLoading, setIsLoading] = useState(false);

  // Mapear MEAL_CATEGORIES para o formato esperado pelo componente
  const meals = [
    {
      id: 'breakfast' as keyof typeof MEAL_CATEGORIES,
      name: MEAL_CATEGORIES.breakfast.name,
      shortName: 'Café',
      time: userData?.mealTimes?.breakfast || '09:00',
      icon: Coffee,
    },
    {
      id: 'lunch' as keyof typeof MEAL_CATEGORIES,
      name: MEAL_CATEGORIES.lunch.name,
      shortName: 'Almoço',
      time: userData?.mealTimes?.lunch || '12:00',
      icon: UtensilsCrossed,
    },
    {
      id: 'snack' as keyof typeof MEAL_CATEGORIES,
      name: MEAL_CATEGORIES.snack.name,
      shortName: 'Lanche',
      time: userData?.mealTimes?.snack || '16:00',
      icon: Cookie,
    },
    {
      id: 'dinner' as keyof typeof MEAL_CATEGORIES,
      name: MEAL_CATEGORIES.dinner.name,
      shortName: 'Jantar',
      time: userData?.mealTimes?.dinner || '19:00',
      icon: Moon,
    }
  ];

  const activeMeal = meals.find(m => m.id === activeTab)!;

  // Função para filtrar alimentos por intolerância
  const getFilteredFoods = (mealId: keyof typeof MEAL_CATEGORIES, categoryId: string) => {
    const categoryData = MEAL_CATEGORIES[mealId].categories.find(cat => cat.id === categoryId);
    if (!categoryData) return [];

    let filtered = [...categoryData.foods];

    if (intolerances.includes('gluten')) {
      filtered = filtered.filter(food => !FOOD_RESTRICTIONS.gluten.includes(food));
    }
    if (intolerances.includes('lactose')) {
      filtered = filtered.filter(food => !FOOD_RESTRICTIONS.lactose.includes(food));
    }
    return filtered;
  };

  // Função para selecionar/desselecionar alimento
  const toggleFood = (mealId: keyof FoodPreferencesData, categoryId: keyof MealPreferences, food: string) => {
    setSelectedFoods(prev => {
      const currentMealFoods = prev[mealId][categoryId] || [];
      const isSelected = currentMealFoods.includes(food);

      return {
        ...prev,
        [mealId]: {
          ...prev[mealId],
          [categoryId]: isSelected
            ? currentMealFoods.filter(f => f !== food)
            : [...currentMealFoods, food]
        }
      };
    });
  };

  // Função para verificar se um alimento está selecionado
  const isFoodSelected = (mealId: keyof FoodPreferencesData, categoryId: keyof MealPreferences, food: string) => {
    return selectedFoods[mealId][categoryId]?.includes(food) || false;
  };

  // Função para contar o total de alimentos selecionados para o card de progresso
  const getTotalSelectedFoods = () => {
    let count = 0;
    for (const mealKey in selectedFoods) {
      const meal = selectedFoods[mealKey as keyof FoodPreferencesData];
      for (const categoryKey in meal) {
        count += (meal[categoryKey as keyof MealPreferences]?.length || 0);
      }
    }
    return count;
  };

  // Função para contar alimentos selecionados por refeição para o badge da aba
  const getMealSelectedCount = (mealId: keyof FoodPreferencesData) => {
    let count = 0;
    const meal = selectedFoods[mealId];
    for (const categoryKey in meal) {
      count += (meal[categoryKey as keyof MealPreferences]?.length || 0);
    }
    return count;
  };

  const handleGenerateDiet = () => {
    let isValid = true;
    let errorMessage = '';

    for (const mealId of ['breakfast', 'lunch', 'snack', 'dinner'] as (keyof typeof MEAL_CATEGORIES)[]) {
      const mealCategories = MEAL_CATEGORIES[mealId].categories;
      for (const category of mealCategories) {
        if (category.required) {
          const selected = selectedFoods[mealId][category.id as keyof MealPreferences];
          if (!selected || selected.length === 0) {
            isValid = false;
            errorMessage = `Selecione pelo menos 1 alimento em "${category.name}" para "${MEAL_CATEGORIES[mealId].name}".`;
            break;
          }
        }
      }
      if (!isValid) break;
    }

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    setIsLoading(true);
    
    // Salvar dados
    updateUserData('foodPreferences', selectedFoods); // Agora salva os alimentos específicos
    updateUserData('selectedCategories', selectedFoodCategories); // Manter para compatibilidade se necessário, mas foodPreferences é o principal
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
        Selecione os alimentos para cada refeição. Use as abas abaixo para navegar entre as refeições.
      </p>

      {/* Card de Progresso */}
      <div className="bg-primary-light border border-primary rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {getTotalSelectedFoods()}
          </div>
          <div>
            <p className="font-semibold text-text-primary">
              {getTotalSelectedFoods()} alimentos selecionados no total
            </p>
            <p className="text-sm text-text-secondary">
              Selecione pelo menos um alimento em cada categoria obrigatória por refeição
            </p>
          </div>
        </div>
      </div>

      {/* Seção de Intolerâncias */}
      <Card className="p-6 mb-6">
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
              Selecione os alimentos que você gostaria de incluir:
            </p>
          </div>

          {/* Grid de Categorias e Alimentos */}
          {MEAL_CATEGORIES[activeTab].categories.map((category) => {
            const filteredFoods = getFilteredFoods(activeTab, category.id);
            const isRequired = category.required;
            const currentSelectedFoodsCount = selectedFoods[activeTab][category.id as keyof MealPreferences]?.length || 0;

            return (
              <div key={category.id} className="mb-4 last:mb-0">
                <h4 className="text-base font-semibold text-text-primary mb-2 flex items-center gap-2">
                  {category.name}
                  {isRequired && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Obrigatório</span>
                  )}
                  {!isRequired && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">Opcional</span>
                  )}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {filteredFoods.map((food) => (
                    <button
                      key={food}
                      onClick={() => toggleFood(activeTab, category.id as keyof MealPreferences, food)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                        isFoodSelected(activeTab, category.id as keyof MealPreferences, food)
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`font-medium ${
                        isFoodSelected(activeTab, category.id as keyof MealPreferences, food) ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {food}
                      </span>
                      {isFoodSelected(activeTab, category.id as keyof MealPreferences, food) && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                {isRequired && currentSelectedFoodsCount === 0 && (
                  <p className="text-red-500 text-xs mt-1">Selecione ao menos 1 alimento em {category.name}</p>
                )}
              </div>
            );
          })}
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
          disabled={isLoading || getTotalSelectedFoods() === 0}
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