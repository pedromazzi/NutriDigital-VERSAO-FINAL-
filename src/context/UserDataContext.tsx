import React, { createContext, useState, useContext, ReactNode } from 'react';

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

interface UserData {
  userName: string;
  termsAccepted: boolean;
  weight: number | null;
  age: number | null;
  height: number | null;
  gender: 'Masculino' | 'Feminino' | null;
  practicesActivity: boolean | null;
  activityLevel: 'Leve' | 'Moderado' | 'Intenso' | null;
  mealTimes: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  goal: 'Emagrecimento' | 'Ganho de Massa' | 'Manutenção' | null;
  foodPreferences: FoodPreferences;
  dietPlan: any | null; // Will be populated in PROMPT 3
}

interface UserDataContextType {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
  resetUserData: () => void;
}

const initialState: UserData = {
  userName: '',
  termsAccepted: false,
  weight: null,
  age: null,
  height: null,
  gender: null,
  practicesActivity: null,
  activityLevel: null,
  mealTimes: {
    breakfast: '',
    lunch: '',
    snack: '',
    dinner: ''
  },
  goal: null,
  foodPreferences: {
    breakfast: {
      proteins: [],
      carbs: [],
      fruits: [],
      fats: [],
      dairy: []
    },
    lunch: {
      proteins: [],
      carbs: [],
      legumes: [],
      fats: []
    },
    snack: {
      proteins: [],
      carbs: [],
      fruits: [],
      fats: [],
      dairy: []
    },
    dinner: {
      proteins: [],
      carbs: [],
      legumes: [],
      fats: []
    }
  },
  dietPlan: null
};

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(initialState);

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const resetUserData = () => {
    setUserData(initialState);
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData, resetUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};