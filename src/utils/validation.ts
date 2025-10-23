export const validateWeight = (weight: number | null): boolean => {
  return weight !== null && weight >= 30 && weight <= 300;
};

export const validateAge = (age: number | null): boolean => {
  return age !== null && age >= 15 && age <= 100;
};

export const validateHeight = (height: number | null): boolean => {
  return height !== null && height >= 100 && height <= 250;
};

// Helper para converter string de tempo (HH:MM) para minutos desde a meia-noite
const parseTime = (timeString: string): number => {
  if (!timeString) return -1; // Invalid time
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const validateMealTimesOrder = (times: { breakfast: string; lunch: string; snack: string; dinner: string }): boolean => {
  const breakfast = parseTime(times.breakfast);
  const lunch = parseTime(times.lunch);
  const snack = parseTime(times.snack);
  const dinner = parseTime(times.dinner);

  if (breakfast === -1 || lunch === -1 || snack === -1 || dinner === -1) {
    return false; // All times must be filled
  }
  
  return breakfast < lunch && lunch < snack && snack < dinner;
};

interface FoodPreferencesValidationErrors {
  breakfast?: string;
  lunch?: string;
  snack?: string;
  dinner?: string;
}

interface MealPreferences {
  proteins: string[];
  carbs: string[];
  fruits?: string[];
  fats: string[];
  dairy?: string[];
  legumes?: string[];
}

interface FoodPreferences {
  breakfast: MealPreferences;
  lunch: MealPreferences;
  snack: MealPreferences;
  dinner: MealPreferences;
}

export const validateFoodPreferences = (preferences: FoodPreferences): FoodPreferencesValidationErrors => {
  const errors: FoodPreferencesValidationErrors = {};
  
  // Café da manhã
  if (preferences.breakfast.proteins.length < 1) {
    errors.breakfast = 'Selecione ao menos 1 proteína';
  }
  if (preferences.breakfast.carbs.length < 1) {
    errors.breakfast = (errors.breakfast ? errors.breakfast + ', ' : '') + '1 carboidrato';
  }
  if (preferences.breakfast.fruits && preferences.breakfast.fruits.length < 1) {
    errors.breakfast = (errors.breakfast ? errors.breakfast + ', ' : '') + '1 fruta';
  }
  if (errors.breakfast) errors.breakfast = 'Café da manhã: ' + errors.breakfast;
  
  // Almoço
  if (preferences.lunch.proteins.length < 1) {
    errors.lunch = 'Selecione ao menos 1 proteína';
  }
  if (preferences.lunch.carbs.length < 1) {
    errors.lunch = (errors.lunch ? errors.lunch + ', ' : '') + '1 carboidrato';
  }
  if (errors.lunch) errors.lunch = 'Almoço: ' + errors.lunch;

  // Lanche da Tarde
  if (preferences.snack.proteins.length < 1) {
    errors.snack = 'Selecione ao menos 1 proteína';
  }
  if (preferences.snack.carbs.length < 1) {
    errors.snack = (errors.snack ? errors.snack + ', ' : '') + '1 carboidrato';
  }
  if (preferences.snack.fruits && preferences.snack.fruits.length < 1) {
    errors.snack = (errors.snack ? errors.snack + ', ' : '') + '1 fruta';
  }
  if (errors.snack) errors.snack = 'Lanche da Tarde: ' + errors.snack;
  
  // Jantar
  if (preferences.dinner.proteins.length < 1) {
    errors.dinner = 'Selecione ao menos 1 proteína';
  }
  if (preferences.dinner.carbs.length < 1) {
    errors.dinner = (errors.dinner ? errors.dinner + ', ' : '') + '1 carboidrato';
  }
  if (errors.dinner) errors.dinner = 'Jantar: ' + errors.dinner;
  
  return errors;
};