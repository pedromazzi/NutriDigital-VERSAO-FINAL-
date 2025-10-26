import { calculateNutrition, NutritionCalculationResult } from './nutritionCalculator';
import { FOOD_DATABASE, getFoodById, FoodItem, FoodDatabaseType, MealGroup, FoodCategory } from './foodDatabase';
import { UserData, FoodPreferencesData, MealPreferences } from '@/App';

// Interfaces para a estrutura da dieta gerada
interface SubstitutionDetails {
  name: string;
  quantity: string;
}

interface FoodInMeal {
  name: string;
  quantity: string;
  calories: number;
  substitution: SubstitutionDetails | null;
}

interface MealPlan {
  name: string;
  time: string;
  calories: number;
  foods: FoodInMeal[];
}

export interface DietPlanResult {
  dailySummary: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    water: number;
  };
  meals: MealPlan[];
}

// 🏗️ MONTADOR AUTOMÁTICO DE DIETA
export function buildDiet(userData: UserData): DietPlanResult {
  console.log('🔨 Iniciando montagem da dieta...');
  
  // ETAPA 1: CALCULAR VALORES NUTRICIONAIS
  const nutrition: NutritionCalculationResult = calculateNutrition(userData);
  console.log('✅ Cálculos concluídos:', nutrition);
  
  // ETAPA 2: FILTRAR ALIMENTOS POR INTOLERÂNCIA
  const availableFoods: FoodDatabaseType = filterFoodsByIntolerance(userData.intolerances || []);
  console.log('✅ Alimentos filtrados por intolerância');
  
  // ETAPA 3: MONTAR CADA REFEIÇÃO
  const meals: MealPlan[] = [];
  
  // Café da Manhã
  meals.push(buildMeal(
    'Café da Manhã',
    userData.mealTimes.breakfast,
    nutrition.mealDistribution.breakfast,
    userData.foodPreferences.breakfast,
    availableFoods,
    'breakfast',
    nutrition.targetCalories
  ));
  
  // Almoço
  meals.push(buildMeal(
    'Almoço',
    userData.mealTimes.lunch,
    nutrition.mealDistribution.lunch,
    userData.foodPreferences.lunch,
    availableFoods,
    'lunch',
    nutrition.targetCalories
  ));
  
  // Lanche da Tarde
  meals.push(buildMeal(
    'Lanche da Tarde',
    userData.mealTimes.snack,
    nutrition.mealDistribution.snack,
    userData.foodPreferences.snack,
    availableFoods,
    'snack',
    nutrition.targetCalories
  ));
  
  // Jantar
  meals.push(buildMeal(
    'Jantar',
    userData.mealTimes.dinner,
    nutrition.mealDistribution.dinner,
    userData.foodPreferences.dinner,
    availableFoods,
    'dinner',
    nutrition.targetCalories
  ));
  
  console.log('✅ Todas as refeições montadas');
  
  // ETAPA 4: MONTAR RESULTADO FINAL
  const result: DietPlanResult = {
    dailySummary: {
      calories: nutrition.targetCalories,
      protein: nutrition.macros.protein,
      carbs: nutrition.macros.carbs,
      fats: nutrition.macros.fats,
      water: nutrition.water
    },
    meals: meals
  };
  
  console.log('✅ Dieta completa gerada!');
  return result;
}

// 🔍 FILTRAR ALIMENTOS POR INTOLERÂNCIA
function filterFoodsByIntolerance(intolerances: string[]): FoodDatabaseType {
  const allFoods: FoodDatabaseType = {
    breakfast_proteins: [...FOOD_DATABASE.breakfast_proteins],
    breakfast_carbs: [...FOOD_DATABASE.breakfast_carbs],
    fruits: [...FOOD_DATABASE.fruits],
    dairy: [...FOOD_DATABASE.dairy],
    fats: [...FOOD_DATABASE.fats],
    lunch_proteins: [...FOOD_DATABASE.lunch_proteins],
    lunch_carbs: [...FOOD_DATABASE.lunch_carbs],
    legumes: [...FOOD_DATABASE.legumes]
  };
  
  // Filtrar cada categoria
  (Object.keys(allFoods) as Array<keyof FoodDatabaseType>).forEach(category => {
    allFoods[category] = allFoods[category].filter(food => {
      if (intolerances.includes('gluten') && food.restrictions.gluten) return false;
      if (intolerances.includes('lactose') && food.restrictions.lactose) return false;
      return true;
    });
  });
  
  return allFoods;
}

// 🍽️ MONTAR UMA REFEIÇÃO
function buildMeal(
  name: string,
  time: string,
  mealTargetCalories: number, // Renomeado para clareza
  preferences: MealPreferences,
  availableFoods: FoodDatabaseType,
  mealType: MealGroup,
  dailyCalories: number
): MealPlan {
  console.log(`🍽️ Montando ${name} (${mealTargetCalories} kcal)...`);
  
  const foods: FoodInMeal[] = [];
  let currentCalories = 0;
  
  // OBRIGATÓRIO 1: PROTEÍNA
  const proteinFood = selectFood(
    preferences.proteins,
    mealType === 'breakfast' || mealType === 'snack' 
      ? availableFoods.breakfast_proteins 
      : availableFoods.lunch_proteins
  );
  
  if (proteinFood) {
    const proteinPortion = calculatePortion(proteinFood, mealTargetCalories, dailyCalories, proteinFood.category);
    foods.push({
      ...proteinPortion,
      substitution: findSubstitution(proteinFood, mealType, availableFoods)
    });
    currentCalories += proteinPortion.calories;
  }
  
  // OBRIGATÓRIO 2: CARBOIDRATO
  const carbFood = selectFood(
    preferences.carbs,
    mealType === 'breakfast' || mealType === 'snack'
      ? availableFoods.breakfast_carbs
      : availableFoods.lunch_carbs
  );
  
  if (carbFood) {
    const carbPortion = calculatePortion(carbFood, mealTargetCalories, dailyCalories, carbFood.category);
    foods.push({
      ...carbPortion,
      substitution: findSubstitution(carbFood, mealType, availableFoods)
    });
    currentCalories += carbPortion.calories;
  }
  
  // OBRIGATÓRIO 3: FRUTA (só café e lanche)
  if ((mealType === 'breakfast' || mealType === 'snack') && preferences.fruits && preferences.fruits.length > 0) {
    const fruitFood = selectFood(preferences.fruits, availableFoods.fruits);
    
    if (fruitFood) {
      const fruitPortion = calculatePortion(fruitFood, mealTargetCalories, dailyCalories, fruitFood.category);
      foods.push({
        ...fruitPortion,
        substitution: findFruitSubstitution(fruitFood, availableFoods.fruits)
      });
      currentCalories += fruitPortion.calories;
    }
  }
  
  // OPCIONAL: LATICÍNIOS (só café e lanche)
  if ((mealType === 'breakfast' || mealType === 'snack') && preferences.dairy && preferences.dairy.length > 0) {
    const dairyFood = selectFood(preferences.dairy, availableFoods.dairy);
    
    if (dairyFood && (currentCalories + dairyFood.nutrition.calories) <= mealTargetCalories + 50) {
      const dairyPortion = calculatePortion(dairyFood, mealTargetCalories, dailyCalories, dairyFood.category);
      foods.push(dairyPortion);
      currentCalories += dairyPortion.calories;
    }
  }
  
  // OPCIONAL: LEGUMINOSAS (só almoço e jantar)
  if ((mealType === 'lunch' || mealType === 'dinner') && preferences.legumes && preferences.legumes.length > 0) {
    const legumeFood = selectFood(preferences.legumes, availableFoods.legumes);
    
    if (legumeFood && (currentCalories + legumeFood.nutrition.calories) <= mealTargetCalories + 50) {
      const legumePortion = calculatePortion(legumeFood, mealTargetCalories, dailyCalories, legumeFood.category);
      foods.push(legumePortion);
      currentCalories += legumePortion.calories;
    }
  }
  
  // OPCIONAL: GORDURA BOA
  if (preferences.fats && preferences.fats.length > 0) {
    const fatFood = selectFood(preferences.fats, availableFoods.fats);
    
    if (fatFood && (currentCalories + fatFood.nutrition.calories) <= mealTargetCalories + 50) {
      const fatPortion = calculatePortion(fatFood, mealTargetCalories, dailyCalories, fatFood.category);
      foods.push(fatPortion);
      currentCalories += fatPortion.calories;
    }
  }
  
  // ADICIONAR VEGETAIS (almoço e jantar)
  if (mealType === 'lunch' || mealType === 'dinner') {
    foods.push({
      name: 'vegetais',
      quantity: 'à gosto',
      calories: 0,
      substitution: null
    });
  }
  
  console.log(`✅ ${name} montado com ${currentCalories} kcal`);
  
  return {
    name,
    time,
    calories: Math.round(currentCalories),
    foods
  };
}

// 🎯 SELECIONAR ALIMENTO DAS PREFERÊNCIAS
function selectFood(selectedIds: string[] | undefined, availableFoods: FoodItem[]): FoodItem | null {
  if (!selectedIds || selectedIds.length === 0) return null;
  
  // Filtrar apenas alimentos que o usuário selecionou E estão disponíveis
  const validFoods = availableFoods.filter(food => selectedIds.includes(food.id));
  
  if (validFoods.length === 0) return null;
  
  // Selecionar aleatoriamente
  return validFoods[Math.floor(Math.random() * validFoods.length)];
}

// ⚖️ CALCULAR PORÇÃO COM LIMITES DINÂMICOS BASEADOS NO OBJETIVO CALÓRICO
function calculatePortion(food: FoodItem, mealTargetCalories: number, dailyCalories: number, foodCategory: FoodCategory): FoodInMeal {
  const baseCalories = food.nutrition.calories;
  const basePortion = food.portion.amount;
  const portionDesc = food.portion.description;
  
  // CALCULAR CALORIAS ALVO PARA ESTE ALIMENTO ESPECÍFICO
  let targetFoodCalories: number;
  
  if (foodCategory === 'protein') {
    targetFoodCalories = mealTargetCalories * 0.30; // 30% das calorias da refeição para proteína
  } else if (foodCategory === 'carb') {
    targetFoodCalories = mealTargetCalories * 0.30; // 30% das calorias da refeição para carboidrato
  } else if (foodCategory === 'fat') {
    targetFoodCalories = mealTargetCalories * 0.10; // 10% das calorias da refeição para gordura
  } else if (foodCategory === 'fruit' || foodCategory === 'dairy' || foodCategory === 'legume') {
    targetFoodCalories = baseCalories; // Para esses, a porção base é geralmente fixa
  } else {
    targetFoodCalories = baseCalories;
  }
  
  // Calcular multiplicador inicial
  let multiplier = targetFoodCalories / baseCalories;
  
  // LIMITES DINÂMICOS BASEADOS NAS CALORIAS TOTAIS DIÁRIAS
  let maxMultiplier: number;
  
  if (dailyCalories <= 1500) {
    maxMultiplier = 1.5;
  } else if (dailyCalories <= 2000) {
    maxMultiplier = 2.0;
  } else if (dailyCalories <= 2500) {
    maxMultiplier = 2.5;
  } else if (dailyCalories <= 3000) {
    maxMultiplier = 3.0;
  } else if (dailyCalories <= 3500) {
    maxMultiplier = 3.5;
  } else {
    maxMultiplier = 4.0;
  }
  
  // APLICAR LIMITES POR CATEGORIA
  if (foodCategory === 'protein') {
    multiplier = Math.max(0.8, Math.min(maxMultiplier, multiplier));
  } else if (foodCategory === 'carb') {
    multiplier = Math.max(0.8, Math.min(maxMultiplier, multiplier));
  } else if (foodCategory === 'fat') {
    // Gorduras crescem menos
    multiplier = Math.max(1.0, Math.min(maxMultiplier * 0.5, multiplier));
  } else if (foodCategory === 'fruit' || foodCategory === 'dairy' || foodCategory === 'legume') {
    multiplier = 1; // Sempre 1 porção para esses, conforme a lógica de targetFoodCalories = baseCalories
  }
  
  // Calcular calorias reais
  const actualCalories = Math.round(baseCalories * multiplier);
  
  // FORMATAR QUANTIDADE BASEADO NO TIPO DE ALIMENTO
  let quantityText = '';
  
  // TAPIOCA - SEMPRE EM GRAMAS
  if (food.id === 'tapioca' || food.name.toLowerCase().includes('tapioca')) {
    const grams = Math.round(basePortion * multiplier / 10) * 10;
    quantityText = `${grams}g`;
  }
  
  // UNIDADES (ovos, frutas)
  else if (portionDesc.includes('unidade') && !food.name.toLowerCase().includes('tapioca')) {
    const units = Math.max(1, Math.round(multiplier));
    quantityText = `${units} ${units === 1 ? 'unidade' : 'unidades'}`;
  }
  
  // FATIAS (pães, queijos)
  else if (portionDesc.includes('fatia')) {
    const slices = Math.max(1, Math.round(multiplier * 2));
    quantityText = `${slices} ${slices === 1 ? 'fatia' : 'fatias'}`;
  }
  
  // COLHERES DE SOPA
  else if (portionDesc.includes('colher de sopa') || portionDesc.includes('colher')) {
    const spoons = Math.max(1, Math.round(multiplier));
    quantityText = `${spoons} ${spoons === 1 ? 'colher de sopa' : 'colheres de sopa'}`;
  }
  
  // SCOOP (whey)
  else if (portionDesc.includes('scoop')) {
    const scoops = Math.max(1, Math.round(multiplier));
    quantityText = `${scoops} ${scoops === 1 ? 'scoop' : 'scoops'}`;
  }
  
  // ML (leites, iogurtes)
  else if (food.portion.unit === 'ml') {
    const ml = Math.round(basePortion * multiplier / 50) * 50;
    quantityText = `${ml}ml`;
  }
  
  // GRAMAS
  else if (food.portion.unit === 'g') {
    const grams = Math.round(basePortion * multiplier / 10) * 10;
    quantityText = `${grams}g`;
  }
  
  // PADRÃO
  else {
    quantityText = portionDesc;
  }
  
  return {
    name: food.name.toLowerCase(),
    quantity: quantityText,
    calories: actualCalories,
    substitution: null
  };
}

// 🔄 ENCONTRAR SUBSTITUIÇÃO PARA PROTEÍNA/CARBOIDRATO
function findSubstitution(food: FoodItem, mealType: MealGroup, availableFoods: FoodDatabaseType): SubstitutionDetails | null {
  const isBreakfast = mealType === 'breakfast' || mealType === 'snack';
  
  let substitutes: FoodItem[] = [];
  
  if (food.category === 'protein') {
    substitutes = isBreakfast 
      ? availableFoods.breakfast_proteins 
      : availableFoods.lunch_proteins;
  } else if (food.category === 'carb') {
    substitutes = isBreakfast
      ? availableFoods.breakfast_carbs
      : availableFoods.lunch_carbs;
  }
  
  // Filtrar para não sugerir o próprio alimento
  substitutes = substitutes.filter(f => f.id !== food.id);
  
  if (substitutes.length === 0) return null;
  
  // Escolher aleatoriamente
  const substitute = substitutes[Math.floor(Math.random() * substitutes.length)];
  
  return {
    name: substitute.name.toLowerCase(),
    quantity: substitute.portion.description
  };
}

// 🍎 ENCONTRAR SUBSTITUIÇÃO PARA FRUTA
function findFruitSubstitution(fruit: FoodItem, availableFruits: FoodItem[]): SubstitutionDetails | null {
  const otherFruits = availableFruits.filter(f => f.id !== fruit.id);
  
  if (otherFruits.length === 0) return null;
  
  const substitute = otherFruits[Math.floor(Math.random() * otherFruits.length)];
  
  return {
    name: substitute.name.toLowerCase(),
    quantity: substitute.portion.description
  };
}

// 📊 VALIDAR DIETA GERADA
export function validateDiet(diet: DietPlanResult): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validar calorias totais
  const totalCalories = diet.meals.reduce((sum, meal) => sum + meal.calories, 0);
  const difference = Math.abs(totalCalories - diet.dailySummary.calories);
  
  if (difference > 100) {
    errors.push(`Diferença calórica muito grande: ${difference} kcal`);
  }
  
  // Validar estrutura das refeições
  diet.meals.forEach(meal => {
    const hasProtein = meal.foods.some(f => 
      f.name.includes('ovo') || 
      f.name.includes('frango') || 
      f.name.includes('peixe') ||
      f.name.includes('carne') ||
      f.name.includes('queijo') ||
      f.name.includes('iogurte') ||
      f.name.includes('whey') ||
      f.name.includes('tofu') ||
      f.name.includes('soja') ||
      f.name.includes('atum') ||
      f.name.includes('sardinha')
    );
    
    const hasCarb = meal.foods.some(f =>
      f.name.includes('pão') ||
      f.name.includes('arroz') ||
      f.name.includes('batata') ||
      f.name.includes('macarrão') ||
      f.name.includes('aveia') ||
      f.name.includes('tapioca') ||
      f.name.includes('cuscuz') ||
      f.name.includes('mandioca') ||
      f.name.includes('inhame')
    );
    
    if (!hasProtein) {
      errors.push(`${meal.name}: faltando proteína`);
    }
    
    if (!hasCarb) {
      errors.push(`${meal.name}: faltando carboidrato`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}