import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importar as páginas
import Welcome from "./pages/Welcome";
import UserInfo from "./pages/UserInfo";
import PhysicalActivity from "./pages/PhysicalActivity";
import DailyRoutine from "./pages/DailyRoutine";
import Goals from "./pages/Goals";
import FoodPreferences from "./pages/FoodPreferences";
import DietResult from "./pages/DietResult";

// Definir as interfaces para os dados do usuário
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

export interface UserData {
  userName: string;
  termsAccepted: boolean;
  weight: number | null;
  age: number | null;
  height: number | null;
  gender: 'Masculino' | 'Feminino' | null;
  practicesActivity: boolean | null;
  activityLevel: 'Sedentario' | 'Leve' | 'Moderado' | 'Intenso' | 'Muito Intenso' | null; // Atualizado aqui
  mealTimes: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  goal: 'Emagrecimento' | 'Ganho de Massa' | 'Manutenção' | null;
  foodPreferences: FoodPreferences;
  dietPlan: any | null;
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

const queryClient = new QueryClient();

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
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

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0); // Scroll para o topo ao navegar
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
      case 'userInfo':
        return <UserInfo userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
      case 'physicalActivity':
        return <PhysicalActivity userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
      case 'dailyRoutine':
        return <DailyRoutine userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
      case 'goals':
        return <Goals userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
      case 'foodPreferences':
        return <FoodPreferences userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
      case 'dietResult':
        return <DietResult userData={userData} resetUserData={resetUserData} navigateTo={navigateTo} />;
      default:
        return <Welcome userData={userData} updateUserData={updateUserData} navigateTo={navigateTo} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderScreen()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;