import React, { useState, useEffect, useMemo } from 'react';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Input from '@/components/Input';
import Accordion from '@/components/Accordion';
import { UserData } from '@/App'; // Importar a interface UserData
import { validateFoodPreferences } from '@/utils/validation';
import { X, Search } from 'lucide-react';

interface FoodPreferencesProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

interface FoodCategory {
  name: string;
  items: string[];
  required?: boolean;
}

interface MealFoodCategories {
  proteins: FoodCategory;
  carbs: FoodCategory;
  fruits?: FoodCategory;
  fats: FoodCategory;
  dairy?: FoodCategory;
  legumes?: FoodCategory;
}

const mealCategories: { [key: string]: MealFoodCategories } = {
  breakfast: {
    proteins: { name: 'Proteínas', items: ['Ovos', 'Iogurte grego natural', 'Whey Protein em pó', 'Queijo Mussarela', 'Queijo Minas Frescal', 'Requeijão Light', 'Creme de Ricota Light', 'Queijo Cottage'], required: true },
    carbs: { name: 'Carboidratos', items: ['Batata doce', 'Aveia', 'Pão integral', 'Tapioca', 'Pão francês', 'Pão de forma', 'Cuscuz de Milho', 'Granola'], required: true },
    fruits: { name: 'Frutas', items: ['Maçã', 'Banana', 'Frutas vermelhas (mix)', 'Laranja', 'Abacaxi', 'Mamão', 'Morango', 'Melancia', 'Melão', 'Uva', 'Manga', 'Pera', 'Kiwi', 'Pêssego', 'Ameixa', 'Goiaba'], required: true },
    dairy: { name: 'Laticínios', items: ['Leite sem lactose', 'Leite de amêndoas', 'Leite Integral', 'Iogurte Natural Integral'] },
    fats: { name: 'Gorduras', items: ['Abacate', 'Azeite de oliva extra virgem', 'Castanhas (mix)', 'Sementes de chia', 'Sementes de girassol', 'Sementes de linhaça', 'Pasta de amendoim integral', 'Amêndoas'] },
  },
  lunch: {
    proteins: { name: 'Proteínas', items: ['Peito de frango', 'Filé de tilápia', 'Ovos', 'Tofu', 'Salmão', 'Carne magra', 'Iogurte grego natural', 'Queijo Mussarela', 'Queijo Minas Frescal', 'Atum em lata ao natural', 'Soja (cozida)', 'Sardinha em lata'], required: true },
    carbs: { name: 'Carboidratos', items: ['Batata doce', 'Arroz integral', 'Arroz Branco Cozido', 'Macarrão integral', 'Batata inglesa cozida', 'Macarrão cozido', 'Mandioca cozida', 'Batata Baroa (Mandioquinha)', 'Inhame'], required: true },
    legumes: { name: 'Leguminosas', items: ['Lentilha', 'Feijão cozido', 'Quinoa', 'Grão de Bico', 'Ervilha'] },
    fats: { name: 'Gorduras', items: ['Abacate', 'Azeite de oliva extra virgem', 'Castanhas (mix)', 'Sementes de chia', 'Sementes de girassol', 'Sementes de linhaça', 'Pasta de amendoim integral', 'Amêndoas'] },
  },
  snack: {
    proteins: { name: 'Proteínas', items: ['Ovos', 'Iogurte grego natural', 'Whey Protein em pó', 'Queijo Mussarela', 'Queijo Minas Frescal', 'Requeijão Light', 'Creme de Ricota Light', 'Queijo Cottage'], required: true },
    carbs: { name: 'Carboidratos', items: ['Batata doce', 'Aveia', 'Pão integral', 'Tapioca', 'Pão francês', 'Pão de forma', 'Cuscuz de Milho', 'Granola'], required: true },
    fruits: { name: 'Frutas', items: ['Maçã', 'Banana', 'Frutas vermelhas (mix)', 'Laranja', 'Abacaxi', 'Mamão', 'Morango', 'Melancia', 'Melão', 'Uva', 'Manga', 'Pera', 'Kiwi', 'Pêssego', 'Ameixa', 'Goiaba'], required: true },
    dairy: { name: 'Laticínios', items: ['Leite sem lactose', 'Leite de amêndoas', 'Leite Integral', 'Iogurte Natural Integral'] },
    fats: { name: 'Gorduras', items: ['Abacate', 'Azeite de oliva extra virgem', 'Castanhas (mix)', 'Sementes de chia', 'Sementes de girassol', 'Sementes de linhaça', 'Pasta de amendoim integral', 'Amêndoas'] },
  },
  dinner: {
    proteins: { name: 'Proteínas', items: ['Peito de frango', 'Filé de tilápia', 'Ovos', 'Tofu', 'Salmão', 'Carne magra', 'Iogurte grego natural', 'Queijo Mussarela', 'Queijo Minas Frescal', 'Atum em lata ao natural', 'Soja (cozida)', 'Sardinha em lata'], required: true },
    carbs: { name: 'Carboidratos', items: ['Batata doce', 'Arroz integral', 'Arroz Branco Cozido', 'Macarrão integral', 'Batata inglesa cozida', 'Macarrão cozido', 'Mandioca cozida', 'Batata Baroa (Mandioquinha)', 'Inhame'], required: true },
    legumes: { name: 'Leguminosas', items: ['Lentilha', 'Feijão cozido', 'Quinoa', 'Grão de Bico', 'Ervilha'] },
    fats: { name: 'Gorduras', items: ['Abacate', 'Azeite de oliva extra virgem', 'Castanhas (mix)', 'Sementes de chia', 'Sementes de girassol', 'Sementes de linhaça', 'Pasta de amendoim integral', 'Amêndoas'] },
  },
};

const FoodPreferences: React.FC<FoodPreferencesProps> = ({ userData, updateUserData, navigateTo }) => {
  const [foodPreferences, setFoodPreferences] = useState(userData.foodPreferences);
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({
    breakfast: '', lunch: '', snack: '', dinner: ''
  });
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const errors = validateFoodPreferences(foodPreferences);
    setValidationErrors(errors);
  }, [foodPreferences]);

  const handleAddFood = (meal: string, categoryKey: string, food: string) => {
    setFoodPreferences(prev => {
      const currentMealPrefs = prev[meal as keyof typeof prev];
      const currentCategoryItems = currentMealPrefs[categoryKey as keyof typeof currentMealPrefs] as string[];
      if (!currentCategoryItems.includes(food)) {
        return {
          ...prev,
          [meal]: {
            ...currentMealPrefs,
            [categoryKey]: [...currentCategoryItems, food],
          },
        };
      }
      return prev;
    });
    setSearchTerms(prev => ({ ...prev, [meal]: '' })); // Clear search after adding
  };

  const handleRemoveFood = (meal: string, categoryKey: string, food: string) => {
    setFoodPreferences(prev => {
      const currentMealPrefs = prev[meal as keyof typeof prev];
      const currentCategoryItems = currentMealPrefs[categoryKey as keyof typeof currentMealPrefs] as string[];
      return {
        ...prev,
        [meal]: {
          ...currentMealPrefs,
          [categoryKey]: currentCategoryItems.filter(item => item !== food),
        },
      };
    });
  };

  const getAvailableFoods = (meal: string, searchTerm: string) => {
    const allFoodsForMeal: { categoryKey: string; food: string }[] = [];
    const mealCats = mealCategories[meal];
    for (const categoryKey in mealCats) {
      const category = mealCats[categoryKey as keyof MealFoodCategories];
      if (category) {
        category.items.forEach(food => {
          allFoodsForMeal.push({ categoryKey, food });
        });
      }
    }

    const selectedFoods = Object.values(foodPreferences[meal as keyof typeof foodPreferences])
      .flat()
      .map(String);

    return allFoodsForMeal
      .filter(({ food }) => !selectedFoods.includes(food))
      .filter(({ food }) => food.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const getProgressIndicator = (meal: string) => {
    const mealPrefs = foodPreferences[meal as keyof typeof foodPreferences];
    const mealCats = mealCategories[meal];
    let requiredCount = 0;
    let selectedRequiredCount = 0;

    for (const categoryKey in mealCats) {
      const category = mealCats[categoryKey as keyof MealFoodCategories];
      if (category?.required) {
        requiredCount++;
        const selectedItems = mealPrefs[categoryKey as keyof typeof mealPrefs] as string[];
        if (selectedItems && selectedItems.length > 0) {
          selectedRequiredCount++;
        }
      }
    }
    return `${selectedRequiredCount}/${requiredCount} categorias obrigatórias selecionadas`;
  };

  const isGenerateButtonDisabled = Object.keys(validationErrors).length > 0;

  const handleGenerateDiet = () => {
    updateUserData('foodPreferences', foodPreferences);
    navigateTo('dietResult');
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

        <div className="space-y-4 mb-8">
          {Object.keys(mealCategories).map((mealKey) => (
            <Accordion
              key={mealKey}
              title={
                <div className="flex justify-between items-center">
                  <span className="capitalize">{mealKey.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`text-sm ${validationErrors[mealKey] ? 'text-red-500' : 'text-gray-500'}`}>
                    {validationErrors[mealKey] || getProgressIndicator(mealKey)}
                  </span>
                </div>
              }
              isOpen={openAccordion === mealKey}
              onToggle={() => setOpenAccordion(openAccordion === mealKey ? null : mealKey)}
            >
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Buscar alimentos..."
                  value={searchTerms[mealKey]}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, [mealKey]: e.target.value }))}
                  className="pl-10"
                />
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {searchTerms[mealKey] && (
                <div className="border border-gray-200 rounded-lg max-h-40 overflow-y-auto mb-4">
                  {getAvailableFoods(mealKey, searchTerms[mealKey]).length > 0 ? (
                    getAvailableFoods(mealKey, searchTerms[mealKey]).map(({ categoryKey, food }) => (
                      <button
                        key={food}
                        onClick={() => handleAddFood(mealKey, categoryKey, food)}
                        className="w-full text-left p-2 hover:bg-gray-100 text-gray-700 text-sm border-b border-gray-100 last:border-b-0"
                      >
                        {food}
                      </button>
                    ))
                  ) : (
                    <p className="p-2 text-gray-500 text-sm">Nenhum alimento encontrado.</p>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {Object.entries(mealCategories[mealKey]).map(([categoryKey, category]) => {
                  const selectedItems = foodPreferences[mealKey as keyof typeof foodPreferences][categoryKey as keyof typeof foodPreferences[typeof mealKey]] as string[];
                  if (selectedItems && selectedItems.length > 0) {
                    return (
                      <div key={categoryKey}>
                        <h3 className="font-medium text-gray-700 mb-2">{category.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItems.map(food => (
                            <span
                              key={food}
                              className="flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                            >
                              {food}
                              <button
                                onClick={() => handleRemoveFood(mealKey, categoryKey, food)}
                                className="ml-2 text-green-600 hover:text-green-800"
                                aria-label={`Remover ${food}`}
                              >
                                <X size={16} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </Accordion>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={() => navigateTo('goals')}>
            Voltar
          </Button>
          <Button fullWidth={false} onClick={handleGenerateDiet} disabled={isGenerateButtonDisabled}>
            Gerar minha dieta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodPreferences;