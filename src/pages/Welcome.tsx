import React, { useState } from 'react';

function Welcome() {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <>
      {/* TELA PRINCIPAL */}
      <div style={{ 
        padding: '40px', 
        maxWidth: '500px', 
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA'
      }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: '#00D26A', 
            fontSize: '32px', 
            margin: 0,
            fontWeight: 'bold'
          }}>
            🍎 NutriDigital
          </h1>
        </div>

        {/* Título */}
        <h2 style={{ 
          fontSize: '24px', 
          marginBottom: '10px',
          color: '#1A1A1A'
        }}>
          Seja Bem vindo(a) ao NutriDigital
        </h2>

        {/* Campo de nome */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Qual o seu nome?"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Cards informativos */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <p style={{ margin: 0, color: '#1A1A1A' }}>
              📝 Monte sua dieta personalizada em poucos passos.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <p style={{ margin: 0, color: '#1A1A1A' }}>
              📊 Receba planos com calorias e macros calculados pra você.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <p style={{ margin: 0, color: '#1A1A1A' }}>
              📄 Baixe sua dieta em PDF e siga seu progresso.
            </p>
          </div>
        </div>

        {/* Checkbox de termos */}
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          marginBottom: '10px'
        }}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            style={{ marginRight: '8px', cursor: 'pointer', width: '18px', height: '18px' }}
          />
          <span style={{ fontSize: '14px', color: '#666' }}>
            Li e aceito os{' '}
            <span
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
              }}
              style={{
                color: '#00D26A',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              Termos de Uso
            </span>
          </span>
        </label>

        {/* Botão Começar */}
        <button
          disabled={!termsAccepted || userName.length < 2}
          onClick={() => {
            if (termsAccepted && userName.length >= 2) {
              alert('Avançar para próxima tela! (Implementar navegação)');
            }
          }}
          style={{
            backgroundColor: '#FF8C1A',
            color: 'white',
            padding: '14px 28px',
            border: 'none',
            borderRadius: '8px',
            cursor: (termsAccepted && userName.length >= 2) ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            fontWeight: '600',
            width: '100%',
            opacity: (termsAccepted && userName.length >= 2) ? 1 : 0.5,
            marginTop: '10px'
          }}
        >
          Começar
        </button>
      </div>

      {/* MODAL DE TERMOS DE USO */}
      {showTerms && (
        <div 
          onClick={() => setShowTerms(false)}
          style={{
            position: 'fixed',
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
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
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
            
            <div style={{
              overflowY: 'auto',
              marginBottom: '20px',
              flex: 1,
              paddingRight: '10px'
            }}>
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

            <button 
              onClick={() => setShowTerms(false)}
              style={{
                backgroundColor: '#00D26A',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                width: '100%'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Welcome;