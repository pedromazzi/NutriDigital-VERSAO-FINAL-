import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataContext"; // Import UserDataProvider

import Index from "./pages/Index"; // This will be the Welcome page
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import UserInfo from "./pages/UserInfo";
import PhysicalActivity from "./pages/PhysicalActivity";
import DailyRoutine from "./pages/DailyRoutine";
import Goals from "./pages/Goals";
import FoodPreferences from "./pages/FoodPreferences";
import DietResult from "./pages/DietResult";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserDataProvider> {/* Wrap the entire app with UserDataProvider */}
          <Routes>
            <Route path="/" element={<Welcome />} /> {/* Welcome page is the new root */}
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/physical-activity" element={<PhysicalActivity />} />
            <Route path="/daily-routine" element={<DailyRoutine />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/food-preferences" element={<FoodPreferences />} />
            <Route path="/diet-result" element={<DietResult />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserDataProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;