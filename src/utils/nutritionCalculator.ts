// 🧮 CALCULADORA NUTRICIONAL - NUTRIDIGITAL
// Cálculos baseados na fórmula de Mifflin-St Jeor

import { UserData } from '@/App'; // Importar a interface UserData

interface NutritionCalculationResult {
  tmb: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  water: number;
  mealDistribution: {
    breakfast: number;
    lunch: number;
    snack: number;
    dinner: number;
  };
  validation: {
    valid: boolean;
    errors: string[];
  };
}

export function calculateNutrition(userData: UserData): NutritionCalculationResult {
  const { weight, height, age, gender, activityLevel, goal } = userData;

  // Garantir que os dados essenciais não são nulos
  if (weight === null || height === null || age === null || gender === null || activityLevel === null || goal === null) {
    throw new Error("Dados do usuário incompletos para o cálculo nutricional.");
  }
  
  // ETAPA 1: CALCULAR TMB (Taxa Metabólica Basal)
  let tmb: number;
  
  if (gender === 'Masculino') {
    tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else { // Feminino
    tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  
  // ETAPA 2: CALCULAR TDEE (Gasto Energético Total Diário)
  const activityFactors: { [key: string]: number } = {
    'Sedentario': 1.2,
    'Leve': 1.375,
    'Moderado': 1.55,
    'Intenso': 1.725,
    'Muito Intenso': 1.9
  };
  
  const tdee = tmb * activityFactors[activityLevel];
  
  // ETAPA 3: AJUSTAR CALORIAS PELO OBJETIVO
  let targetCalories: number;
  
  if (goal === 'Emagrecimento') {
    targetCalories = tdee - 500;
    // Garantir mínimo de 1200 kcal
    if (targetCalories < 1200) {
      targetCalories = 1200;
    }
  } else if (goal === 'Ganho de Massa') {
    targetCalories = tdee + 300;
  } else { // Manutenção
    targetCalories = tdee;
  }
  
  // Arredondar para múltiplos de 50
  targetCalories = Math.round(targetCalories / 50) * 50;
  
  // ETAPA 4: CALCULAR MACRONUTRIENTES
  let proteinPercent: number, carbPercent: number, fatPercent: number;
  
  if (goal === 'Emagrecimento') {
    proteinPercent = 0.35;
    carbPercent = 0.35;
    fatPercent = 0.30;
  } else if (goal === 'Ganho de Massa') {
    proteinPercent = 0.30;
    carbPercent = 0.50;
    fatPercent = 0.20;
  } else { // Manutenção
    proteinPercent = 0.25;
    carbPercent = 0.45;
    fatPercent = 0.30;
  }
  
  const proteinGrams = Math.round((targetCalories * proteinPercent) / 4);
  const carbGrams = Math.round((targetCalories * carbPercent) / 4);
  const fatGrams = Math.round((targetCalories * fatPercent) / 9);
  
  // ETAPA 5: CALCULAR ÁGUA
  let waterBase = 35 * weight; // em ml
  
  const waterAdjustments: { [key: string]: number } = {
    'Sedentario': 0,
    'Leve': 250,
    'Moderado': 500,
    'Intenso': 750,
    'Muito Intenso': 1000
  };
  
  let totalWater = (waterBase + waterAdjustments[activityLevel]) / 1000; // converter para litros
  
  // Arredondar para 0.5L
  totalWater = Math.round(totalWater * 2) / 2;
  
  // ETAPA 6: DISTRIBUIR CALORIAS POR REFEIÇÃO
  const mealDistribution = {
    breakfast: Math.round(targetCalories * 0.25 / 5) * 5, // 25%
    lunch: Math.round(targetCalories * 0.35 / 5) * 5,     // 35%
    snack: Math.round(targetCalories * 0.15 / 5) * 5,     // 15%
    dinner: Math.round(targetCalories * 0.25 / 5) * 5     // 25%
  };
  
  // VALIDAÇÃO
  const validation = validateCalculations(targetCalories, proteinGrams, carbGrams, fatGrams, mealDistribution);
  
  if (!validation.valid) {
    console.error('Erro na validação:', validation.errors);
  }
  
  // RETORNAR RESULTADO
  return {
    tmb: Math.round(tmb),
    tdee: Math.round(tdee),
    targetCalories,
    macros: {
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams
    },
    water: totalWater,
    mealDistribution,
    validation
  };
}

// FUNÇÃO DE VALIDAÇÃO
function validateCalculations(
  calories: number, 
  protein: number, 
  carbs: number, 
  fats: number, 
  meals: { breakfast: number; lunch: number; snack: number; dinner: number }
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  let valid = true;
  
  // Validar calorias totais
  if (calories < 1200 || calories > 4000) {
    errors.push('Calorias fora do intervalo seguro (1200-4000)');
    valid = false;
  }
  
  // Validar se macros somam aproximadamente as calorias
  const macroCalories = (protein * 4) + (carbs * 4) + (fats * 9);
  const difference = Math.abs(macroCalories - calories);
  
  if (difference > 50) { // Tolerância de 50 kcal
    errors.push(`Diferença entre macros e calorias muito grande: ${difference} kcal`);
    valid = false;
  }
  
  // Validar se refeições somam o total
  const mealTotal = meals.breakfast + meals.lunch + meals.snack + meals.dinner;
  const mealDifference = Math.abs(mealTotal - calories);
  
  if (mealDifference > 20) { // Tolerância de 20 kcal
    errors.push(`Diferença na distribuição de refeições: ${mealDifference} kcal`);
    valid = false;
  }
  
  return { valid, errors };
}

// FUNÇÃO AUXILIAR: Obter resumo em texto
export function getNutritionSummary(calculationResult: NutritionCalculationResult): string {
  return `
📊 RESUMO NUTRICIONAL:

Calorias Diárias: ${calculationResult.targetCalories} kcal
Proteína: ${calculationResult.macros.protein}g
Carboidratos: ${calculationResult.macros.carbs}g
Gorduras: ${calculationResult.macros.fats}g
Água: ${calculationResult.water}L

📋 DISTRIBUIÇÃO POR REFEIÇÃO:
Café da Manhã: ${calculationResult.mealDistribution.breakfast} kcal (25%)
Almoço: ${calculationResult.mealDistribution.lunch} kcal (35%)
Lanche: ${calculationResult.mealDistribution.snack} kcal (15%)
Jantar: ${calculationResult.mealDistribution.dinner} kcal (25%)

📈 DADOS BASE:
TMB: ${calculationResult.tmb} kcal
TDEE: ${calculationResult.tdee} kcal
  `;
}