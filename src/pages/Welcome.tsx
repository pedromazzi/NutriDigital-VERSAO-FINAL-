import React, { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { UserData } from '@/App'; // Importar a interface UserData

interface WelcomeProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ userData, updateUserData, navigateTo }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [localName, setLocalName] = useState(userData.userName || '');
  const [localTermsAccepted, setLocalTermsAccepted] = useState(userData.termsAccepted || false);

  const handleNext = () => {
    updateUserData('userName', localName);
    updateUserData('termsAccepted', localTermsAccepted);
    navigateTo('userInfo');
  };

  const isButtonDisabled = !localTermsAccepted || localName.length < 2;

  return (
    <>
      <div className="p-4 max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col justify-center">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-green-600 text-3xl font-bold">
            🍎 NutriDigital
          </h1>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Seja Bem vindo(a) ao NutriDigital
        </h2>

        {/* Campo de nome */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Qual o seu nome?"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full p-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Cards informativos */}
        <div className="mb-5 space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 text-sm">
              📝 Monte sua dieta personalizada em poucos passos.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 text-sm">
              📊 Receba planos com calorias e macros calculados pra você.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 text-sm">
              📄 Baixe sua dieta em PDF e siga seu progresso.
            </p>
          </div>
        </div>

        {/* Checkbox de termos */}
        <label className="flex items-center cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={localTermsAccepted}
            onChange={(e) => setLocalTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            Li e aceito os{' '}
            <span
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
              }}
              className="text-green-600 cursor-pointer underline font-semibold"
            >
              Termos de Uso
            </span>
          </span>
        </label>

        {/* Botão Começar */}
        <Button
          fullWidth
          onClick={handleNext}
          disabled={isButtonDisabled}
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-base transition-colors duration-200"
        >
          Começar
        </Button>
      </div>

      {/* MODAL DE TERMOS DE USO */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Termos de Uso e Aviso Legal">
        <p className="mb-4 leading-relaxed text-gray-700 text-sm">
          As informações, planos alimentares e sugestões nutricionais disponibilizados 
          por este aplicativo são gerados automaticamente por meio de inteligência 
          artificial e têm caráter exclusivamente informativo e educativo.
        </p>
        
        <p className="mb-4 leading-relaxed text-gray-700 text-sm">
          O conteúdo fornecido não constitui orientação, prescrição ou acompanhamento 
          nutricional individualizado, nem substitui a consulta com profissionais de 
          saúde qualificados, como nutricionistas, médicos ou outros especialistas.
        </p>
        
        <p className="mb-4 leading-relaxed text-gray-700 text-sm">
          Antes de iniciar qualquer plano alimentar, dieta, suplementação ou mudança 
          nos hábitos alimentares, o usuário deve consultar um profissional habilitado 
          para avaliar suas condições de saúde, restrições e necessidades específicas.
        </p>
        
        <p className="mb-4 leading-relaxed text-gray-700 text-sm">
          O aplicativo, seus desenvolvedores e parceiros não se responsabilizam por 
          quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes 
          do uso, interpretação ou aplicação das informações fornecidas pela plataforma.
        </p>
        
        <p className="leading-relaxed text-gray-700 text-sm">
          Ao utilizar este aplicativo, o usuário reconhece e concorda que todas as 
          informações apresentadas são sugestões automatizadas e que o uso é de inteira 
          responsabilidade do usuário.
        </p>
      </Modal>
    </>
  );
};

export default Welcome;