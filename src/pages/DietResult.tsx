import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { UserData } from '@/App'; // Importar a interface UserData do App.tsx
import { Flame, Dumbbell, Wheat, Droplets, Droplet, Download, RefreshCcw, Salad } from 'lucide-react'; // Adicionado Salad
import { buildDiet, DietPlanResult } from '@/utils/dietBuilder'; // Importar buildDiet e DietPlanResult

interface DietResultProps {
  userData: UserData;
  resetUserData: () => void; // Adicionado para corresponder ao App.tsx
  navigateTo: (screen: string) => void;
}

const DietResult: React.FC<DietResultProps> = ({ userData, resetUserData, navigateTo }) => {
  const [diet, setDiet] = useState<DietPlanResult | null>(null);

  useEffect(() => {
    // Gerar a dieta automaticamente
    if (userData) {
      const generatedDiet = buildDiet(userData);
      console.log('Dieta gerada:', generatedDiet);
      
      // Salvar no estado
      setDiet(generatedDiet);
    }
  }, [userData]);

  const handleDownloadPDF = () => {
    alert('Funcionalidade de download de PDF será implementada no PROMPT 3 - Cérebro do App');
  };

  const handleNewDiet = () => {
    if (window.confirm('Deseja criar uma nova dieta? Todos os dados serão perdidos.')) {
      resetUserData(); // Usar a prop resetUserData
      navigateTo('welcome');
    }
  };

  if (!diet) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-5 py-6 sm:py-10 max-w-5xl mx-auto flex items-center justify-center">
        <p className="text-lg text-text-secondary">Gerando sua dieta...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-5 py-6 sm:py-10 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1 sm:mb-2">
          Dieta Pronta
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Este é o seu plano de dieta personalizado para o dia.
        </p>
      </div>

      {/* Seção Resumo Diário */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Resumo Diário
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="bg-white p-2.5 sm:p-4 rounded-lg border-2 border-orange-200">
            <Flame className="w-5 sm:w-8 h-5 sm:h-8 text-orange-500 mb-1 sm:mb-2" />
            <p className="text-[10px] sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Calorias</p>
            <p className="text-base sm:text-2xl font-bold text-gray-900">{diet.dailySummary.calories} kcal</p>
          </div>

          <div className="bg-white p-2.5 sm:p-4 rounded-lg border-2 border-green-200">
            <Dumbbell className="w-5 sm:w-8 h-5 sm:h-8 text-primary mb-1 sm:mb-2" />
            <p className="text-[10px] sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Proteína</p>
            <p className="text-base sm:text-2xl font-bold text-primary">{diet.dailySummary.protein}g</p>
          </div>

          <div className="bg-white p-2.5 sm:p-4 rounded-lg border-2 border-red-200">
            <Wheat className="w-5 sm:w-8 h-5 sm:h-8 text-red-500 mb-1 sm:mb-2" />
            <p className="text-[10px] sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Carboidratos</p>
            <p className="text-base sm:text-2xl font-bold text-red-500">{diet.dailySummary.carbs}g</p>
          </div>

          <div className="bg-white p-2.5 sm:p-4 rounded-lg border-2 border-yellow-200">
            <Droplets className="w-5 sm:w-8 h-5 sm:h-8 text-yellow-600 mb-1 sm:mb-2" />
            <p className="text-[10px] sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Gordura</p>
            <p className="text-base sm:text-2xl font-bold text-yellow-600">{diet.dailySummary.fats}g</p>
          </div>

          <div className="bg-white p-2.5 sm:p-4 rounded-lg border-2 border-blue-200">
            <Droplet className="w-5 sm:w-8 h-5 sm:h-8 text-blue-500 mb-1 sm:mb-2" />
            <p className="text-[10px] sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Água</p>
            <p className="text-base sm:text-2xl font-bold text-blue-500">{diet.dailySummary.water}L</p>
          </div>
        </div>
      </div>

      {/* Refeições - Grid 2x2 */}
      <div className="mb-6 sm:mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {diet.meals.map((meal, index) => (
            <Card key={index} className="p-4 sm:p-5 bg-white border border-gray-200">
              {/* Header da refeição */}
              <div className="mb-3 pb-2 sm:pb-3 border-b border-gray-100">
                <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-0.5 sm:mb-1">
                  {meal.name} ({meal.time})
                </h4>
                <p className="text-xs sm:text-sm text-primary font-semibold">
                  {meal.calories}kcal
                </p>
              </div>

              {/* Lista de alimentos */}
              <div className="flex flex-col gap-0.5 sm:gap-1">
                {meal.foods.map((food, foodIndex) => (
                  <div 
                    key={foodIndex}
                    className="text-xs sm:text-sm text-text-primary py-0.5 sm:py-1"
                  >
                    <span className="font-medium">{food.quantity}</span> {food.name}
                    {food.substitution && (
                      <span className="text-text-tertiary italic ml-2">
                        (Sugestão: {food.substitution.quantity} {food.substitution.name})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dicas Alimentares */}
      <Card className="p-4 sm:p-6 bg-tips-food-bg border border-tips-food-border rounded-lg mb-4 sm:mb-5">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
          <Salad className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Dicas de Alimentação Saudável
        </h3>
        
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-primary text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Mastigue devagar.</strong> Comer com calma melhora a digestão, aumenta a saciedade e ajuda a evitar exageros.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-primary text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Inclua fibras diariamente.</strong> Frutas com casca, vegetais e grãos integrais ajudam no funcionamento do intestino e no controle do apetite.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-primary text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Não pule refeições.</strong> Isso pode causar queda de energia e aumentar a fome nas próximas refeições.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-primary text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Quanto mais colorido, melhor!</strong> Um prato cheio de vegetais de cores variadas garante uma boa combinação de vitaminas, minerais e antioxidantes. Não se esqueça de incluí-los todos os dias!
            </p>
          </p>
          </div>
        </div>
      </Card>

      {/* Dicas de Hidratação */}
      <Card className="p-4 sm:p-6 bg-tips-water-bg border border-tips-water-border rounded-lg mb-4 sm:mb-5">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
          <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          Dicas de Hidratação
        </h3>
        
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-macro-water text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Comece o dia com água.</strong> Beber um copo logo ao acordar ajuda o corpo a se reidratar e desperta o metabolismo.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-macro-water text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Leve sua garrafinha.</strong> Ter água por perto faz toda diferença para manter a ingestão regular.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-macro-water text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Observe sua urina.</strong> Um bom sinal de hidratação é a cor: quanto mais clara, melhor.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-macro-water text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Beba aos poucos.</strong> Pequenos goles ao longo do dia são mais eficazes do que grandes quantidades de uma só vez.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 items-start">
            <span className="text-macro-water text-base sm:text-lg flex-shrink-0">•</span>
            <p className="m-0 text-xs sm:text-sm leading-relaxed text-text-secondary">
              <strong>Transforme em hábito.</strong> Criar uma rotina de hidratação mantém corpo e mente em equilíbrio diariamente.
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="p-3 sm:p-5 bg-bg-secondary border border-gray-200 rounded-lg mb-6 sm:mb-8">
        <h3 className="font-semibold text-sm sm:text-base text-text-primary mb-1 sm:mb-2">Disclaimer</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Este plano alimentar é uma sugestão e deve ser adaptado às suas necessidades individuais. Consulte sempre um profissional de saúde ou nutricionista antes de iniciar qualquer nova dieta.
        </p>
      </Card>

      <div className="flex flex-col items-center space-y-2.5 sm:space-y-4 mt-6 sm:mt-8">
        <Button fullWidth onClick={handleDownloadPDF} variant="orange" className="py-3 sm:py-4 text-sm sm:text-base">
          <Download size={16} className="inline-block mr-2" /> Baixar Dieta em PDF
        </Button>
        <Button variant="secondary" onClick={handleNewDiet} className="w-full py-2.5 sm:py-3.5 text-sm sm:text-base">
          <RefreshCcw size={14} className="inline-block mr-2" /> Nova Dieta
        </Button>
        <p className="text-center text-xs text-text-tertiary mt-1.5 sm:mt-2 leading-relaxed">
          💡 Revise sua dieta de 2 a 3 meses para garantir que ela continue trazendo resultados.
        </p>
      </div>
    </div>
  );
};

export default DietResult;