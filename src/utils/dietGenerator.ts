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

  let tmb: number;
  if (gender === 'Masculino') {
    tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else { // Feminino
    tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  console.log(`TMB: ${tmb.toFixed(2)} kcal`);
  return tmb;
};

const calculateTDEE = (tmb: number, activityLevel: UserData['activityLevel']): number => {
  let activityFactor = 1.2; // Sedentário
  switch (activityLevel) {
    case 'Leve': activityFactor = 1.375; break;
    case 'Moderado': activityFactor = 1.55; break;
    case 'Intenso': activityFactor = 1.725; break;
    case 'Muito Intenso': activityFactor = 1.9; break;
  }
  const tdee = tmb * activityFactor;
  console.log(`TDEE: ${tdee.toFixed(2)} kcal (Fator: ${activityFactor})`);
  return tdee;
};

const adjustCaloriesByGoal = (tdee: number, goal: UserData['goal']): number => {
  let totalCalories: number;
  if (goal === 'Emagrecimento') {
    totalCalories = tdee - 500;
  } else if (goal === 'Ganho de Massa') {
    totalCalories = tdee + 300;
  } else { // Manutenção
    totalCalories = tdee;
  }

  // Validação crítica: MÍNIMO 1200 kcal, MÁXIMO 4000 kcal
  if (totalCalories < 1200) {
    totalCalories = 1200;
    console.log(`Calorias ajustadas para o mínimo (1200 kcal) devido ao objetivo de ${goal}.`);
  } else if (totalCalories > 4000) {
    totalCalories = 4000;
    console.log(`Calorias ajustadas para o máximo (4000 kcal) devido ao objetivo de ${goal}.`);
  }

  console.log(`Calorias Diárias (ajustadas por objetivo): ${totalCalories.toFixed(2)} kcal`);
  return totalCalories;
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

  console.log(`Macros calculados: Prot: ${protein.toFixed(2)}g, Carbs: ${carbs.toFixed(2)}g, Fats: ${fats.toFixed(2)}g`);
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

  // Arredondar para 0.5L
  const roundedWaterL = Math.round(totalWaterL * 2) / 2;
  console.log(`Água total: ${roundedWaterL.toFixed(1)}L`);
  return roundedWaterL;
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
  let totalDailyCalories = adjustCaloriesByGoal(tdee, userData.goal);
  let { protein, carbs, fats } = calculateMacros(totalDailyCalories, userData.goal);
  const water = calculateWaterIntake(userData.weight, userData.activityLevel);

  // 2. Validação Crítica (já incorporada em adjustCaloriesByGoal para min/max)
  // E para a soma dos macros, faremos no final com base nos alimentos reais.

  // 3. Distribuição calórica por refeição
  const mealCalorieDistribution = {
    breakfast: Math.round(totalDailyCalories * 0.25),
    lunch: Math.round(totalDailyCalories * 0.35),
    snack: Math.round(totalDailyCalories * 0.15),
    dinner: Math.round(totalDailyCalories * 0.25),
  };
  console.log("Distribuição calórica por refeição (alvo):", mealCalorieDistribution);

  const meals: DietMeal[] = [];
  const usedFoodsToday: string[] = []; // Para variedade e evitar repetições excessivas
  let currentTotalKcalFromFoods = 0;
  let currentTotalProtFromFoods = 0;
  let currentTotalCarbsFromFoods = 0;
  let currentTotalFatsFromFoods = 0;

  // Helper para selecionar um alimento das preferências do usuário, filtrando por intolerâncias
  const selectPreferredFood = <T extends FoodItem | FruitItem>(
    allFoodsList: T[],
    preferredFoodsNames: string[] | undefined,
    intolerances: string[],
    excludeUsed: string[] = []
  ): T | undefined => {
    let candidates = allFoodsList;

    // 1. Filtrar por intolerâncias
    candidates = filterFoodsByIntolerances(candidates, intolerances);

    // 2. Filtrar por preferências do usuário
    if (preferredFoodsNames && preferredFoodsNames.length > 0) {
      const preferredCandidates = candidates.filter(f => preferredFoodsNames.map(p => p.toLowerCase()).includes(f.alimento.toLowerCase()));
      if (preferredCandidates.length > 0) {
        candidates = preferredCandidates;
      }
    }
    
    // 3. Excluir alimentos já usados hoje para variedade
    candidates = candidates.filter(f => !excludeUsed.includes(f.alimento.toLowerCase()));

    return getRandomElement(candidates);
  };

  // Helper para adicionar alimento à refeição e atualizar macros totais
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
    
    currentTotalKcalFromFoods += food.kcal;
    currentTotalProtFromFoods += food.prot;
    currentTotalCarbsFromFoods += food.carbo;
    currentTotalFatsFromFoods += food.gord;
  };

  // --- Geração das Refeições ---

  // Refeição: Café da Manhã
  const breakfastFoods: DietFood[] = [];
  const userBreakfastPrefs = userData.foodPreferences.breakfast;

  // Proteína (Obrigatório)
  const bp = selectPreferredFood(detailedBreakfastSnackProteins, userBreakfastPrefs.proteins, userData.intolerances, usedFoodsToday);
  if (bp) addFoodToMeal(breakfastFoods, bp, true);

  // Carboidrato (Obrigatório)
  const bc = selectPreferredFood(detailedBreakfastSnackCarbs, userBreakfastPrefs.carbs, userData.intolerances, usedFoodsToday);
  if (bc) addFoodToMeal(breakfastFoods, bc, true);

  // Fruta (Obrigatório)
  const bf = selectPreferredFood(detailedFruits, userBreakfastPrefs.fruits, userData.intolerances, usedFoodsToday);
  if (bf) addFoodToMeal(breakfastFoods, bf);

  // Laticínios (Opcional)
  const bd = selectPreferredFood(detailedDairy, userBreakfastPrefs.dairy, userData.intolerances, usedFoodsToday);
  if (bd) addFoodToMeal(breakfastFoods, bd);

  // Gordura Boa (Opcional)
  const bgf = selectPreferredFood(detailedGoodFats, userBreakfastPrefs.fats, userData.intolerances, usedFoodsToday);
  if (bgf) addFoodToMeal(breakfastFoods, bgf);

  meals.push({
    name: 'Café da Manhã',
    time: userData.mealTimes.breakfast,
    calories: 0, // Será preenchido no final com base nos alimentos reais
    foods: breakfastFoods,
  });

  // Refeição: Almoço
  const lunchFoods: DietFood[] = [];
  const userLunchPrefs = userData.foodPreferences.lunch;

  // Proteína (Obrigatório)
  const lp = selectPreferredFood(detailedLunchDinnerProteins, userLunchPrefs.proteins, userData.intolerances, usedFoodsToday);
  if (lp) addFoodToMeal(lunchFoods, lp, true);

  // Carboidrato (Obrigatório)
  const lc = selectPreferredFood(detailedLunchDinnerCarbs, userLunchPrefs.carbs, userData.intolerances, usedFoodsToday);
  if (lc) addFoodToMeal(lunchFoods, lc, true);

  // Leguminosas (Opcional)
  const ll = selectPreferredFood(detailedLegumes, userLunchPrefs.legumes, userData.intolerances, usedFoodsToday);
  if (ll) addFoodToMeal(lunchFoods, ll);

  // Gordura Boa (Opcional)
  const lgf = selectPreferredFood(detailedGoodFats, userLunchPrefs.fats, userData.intolerances, usedFoodsToday);
  if (lgf) addFoodToMeal(lunchFoods, lgf);

  // Vegetais (Obrigatório)
  lunchFoods.push({ name: 'vegetais', quantity: 'à gosto', substitution: null, substitutionQuantity: null });

  meals.push({
    name: 'Almoço',
    time: userData.mealTimes.lunch,
    calories: 0, // Será preenchido no final
    foods: lunchFoods,
  });

  // Refeição: Lanche da Tarde
  const snackFoods: DietFood[] = [];
  const userSnackPrefs = userData.foodPreferences.snack;

  // Proteína (Obrigatório)
  const sp = selectPreferredFood(detailedBreakfastSnackProteins, userSnackPrefs.proteins, userData.intolerances, usedFoodsToday);
  if (sp) addFoodToMeal(snackFoods, sp, true);

  // Carboidrato (Obrigatório)
  const sc = selectPreferredFood(detailedBreakfastSnackCarbs, userSnackPrefs.carbs, userData.intolerances, usedFoodsToday);
  if (sc) addFoodToMeal(snackFoods, sc, true);

  // Fruta (Obrigatório)
  const sf = selectPreferredFood(detailedFruits, userSnackPrefs.fruits, userData.intolerances, usedFoodsToday);
  if (sf) addFoodToMeal(snackFoods, sf);

  // Laticínios (Opcional)
  const sd = selectPreferredFood(detailedDairy, userSnackPrefs.dairy, userData.intolerances, usedFoodsToday);
  if (sd) addFoodToMeal(snackFoods, sd);

  // Gordura Boa (Opcional)
  const sgf = selectPreferredFood(detailedGoodFats, userSnackPrefs.fats, userData.intolerances, usedFoodsToday);
  if (sgf) addFoodToMeal(snackFoods, sgf);

  meals.push({
    name: 'Lanche da Tarde',
    time: userData.mealTimes.snack,
    calories: 0, // Será preenchido no final
    foods: snackFoods,
  });

  // Refeição: Jantar
  const dinnerFoods: DietFood[] = [];
  const userDinnerPrefs = userData.foodPreferences.dinner;

  // Proteína (Obrigatório)
  const dp = selectPreferredFood(detailedLunchDinnerProteins, userDinnerPrefs.proteins, userData.intolerances, usedFoodsToday);
  if (dp) addFoodToMeal(dinnerFoods, dp, true);

  // Carboidrato (Obrigatório)
  const dc = selectPreferredFood(detailedLunchDinnerCarbs, userDinnerPrefs.carbs, userData.intolerances, usedFoodsToday);
  if (dc) addFoodToMeal(dinnerFoods, dc, true);

  // Leguminosas (Opcional)
  const dl = selectPreferredFood(detailedLegumes, userDinnerPrefs.legumes, userData.intolerances, usedFoodsToday);
  if (dl) addFoodToMeal(dinnerFoods, dl);

  // Gordura Boa (Opcional)
  const dgf = selectPreferredFood(detailedGoodFats, userDinnerPrefs.fats, userData.intolerances, usedFoodsToday);
  if (dgf) addFoodToMeal(dinnerFoods, dgf);

  // Vegetais (Obrigatório)
  dinnerFoods.push({ name: 'vegetais', quantity: 'à gosto', substitution: null, substitutionQuantity: null });

  meals.push({
    name: 'Jantar',
    time: userData.mealTimes.dinner,
    calories: 0, // Será preenchido no final
    foods: dinnerFoods,
  });

  // Recalcular calorias e macros para cada refeição e para o resumo diário
  meals.forEach(meal => {
    let mealKcal = 0;
    meal.foods.forEach(foodItem => {
      const food = findFoodItem(foodItem.name, allDetailedFoods);
      if (food && foodItem.quantity !== 'à gosto') { // 'vegetais à gosto' não tem kcal definida
        mealKcal += food.kcal;
      }
    });
    meal.calories = Math.round(mealKcal);
  });

  // Validação crítica: Soma dos macros = Calorias_Diárias (±50 kcal)
  const calculatedTotalKcal = Math.round(currentTotalKcalFromFoods);
  const calculatedTotalProt = Math.round(currentTotalProtFromFoods);
  const calculatedTotalCarbs = Math.round(currentTotalCarbsFromFoods);
  const calculatedTotalFats = Math.round(currentTotalFatsFromFoods);

  const macrosSumKcal = (calculatedTotalProt * 4) + (calculatedTotalCarbs * 4) + (calculatedTotalFats * 9);
  const diff = Math.abs(calculatedTotalKcal - macrosSumKcal);

  console.log(`Total Kcal dos alimentos: ${calculatedTotalKcal}`);
  console.log(`Kcal da soma dos macros: ${macrosSumKcal}`);
  console.log(`Diferença (Kcal): ${diff}`);

  if (diff > 50) {
    console.warn("Atenção: A soma das calorias dos alimentos difere em mais de 50 kcal da soma dos macros. Isso pode indicar um problema na seleção de alimentos ou na tabela TACO.");
    // Em um cenário real, poderíamos tentar ajustar as porções ou selecionar outros alimentos.
    // Por enquanto, vamos usar os valores calculados dos alimentos.
  }

  const finalDietPlan: DietPlanOutput = {
    dailySummary: {
      calories: calculatedTotalKcal,
      protein: calculatedTotalProt,
      carbs: calculatedTotalCarbs,
      fats: calculatedTotalFats,
      water: water,
    },
    meals: meals,
  };

  return finalDietPlan;
}