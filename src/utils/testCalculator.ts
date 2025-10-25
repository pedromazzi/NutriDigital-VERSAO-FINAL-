import { calculateNutrition, getNutritionSummary } from './nutritionCalculator';
import { UserData } from '@/App'; // Importar a interface UserData

// TESTE COM OS DADOS DO USUÁRIO EXEMPLO
const testUser: UserData = {
  userName: 'Teste',
  termsAccepted: true,
  weight: 76,
  height: 179,
  age: 28,
  gender: 'Masculino',
  practicesActivity: true,
  activityLevel: 'Moderado',
  mealTimes: {
    breakfast: '08:00',
    lunch: '12:30',
    snack: '16:00',
    dinner: '20:00'
  },
  goal: 'Emagrecimento',
  foodPreferences: {
    breakfast: { proteins: [], carbs: [], fruits: [], dairy: [], fats: [] },
    lunch: { proteins: [], carbs: [], legumes: [], fats: [] },
    snack: { proteins: [], carbs: [], fruits: [], dairy: [], fats: [] },
    dinner: { proteins: [], carbs: [], legumes: [], fats: [] }
  },
  selectedCategories: {
    breakfast: [],
    lunch: [],
    snack: [],
    dinner: []
  },
  intolerances: [],
  dietPlan: null
};

console.log('🧪 TESTANDO CALCULADORA...\n');

try {
  const result = calculateNutrition(testUser);

  console.log(getNutritionSummary(result));

  console.log('\n✅ VALIDAÇÃO:', result.validation.valid ? 'PASSOU' : 'FALHOU');

  if (!result.validation.valid) {
    console.log('❌ ERROS:', result.validation.errors);
  }

  console.log('\n📦 OBJETO COMPLETO:');
  console.log(JSON.stringify(result, null, 2));

  // Verificações adicionais para o usuário exemplo
  if (result.targetCalories >= 1200 && result.targetCalories <= 4000) {
    console.log('✅ Calorias totais dentro do intervalo (1200-4000 kcal).');
  } else {
    console.log('❌ Calorias totais fora do intervalo (1200-4000 kcal).');
  }

  if (result.targetCalories === 2200) { // Valor esperado para o exemplo
    console.log('✅ Calorias para o usuário exemplo estão corretas (2200 kcal).');
  } else {
    console.log(`❌ Calorias para o usuário exemplo estão incorretas. Esperado: 2200, Obtido: ${result.targetCalories}.`);
  }

  if (result.water >= 2.0 && result.water <= 4.0) {
    console.log('✅ Água total dentro do intervalo (2.0-4.0 L).');
  } else {
    console.log('❌ Água total fora do intervalo (2.0-4.0 L).');
  }

  const mealSum = result.mealDistribution.breakfast + result.mealDistribution.lunch + result.mealDistribution.snack + result.mealDistribution.dinner;
  if (Math.abs(mealSum - result.targetCalories) <= 20) { // Tolerância de 20 kcal
    console.log('✅ Distribuição de refeições soma o total de calorias com tolerância.');
  } else {
    console.log(`❌ Distribuição de refeições não soma o total de calorias. Diferença: ${Math.abs(mealSum - result.targetCalories)} kcal.`);
  }

} catch (error: any) {
  console.error('\n❌ ERRO AO EXECUTAR O CÁLCULO:', error.message);
}