import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import { UserData } from '@/App'; // Importar a interface UserData
import { validateWeight, validateAge, validateHeight } from '@/utils/validation';

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
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-green-600">NutriDigital</div>
          <ProgressBar currentStep={1} totalSteps={5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Conte-nos um pouco sobre você</h1>
        <p className="text-gray-600 mb-8">
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
            <label className="block text-gray-700 text-sm font-medium mb-2">Qual o seu gênero?</label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Masculino"
                  checked={gender === 'Masculino'}
                  onChange={() => setGender('Masculino')}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Masculino</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Feminino"
                  checked={gender === 'Feminino'}
                  onChange={() => setGender('Feminino')}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Feminino</span>
              </label>
            </div>
            {genderError && <p className="text-red-500 text-xs mt-1">{genderError}</p>}
          </div>
        </div>

        <div className="mt-10">
          <Button fullWidth onClick={handleContinue} disabled={isButtonDisabled}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;