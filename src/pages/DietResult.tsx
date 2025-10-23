import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData
import { Flame, Dumbbell, Droplet, Download, RefreshCcw } from 'lucide-react';

interface DietResultProps {
  userData: UserData;
  resetUserData: () => void;
  navigateTo: (screen: string) => void;
}

const DietResult: React.FC<DietResultProps> = ({ userData, resetUserData, navigateTo }) => {
  // Placeholder data for PROMPT 1
  const dietPlan = userData.dietPlan || {
    totalCalories: 2300,
    totalProtein: 300,
    totalCarbs: 150,
    totalFat: 78,
    totalWater: 3,
    meals: [
      {
        name: 'Café da manhã',
        time: userData.mealTimes.breakfast || '08:00',
        calories: 400,
        items: [
          { icon: '🥚', quantity: '2', food: 'Ovos' },
          { icon: '🍞', quantity: '2 fatias', food: 'Pão integral' },
          { icon: '🍌', quantity: '1', food: 'Banana' },
        ],
      },
      {
        name: 'Almoço',
        time: userData.mealTimes.lunch || '13:00',
        calories: 800,
        items: [
          { icon: '🍗', quantity: '150g', food: 'Peito de frango' },
          { icon: '🍚', quantity: '150g', food: 'Arroz integral' },
          { icon: '🥗', quantity: 'À vontade', food: 'Salada mista' },
          { icon: '🫘', quantity: '1 concha', food: 'Feijão' },
        ],
      },
      {
        name: 'Lanche da Tarde',
        time: userData.mealTimes.snack || '17:00',
        calories: 300,
        items: [
          { icon: '🥛', quantity: '1 copo', food: 'Iogurte grego' },
          { icon: '🍓', quantity: '100g', food: 'Frutas vermelhas' },
          { icon: '🥜', quantity: '1 colher', food: 'Pasta de amendoim' },
        ],
      },
      {
        name: 'Jantar',
        time: userData.mealTimes.dinner || '20:00',
        calories: 600,
        items: [
          { icon: '🐟', quantity: '120g', food: 'Salmão' },
          { icon: '🥔', quantity: '150g', food: 'Batata doce' },
          { icon: '🥦', quantity: 'À vontade', food: 'Brócolis' },
        ],
      },
    ],
  };

  const handleDownloadPdf = () => {
    alert('Funcionalidade de download de PDF será implementada no PROMPT 3!');
    // Logic for PDF generation will go here in PROMPT 3
  };

  const handleNewDiet = () => {
    resetUserData();
    navigateTo('welcome');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dieta Pronta</h1>
          <p className="text-gray-600">Este é o seu plano de dieta personalizado para o dia.</p>
        </div>

        {/* Resumo Diário */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className="flex flex-col items-center p-4 bg-white border border-gray-200">
            <Flame size={24} className="text-orange-500 mb-2" />
            <span className="text-sm text-gray-600">Calorias</span>
            <span className="font-bold text-lg text-gray-800">{dietPlan.totalCalories} kcal</span>
          </Card>
          <Card className="flex flex-col items-center p-4 bg-white border border-gray-200">
            <Dumbbell size={24} className="text-green-600 mb-2" />
            <span className="text-sm text-gray-600">Proteína</span>
            <span className="font-bold text-lg text-gray-800">{dietPlan.totalProtein}g</span>
          </Card>
          <Card className="flex flex-col items-center p-4 bg-white border border-gray-200">
            <span className="text-pink-500 mb-2 text-2xl">🌾</span> {/* Substituído por emoji */}
            <span className="text-sm text-gray-600">Carboidratos</span>
            <span className="font-bold text-lg text-gray-800">{dietPlan.totalCarbs}g</span>
          </Card>
          <Card className="flex flex-col items-center p-4 bg-white border border-gray-200">
            <span className="text-yellow-600 mb-2 text-2xl">🥑</span> {/* Substituído por emoji */}
            <span className="text-sm text-gray-600">Gordura</span>
            <span className="font-bold text-lg text-gray-800">{dietPlan.totalFat}g</span>
          </Card>
          <Card className="flex flex-col items-center p-4 bg-white border border-gray-200">
            <Droplet size={24} className="text-blue-500 mb-2" />
            <span className="text-sm text-gray-600">Água</span>
            <span className="font-bold text-lg text-gray-800">{dietPlan.totalWater}L</span>
          </Card>
        </div>

        {/* Grade de Refeições */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {dietPlan.meals.map((meal, index) => (
            <Card key={index} className="p-4 bg-white border border-gray-200">
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                {meal.name} ({meal.time})
              </h3>
              <p className="text-sm text-gray-600 mb-3">{meal.calories}kcal</p>
              <ul className="space-y-1">
                {meal.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-700 text-sm">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.quantity} {item.food}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Seções Informativas */}
        <div className="space-y-4 mb-8">
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="font-bold text-green-800 mb-2">🥗 Dicas de Alimentação Saudável</h3>
            <p className="text-sm text-green-700 whitespace-pre-line">
              • Mastigue devagar - Comer com calma melhora a digestão, aumenta a saciedade e ajuda a evitar exageros.
              • Inclua fibras diariamente - Frutas com casca, vegetais e grãos integrais ajudam no funcionamento do intestino e no controle do apetite.
              • Planeje suas refeições - Manter opções saudáveis à mão evita decisões impulsivas e facilita seguir a dieta.
              • Cuidado com o açúcar oculto - Molhos, sucos e barrinhas "fit" podem esconder açúcar — leia sempre os rótulos.
              • Não pule refeições - Isso pode causar queda de energia e aumentar a fome nas próximas refeições.
              • Inclua boas gorduras - Abacate, azeite e castanhas são aliados da saciedade e da saúde do coração.
              • Quanto mais colorido, melhor! - Um prato cheio de vegetais de cores variadas garante uma boa combinação de vitaminas, minerais e antioxidantes. 🌈 Não se esqueça de incluí-los todos os dias!
            </p>
          </Card>
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">💧 Dicas de Hidratação</h3>
            <p className="text-sm text-blue-700 whitespace-pre-line">
              • Comece o dia com água - Beber um copo logo ao acordar ajuda o corpo a se reidratar e desperta o metabolismo.
              • Leve sua garrafinha - Ter água por perto faz toda diferença para manter a ingestão regular.
              • Observe sua urina - Um bom sinal de hidratação é a cor: quanto mais clara, melhor.
              • Beba aos poucos - Pequenos goles ao longo do dia são mais eficazes do que grandes quantidades de uma só vez.
              • Transforme em hábito - Criar uma rotina de hidratação mantém corpo e mente em equilíbrio diariamente.
            </p>
          </Card>
          <Card className="p-4 bg-gray-100 border-gray-200">
            <h3 className="font-bold text-gray-800 mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-700">
              Este plano alimentar é uma sugestão e deve ser adaptado às suas necessidades individuais. Consulte sempre um profissional de saúde ou nutricionista antes de iniciar qualquer nova dieta.
            </p>
          </Card>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-8">
          <Button fullWidth onClick={handleDownloadPdf} className="bg-orange-500 hover:bg-orange-600">
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