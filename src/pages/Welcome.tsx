import React, { useState } from 'react';
import { UserData } from '@/App'; // Importar a interface UserData
import Button from '@/components/Button'; // Importar o componente Button
import Input from '@/components/Input'; // Importar o componente Input
import { ClipboardList, BarChart3, FileText } from 'lucide-react'; // Adicionado: Ícones Lucide

interface WelcomeProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ userData, updateUserData, navigateTo }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [localName, setLocalName] = useState(userData?.userName || '');
  const [localTermsAccepted, setLocalTermsAccepted] = useState(userData?.termsAccepted || false);

  const handleNext = () => {
    updateUserData('userName', localName);
    updateUserData('termsAccepted', localTermsAccepted);
    navigateTo('userInfo');
  };

  const isButtonDisabled = !localTermsAccepted || localName.length < 2;

  return (
    <>
      {/* TELA PRINCIPAL */}
      <div className="min-h-screen bg-gray-50 px-5 py-10 max-w-lg mx-auto flex flex-col justify-center">
        
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-primary text-3xl font-bold">
            NutriDigital
          </h1>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Seja Bem vindo(a) ao NutriDigital
        </h2>

        {/* Campo de nome */}
        <Input
          placeholder="Qual o seu nome?"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          className="mb-5"
          labelClassName="sr-only" // Esconder o label visualmente para este input
        />

        {/* Cards informativos */}
        <div className="mb-5 space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-primary text-sm m-0">
                Monte sua dieta personalizada em poucos passos.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-primary text-sm m-0">
                Receba planos com calorias e macros calculados pra você.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-primary text-sm m-0">
                Baixe sua dieta em PDF e siga seu progresso.
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox de termos */}
        <label className="flex items-center cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={localTermsAccepted}
            onChange={(e) => setLocalTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-text-secondary">
            Li e aceito os{' '}
            <span
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
              }}
              className="text-primary underline font-semibold cursor-pointer"
            >
              Termos de Uso
            </span>
          </span>
        </label>

        {/* Botão Começar */}
        <Button
          variant="orange"
          fullWidth
          onClick={handleNext}
          disabled={isButtonDisabled}
          className="py-3.5"
        >
          Começar
        </Button>
      </div>

      {/* MODAL DE TERMOS DE USO */}
      {showTerms && (
        <div 
          onClick={() => setShowTerms(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
          >
            <h2 className="mt-0 mb-5 text-2xl text-text-primary font-bold">
              Termos de Uso e Aviso Legal
            </h2>
            
            <div className="overflow-y-auto mb-5 flex-1 pr-2 text-text-secondary text-sm leading-relaxed">
              <p className="mb-4">
                As informações, planos alimentares e sugestões nutricionais disponibilizados 
                por este aplicativo são gerados automaticamente por meio de inteligência 
                artificial e têm caráter exclusivamente informativo e educativo.
              </p>
              
              <p className="mb-4">
                O conteúdo fornecido não constitui orientação, prescrição ou acompanhamento 
                nutricional individualizado, nem substitui a consulta com profissionais de 
                saúde qualificados, como nutricionistas, médicos ou outros especialistas.
              </p>
              
              <p className="mb-4">
                Antes de iniciar qualquer plano alimentar, dieta, suplementação ou mudança 
                nos hábitos alimentares, o usuário deve consultar um profissional habilitado 
                para avaliar suas condições de saúde, restrições e necessidades específicas.
              </p>
              
              <p className="mb-4">
                O aplicativo, seus desenvolvedores e parceiros não se responsabilizam por 
                quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes 
                do uso, interpretação ou aplicação das informações fornecidas pela plataforma.
              </p>
              
              <p className="mb-0">
                Ao utilizar este aplicativo, o usuário reconhece e concorda que todas as 
                informações apresentadas são sugestões automatizadas e que o uso é de inteira 
                responsabilidade do usuário.
              </p>
            </div>

            <Button 
              onClick={() => setShowTerms(false)}
              variant="primary"
              fullWidth
              className="py-3"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;