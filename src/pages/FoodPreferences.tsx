import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Cookie, Moon, Check, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import { FOOD_DATABASE, filterByIntolerances, getFoodsByMeal } from '@/utils/fooddatabase';

interface UserData {
  userName?: string;
  weight?: number;
  age?: number;
  height?: number;
  gender?: string;
  activityLevel?: string;
  goal?: string;
  mealTimes?: {
    breakfast?: string;
    lunch?: string;
    snack?: string;
    dinner?: string;
  };
  foodPreferences?: any;
  intolerances?: string[];
}

interface FoodPreferencesProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const FoodPreferences: React.FC<FoodPreferencesProps> = ({ userData, updateUserData, navigateTo }) => {
  const [activeTab, setActiveTab] = useState('breakfast');
  
  const [selectedFoods, setSelectedFoods] = useState({
    breakfast: { proteins: [], carbs: [], fruits: [], dairy: [], fats: [] },
    lunch: { proteins: [], carbs: [], legumes: [], fats: [] },
    snack: { proteins: [], carbs: [], fruits: [], dairy: [], fats: [] },
    dinner: { proteins: [], carbs: [], legumes: [], fats: [] }
  });
  
  const [intolerances, setIntolerances] = useState<string[]>(userData.intolerances || []);
  const [isLoading, setIsLoading] = useState(false);

  const meals = [
    {
      id: 'breakfast',
      name: 'Café da Manhã',
      shortName: 'Café',
      icon: Coffee
    },
    {
      id: 'lunch',
      name: 'Almoço',
      shortName: 'Almoço',
      icon: UtensilsCrossed
    },
    {
      id: 'snack',
      name: 'Lanche da Tarde',
      shortName: 'Lanche',
      icon: Cookie
    },
    {
      id: 'dinner',
      name: 'Jantar',
      shortName: 'Jantar',
      icon: Moon
    }
  ];

  const activeMeal = meals.find(m => m.id === activeTab)!;

  // Obter categorias de alimentos para a refeição ativa
  const getMealCategories = () => {
    if (activeTab === 'breakfast' || activeTab === 'snack') {
      return [
        { 
          id: 'proteins', 
          name: 'Proteínas', 
          foods: FOOD_DATABASE.breakfast_proteins,
          required: true 
        },
        { 
          id: 'carbs', 
          name: 'Carboidratos', 
          foods: FOOD_DATABASE.breakfast_carbs,
          required: true 
        },
        { 
          id: 'fruits', 
          name: 'Frutas', 
          foods: FOOD_DATABASE.fruits,
          required: true 
        },
        { 
          id: 'dairy', 
          name: 'Laticínios', 
          foods: FOOD_DATABASE.dairy,
          required: false 
        },
        { 
          id: 'fats', 
          name: 'Gorduras Boas', 
          foods: FOOD_DATABASE.fats,
          required: false 
        }
      ];
    } else {
      return [
        { 
          id: 'proteins', 
          name: 'Proteínas', 
          foods: FOOD_DATABASE.lunch_proteins,
          required: true 
        },
        { 
          id: 'carbs', 
          name: 'Carboidratos', 
          foods: FOOD_DATABASE.lunch_carbs,
          required: true 
        },
        { 
          id: 'legumes', 
          name: 'Leguminosas', 
          foods: FOOD_DATABASE.legumes,
          required: false 
        },
        { 
          id: 'fats', 
          name: 'Gorduras Boas', 
          foods: FOOD_DATABASE.fats,
          required: false 
        }
      ];
    }
  };

  // Filtrar alimentos por intolerância
  const getFilteredFoods = (foods: any[]) => {
    return filterByIntolerances(foods, intolerances);
  };

  // Selecionar/desselecionar alimento
  const toggleFood = (categoryId: string, foodId: string) => {
    setSelectedFoods(prev => {
      const mealFoods = prev[activeTab as keyof typeof prev];
      const categoryFoods = mealFoods[categoryId as keyof typeof mealFoods] as string[];
      const isSelected = categoryFoods.includes(foodId);
      
      return {
        ...prev,
        [activeTab]: {
          ...mealFoods,
          [categoryId]: isSelected
            ? categoryFoods.filter(f => f !== foodId)
            : [...categoryFoods, foodId]
        }
      };
    });
  };

  // Verificar se alimento está selecionado
  const isFoodSelected = (categoryId: string, foodId: string) => {
    const mealFoods = selectedFoods[activeTab as keyof typeof selectedFoods];
    const categoryFoods = mealFoods[categoryId as keyof typeof mealFoods] as string[];
    return categoryFoods.includes(foodId);
  };

  // Contar total de alimentos selecionados
  const getTotalSelectedFoods = () => {
    let total = 0;
    Object.values(selectedFoods).forEach(meal => {
      Object.values(meal).forEach((foods: any) => {
        total += foods.length;
      });
    });
    return total;
  };

  // Contar alimentos selecionados por refeição
  const getMealSelectedCount = (mealId: string) => {
    const meal = selectedFoods[mealId as keyof typeof selectedFoods];
    let count = 0;
    Object.values(meal).forEach((foods: any) => {
      count += foods.length;
    });
    return count;
  };

  const toggleIntolerance = (intolerance: string) => {
    setIntolerances(prev => {
      if (prev.includes(intolerance)) {
        return prev.filter(i => i !== intolerance);
      }
      return [...prev, intolerance];
    });
  };

  // Validar seleção antes de gerar dieta
  const validateSelection = () => {
    const mealsToValidate = ['breakfast', 'lunch', 'snack', 'dinner'];
    
    for (const meal of mealsToValidate) {
      const mealData = selectedFoods[meal as keyof typeof selectedFoods];
      
      // Verificar proteínas (obrigatório)
      if (mealData.proteins.length === 0) {
        return {
          valid: false,
          message: `Selecione pelo menos 1 proteína para ${meals.find(m => m.id === meal)?.name}`
        };
      }
      
      // Verificar carboidratos (obrigatório)
      if (mealData.carbs.length === 0) {
        return {
          valid: false,
          message: `Selecione pelo menos 1 carboidrato para ${meals.find(m => m.id === meal)?.name}`
        };
      }
      
      // Verificar frutas (obrigatório para café e lanche)
      if ((meal === 'breakfast' || meal === 'snack') && mealData.fruits.length === 0) {
        return {
          valid: false,
          message: `Selecione pelo menos 1 fruta para ${meals.find(m => m.id === meal)?.name}`
        };
      }
    }
    
    return { valid: true, message: '' };
  };

  const handleGenerateDiet = () => {
    const validation = validateSelection();
    
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    setIsLoading(true);
    
    // Salvar dados
    updateUserData('foodPreferences', selectedFoods);
    updateUserData('intolerances', intolerances);

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
        Quais alimentos você prefere?
      </h2>
      <p className="text-base text-text-secondary mb-8">
        Selecione os alimentos que você gostaria de incluir em cada refeição. Use as abas abaixo para navegar entre as refeições.
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
              Selecione pelo menos 1 proteína e 1 carboidrato por refeição
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

        {/* Tab Content - ALIMENTOS INDIVIDUAIS */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {activeMeal.name}
            </h3>
            <p className="text-sm text-text-secondary">
              Selecione os alimentos que você gostaria de incluir nesta refeição:
            </p>
          </div>

          {/* Renderizar cada categoria com seus alimentos */}
          <div className="space-y-6">
            {getMealCategories().map((category) => {
              const filteredFoods = getFilteredFoods(category.foods);
              
              return (
                <div key={category.id}>
                  {/* Título da Categoria */}
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-text-primary">
                      {category.name}
                    </h4>
                    {category.required ? (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Obrigatório
                      </span>
                    ) : (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        Opcional
                      </span>
                    )}
                  </div>
                  
                  {/* Grid de Alimentos */}
                  {filteredFoods.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredFoods.map((food) => {
                        const isSelected = isFoodSelected(category.id, food.id);
                        
                        return (
                          <button
                            key={food.id}
                            onClick={() => toggleFood(category.id, food.id)}
                            className={`p-3 rounded-lg text-left text-sm border-2 transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/10 text-primary font-medium'
                                : 'border-gray-200 hover:border-gray-300 text-text-primary'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex-1">{food.name}</span>
                              {isSelected && (
                                <Check className="w-4 h-4 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic p-3 bg-gray-50 rounded">
                      Todos os alimentos desta categoria foram filtrados devido às suas intolerâncias.
                    </p>
                  )}
                </div>
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