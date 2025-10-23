import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData do App.tsx
import { Flame, Dumbbell, Wheat, Droplets, Droplet, Download, RefreshCcw, Salad } from 'lucide-react'; // Adicionado Salad

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
    <div className="min-h-screen bg-gray-50 px-5 py-10 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Dieta Pronta
        </h1>
        <p className="text-base text-text-secondary">
          Este é o seu plano de dieta personalizado para o dia.
        </p>
      </div>

      {/* Resumo Diário */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-text-primary mb-5">
          Resumo Diário
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Calorias */}
          <Card className="flex flex-col items-center p-5 bg-white border border-gray-200 text-center">
            <Flame size={32} className="text-orange-500 mb-2" />
            <span className="text-sm text-text-secondary">Calorias</span>
            <span className="font-bold text-2xl text-text-primary">{dietPlan.dailySummary.calories} kcal</span>
          </Card>

          {/* Proteína */}
          <Card className="flex flex-col items-center p-5 bg-macro-protein-light border border-primary text-center">
            <Dumbbell size={32} className="text-primary mb-2" />
            <span className="text-sm text-text-secondary">Proteína</span>
            <span className="font-bold text-2xl text-primary">{dietPlan.dailySummary.protein}g</span>
          </Card>

          {/* Carboidratos */}
          <Card className="flex flex-col items-center p-5 bg-macro-carbs-light border border-macro-carbs text-center">
            <Wheat size={32} className="text-macro-carbs mb-2" />
            <span className="text-sm text-text-secondary">Carboidratos</span>
            <span className="font-bold text-2xl text-macro-carbs">{dietPlan.dailySummary.carbs}g</span>
          </Card>

          {/* Gordura */}
          <Card className="flex flex-col items-center p-5 bg-macro-fats-light border border-macro-fats text-center">
            <Droplets size={32} className="text-macro-fats mb-2" />
            <span className="text-sm text-text-secondary">Gordura</span>
            <span className="font-bold text-2xl text-macro-fats">{dietPlan.dailySummary.fats}g</span>
          </Card>

          {/* Água */}
          <Card className="flex flex-col items-center p-5 bg-macro-water-light border border-macro-water text-center">
            <Droplet size={32} className="text-macro-water mb-2" />
            <span className="text-sm text-text-secondary">Água</span>
            <span className="font-bold text-2xl text-macro-water">{dietPlan.dailySummary.water}L</span>
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
                <h4 className="text-lg font-semibold text-text-primary mb-1">
                  {meal.name} ({meal.time})
                </h4>
                <p className="text-sm text-primary font-semibold">
                  {meal.calories}kcal
                </p>
              </div>

              {/* Lista de alimentos */}
              <div className="flex flex-col gap-1">
                {meal.foods.map((food, foodIndex) => (
                  <div 
                    key={foodIndex}
                    className="text-sm text-text-primary py-1"
                  >
                    <span className="font-medium">{food.quantity}</span> {food.name}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dicas Alimentares */}
      <Card className="p-6 bg-tips-food-bg border border-tips-food-border rounded-lg mb-5">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Salad className="w-5 h-5 text-primary" />
          Dicas de Alimentação Saudável
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Mastigue devagar.</strong> Comer com calma melhora a digestão, aumenta a saciedade e ajuda a evitar exageros.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Inclua fibras diariamente.</strong> Frutas com casca, vegetais e grãos integrais ajudam no funcionamento do intestino e no controle do apetite.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Planeje suas refeições.</strong> Manter opções saudáveis à mão evita decisões impulsivas e facilita seguir a dieta.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Cuidado com o açúcar oculto.</strong> Molhos, sucos e barrinhas "fit" podem esconder açúcar — leia sempre os rótulos.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Não pule refeições.</strong> Isso pode causar queda de energia e aumentar a fome nas próximas refeições.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Inclua boas gorduras.</strong> Abacate, azeite e castanhas são aliados da saciedade e da saúde do coração.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-primary text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Quanto mais colorido, melhor!</strong> Um prato cheio de vegetais de cores variadas garante uma boa combinação de vitaminas, minerais e antioxidantes. 🌈 Não se esqueça de incluí-los todos os dias!
            </p>
          </div>
        </div>
      </Card>

      {/* Dicas de Hidratação */}
      <Card className="p-6 bg-tips-water-bg border border-tips-water-border rounded-lg mb-5">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Droplet className="w-5 h-5 text-blue-500" />
          Dicas de Hidratação
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <span className="text-macro-water text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Comece o dia com água.</strong> Beber um copo logo ao acordar ajuda o corpo a se reidratar e desperta o metabolismo.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-macro-water text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Leve sua garrafinha.</strong> Ter água por perto faz toda diferença para manter a ingestão regular.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-macro-water text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Observe sua urina.</strong> Um bom sinal de hidratação é a cor: quanto mais clara, melhor.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-macro-water text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Beba aos poucos.</strong> Pequenos goles ao longo do dia são mais eficazes do que grandes quantidades de uma só vez.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="text-macro-water text-lg flex-shrink-0">•</span>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              <strong>Transforme em hábito.</strong> Criar uma rotina de hidratação mantém corpo e mente em equilíbrio diariamente.
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="p-5 bg-bg-secondary border border-gray-200 rounded-lg mb-8">
        <h3 className="font-semibold text-base text-text-primary mb-2">Disclaimer</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Este plano alimentar é uma sugestão e deve ser adaptado às suas necessidades individuais. Consulte sempre um profissional de saúde ou nutricionista antes de iniciar qualquer nova dieta.
        </p>
      </Card>

      <div className="flex flex-col items-center space-y-4 mt-8">
        <Button fullWidth onClick={handleDownloadPDF} variant="orange" className="py-4">
          <Download size={20} className="inline-block mr-2" /> Baixar Dieta em PDF
        </Button>
        <Button variant="secondary" onClick={handleNewDiet} className="w-full py-3.5">
          <RefreshCcw size={16} className="inline-block mr-2" /> Nova Dieta
        </Button>
        <p className="text-center text-xs text-text-tertiary mt-2 leading-relaxed">
          💡 Revise sua dieta de 2 a 3 meses para garantir que ela continue trazendo resultados.
        </p>
      </div>
    </div>
  );
};

export default DietResult;