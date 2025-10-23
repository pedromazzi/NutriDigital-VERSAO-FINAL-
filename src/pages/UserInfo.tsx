import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import { UserData } from '@/App'; // Importar a interface UserData
import { validateWeight, validateAge, validateHeight } from '@/utils/validation';
import { cn } from '@/lib/utils'; // Importar cn para classes condicionais

interface UserInfoProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  navigateTo: (screen: string) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData, updateUserData, navigateTo }) => {
  const [weight, setWeight] = useState<number | null>(userData.weight);
  const [age, setAge] = useState<number | null>(userData.age);
  const [height, setHeight] = useState<number | null>(userData.height);
  const [gender, setGender] = useState<'Masculino' | 'Feminino' | null>(userData.gender);

  const [weightError, setWeightError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [genderError, setGenderError] = useState('');

  useEffect(() => {
    if (weight !== null) setWeightError(validateWeight(weight) ? '' : 'Peso deve estar entre 30 e 300 kg.');
  }, [weight]);

  useEffect(() => {
    if (age !== null) setAgeError(validateAge(age) ? '' : 'Idade deve estar entre 15 e 100 anos.');
  }, [age]);

  useEffect(() => {
    if (height !== null) setHeightError(validateHeight(height) ? '' : 'Altura deve estar entre 100 e 250 cm.');
  }, [height]);

  const handleContinue = () => {
    const isWeightValid = validateWeight(weight);
    const isAgeValid = validateAge(age);
    const isHeightValid = validateHeight(height);
    const isGenderSelected = gender !== null;

    setWeightError(isWeightValid ? '' : 'Peso deve estar entre 30 e 300 kg.');
    setAgeError(isAgeValid ? '' : 'Idade deve estar entre 15 e 100 anos.');
    setHeightError(isHeightValid ? '' : 'Altura deve estar entre 100 e 250 cm.');
    setGenderError(isGenderSelected ? '' : 'Selecione seu gênero.');

    if (isWeightValid && isAgeValid && isHeightValid && isGenderSelected) {
      updateUserData('weight', weight);
      updateUserData('age', age);
      updateUserData('height', height);
      updateUserData('gender', gender);
      navigateTo('physicalActivity');
    }
  };

  const isButtonDisabled =
    !validateWeight(weight) ||
    !validateAge(age) ||
    !validateHeight(height) ||
    gender === null;

  return (
    <div className="min-h-screen bg-bg-primary px-5 py-10 max-w-3xl mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="text-primary text-2xl font-bold">NutriDigital</div>
        <ProgressBar currentStep={1} totalSteps={5} />
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-2">Conte-nos um pouco sobre você</h1>
      <p className="text-base text-text-secondary mb-8">
        Essas informações são essenciais para criarmos uma dieta personalizada.
      </p>

      <div className="space-y-6">
        <Input
          label="Qual o seu peso atual?"
          type="number"
          placeholder="Ex: 75"
          suffix="kg"
          value={weight === null ? '' : weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          error={weightError}
          min="30"
          max="300"
        />
        <Input
          label="Qual a sua idade?"
          type="number"
          placeholder="Ex: 30"
          value={age === null ? '' : age}
          onChange={(e) => setAge(Number(e.target.value))}
          error={ageError}
          min="15"
          max="100"
        />
        <Input
          label="Qual a sua altura?"
          type="number"
          placeholder="Ex: 180"
          suffix="cm"
          value={height === null ? '' : height}
          onChange={(e) => setHeight(Number(e.target.value))}
          error={heightError}
          min="100"
          max="250"
        />

        <div>
          <label className="block text-text-primary font-medium mb-2">Qual o seu gênero?</label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={cn(
                "p-4 border rounded-lg cursor-pointer text-base font-medium text-text-primary text-center",
                gender === 'Masculino' ? 'border-primary bg-primary-light border-2' : 'border-gray-200 hover:border-primary/50'
              )}
            >
              <input
                type="radio"
                name="gender"
                value="Masculino"
                checked={gender === 'Masculino'}
                onChange={() => setGender('Masculino')}
                className="sr-only" // Esconder o radio button nativo
              />
              Masculino
            </label>
            <label
              className={cn(
                "p-4 border rounded-lg cursor-pointer text-base font-medium text-text-primary text-center",
                gender === 'Feminino' ? 'border-primary bg-primary-light border-2' : 'border-gray-200 hover:border-primary/50'
              )}
            >
              <input
                type="radio"
                name="gender"
                value="Feminino"
                checked={gender === 'Feminino'}
                onChange={() => setGender('Feminino')}
                className="sr-only" // Esconder o radio button nativo
              />
              Feminino
            </label>
          </div>
          {genderError && <p className="text-red-500 text-xs mt-1">{genderError}</p>}
        </div>
      </div>

      <div className="flex gap-3 mt-10">
        <Button variant="secondary" onClick={() => navigateTo('welcome')} className="flex-1 py-3.5">
          Voltar
        </Button>
        <Button fullWidth onClick={handleContinue} disabled={isButtonDisabled} className="flex-[2] py-3.5">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;