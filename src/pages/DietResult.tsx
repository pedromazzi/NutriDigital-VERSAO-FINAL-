import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData do App.tsx
import { Flame, Dumbbell, Droplet, Download, RefreshCcw } from 'lucide-react';

interface DietResultProps {
  userData: UserData;
  resetUserData: () => void; // Adicionado para corresponder ao App.tsx
  navigateTo: (screen: string) => void;
}

const DietResult: React.FC<DietResultProps> = ({ userData, resetUserData, navigateTo }) => {
  // Dados mockados para visualização da estrutura, usando a nova estrutura fornecida
  const dietPlan = userData.dietPlan || {
    dailySummary: {
      calories: 2300,
      protein: 300,
      carbs: 150,
      fats: 78,
      water: 3
    },
    meals: [
      {
        name: 'Café da Manhã',
        time: userData?.mealTimes?.breakfast || '09:00',
        calories: 400,
        foods: [
          { emoji: '🥚', quantity: '2 unidades', name: 'ovos' },
          { emoji: '🍞', quantity: '2 fatias', name: 'pão integral' },
          { emoji: '🍌', quantity: '1 unidade', name: 'banana' }
        ]
      },
      {
        name: 'Almoço',
        time: userData?.mealTimes?.lunch || '12:00',
        calories: 650,
        foods: [
          { emoji: '🍚', quantity: '250g', name: 'arroz branco cozido' },
          { emoji: '🍗', quantity: '150g', name: 'peito de frango' },
          { emoji: '🫒', quantity: '10ml', name: 'azeite de oliva' }
        ]
      },
      {
        name: 'Lanche da Tarde',
        time: userData?.mealTimes?.snack || '16:00',
        calories: 300,
        foods: [
          { emoji: '💪', quantity: '30g', name: 'whey protein' },
          { emoji: '🥛', quantity: '200ml', name: 'leite integral' },
          { emoji: '🍓', quantity: '100g', name: 'morango' }
        ]
      },
      {
        name: 'Jantar',
        time: userData?.mealTimes?.dinner || '19:00',
        calories: 650,
        foods: [
          { emoji: '🐟', quantity: '150g', name: 'salmão' },
          { emoji: '🥔', quantity: '200g', name: 'batata doce' },
          { emoji: '🥬', quantity: 'à gosto', name: 'vegetais' }
        ]
      }
    ]
  };

  const handleDownloadPDF = () => {
    alert('Funcionalidade de download de PDF será implementada no PROMPT 3 - Cérebro do App');
  };

  const handleNewDiet = () => {
    if (window.confirm('Deseja criar uma nova dieta? Todos os dados serão perdidos.')) {
      resetUserData(); // Usar a prop resetUserData
      navigateTo('welcome');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dieta Pronta
          </h1>
          <p className="text-base text-gray-600">
            Este é o seu plano de dieta personalizado para o dia.
          </p>
        </div>

        {/* Resumo Diário */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Resumo Diário
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Calorias */}
            <Card className="flex flex-col items-center p-4 bg-white border border-gray-200">
              <Flame size={32} className="text-orange-500 mb-2" />
              <span className="text-sm text-gray-600">Calorias</span>
              <span className="font-bold text-lg text-gray-800">{dietPlan.dailySummary.calories} kcal</span>
            </Card>

            {/* Proteína */}
            <Card className="flex flex-col items-center p-4 bg-green-50 border-green-200">
              <Dumbbell size={32} className="text-green-600 mb-2" />
              <span className="text-sm text-gray-600">Proteína</span>
              <span className="font-bold text-lg text-green-600">{dietPlan.dailySummary.protein}g</span>
            </Card>

            {/* Carboidratos */}
            <Card className="flex flex-col items-center p-4 bg-red-50 border-red-200">
              <span className="text-3xl mb-2">🌾</span>
              <span className="text-sm text-gray-600">Carboidratos</span>
              <span className="font-bold text-lg text-red-600">{dietPlan.dailySummary.carbs}g</span>
            </Card>

            {/* Gordura */}
            <Card className="flex flex-col items-center p-4 bg-yellow-50 border-yellow-200">
              <span className="text-3xl mb-2">🥑</span>
              <span className="text-sm text-gray-600">Gordura</span>
              <span className="font-bold text-lg text-yellow-600">{dietPlan.dailySummary.fats}g</span>
            </Card>

            {/* Água */}
            <Card className="flex flex-col items-center p-4 bg-blue-50 border-blue-200">
              <Droplet size={32} className="text-blue-600 mb-2" />
              <span className="text-sm text-gray-600">Água</span>
              <span className="font-bold text-lg text-blue-600">{dietPlan.dailySummary.water}L</span>
            </Card>
          </div>
        </div>

        {/* Refeições - Grid 2x2 */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dietPlan.meals.map((meal, index) => (
              <Card key={index} className="p-5 bg-white border border-gray-200">
                {/* Header da refeição */}
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">
                    {meal.name} ({meal.time})
                  </h4>
                  <p className="text-sm font-semibold text-green-600">
                    {meal.calories}kcal
                  </p>
                </div>

                {/* Lista de alimentos */}
                <div className="flex flex-col gap-2">
                  {meal.foods.map((food, foodIndex) => (
                    <div
                      key={foodIndex}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-lg">{food.emoji}</span>
                      <span>
                        <strong className="font-medium">{food.quantity}</strong> {food.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dicas Alimentares */}
        <Card className="p-6 bg-green-50 border-green-200 mb-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            🥗 Dicas de Alimentação Saudável
          </h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Mastigue devagar.</strong> Comer com calma melhora a digestão, aumenta a saciedade e ajuda a evitar exageros.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Inclua fibras diariamente.</strong> Frutas com casca, vegetais e grãos integrais ajudam no funcionamento do intestino e no controle do apetite.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Planeje suas refeições.</strong> Manter opções saudáveis à mão evita decisões impulsivas e facilita seguir a dieta.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Cuidado com o açúcar oculto.</strong> Molhos, sucos e barrinhas "fit" podem esconder açúcar — leia sempre os rótulos.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Não pule refeições.</strong> Isso pode causar queda de energia e aumentar a fome nas próximas refeições.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Inclua boas gorduras.</strong> Abacate, azeite e castanhas são aliados da saciedade e da saúde do coração.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Quanto mais colorido, melhor!</strong> Um prato cheio de vegetais de cores variadas garante uma boa combinação de vitaminas, minerais e antioxidantes. 🌈 Não se esqueça de incluí-los todos os dias!
              </p>
            </div>
          </div>
        </Card>

        {/* Dicas de Hidratação */}
        <Card className="p-6 bg-blue-50 border-blue-200 mb-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            💧 Dicas de Hidratação
          </h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <span className="text-blue-500 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Comece o dia com água.</strong> Beber um copo logo ao acordar ajuda o corpo a se reidratar e desperta o metabolismo.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-blue-500 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Leve sua garrafinha.</strong> Ter água por perto faz toda diferença para manter a ingestão regular.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-blue-500 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Observe sua urina.</strong> Um bom sinal de hidratação é a cor: quanto mais clara, melhor.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-blue-500 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Beba aos poucos.</strong> Pequenos goles ao longo do dia são mais eficazes do que grandes quantidades de uma só vez.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-blue-500 text-lg flex-shrink-0">•</span>
              <p className="m-0 text-sm leading-relaxed text-gray-700">
                <strong>Transforme em hábito.</strong> Criar uma rotina de hidratação mantém corpo e mente em equilíbrio diariamente.
              </p>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-4 bg-gray-100 border-gray-200 mb-8">
          <h3 className="font-bold text-gray-800 mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-700">
            Este plano alimentar é uma sugestão e deve ser adaptado às suas necessidades individuais. Consulte sempre um profissional de saúde ou nutricionista antes de iniciar qualquer nova dieta.
          </p>
        </Card>

        <div className="flex flex-col items-center space-y-4 mt-8">
          <Button fullWidth onClick={handleDownloadPDF} className="bg-orange-500 hover:bg-orange-600">
            <Download size={20} className="inline-block mr-2" /> Baixar Dieta em PDF
          </Button>
          <Button variant="secondary" onClick={handleNewDiet} className="w-full">
            <RefreshCcw size={16} className="inline-block mr-2" /> Nova Dieta
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            💡 Revise sua dieta de 2 a 3 meses para garantir que ela continue trazendo resultados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietResult;