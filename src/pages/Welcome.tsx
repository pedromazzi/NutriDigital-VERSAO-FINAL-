import React, { useState } from 'react';
import { UserData } from '@/App'; // Importar a interface UserData

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
    // Salvar dados no estado global
    updateUserData('userName', localName);
    updateUserData('termsAccepted', localTermsAccepted);
    
    // Navegar para próxima tela
    navigateTo('userInfo');
  };

  const isButtonDisabled = !localTermsAccepted || localName.length < 2;

  // Estilos dos botões
  const primaryButtonStyle = {
    backgroundColor: '#FF8C1A',
    color: 'white',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '8px',
    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    opacity: isButtonDisabled ? 0.5 : 1,
    marginTop: '10px'
  };

  const closeButtonStyle = {
    backgroundColor: '#00D26A',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%'
  };

  const modalOverlayStyle = {
    position: 'fixed' as 'fixed', // Explicitly cast to 'fixed'
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px'
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as 'column', // Explicitly cast to 'column'
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
  };

  const modalBodyStyle = {
    overflowY: 'auto' as 'auto', // Explicitly cast to 'auto'
    marginBottom: '20px',
    flex: 1,
    paddingRight: '10px'
  };

  return (
    <>
      {/* TELA PRINCIPAL */}
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
        <button
          disabled={isButtonDisabled}
          onClick={handleNext}
          style={primaryButtonStyle}
        >
          Começar
        </button>
      </div>

      {/* MODAL DE TERMOS DE USO */}
      {showTerms && (
        <div 
          onClick={() => setShowTerms(false)}
          style={modalOverlayStyle}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <h2 style={{ 
              marginTop: 0, 
              marginBottom: '20px', 
              fontSize: '22px',
              color: '#1A1A1A',
              fontWeight: 'bold'
            }}>
              Termos de Uso e Aviso Legal
            </h2>
            
            <div style={modalBodyStyle}>
              <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#333', fontSize: '15px' }}>
                As informações, planos alimentares e sugestões nutricionais disponibilizados 
                por este aplicativo são gerados automaticamente por meio de inteligência 
                artificial e têm caráter exclusivamente informativo e educativo.
              </p>
              
              <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#333', fontSize: '15px' }}>
                O conteúdo fornecido não constitui orientação, prescrição ou acompanhamento 
                nutricional individualizado, nem substitui a consulta com profissionais de 
                saúde qualificados, como nutricionistas, médicos ou outros especialistas.
              </p>
              
              <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#333', fontSize: '15px' }}>
                Antes de iniciar qualquer plano alimentar, dieta, suplementação ou mudança 
                nos hábitos alimentares, o usuário deve consultar um profissional habilitado 
                para avaliar suas condições de saúde, restrições e necessidades específicas.
              </p>
              
              <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#333', fontSize: '15px' }}>
                O aplicativo, seus desenvolvedores e parceiros não se responsabilizam por 
                quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes 
                do uso, interpretação ou aplicação das informações fornecidas pela plataforma.
              </p>
              
              <p style={{ marginBottom: '0', lineHeight: '1.6', color: '#333', fontSize: '15px' }}>
                Ao utilizar este aplicativo, o usuário reconhece e concorda que todas as 
                informações apresentadas são sugestões automatizadas e que o uso é de inteira 
                responsabilidade do usuário.
              </p>
            </div>

            {/* BOTÃO FECHAR - USANDO <button> HTML, NÃO O COMPONENTE Button */}
            <button 
              onClick={() => setShowTerms(false)}
              style={closeButtonStyle}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;