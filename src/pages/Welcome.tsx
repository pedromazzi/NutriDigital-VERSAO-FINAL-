import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import { useUserData } from '@/context/UserDataContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  const [nameInput, setNameInput] = useState(userData.userName);
  const [termsAccepted, setTermsAccepted] = useState(userData.termsAccepted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameError, setNameError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value);
    if (value.length < 2 && value.length > 0) {
      setNameError('O nome deve ter no mínimo 2 caracteres.');
    } else {
      setNameError('');
    }
  };

  const handleStart = () => {
    if (nameInput.length >= 2 && termsAccepted) {
      updateUserData('userName', nameInput);
      updateUserData('termsAccepted', termsAccepted);
      navigate('/user-info');
    }
  };

  const isButtonDisabled = nameInput.length < 2 || !termsAccepted;

  const termsContent = `
    TERMOS DE USO E AVISO LEGAL

    As informações, planos alimentares e sugestões nutricionais disponibilizados por este aplicativo são gerados automaticamente por meio de inteligência artificial e têm caráter exclusivamente informativo e educativo.

    O conteúdo fornecido não constitui orientação, prescrição ou acompanhamento nutricional individualizado, nem substitui a consulta com profissionais de saúde qualificados, como nutricionistas, médicos ou outros especialistas.

    Antes de iniciar qualquer plano alimentar, dieta, suplementação ou mudança nos hábitos alimentares, o usuário deve consultar um profissional habilitado para avaliar suas condições de saúde, restrições e necessidades específicas.

    O aplicativo, seus desenvolvedores e parceiros não se responsabilizam por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso, interpretação ou aplicação das informações fornecidas pela plataforma.

    Ao utilizar este aplicativo, o usuário reconhece e concorda que todas as informações apresentadas são sugestões automatizadas e que o uso é de inteira responsabilidade do usuário.
  `;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo NutriDigital - Placeholder for now */}
        <div className="text-4xl font-bold text-green-600 mb-8">NutriDigital</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Seja Bem vindo(a) ao NutriDigital</h1>

        <div className="mb-6">
          <Input
            label="Qual o seu nome?"
            placeholder="Seu nome"
            value={nameInput}
            onChange={handleNameChange}
            error={nameError}
          />
        </div>

        <div className="space-y-4 mb-8">
          <Card>
            <p className="text-gray-700">Monte sua dieta personalizada em poucos passos.</p>
          </Card>
          <Card>
            <p className="text-gray-700">Receba planos com calorias e macros calculados pra você.</p>
          </Card>
          <Card>
            <p className="text-gray-700">Baixe sua dieta em PDF e siga seu progresso.</p>
          </Card>
        </div>

        <div className="flex items-center mb-8 justify-center">
          <input
            type="checkbox"
            id="terms-checkbox"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              updateUserData('termsAccepted', e.target.checked);
            }}
          />
          <label htmlFor="terms-checkbox" className="ml-2 text-sm text-gray-700">
            Li e aceito os{' '}
            <span
              className="text-green-600 hover:underline cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Termos de Uso
            </span>
          </label>
        </div>

        <Button fullWidth onClick={handleStart} disabled={isButtonDisabled}>
          Começar
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Termos de Uso e Aviso Legal">
        <p className="whitespace-pre-line text-gray-700">{termsContent}</p>
      </Modal>
    </div>
  );
};

export default Welcome;