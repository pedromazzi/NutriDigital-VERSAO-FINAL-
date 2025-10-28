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

// 🔄 COMPENSAR CALORIAS FALTANTES AUMENTANDO PROTEÍNA E CARBOIDRATO
function compensateMissingCalories(foods: FoodInMeal[], targetCalories: number, currentCalories: number, dailyCalories: number, mealType: MealGroup): FoodInMeal[] {
  const missingCalories = targetCalories - currentCalories;
  
  // Se faltam menos de 50 kcal, não compensa (margem de erro aceitável)
  if (missingCalories < 50) {
    console.log(`✅ Calorias OK: ${currentCalories}/${targetCalories} (diferença: ${missingCalories} kcal)`);
    return foods;
  }
  
  console.log(`⚠️ Faltam ${missingCalories} kcal. Compensando...`);
  
  // Encontrar índices de proteína e carboidrato
  let proteinIndex = -1;
  let carbIndex = -1;
  
  foods.forEach((food, index) => {
    // Identificar proteína por palavras-chave
    if (food.name.includes('ovo') || food.name.includes('frango') || 
        food.name.includes('peixe') || food.name.includes('carne') ||
        food.name.includes('tilápia') || food.name.includes('salmão') ||
        food.name.includes('atum') || food.name.includes('queijo') ||
        food.name.includes('whey') || food.name.includes('iogurte') ||
        food.name.includes('requeijão') || food.name.includes('tofu') ||
        food.name.includes('soja')) {
      if (proteinIndex === -1) proteinIndex = index;
    }
    
    // Identificar carboidrato por palavras-chave
    if (food.name.includes('pão') || food.name.includes('arroz') ||
        food.name.includes('batata') || food.name.includes('macarrão') ||
        food.name.includes('aveia') || food.name.includes('tapioca') ||
        food.name.includes('granola') || food.name.includes('cuscuz')) {
      if (carbIndex === -1) carbIndex = index;
    }
  });
  
  if (proteinIndex === -1 || carbIndex === -1) {
    console.warn('❌ Não encontrou proteína ou carboidrato para compensar');
    return foods;
  }
  
  // Distribuir calorias faltantes: 50% proteína, 50% carboidrato
  const proteinExtra = Math.round(missingCalories * 0.50);
  const carboExtra = Math.round(missingCalories * 0.50);
  
  // COMPENSAR PROTEÍNA
  const proteinFood = foods[proteinIndex];
  const newProteinCalories = proteinFood.calories + proteinExtra;

  // Criar novo objeto com quantidade atualizada
  let newProteinFood = { ...proteinFood }; // Copiar todas as propriedades

  // Calcular nova quantidade de proteína
  if (proteinFood.quantity.includes('unidade')) {
    // Ovos
    const currentUnits = parseInt(proteinFood.quantity) || 1;
    const caloriesPerUnit = proteinFood.calories / currentUnits;
    const newUnits = Math.round(newProteinCalories / caloriesPerUnit);
    newProteinFood.quantity = `${newUnits} ${newUnits === 1 ? 'unidade' : 'unidades'}`;
    newProteinFood.calories = newProteinCalories;
  } else if (proteinFood.quantity.includes('g')) {
    // Gramas (frango, peixe, etc)
    const currentGrams = parseInt(proteinFood.quantity);
    const caloriesPer100g = (proteinFood.calories / currentGrams) * 100;
    const newGrams = Math.round((newProteinCalories / caloriesPer100g) * 100 / 10) * 10;
    newProteinFood.quantity = `${newGrams}g`;
    newProteinFood.calories = newProteinCalories;
  } else if (proteinFood.quantity.includes('fatia')) {
    // Fatias (queijo)
    const currentSlices = parseInt(proteinFood.quantity) || 1;
    const caloriesPerSlice = proteinFood.calories / currentSlices;
    const newSlices = Math.round(newProteinCalories / caloriesPerSlice);
    newProteinFood.quantity = `${newSlices} ${newSlices === 1 ? 'fatia' : 'fatias'}`;
    newProteinFood.calories = newProteinCalories;
  } else if (proteinFood.quantity.includes('scoop')) {
    // Scoops (whey)
    const currentScoops = parseInt(proteinFood.quantity) || 1;
    const caloriesPerScoop = proteinFood.calories / currentScoops;
    const newScoops = Math.round(newProteinCalories / caloriesPerScoop);
    newProteinFood.quantity = `${newScoops} ${newScoops === 1 ? 'scoop' : 'scoops'}`;
    newProteinFood.calories = newProteinCalories;
  } else if (proteinFood.quantity.includes('ml')) {
    // ML (iogurte líquido)
    const currentMl = parseInt(proteinFood.quantity);
    const caloriesPer100ml = (proteinFood.calories / currentMl) * 100;
    const newMl = Math.round((newProteinCalories / caloriesPer100ml) * 100 / 50) * 50;
    newProteinFood.quantity = `${newMl}ml`;
    newProteinFood.calories = newProteinCalories;
  }

  // Substituir o objeto no array
  foods[proteinIndex] = newProteinFood;
  
  // COMPENSAR CARBOIDRATO
  const carboFood = foods[carbIndex];
  const newCarboCalories = carboFood.calories + carboExtra;

  // Criar novo objeto com quantidade atualizada
  let newCarboFood = { ...carboFood }; // Copiar todas as propriedades

  // Calcular nova quantidade de carboidrato
  if (carboFood.quantity.includes('unidade')) {
    // Pães em unidade
    const currentUnits = parseInt(carboFood.quantity) || 1;
    const caloriesPerUnit = carboFood.calories / currentUnits;
    const newUnits = Math.round(newCarboCalories / caloriesPerUnit);
    newCarboFood.quantity = `${newUnits} ${newUnits === 1 ? 'unidade' : 'unidades'}`;
    newCarboFood.calories = newCarboCalories;
  } else if (carboFood.quantity.includes('fatia')) {
    // Pães em fatias
    const currentSlices = parseInt(carboFood.quantity) || 1;
    const caloriesPerSlice = carboFood.calories / currentSlices;
    const newSlices = Math.round(newCarboCalories / caloriesPerSlice);
    newCarboFood.quantity = `${newSlices} ${newSlices === 1 ? 'fatia' : 'fatias'}`;
    newCarboFood.calories = newCarboCalories;
  } else if (carboFood.quantity.includes('g')) {
    // Gramas (arroz, batata, etc)
    const currentGrams = parseInt(carboFood.quantity);
    const caloriesPer100g = (carboFood.calories / currentGrams) * 100;
    const newGrams = Math.round((newCarboCalories / caloriesPer100g) * 100 / 10) * 10;
    newCarboFood.quantity = `${newGrams}g`;
    newCarboFood.calories = newCarboCalories;
  } else if (carboFood.quantity.includes('colher')) {
    // Colheres (aveia)
    const currentSpoons = parseInt(carboFood.quantity) || 1;
    const caloriesPerSpoon = carboFood.calories / currentSpoons;
    const newSpoons = Math.round(newCarboCalories / caloriesPerSpoon);
    newCarboFood.quantity = `${newSpoons} ${newSpoons === 1 ? 'colher de sopa' : 'colheres de sopa'}`;
    newCarboFood.calories = newCarboCalories;
  }

  // Substituir o objeto no array
  foods[carbIndex] = newCarboFood;
  
  const newTotal = foods.reduce((sum, food) => sum + food.calories, 0);
  console.log(`✅ Compensação concluída: ${currentCalories} → ${newTotal} kcal (meta: ${targetCalories})`);
  
  return foods;
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
  
  let foods: FoodInMeal[] = []; // ← MUDOU DE const PARA let
  let currentCalories = 0;
  
  // OBRIGATÓRIO 1: PROTEÍNA
  const proteinFood = selectFood(
    preferences.proteins,
    mealType === 'breakfast' || mealType === 'snack' 
      ? availableFoods.breakfast_proteins 
      : availableFoods.lunch_proteins
  );
  
  if (proteinFood) {
    const proteinPortion = calculatePortion(proteinFood, mealTargetCalories, dailyCalories, proteinFood.category, mealType);
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
    const carbPortion = calculatePortion(carbFood, mealTargetCalories, dailyCalories, carbFood.category, mealType);
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
      const fruitPortion = calculatePortion(fruitFood, mealTargetCalories, dailyCalories, fruitFood.category, mealType);
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
      const dairyPortion = calculatePortion(dairyFood, mealTargetCalories, dailyCalories, dairyFood.category, mealType);
      foods.push(dairyPortion);
      currentCalories += dairyPortion.calories;
    }
  }
  
  // OPCIONAL: LEGUMINOSAS (só almoço e jantar)
  if ((mealType === 'lunch' || mealType === 'dinner') && preferences.legumes && preferences.legumes.length > 0) {
    const legumeFood = selectFood(preferences.legumes, availableFoods.legumes);
    
    if (legumeFood && (currentCalories + legumeFood.nutrition.calories) <= mealTargetCalories + 50) {
      const legumePortion = calculatePortion(legumeFood, mealTargetCalories, dailyCalories, legumeFood.category, mealType);
      foods.push(legumePortion);
      currentCalories += legumePortion.calories;
    }
  }
  
  // GORDURA BOA - Obrigatória em almoço e jantar, NÃO aparece em café/lanche
  if (mealType === 'lunch' || mealType === 'dinner') {
    // Usuário DEVE ter selecionado (validação garante isso)
    const fatFood = selectFood(preferences.fats, availableFoods.fats);
    
    if (fatFood) {
      const fatPortion = calculatePortion(fatFood, mealTargetCalories, dailyCalories, fatFood.category, mealType);
      foods.push(fatPortion);
      currentCalories += fatPortion.calories;
    } else {
      // Fallback: se por algum motivo não encontrar, adiciona azeite
      console.warn('⚠️ Gordura não encontrada, adicionando azeite como fallback');
      const azeite = availableFoods.fats.find(f => f.id === 'azeite');
      if (azeite) {
        const azeitePortion = calculatePortion(azeite, mealTargetCalories, dailyCalories, azeite.category, mealType);
        foods.push(azeitePortion);
        currentCalories += azeitePortion.calories;
      }
    }
  }
  // NÃO adicionar gordura em café da manhã e lanche
  
  // ADICIONAR VEGETAIS (almoço e jantar)
  if (mealType === 'lunch' || mealType === 'dinner') {
    foods.push({
      name: 'vegetais',
      quantity: 'à gosto',
      calories: 0,
      substitution: null
    });
  }
  
  // APLICAR COMPENSAÇÃO AUTOMÁTICA DE CALORIAS
  foods = compensateMissingCalories(foods, mealTargetCalories, currentCalories, dailyCalories, mealType);
  
  // Recalcular calorias totais após compensação
  currentCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  
  console.log(`✅ ${name} montado com ${currentCalories} kcal (meta: ${mealTargetCalories})`);
  
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
function calculatePortion(food: FoodItem, mealTargetCalories: number, dailyCalories: number, foodCategory: FoodCategory, mealType: MealGroup): FoodInMeal {
  const baseCalories = food.nutrition.calories;
  const basePortion = food.portion.amount;
  const portionDesc = food.portion.description;
  
  // CALCULAR CALORIAS ALVO PARA ESTE ALIMENTO ESPECÍFICO
  let targetFoodCalories: number;

  // Verificar se é refeição de almoço/jantar (que tem gordura obrigatória)
  const hasObligatoryFat = (mealType === 'lunch' || mealType === 'dinner');
  const fatCalories = hasObligatoryFat ? 88 : 0; // Estimativa de calorias de uma porção de gordura (azeite)

  // Ajustar proporções (começar menor porque haverá compensação depois)
  if (dailyCalories >= 3000) {
    // DIETA DE GANHO DE MASSA (3000+ kcal)
    if (foodCategory === 'protein') {
      targetFoodCalories = (mealTargetCalories - fatCalories) * 0.35;
    } else if (foodCategory === 'carb') {
      targetFoodCalories = (mealTargetCalories - fatCalories) * 0.40;
    } else if (foodCategory === 'fat') {
      targetFoodCalories = mealTargetCalories * 0.08;
    } else if (foodCategory === 'fruit') {
      targetFoodCalories = baseCalories;
    } else if (foodCategory === 'dairy') {
      targetFoodCalories = baseCalories;
    } else if (foodCategory === 'legume') {
      targetFoodCalories = baseCalories;
    } else {
      targetFoodCalories = baseCalories;
    }
  } else if (dailyCalories >= 2500) {
    // DIETA DE MANUTENÇÃO (2500-2999 kcal)
    if (foodCategory === 'protein') {
      targetFoodCalories = (mealTargetCalories - fatCalories) * 0.30;
    } else if (foodCategory === 'carb') {
      targetFoodCalories = (mealTargetCalories - fatCalories) * 0.35;
    } else if (foodCategory === 'fat') {
      targetFoodCalories = mealTargetCalories * 0.08;
    } else if (foodCategory === 'fruit') {
      targetFoodCalories = baseCalories;
    } else if (foodCategory === 'dairy') {
      targetFoodCalories = baseCalories;
    } else if (foodCategory === 'legume') {
      targetFoodCalories = baseCalories;
    } else {
      targetFoodCalories = baseCalories;
    }
  } else {
    // DIETA DE EMAGRECIMENTO (<2500 kcal)
    if (foodCategory === 'protein') {
      targetFoodCalories = (mealTargetCalories - fatCalories) * 0.28;
    } else if (foodCategory === 'carb') {
      targetFoodCalories = (mealTargetCalories - fatCalories) * 0.28;
    } else if (foodCategory === 'fat') {
      targetFoodCalories = mealTargetCalories * 0.08;
    } else if (foodCategory === 'fruit') {
      targetFoodCalories = baseCalories;
    } else if (foodCategory === 'dairy') {
      targetFoodCalories = baseCalories;
    } else if (foodCategory === 'legume') {
      targetFoodCalories = baseCalories;
    } else {
      targetFoodCalories = baseCalories;
    }
  }
  
  // Calcular multiplicador inicial
  let multiplier = targetFoodCalories / baseCalories;
  
  // LIMITES DINÂMICOS BASEADOS NAS CALORIAS TOTAIS DIÁRIAS
  let maxMultiplier: number;
  
  if (dailyCalories <= 1500) {
    maxMultiplier = 2.0;
  } else if (dailyCalories <= 2000) {
    maxMultiplier = 2.5;
  } else if (dailyCalories <= 2500) {
    maxMultiplier = 3.0;
  } else if (dailyCalories <= 3000) {
    maxMultiplier = 4.0;
  } else if (dailyCalories <= 3500) {
    maxMultiplier = 5.0;
  } else {
    maxMultiplier = 6.0;
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