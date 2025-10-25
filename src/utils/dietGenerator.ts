import { UserData, DietPlanOutput, DietFood, DietMeal } from '@/types';
import { BREAKFAST_SNACK_FOODS, LUNCH_DINNER_FOODS, FOOD_RESTRICTIONS, MEAL_CATEGORIES } from '@/data/foodData';
import { Coffee, UtensilsCrossed, Cookie, Moon } from 'lucide-react';

// --- Interfaces Internas para a Tabela TACO ---
interface FoodItem {
  alimento: string;
  porcao: string;
  kcal: number;
  prot: number;
  carbo: number;
  gord: number;
  gluten: 'SIM' | 'NÃO';
  lactose: 'SIM' | 'NÃO';
}

interface FruitItem {
  alimento: string;
  porcao: string;
  kcal: number;
  prot: number;
  carbo: number;
  gord: number;
}

// --- Tabela TACO - Alimentos Detalhados (mantidos aqui para macros e porções) ---

const detailedBreakfastSnackProteins: FoodItem[] = [
  { alimento: 'Ovos', porcao: '1 unidade (50g)', kcal: 75, prot: 6, carbo: 0.6, gord: 5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Iogurte grego natural', porcao: '100g', kcal: 59, prot: 10, carbo: 3.6, gord: 0.4, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Whey Protein em pó', porcao: '30g (1 scoop)', kcal: 120, prot: 24, carbo: 3, gord: 1.5, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Queijo Mussarela', porcao: '30g (1 fatia)', kcal: 80, prot: 6, carbo: 1, gord: 6, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Queijo Minas Frescal', porcao: '30g (1 fatia)', kcal: 66, prot: 5, carbo: 1.2, gord: 4.5, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Requeijão Light', porcao: '20g (1 colher sopa)', kcal: 48, prot: 3, carbo: 1.5, gord: 3.5, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Creme de Ricota Light', porcao: '30g (1 colher sopa)', kcal: 42, prot: 4, carbo: 2, gord: 2, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Queijo Cottage', porcao: '100g', kcal: 98, prot: 11, carbo: 3.4, gord: 4.3, gluten: 'NÃO', lactose: 'SIM' },
];

const detailedBreakfastSnackCarbs: FoodItem[] = [
  { alimento: 'Aveia', porcao: '30g (3 colheres sopa)', kcal: 114, prot: 4.2, carbo: 19.5, gord: 2.4, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Pão integral', porcao: '50g (2 fatias)', kcal: 127, prot: 5, carbo: 21, gord: 2, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Tapioca', porcao: '50g (1 unidade)', kcal: 172, prot: 0.1, carbo: 42, gord: 0.1, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Pão francês', porcao: '50g (1 unidade)', kcal: 136, prot: 4.5, carbo: 27, gord: 1, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Pão de forma', porcao: '50g (2 fatias)', kcal: 134, prot: 4.3, carbo: 26, gord: 1.5, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Granola', porcao: '30g (3 colheres sopa)', kcal: 135, prot: 3, carbo: 22, gord: 4, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Cuscuz de Milho', porcao: '100g', kcal: 112, prot: 2.3, carbo: 24, gord: 0.5, gluten: 'NÃO', lactose: 'NÃO' },
];

const detailedFruits: FruitItem[] = [
  { alimento: 'Maçã', porcao: '130g (1 unidade)', kcal: 68, prot: 0.3, carbo: 18, gord: 0.1 },
  { alimento: 'Banana', porcao: '100g (1 unidade)', kcal: 89, prot: 1.1, carbo: 22.8, gord: 0.3 },
  { alimento: 'Frutas vermelhas (mix)', porcao: '100g', kcal: 57, prot: 0.7, carbo: 14, gord: 0.3 },
  { alimento: 'Laranja', porcao: '180g (1 unidade)', kcal: 86, prot: 1.3, carbo: 21, gord: 0.2 },
  { alimento: 'Abacaxi', porcao: '100g', kcal: 50, prot: 0.5, carbo: 13, gord: 0.1 },
  { alimento: 'Mamão', porcao: '150g', kcal: 68, prot: 0.8, carbo: 17, gord: 0.2 },
  { alimento: 'Morango', porcao: '100g', kcal: 32, prot: 0.6, carbo: 7.7, gord: 0.3 },
  { alimento: 'Melancia', porcao: '150g', kcal: 45, prot: 0.9, carbo: 11, gord: 0.2 },
  { alimento: 'Melão', porcao: '150g', kcal: 51, prot: 1.2, carbo: 12, gord: 0.2 },
  { alimento: 'Uva', porcao: '100g', kcal: 69, prot: 0.6, carbo: 18, gord: 0.2 },
  { alimento: 'Manga', porcao: '130g (1 unidade)', kcal: 78, prot: 0.7, carbo: 20, gord: 0.3 },
  { alimento: 'Pera', porcao: '150g (1 unidade)', kcal: 86, prot: 0.5, carbo: 23, gord: 0.2 },
  { alimento: 'Kiwi', porcao: '100g (1 unidade)', kcal: 61, prot: 1.1, carbo: 15, gord: 0.5 },
  { alimento: 'Pêssego', porcao: '130g (1 unidade)', kcal: 51, prot: 1.2, carbo: 13, gord: 0.3 },
  { alimento: 'Ameixa', porcao: '100g (2 unidades)', kcal: 46, prot: 0.7, carbo: 12, gord: 0.3 },
  { alimento: 'Goiaba', porcao: '100g (1 unidade)', kcal: 68, prot: 2.6, carbo: 14, gord: 1 },
];

const detailedDairy: FoodItem[] = [
  { alimento: 'Leite sem lactose', porcao: '200ml', kcal: 90, prot: 6, carbo: 9, gord: 3, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Leite de amêndoas', porcao: '200ml', kcal: 30, prot: 1, carbo: 1.5, gord: 2.5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Leite Integral', porcao: '200ml', kcal: 122, prot: 6.2, carbo: 9, gord: 6.6, gluten: 'NÃO', lactose: 'SIM' },
  { alimento: 'Iogurte Natural Integral', porcao: '170ml', kcal: 102, prot: 5.8, carbo: 8.2, gord: 5.4, gluten: 'NÃO', lactose: 'SIM' },
];

const detailedGoodFats: FoodItem[] = [
  { alimento: 'Abacate', porcao: '50g', kcal: 80, prot: 1, carbo: 4.3, gord: 7.5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Azeite de oliva extra virgem', porcao: '10ml (1 colher sopa)', kcal: 88, prot: 0, carbo: 0, gord: 10, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Castanhas (mix)', porcao: '20g (6 unidades)', kcal: 131, prot: 3, carbo: 5, gord: 11, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Sementes de chia', porcao: '15g (1 colher sopa)', kcal: 74, prot: 2.5, carbo: 6.3, gord: 4.6, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Sementes de girassol', porcao: '20g', kcal: 116, prot: 4.2, carbo: 4, gord: 10, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Sementes de linhaça', porcao: '15g (1 colher sopa)', kcal: 80, prot: 2.7, carbo: 4.4, gord: 6.3, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Pasta de amendoim integral', porcao: '20g (1 colher sopa)', kcal: 120, prot: 5, carbo: 4, gord: 10, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Amêndoas', porcao: '20g (7 unidades)', kcal: 115, prot: 4.3, carbo: 4, gord: 10, gluten: 'NÃO', lactose: 'NÃO' },
];

const detailedLunchDinnerProteins: FoodItem[] = [
  { alimento: 'Peito de frango', porcao: '100g', kcal: 165, prot: 31, carbo: 0, gord: 3.6, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Filé de tilápia', porcao: '100g', kcal: 96, prot: 20, carbo: 0, gord: 1.5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Salmão', porcao: '100g', kcal: 211, prot: 23, carbo: 0, gord: 13, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Carne magra', porcao: '100g', kcal: 171, prot: 32, carbo: 0, gord: 4.5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Tofu', porcao: '100g', kcal: 76, prot: 8, carbo: 1.9, gord: 4.8, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Soja (cozida)', porcao: '100g', kcal: 141, prot: 12, carbo: 9.9, gord: 6, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Sardinha em lata', porcao: '100g', kcal: 133, prot: 21, carbo: 0, gord: 5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Atum em lata ao natural', porcao: '100g', kcal: 108, prot: 26, carbo: 0, gord: 0.8, gluten: 'NÃO', lactose: 'NÃO' },
];

const detailedLunchDinnerCarbs: FoodItem[] = [
  { alimento: 'Batata doce', porcao: '100g', kcal: 77, prot: 0.6, carbo: 18.4, gord: 0.1, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Arroz integral', porcao: '100g', kcal: 124, prot: 2.6, carbo: 25.8, gord: 1, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Arroz Branco Cozido', porcao: '100g', kcal: 128, prot: 2.5, carbo: 28.1, gord: 0.2, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Macarrão integral', porcao: '100g', kcal: 126, prot: 4.5, carbo: 25, gord: 1.2, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Batata inglesa cozida', porcao: '100g', kcal: 52, prot: 1.2, carbo: 11.9, gord: 0.1, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Macarrão cozido', porcao: '100g', kcal: 138, prot: 4.9, carbo: 28, gord: 0.8, gluten: 'SIM', lactose: 'NÃO' },
  { alimento: 'Mandioca cozida', porcao: '100g', kcal: 125, prot: 0.6, carbo: 30, gord: 0.3, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Batata Baroa (Mandioquinha)', porcao: '100g', kcal: 85, prot: 0.9, carbo: 20, gord: 0.2, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Inhame', porcao: '100g', kcal: 97, prot: 1.5, carbo: 23, gord: 0.2, gluten: 'NÃO', lactose: 'NÃO' },
];

const detailedLegumes: FoodItem[] = [
  { alimento: 'Lentilha', porcao: '100g', kcal: 93, prot: 6.3, carbo: 16, gord: 0.4, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Feijão cozido', porcao: '100g', kcal: 77, prot: 4.8, carbo: 13.6, gord: 0.5, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Quinoa', porcao: '100g', kcal: 120, prot: 4.4, carbo: 21.3, gord: 1.9, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Grão de Bico', porcao: '100g', kcal: 164, prot: 8.9, carbo: 27.4, gord: 2.6, gluten: 'NÃO', lactose: 'NÃO' },
  { alimento: 'Ervilha', porcao: '100g', kcal: 81, prot: 5.4, carbo: 14.5, gord: 0.4, gluten: 'NÃO', lactose: 'NÃO' },
];

// Combinar todas as listas detalhadas para facilitar a busca
const allDetailedFoods: (FoodItem | FruitItem)[] = [
  ...detailedBreakfastSnackProteins,
  ...detailedBreakfastSnackCarbs,
  ...detailedFruits,
  ...detailedDairy,
  ...detailedGoodFats,
  ...detailedLunchDinnerProteins,
  ...detailedLunchDinnerCarbs,
  ...detailedLegumes,
];

// --- Regras de Substituição ---
const substitutions: { [key: string]: { [key: string]: { name: string; quantity: string } } } = {
  'ovos': {
    '1 unidade (50g)': { name: 'queijo cottage', quantity: '33g' }, // Adjusted for 1 unit
    '2 unidades': { name: 'queijo mussarela', quantity: '1 fatia' }, // Simplified
    '3 unidades': { name: 'queijo cottage', quantity: '100g' },
  },
  'iogurte grego natural': { '100g': { name: 'whey protein em pó', quantity: '30g (1 scoop)' } },
  'whey protein em pó': { '30g (1 scoop)': { name: 'iogurte grego natural', quantity: '100g' } },
  'queijo mussarela': { '30g (1 fatia)': { name: 'queijo minas frescal', quantity: '30g (1 fatia)' } },
  'queijo minas frescal': { '30g (1 fatia)': { name: 'queijo mussarela', quantity: '30g (1 fatia)' } },
  'requeijão light': { '20g (1 colher sopa)': { name: 'creme de ricota light', quantity: '30g (1 colher sopa)' } },
  'creme de ricota light': { '30g (1 colher sopa)': { name: 'requeijão light', quantity: '20g (1 colher sopa)' } },
  'queijo cottage': { '100g': { name: 'ovos', quantity: '3 unidades' } },

  'aveia': { '30g (3 colheres sopa)': { name: 'granola', quantity: '3 colheres sopa' } },
  'pão integral': { '50g (2 fatias)': { name: 'tapioca', quantity: '50g (1 unidade)' } },
  'tapioca': { '50g (1 unidade)': { name: 'pão de forma', quantity: '2 fatias' } },
  'pão francês': { '50g (1 unidade)': { name: 'pão integral', quantity: '2 fatias' } },
  'pão de forma': { '50g (2 fatias)': { name: 'pão francês', quantity: '1 unidade' } },
  'granola': { '30g (3 colheres sopa)': { name: 'aveia', quantity: '3 colheres sopa' } },
  'cuscuz de milho': { '100g': { name: 'aveia', quantity: '3 colheres sopa' } },

  'maçã': { '130g (1 unidade)': { name: 'pera', quantity: '150g (1 unidade)' } },
  'banana': { '100g (1 unidade)': { name: 'maçã', quantity: '130g (1 unidade)' } },
  'frutas vermelhas (mix)': { '100g': { name: 'abacaxi', quantity: '100g' } },
  'laranja': { '180g (1 unidade)': { name: 'morango', quantity: '100g' } },
  'abacaxi': { '100g': { name: 'frutas vermelhas (mix)', quantity: '100g' } },
  'mamão': { '150g': { name: 'manga', quantity: '130g (1 unidade)' } },
  'morango': { '100g': { name: 'laranja', quantity: '180g (1 unidade)' } },
  'melancia': { '150g': { name: 'melão', quantity: '150g' } },
  'melão': { '150g': { name: 'melancia', quantity: '150g' } },
  'uva': { '100g': { name: 'morango', quantity: '100g' } },
  'manga': { '130g (1 unidade)': { name: 'mamão', quantity: '150g' } },
  'pera': { '150g (1 unidade)': { name: 'kiwi', quantity: '100g (1 unidade)' } },
  'kiwi': { '100g (1 unidade)': { name: 'pera', quantity: '150g (1 unidade)' } },
  'pêssego': { '130g (1 unidade)': { name: 'ameixa', quantity: '100g (2 unidades)' } },
  'ameixa': { '100g (2 unidades)': { name: 'pêssego', quantity: '130g (1 unidade)' } },
  'goiaba': { '100g (1 unidade)': { name: 'maçã', quantity: '130g (1 unidade)' } },

  'peito de frango': { '100g': { name: 'filé de tilápia', quantity: '100g' } },
  'filé de tilápia': { '100g': { name: 'peito de frango', quantity: '100g' } },
  'salmão': { '100g': { name: 'carne magra', quantity: '100g' } },
  'carne magra': { '100g': { name: 'sardinha em lata', quantity: '100g' } },
  'tofu': { '100g': { name: 'soja (cozida)', quantity: '100g' } },
  'soja (cozida)': { '100g': { name: 'tofu', quantity: '100g' } },
  'sardinha em lata': { '100g': { name: 'atum em lata ao natural', quantity: '100g' } },
  'atum em lata ao natural': { '100g': { name: 'sardinha em lata', quantity: '100g' } },

  'batata doce': { '100g': { name: 'mandioca cozida', quantity: '100g' } },
  'arroz integral': { '100g': { name: 'arroz branco cozido', quantity: '100g' } },
  'arroz branco cozido': { '100g': { name: 'arroz integral', quantity: '100g' } },
  'macarrão integral': { '100g': { name: 'macarrão cozido', quantity: '100g' } },
  'batata inglesa cozida': { '100g': { name: 'inhame', quantity: '100g' } },
  'macarrão cozido': { '100g': { name: 'macarrão integral', quantity: '100g' } },
  'mandioca cozida': { '100g': { name: 'batata doce', quantity: '100g' } },
  'batata baroa (mandioquinha)': { '100g': { name: 'batata inglesa cozida', quantity: '100g' } },
  'inhame': { '100g': { name: 'batata baroa (mandioquinha)', quantity: '100g' } },

  'lentilha': { '100g': { name: 'grão de bico', quantity: '100g' } },
  'feijão cozido': { '100g': { name: 'lentilha', quantity: '100g' } },
  'quinoa': { '100g': { name: 'ervilha', quantity: '100g' } },
  'grão de bico': { '100g': { name: 'feijão cozido', quantity: '100g' } },
  'ervilha': { '100g': { name: 'quinoa', quantity: '100g' } },
};

// --- Helper Functions ---

const calculateTMB = (userData: UserData): number => {
  const { weight, height, age, gender } = userData;
  if (weight === null || height === null || age === null || gender === null) return 0;

  if (gender === 'Masculino') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else { // Feminino
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
};

const calculateTDEE = (tmb: number, activityLevel: UserData['activityLevel']): number => {
  let activityFactor = 1.2; // Sedentário
  switch (activityLevel) {
    case 'Leve': activityFactor = 1.375; break;
    case 'Moderado': activityFactor = 1.55; break;
    case 'Intenso': activityFactor = 1.725; break;
    case 'Muito Intenso': activityFactor = 1.9; break;
  }
  return tmb * activityFactor;
};

const adjustCaloriesByGoal = (tdee: number, goal: UserData['goal']): number => {
  if (goal === 'Emagrecimento') {
    return tdee - 500;
  } else if (goal === 'Ganho de Massa') {
    return tdee + 300;
  } else { // Manutenção
    return tdee;
  }
};

const calculateMacros = (totalCalories: number, goal: UserData['goal']): { protein: number; carbs: number; fats: number } => {
  let proteinPct, carbPct, fatPct;

  if (goal === 'Emagrecimento') {
    proteinPct = 0.35;
    carbPct = 0.35;
    fatPct = 0.30;
  } else if (goal === 'Ganho de Massa') {
    proteinPct = 0.30;
    carbPct = 0.50;
    fatPct = 0.20;
  } else { // Manutenção
    proteinPct = 0.25;
    carbPct = 0.45;
    fatPct = 0.30;
  }

  const protein = (totalCalories * proteinPct) / 4;
  const carbs = (totalCalories * carbPct) / 4;
  const fats = (totalCalories * fatPct) / 9;

  return { protein: Math.round(protein), carbs: Math.round(carbs), fats: Math.round(fats) };
};

const calculateWaterIntake = (weight: number | null, activityLevel: UserData['activityLevel']): number => {
  if (weight === null) return 0;

  let waterBase = 35 * weight;
  let activityAdjustment = 0;

  switch (activityLevel) {
    case 'Leve': activityAdjustment = 250; break;
    case 'Moderado': activityAdjustment = 500; break;
    case 'Intenso': activityAdjustment = 750; break;
    case 'Muito Intenso': activityAdjustment = 1000; break;
  }

  const totalWaterMl = waterBase + activityAdjustment;
  const totalWaterL = totalWaterMl / 1000;

  // Round to nearest 0.5L
  return Math.round(totalWaterL * 2) / 2;
};

const filterFoodsByIntolerances = <T extends FoodItem | FruitItem>(foods: T[], intolerances: string[]): T[] => {
  return foods.filter(food => {
    const foodName = food.alimento;
    if (intolerances.includes('gluten') && FOOD_RESTRICTIONS.gluten.includes(foodName)) return false;
    if (intolerances.includes('lactose') && FOOD_RESTRICTIONS.lactose.includes(foodName)) return false;
    return true;
  });
};

const getRandomElement = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
};

const findFoodItem = (name: string, foodList: (FoodItem | FruitItem)[]): FoodItem | FruitItem | undefined => {
  return foodList.find(f => f.alimento.toLowerCase() === name.toLowerCase());
};

const getFoodSubstitutionDetails = (foodName: string, foodQuantity: string): { name: string; quantity: string } | null => {
  const lowerCaseFoodName = foodName.toLowerCase();
  if (substitutions[lowerCaseFoodName] && substitutions[lowerCaseFoodName][foodQuantity]) {
    return substitutions[lowerCaseFoodName][foodQuantity];
  }
  return null;
};

// --- Main Diet Generation Function ---
export function generateDiet(userData: UserData): DietPlanOutput {
  // 1. Cálculos Fundamentais
  const tmb = calculateTMB(userData);
  const tdee = calculateTDEE(tmb, userData.activityLevel);
  const totalDailyCalories = Math.round(adjustCaloriesByGoal(tdee, userData.goal));
  const { protein, carbs, fats } = calculateMacros(totalDailyCalories, userData.goal);
  const water = calculateWaterIntake(userData.weight, userData.activityLevel);

  // 2. Filtrar alimentos por intolerâncias
  const availableBreakfastSnackProteins = filterFoodsByIntolerances(detailedBreakfastSnackProteins, userData.intolerances);
  const availableBreakfastSnackCarbs = filterFoodsByIntolerances(detailedBreakfastSnackCarbs, userData.intolerances);
  const availableFruits = detailedFruits; // Frutas não têm glúten/lactose na tabela fornecida
  const availableDairy = filterFoodsByIntolerances(detailedDairy, userData.intolerances);
  const availableGoodFats = filterFoodsByIntolerances(detailedGoodFats, userData.intolerances);
  const availableLunchDinnerProteins = filterFoodsByIntolerances(detailedLunchDinnerProteins, userData.intolerances);
  const availableLunchDinnerCarbs = filterFoodsByIntolerances(detailedLunchDinnerCarbs, userData.intolerances);
  const availableLegumes = filterFoodsByIntolerances(detailedLegumes, userData.intolerances);

  // 3. Distribuição calórica por refeição
  // Mantido como sugestão, mas a soma real será calculada no final
  const mealCalorieDistribution = {
    breakfast: Math.round(totalDailyCalories * 0.25),
    lunch: Math.round(totalDailyCalories * 0.35),
    snack: Math.round(totalDailyCalories * 0.15),
    dinner: Math.round(totalDailyCalories * 0.25),
  };

  const meals: DietMeal[] = [];
  let remainingGoodFatsForDistribution = [...availableGoodFats];
  let chiaSeedsUsed = 0;
  const usedFoodsToday: string[] = []; // Para variedade

  // Helper para selecionar um alimento com base nas preferências e evitar repetições
  const selectFood = <T extends FoodItem | FruitItem>(
    foodList: T[],
    preferences: string[] | undefined,
    excludeUsed: string[] = []
  ): T | undefined => {
    let candidates = foodList.filter(f => !excludeUsed.includes(f.alimento.toLowerCase()));
    if (preferences && preferences.length > 0) {
      const preferredCandidates = candidates.filter(f => preferences.map(p => p.toLowerCase()).includes(f.alimento.toLowerCase()));
      if (preferredCandidates.length > 0) {
        candidates = preferredCandidates;
      }
    }
    return getRandomElement(candidates);
  };

  // Helper para adicionar alimento à refeição
  const addFoodToMeal = (
    mealFoods: DietFood[],
    food: FoodItem | FruitItem,
    isMainMacro: boolean = false
  ) => {
    const substitution = isMainMacro ? getFoodSubstitutionDetails(food.alimento, food.porcao) : null;
    mealFoods.push({
      name: food.alimento.toLowerCase(),
      quantity: food.porcao,
      substitution: substitution?.name || null,
      substitutionQuantity: substitution?.quantity || null,
    });
    usedFoodsToday.push(food.alimento.toLowerCase());
    return food; // Retorna o alimento adicionado para cálculos de macro
  };

  // --- Geração das Refeições ---

  // Refeição: Café da Manhã
  const breakfastFoods: DietFood[] = [];
  let currentBreakfastMacros = { kcal: 0, prot: 0, carbo: 0, gord: 0 };

  // Proteína (Obrigatório)
  const bp = selectFood(availableBreakfastSnackProteins, userData.foodPreferences.breakfast.proteins, usedFoodsToday);
  if (bp) {
    const addedFood = addFoodToMeal(breakfastFoods, bp, true);
    currentBreakfastMacros.kcal += addedFood.kcal;
    currentBreakfastMacros.prot += addedFood.prot;
    currentBreakfastMacros.carbo += addedFood.carbo;
    currentBreakfastMacros.gord += addedFood.gord;
  }

  // Carboidrato (Obrigatório)
  const bc = selectFood(availableBreakfastSnackCarbs, userData.foodPreferences.breakfast.carbs, usedFoodsToday);
  if (bc) {
    const addedFood = addFoodToMeal(breakfastFoods, bc, true);
    currentBreakfastMacros.kcal += addedFood.kcal;
    currentBreakfastMacros.prot += addedFood.prot;
    currentBreakfastMacros.carbo += addedFood.carbo;
    currentBreakfastMacros.gord += addedFood.gord;
  }

  // Fruta (Obrigatório)
  const bf = selectFood(availableFruits, userData.foodPreferences.breakfast.fruits, usedFoodsToday);
  if (bf) {
    const addedFood = addFoodToMeal(breakfastFoods, bf);
    currentBreakfastMacros.kcal += addedFood.kcal;
    currentBreakfastMacros.prot += addedFood.prot;
    currentBreakfastMacros.carbo += addedFood.carbo;
    currentBreakfastMacros.gord += addedFood.gord;
  }

  // Laticínios (Opcional)
  if (userData.selectedCategories.breakfast.includes('Laticínios') && availableDairy.length > 0) {
    const bd = selectFood(availableDairy, userData.foodPreferences.breakfast.dairy, usedFoodsToday);
    if (bd) {
      const addedFood = addFoodToMeal(breakfastFoods, bd);
      currentBreakfastMacros.kcal += addedFood.kcal;
      currentBreakfastMacros.prot += addedFood.prot;
      currentBreakfastMacros.carbo += addedFood.carbo;
      currentBreakfastMacros.gord += addedFood.gord;
    }
  }

  // Gordura Boa (Opcional/Distribuição)
  let fatAddedToBreakfast = false;
  if (userData.selectedCategories.breakfast.includes('Gorduras Boas') && userData.foodPreferences.breakfast.fats.length > 0) {
    const bgf = selectFood(availableGoodFats, userData.foodPreferences.breakfast.fats, usedFoodsToday);
    if (bgf) {
      const addedFood = addFoodToMeal(breakfastFoods, bgf);
      currentBreakfastMacros.kcal += addedFood.kcal;
      currentBreakfastMacros.prot += addedFood.prot;
      currentBreakfastMacros.carbo += addedFood.carbo;
      currentBreakfastMacros.gord += addedFood.gord;
      remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== bgf.alimento);
      if (bgf.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
      fatAddedToBreakfast = true;
    }
  } else if (remainingGoodFatsForDistribution.length > 0 && !fatAddedToBreakfast) {
    const randomFat = getRandomElement(remainingGoodFatsForDistribution);
    if (randomFat) {
      const addedFood = addFoodToMeal(breakfastFoods, randomFat);
      currentBreakfastMacros.kcal += addedFood.kcal;
      currentBreakfastMacros.prot += addedFood.prot;
      currentBreakfastMacros.carbo += addedFood.carbo;
      currentBreakfastMacros.gord += addedFood.gord;
      remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== randomFat.alimento);
      if (randomFat.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
      fatAddedToBreakfast = true;
    }
  }

  meals.push({
    name: 'Café da Manhã',
    time: userData.mealTimes.breakfast,
    calories: Math.round(currentBreakfastMacros.kcal),
    foods: breakfastFoods,
  });

  // Refeição: Almoço
  const lunchFoods: DietFood[] = [];
  let currentLunchMacros = { kcal: 0, prot: 0, carbo: 0, gord: 0 };

  // Proteína (Obrigatório)
  const lp = selectFood(availableLunchDinnerProteins, userData.foodPreferences.lunch.proteins, usedFoodsToday);
  if (lp) {
    const addedFood = addFoodToMeal(lunchFoods, lp, true);
    currentLunchMacros.kcal += addedFood.kcal;
    currentLunchMacros.prot += addedFood.prot;
    currentLunchMacros.carbo += addedFood.carbo;
    currentLunchMacros.gord += addedFood.gord;
  }

  // Carboidrato (Obrigatório)
  const lc = selectFood(availableLunchDinnerCarbs, userData.foodPreferences.lunch.carbs, usedFoodsToday);
  if (lc) {
    const addedFood = addFoodToMeal(lunchFoods, lc, true);
    currentLunchMacros.kcal += addedFood.kcal;
    currentLunchMacros.prot += addedFood.prot;
    currentLunchMacros.carbo += addedFood.carbo;
    currentLunchMacros.gord += addedFood.gord;
  }

  // Leguminosas (Opcional)
  if (userData.selectedCategories.lunch.includes('Leguminosas') && availableLegumes.length > 0) {
    const ll = selectFood(availableLegumes, userData.foodPreferences.lunch.legumes, usedFoodsToday);
    if (ll) {
      const addedFood = addFoodToMeal(lunchFoods, ll);
      currentLunchMacros.kcal += addedFood.kcal;
      currentLunchMacros.prot += addedFood.prot;
      currentLunchMacros.carbo += addedFood.carbo;
      currentLunchMacros.gord += addedFood.gord;
    }
  }

  // Gordura Boa (Opcional/Distribuição)
  let fatAddedToLunch = false;
  if (userData.selectedCategories.lunch.includes('Gorduras Boas') && userData.foodPreferences.lunch.fats.length > 0) {
    const lgf = selectFood(availableGoodFats, userData.foodPreferences.lunch.fats, usedFoodsToday);
    if (lgf) {
      const addedFood = addFoodToMeal(lunchFoods, lgf);
      currentLunchMacros.kcal += addedFood.kcal;
      currentLunchMacros.prot += addedFood.prot;
      currentLunchMacros.carbo += addedFood.carbo;
      currentLunchMacros.gord += addedFood.gord;
      remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== lgf.alimento);
      if (lgf.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
      fatAddedToLunch = true;
    }
  } else if (remainingGoodFatsForDistribution.length > 0 && !fatAddedToLunch) {
    const randomFat = getRandomElement(remainingGoodFatsForDistribution);
    if (randomFat) {
      const addedFood = addFoodToMeal(lunchFoods, randomFat);
      currentLunchMacros.kcal += addedFood.kcal;
      currentLunchMacros.prot += addedFood.prot;
      currentLunchMacros.carbo += addedFood.carbo;
      currentLunchMacros.gord += addedFood.gord;
      remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== randomFat.alimento);
      if (randomFat.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
      fatAddedToLunch = true;
    }
  }

  // Vegetais (Obrigatório)
  lunchFoods.push({ name: 'vegetais', quantity: 'à gosto', substitution: null, substitutionQuantity: null });

  meals.push({
    name: 'Almoço',
    time: userData.mealTimes.lunch,
    calories: Math.round(currentLunchMacros.kcal),
    foods: lunchFoods,
  });

  // Refeição: Lanche da Tarde
  const snackFoods: DietFood[] = [];
  let currentSnackMacros = { kcal: 0, prot: 0, carbo: 0, gord: 0 };

  // Proteína (Obrigatório)
  const sp = selectFood(availableBreakfastSnackProteins, userData.foodPreferences.snack.proteins, usedFoodsToday);
  if (sp) {
    const addedFood = addFoodToMeal(snackFoods, sp, true);
    currentSnackMacros.kcal += addedFood.kcal;
    currentSnackMacros.prot += addedFood.prot;
    currentSnackMacros.carbo += addedFood.carbo;
    currentSnackMacros.gord += addedFood.gord;
  }

  // Carboidrato (Obrigatório)
  const sc = selectFood(availableBreakfastSnackCarbs, userData.foodPreferences.snack.carbs, usedFoodsToday);
  if (sc) {
    const addedFood = addFoodToMeal(snackFoods, sc, true);
    currentSnackMacros.kcal += addedFood.kcal;
    currentSnackMacros.prot += addedFood.prot;
    currentSnackMacros.carbo += addedFood.carbo;
    currentSnackMacros.gord += addedFood.gord;
  }

  // Fruta (Obrigatório)
  const sf = selectFood(availableFruits, userData.foodPreferences.snack.fruits, usedFoodsToday);
  if (sf) {
    const addedFood = addFoodToMeal(snackFoods, sf);
    currentSnackMacros.kcal += addedFood.kcal;
    currentSnackMacros.prot += addedFood.prot;
    currentSnackMacros.carbo += addedFood.carbo;
    currentSnackMacros.gord += addedFood.gord;
  }

  // Laticínios (Opcional)
  if (userData.selectedCategories.snack.includes('Laticínios') && availableDairy.length > 0) {
    const sd = selectFood(availableDairy, userData.foodPreferences.snack.dairy, usedFoodsToday);
    if (sd) {
      const addedFood = addFoodToMeal(snackFoods, sd);
      currentSnackMacros.kcal += addedFood.kcal;
      currentSnackMacros.prot += addedFood.prot;
      currentSnackMacros.carbo += addedFood.carbo;
      currentSnackMacros.gord += addedFood.gord;
    }
  }

  // Gordura Boa (Opcional/Distribuição)
  let fatAddedToSnack = false;
  if (userData.selectedCategories.snack.includes('Gorduras Boas') && userData.foodPreferences.snack.fats.length > 0) {
    const sgf = selectFood(availableGoodFats, userData.foodPreferences.snack.fats, usedFoodsToday);
    if (sgf) {
      if (sgf.alimento === 'Sementes de chia' && chiaSeedsUsed + 15 > 15) {
        // Skip chia if it exceeds limit, try another fat
        const otherFats = remainingGoodFatsForDistribution.filter(f => f.alimento !== 'Sementes de chia');
        const otherRandomFat = getRandomElement(otherFats);
        if (otherRandomFat) {
          const addedFood = addFoodToMeal(snackFoods, otherRandomFat);
          currentSnackMacros.kcal += addedFood.kcal;
          currentSnackMacros.prot += addedFood.prot;
          currentSnackMacros.carbo += addedFood.carbo;
          currentSnackMacros.gord += addedFood.gord;
          remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== otherRandomFat.alimento);
          fatAddedToSnack = true;
        }
      } else {
        const addedFood = addFoodToMeal(snackFoods, sgf);
        currentSnackMacros.kcal += addedFood.kcal;
        currentSnackMacros.prot += addedFood.prot;
        currentSnackMacros.carbo += addedFood.carbo;
        currentSnackMacros.gord += addedFood.gord;
        remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== sgf.alimento);
        if (sgf.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
        fatAddedToSnack = true;
      }
    }
  } else if (remainingGoodFatsForDistribution.length > 0 && !fatAddedToSnack && chiaSeedsUsed < 15) {
    const randomFat = getRandomElement(remainingGoodFatsForDistribution);
    if (randomFat) {
      if (randomFat.alimento === 'Sementes de chia' && chiaSeedsUsed + 15 > 15) {
        const otherFats = remainingGoodFatsForDistribution.filter(f => f.alimento !== 'Sementes de chia');
        const otherRandomFat = getRandomElement(otherFats);
        if (otherRandomFat) {
          const addedFood = addFoodToMeal(snackFoods, otherRandomFat);
          currentSnackMacros.kcal += addedFood.kcal;
          currentSnackMacros.prot += addedFood.prot;
          currentSnackMacros.carbo += addedFood.carbo;
          currentSnackMacros.gord += addedFood.gord;
          remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== otherRandomFat.alimento);
          fatAddedToSnack = true;
        }
      } else {
        const addedFood = addFoodToMeal(snackFoods, randomFat);
        currentSnackMacros.kcal += addedFood.kcal;
        currentSnackMacros.prot += addedFood.prot;
        currentSnackMacros.carbo += addedFood.carbo;
        currentSnackMacros.gord += addedFood.gord;
        remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== randomFat.alimento);
        if (randomFat.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
        fatAddedToSnack = true;
      }
    }
  }

  meals.push({
    name: 'Lanche da Tarde',
    time: userData.mealTimes.snack,
    calories: Math.round(currentSnackMacros.kcal),
    foods: snackFoods,
  });

  // Refeição: Jantar
  const dinnerFoods: DietFood[] = [];
  let currentDinnerMacros = { kcal: 0, prot: 0, carbo: 0, gord: 0 };

  // Proteína (Obrigatório)
  const dp = selectFood(availableLunchDinnerProteins, userData.foodPreferences.dinner.proteins, usedFoodsToday);
  if (dp) {
    const addedFood = addFoodToMeal(dinnerFoods, dp, true);
    currentDinnerMacros.kcal += addedFood.kcal;
    currentDinnerMacros.prot += addedFood.prot;
    currentDinnerMacros.carbo += addedFood.carbo;
    currentDinnerMacros.gord += addedFood.gord;
  }

  // Carboidrato (Obrigatório)
  const dc = selectFood(availableLunchDinnerCarbs, userData.foodPreferences.dinner.carbs, usedFoodsToday);
  if (dc) {
    const addedFood = addFoodToMeal(dinnerFoods, dc, true);
    currentDinnerMacros.kcal += addedFood.kcal;
    currentDinnerMacros.prot += addedFood.prot;
    currentDinnerMacros.carbo += addedFood.carbo;
    currentDinnerMacros.gord += addedFood.gord;
  }

  // Leguminosas (Opcional)
  if (userData.selectedCategories.dinner.includes('Leguminosas') && availableLegumes.length > 0) {
    const dl = selectFood(availableLegumes, userData.foodPreferences.dinner.legumes, usedFoodsToday);
    if (dl) {
      const addedFood = addFoodToMeal(dinnerFoods, dl);
      currentDinnerMacros.kcal += addedFood.kcal;
      currentDinnerMacros.prot += addedFood.prot;
      currentDinnerMacros.carbo += addedFood.carbo;
      currentDinnerMacros.gord += addedFood.gord;
    }
  }

  // Gordura Boa (Opcional/Distribuição)
  let fatAddedToDinner = false;
  if (userData.selectedCategories.dinner.includes('Gorduras Boas') && userData.foodPreferences.dinner.fats.length > 0) {
    const dgf = selectFood(availableGoodFats, userData.foodPreferences.dinner.fats, usedFoodsToday);
    if (dgf) {
      if (dgf.alimento === 'Sementes de chia' && chiaSeedsUsed + 15 > 15) {
        const otherFats = remainingGoodFatsForDistribution.filter(f => f.alimento !== 'Sementes de chia');
        const otherRandomFat = getRandomElement(otherFats);
        if (otherRandomFat) {
          const addedFood = addFoodToMeal(dinnerFoods, otherRandomFat);
          currentDinnerMacros.kcal += addedFood.kcal;
          currentDinnerMacros.prot += addedFood.prot;
          currentDinnerMacros.carbo += addedFood.carbo;
          currentDinnerMacros.gord += addedFood.gord;
          remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== otherRandomFat.alimento);
          fatAddedToDinner = true;
        }
      } else {
        const addedFood = addFoodToMeal(dinnerFoods, dgf);
        currentDinnerMacros.kcal += addedFood.kcal;
        currentDinnerMacros.prot += addedFood.prot;
        currentDinnerMacros.carbo += addedFood.carbo;
        currentDinnerMacros.gord += addedFood.gord;
        remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== dgf.alimento);
        if (dgf.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
        fatAddedToDinner = true;
      }
    }
  } else if (remainingGoodFatsForDistribution.length > 0 && !fatAddedToDinner && chiaSeedsUsed < 15) {
    const randomFat = getRandomElement(remainingGoodFatsForDistribution);
    if (randomFat) {
      if (randomFat.alimento === 'Sementes de chia' && chiaSeedsUsed + 15 > 15) {
        const otherFats = remainingGoodFatsForDistribution.filter(f => f.alimento !== 'Sementes de chia');
        const otherRandomFat = getRandomElement(otherFats);
        if (otherRandomFat) {
          const addedFood = addFoodToMeal(dinnerFoods, otherRandomFat);
          currentDinnerMacros.kcal += addedFood.kcal;
          currentDinnerMacros.prot += addedFood.prot;
          currentDinnerMacros.carbo += addedFood.carbo;
          currentDinnerMacros.gord += addedFood.gord;
          remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== otherRandomFat.alimento);
          fatAddedToDinner = true;
        }
      } else {
        const addedFood = addFoodToMeal(dinnerFoods, randomFat);
        currentDinnerMacros.kcal += addedFood.kcal;
        currentDinnerMacros.prot += addedFood.prot;
        currentDinnerMacros.carbo += addedFood.carbo;
        currentDinnerMacros.gord += addedFood.gord;
        remainingGoodFatsForDistribution = remainingGoodFatsForDistribution.filter(f => f.alimento !== randomFat.alimento);
        if (randomFat.alimento === 'Sementes de chia') chiaSeedsUsed += 15;
        fatAddedToDinner = true;
      }
    }
  }

  // Vegetais (Obrigatório)
  dinnerFoods.push({ name: 'vegetais', quantity: 'à gosto', substitution: null, substitutionQuantity: null });

  meals.push({
    name: 'Jantar',
    time: userData.mealTimes.dinner,
    calories: Math.round(currentDinnerMacros.kcal),
    foods: dinnerFoods,
  });

  // Recalcular macros totais com base nos alimentos finais e suas porções
  let totalProt = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalKcal = 0;

  meals.forEach(meal => {
    meal.foods.forEach(foodItem => {
      const food = findFoodItem(foodItem.name, allDetailedFoods);
      if (food && foodItem.quantity !== 'à gosto') {
        totalKcal += food.kcal;
        totalProt += food.prot;
        totalCarbs += food.carbo;
        totalFats += food.gord;
      }
    });
  });

  const finalDietPlan: DietPlanOutput = {
    dailySummary: {
      calories: Math.round(totalKcal),
      protein: Math.round(totalProt),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats),
      water: water,
    },
    meals: meals,
  };

  return finalDietPlan;
}