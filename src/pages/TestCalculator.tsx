import React, { useEffect, useState } from 'react';
import { calculateNutrition } from '@/utils/nutritionCalculator';
import { UserData } from '@/App'; // Importar a interface UserData

const TestCalculator = () => {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // DADOS DO USUÁRIO EXEMPLO
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

    // EXECUTAR CÁLCULO
    const calculation = calculateNutrition(testUser);
    setResult(calculation);
    
    // Mostrar no console também
    console.log('🧪 RESULTADO DO TESTE:', calculation);
  }, []);

  if (!result) return <div className="p-10">Calculando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">🧪 TESTE DA CALCULADORA NUTRICIONAL</h1>
      
      {/* DADOS DO USUÁRIO */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <h2 className="text-xl font-bold mb-4">👤 Dados do Usuário Teste</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Peso:</strong> 76 kg</p>
          <p><strong>Altura:</strong> 179 cm</p>
          <p><strong>Idade:</strong> 28 anos</p>
          <p><strong>Gênero:</strong> Masculino</p>
          <p><strong>Atividade:</strong> Moderado</p>
          <p><strong>Objetivo:</strong> Emagrecimento</p>
        </div>
      </div>

      {/* RESULTADOS */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <h2 className="text-xl font-bold mb-4">📊 Resultados dos Cálculos</h2>
        
        <div className="space-y-4">
          {/* CALORIAS */}
          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-gray-600">TMB (Taxa Metabólica Basal)</p>
            <p className="text-2xl font-bold text-primary">{result.tmb} kcal</p>
          </div>
          
          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-gray-600">TDEE (Gasto Energético Total)</p>
            <p className="text-2xl font-bold text-primary">{result.tdee} kcal</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-600">Calorias Alvo (com déficit para emagrecimento)</p>
            <p className="text-3xl font-bold text-green-600">{result.targetCalories} kcal</p>
          </div>
        </div>
      </div>

      {/* MACRONUTRIENTES */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <h2 className="text-xl font-bold mb-4">🥗 Macronutrientes</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Proteína</p>
            <p className="text-2xl font-bold text-blue-600">{result.macros.protein}g</p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((result.macros.protein * 4 / result.targetCalories) * 100)}%
            </p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Carboidratos</p>
            <p className="text-2xl font-bold text-orange-600">{result.macros.carbs}g</p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((result.macros.carbs * 4 / result.targetCalories) * 100)}%
            </p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Gorduras</p>
            <p className="text-2xl font-bold text-yellow-600">{result.macros.fats}g</p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((result.macros.fats * 9 / result.targetCalories) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* ÁGUA */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <h2 className="text-xl font-bold mb-4">💧 Água</h2>
        <div className="border-l-4 border-blue-400 pl-4">
          <p className="text-3xl font-bold text-blue-500">{result.water}L</p>
          <p className="text-sm text-gray-600 mt-1">por dia</p>
        </div>
      </div>

      {/* DISTRIBUIÇÃO POR REFEIÇÃO */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <h2 className="text-xl font-bold mb-4">🍽️ Distribuição por Refeição</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">☕ Café da Manhã (25%)</span>
            <span className="font-bold text-primary">{result.mealDistribution.breakfast} kcal</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">🍽️ Almoço (35%)</span>
            <span className="font-bold text-primary">{result.mealDistribution.lunch} kcal</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">🍪 Lanche (15%)</span>
            <span className="font-bold text-primary">{result.mealDistribution.snack} kcal</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">🌙 Jantar (25%)</span>
            <span className="font-bold text-primary">{result.mealDistribution.dinner} kcal</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-primary text-white rounded font-bold">
            <span>TOTAL</span>
            <span>
              {result.mealDistribution.breakfast + 
               result.mealDistribution.lunch + 
               result.mealDistribution.snack + 
               result.mealDistribution.dinner} kcal
            </span>
          </div>
        </div>
      </div>

      {/* VALIDAÇÃO */}
      <div className={`rounded-lg p-6 mb-6 shadow ${
        result.validation.valid ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
      }`}>
        <h2 className="text-xl font-bold mb-4">
          {result.validation.valid ? '✅ Validação: PASSOU' : '❌ Validação: FALHOU'}
        </h2>
        
        {!result.validation.valid && (
          <div className="space-y-2">
            <p className="font-semibold text-red-600">Erros encontrados:</p>
            <ul className="list-disc list-inside space-y-1">
              {result.validation.errors.map((error: string, i: number) => (
                <li key={i} className="text-red-600">{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {result.validation.valid && (
          <p className="text-green-700">
            Todos os cálculos estão dentro dos parâmetros esperados! 🎉
          </p>
        )}
      </div>

      {/* JSON COMPLETO */}
      <div className="bg-gray-900 text-green-400 rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-4 text-white">📦 JSON Completo</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>

      {/* VERIFICAÇÕES ESPERADAS */}
      <div className="bg-white rounded-lg p-6 mt-6 shadow">
        <h2 className="text-xl font-bold mb-4">🎯 Valores Esperados</h2>
        <div className="space-y-2 text-sm">
          <p>✅ <strong>Calorias:</strong> Devem estar próximas de <strong>2200 kcal</strong></p>
          <p>✅ <strong>Proteína:</strong> Deve estar próxima de <strong>193g</strong></p>
          <p>✅ <strong>Carboidratos:</strong> Devem estar próximas de <strong>193g</strong></p>
          <p>✅ <strong>Gorduras:</strong> Devem estar próximas de <strong>73g</strong></p>
          <p>✅ <strong>Água:</strong> Deve estar próxima de <strong>3.0L</strong></p>
          <p>✅ <strong>Soma das refeições:</strong> Deve ser igual ao total de calorias</p>
        </div>
      </div>
    </div>
  );
};

export default TestCalculator;