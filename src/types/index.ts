export interface MealPreferences {
  proteins: string[];
  carbs: string[];
  fruits?: string[];
  fats: string[];
  dairy?: string[];
  legumes?: string[];
}

export interface FoodPreferencesData {
  breakfast: MealPreferences;
  lunch: MealPreferences;
  snack: MealPreferences;
  dinner: MealPreferences;
}

export interface SelectedCategories {
  breakfast: string[];
  lunch: string[];
  snack: string[];
  dinner: string[];
}

export interface DietFood {
  name: string;
  quantity: string;
  substitution: string | null;
  substitutionQuantity: string | null;
}

export interface DietMeal {
  name: string;
  time: string;
  calories: number;
  foods: DietFood[];
}

export interface DietPlanOutput {
  dailySummary: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    water: number;
  };
  meals: DietMeal[];
}

export interface UserData {
  userName: string;
  termsAccepted: boolean;
  weight: number | null;
  age: number | null;
  height: number | null;
  gender: 'Masculino' | 'Feminino' | null;
  practicesActivity: boolean | null;
  activityLevel: 'Sedentario' | 'Leve' | 'Moderado' | 'Intenso' | 'Muito Intenso' | null;
  mealTimes: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  goal: 'Emagrecimento' | 'Ganho de Massa' | 'Manutenção' | null;
  foodPreferences: FoodPreferencesData;
  selectedCategories: SelectedCategories;
  intolerances: string[];
  dietPlan: DietPlanOutput | null;
}