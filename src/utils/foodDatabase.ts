// 🗃️ BASE DE DADOS COMPLETA - 81 ALIMENTOS
// Valores nutricionais da Tabela TACO

export interface FoodPortion {
  amount: number;
  unit: string;
  description: string;
}

export interface FoodNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface FoodRestrictions {
  gluten: boolean;
  lactose: boolean;
}

export type MealGroup = 'breakfast' | 'lunch' | 'snack' | 'dinner';
export type FoodCategory = 'protein' | 'carb' | 'fruit' | 'dairy' | 'fat' | 'legume';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  mealGroup: MealGroup[];
  portion: FoodPortion;
  nutrition: FoodNutrition;
  restrictions: FoodRestrictions;
  maxDaily?: number; // Optional for chia
}

export interface FoodDatabaseType {
  breakfast_proteins: FoodItem[];
  breakfast_carbs: FoodItem[];
  fruits: FoodItem[];
  dairy: FoodItem[];
  fats: FoodItem[];
  lunch_proteins: FoodItem[];
  lunch_carbs: FoodItem[];
  legumes: FoodItem[];
}

export const FOOD_DATABASE: FoodDatabaseType = {
  // ☕ PROTEÍNAS - CAFÉ DA MANHÃ E LANCHE
  breakfast_proteins: [
    {
      id: 'ovos',
      name: 'Ovos',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 50,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 75,
        protein: 6,
        carbs: 0.6,
        fats: 5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'iogurte_grego',
      name: 'Iogurte grego natural',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fats: 0.4
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'whey_protein',
      name: 'Whey Protein em pó',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 30,
        unit: 'g',
        description: '1 scoop'
      },
      nutrition: {
        calories: 120,
        protein: 24,
        carbs: 3,
        fats: 1.5
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'queijo_mussarela',
      name: 'Queijo Mussarela',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 30,
        unit: 'g',
        description: '1 fatia'
      },
      nutrition: {
        calories: 80,
        protein: 6,
        carbs: 1,
        fats: 6
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'queijo_minas',
      name: 'Queijo Minas Frescal',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 30,
        unit: 'g',
        description: '1 fatia'
      },
      nutrition: {
        calories: 66,
        protein: 5,
        carbs: 1.2,
        fats: 4.5
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'requeijao_light',
      name: 'Requeijão Light',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 20,
        unit: 'g',
        description: '1 colher de sopa'
      },
      nutrition: {
        calories: 48,
        protein: 3,
        carbs: 1.5,
        fats: 3.5
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'creme_ricota',
      name: 'Creme de Ricota Light',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 30,
        unit: 'g',
        description: '1 colher de sopa'
      },
      nutrition: {
        calories: 42,
        protein: 4,
        carbs: 2,
        fats: 2
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'queijo_cottage',
      name: 'Queijo Cottage',
      category: 'protein',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 98,
        protein: 11,
        carbs: 3.4,
        fats: 4.3
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    }
  ],

  // 🍞 CARBOIDRATOS - CAFÉ DA MANHÃ E LANCHE
  breakfast_carbs: [
    {
      id: 'aveia',
      name: 'Aveia',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 30,
        unit: 'g',
        description: '3 colheres de sopa'
      },
      nutrition: {
        calories: 114,
        protein: 4.2,
        carbs: 19.5,
        fats: 2.4
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'pao_integral',
      name: 'Pão integral',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 50,
        unit: 'g',
        description: '2 fatias'
      },
      nutrition: {
        calories: 127,
        protein: 5,
        carbs: 21,
        fats: 2
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'tapioca',
      name: 'Tapioca',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 50,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 172,
        protein: 0.1,
        carbs: 42,
        fats: 0.1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'pao_frances',
      name: 'Pão francês',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 50,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 136,
        protein: 4.5,
        carbs: 27,
        fats: 1
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'pao_forma',
      name: 'Pão de forma',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 50,
        unit: 'g',
        description: '2 fatias'
      },
      nutrition: {
        calories: 134,
        protein: 4.3,
        carbs: 26,
        fats: 1.5
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'granola',
      name: 'Granola',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 30,
        unit: 'g',
        description: '3 colheres de sopa'
      },
      nutrition: {
        calories: 135,
        protein: 3,
        carbs: 22,
        fats: 4
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'cuscuz_milho',
      name: 'Cuscuz de Milho',
      category: 'carb',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 112,
        protein: 2.3,
        carbs: 24,
        fats: 0.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    }
  ],

  // 🍎 FRUTAS - CAFÉ DA MANHÃ E LANCHE
  fruits: [
    {
      id: 'maca',
      name: 'Maçã',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 130,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 68,
        protein: 0.3,
        carbs: 18,
        fats: 0.1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'banana',
      name: 'Banana',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'frutas_vermelhas',
      name: 'Frutas vermelhas (mix)',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 57,
        protein: 0.7,
        carbs: 14,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'laranja',
      name: 'Laranja',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 180,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 86,
        protein: 1.3,
        carbs: 21,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'abacaxi',
      name: 'Abacaxi',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 50,
        protein: 0.5,
        carbs: 13,
        fats: 0.1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'mamao',
      name: 'Mamão',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 150,
        unit: 'g',
        description: '150g'
      },
      nutrition: {
        calories: 68,
        protein: 0.8,
        carbs: 17,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'morango',
      name: 'Morango',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 32,
        protein: 0.6,
        carbs: 7.7,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'melancia',
      name: 'Melancia',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 150,
        unit: 'g',
        description: '150g'
      },
      nutrition: {
        calories: 45,
        protein: 0.9,
        carbs: 11,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'melao',
      name: 'Melão',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 150,
        unit: 'g',
        description: '150g'
      },
      nutrition: {
        calories: 51,
        protein: 1.2,
        carbs: 12,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'uva',
      name: 'Uva',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 69,
        protein: 0.6,
        carbs: 18,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'manga',
      name: 'Manga',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 130,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 78,
        protein: 0.7,
        carbs: 20,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'pera',
      name: 'Pera',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 150,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 86,
        protein: 0.5,
        carbs: 23,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'kiwi',
      name: 'Kiwi',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 61,
        protein: 1.1,
        carbs: 15,
        fats: 0.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'pessego',
      name: 'Pêssego',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 130,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 51,
        protein: 1.2,
        carbs: 13,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'ameixa',
      name: 'Ameixa',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '2 unidades'
      },
      nutrition: {
        calories: 46,
        protein: 0.7,
        carbs: 12,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'goiaba',
      name: 'Goiaba',
      category: 'fruit',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '1 unidade'
      },
      nutrition: {
        calories: 68,
        protein: 2.6,
        carbs: 14,
        fats: 1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    }
  ],

  // 🥛 LATICÍNIOS - CAFÉ DA MANHÃ E LANCHE (OPCIONAIS)
  dairy: [
    {
      id: 'leite_sem_lactose',
      name: 'Leite sem lactose',
      category: 'dairy',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 200,
        unit: 'ml',
        description: '200ml'
      },
      nutrition: {
        calories: 90,
        protein: 6,
        carbs: 9,
        fats: 3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'leite_amendoas',
      name: 'Leite de amêndoas',
      category: 'dairy',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 200,
        unit: 'ml',
        description: '200ml'
      },
      nutrition: {
        calories: 30,
        protein: 1,
        carbs: 1.5,
        fats: 2.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'leite_integral',
      name: 'Leite Integral',
      category: 'dairy',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 200,
        unit: 'ml',
        description: '200ml'
      },
      nutrition: {
        calories: 122,
        protein: 6.2,
        carbs: 9,
        fats: 6.6
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    },
    {
      id: 'iogurte_natural',
      name: 'Iogurte Natural Integral',
      category: 'dairy',
      mealGroup: ['breakfast', 'snack'],
      portion: {
        amount: 170,
        unit: 'ml',
        description: '170ml'
      },
      nutrition: {
        calories: 102,
        protein: 5.8,
        carbs: 8.2,
        fats: 5.4
      },
      restrictions: {
        gluten: false,
        lactose: true
      }
    }
  ],

  // 🥑 GORDURAS BOAS - TODAS AS REFEIÇÕES (OPCIONAIS)
  fats: [
    {
      id: 'abacate',
      name: 'Abacate',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 50,
        unit: 'g',
        description: '50g'
      },
      nutrition: {
        calories: 80,
        protein: 1,
        carbs: 4.3,
        fats: 7.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'azeite',
      name: 'Azeite de oliva extra virgem',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 10,
        unit: 'ml',
        description: '1 colher de sopa'
      },
      nutrition: {
        calories: 88,
        protein: 0,
        carbs: 0,
        fats: 10
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'castanhas',
      name: 'Castanhas (mix)',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 20,
        unit: 'g',
        description: '6 unidades'
      },
      nutrition: {
        calories: 131,
        protein: 3,
        carbs: 5,
        fats: 11
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'chia',
      name: 'Sementes de chia',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 15,
        unit: 'g',
        description: '1 colher de sopa'
      },
      nutrition: {
        calories: 74,
        protein: 2.5,
        carbs: 6.3,
        fats: 4.6
      },
      restrictions: {
        gluten: false,
        lactose: false
      },
      maxDaily: 15 // MÁXIMO 15g POR DIA
    },
    {
      id: 'girassol',
      name: 'Sementes de girassol',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 20,
        unit: 'g',
        description: '20g'
      },
      nutrition: {
        calories: 116,
        protein: 4.2,
        carbs: 4,
        fats: 10
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'linhaca',
      name: 'Sementes de linhaça',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 15,
        unit: 'g',
        description: '1 colher de sopa'
      },
      nutrition: {
        calories: 80,
        protein: 2.7,
        carbs: 4.4,
        fats: 6.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'pasta_amendoim',
      name: 'Pasta de amendoim integral',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 20,
        unit: 'g',
        description: '1 colher de sopa'
      },
      nutrition: {
        calories: 120,
        protein: 5,
        carbs: 4,
        fats: 10
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'amendoas',
      name: 'Amêndoas',
      category: 'fat',
      mealGroup: ['breakfast', 'lunch', 'snack', 'dinner'],
      portion: {
        amount: 20,
        unit: 'g',
        description: '7 unidades'
      },
      nutrition: {
        calories: 115,
        protein: 4.3,
        carbs: 4,
        fats: 10
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    }
  ],

  // 🍗 PROTEÍNAS - ALMOÇO E JANTAR
  lunch_proteins: [
    {
      id: 'frango',
      name: 'Peito de frango',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 165,
        protein: 31,
        carbs: 0,
        fats: 3.6
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'tilapia',
      name: 'Filé de tilápia',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 96,
        protein: 20,
        carbs: 0,
        fats: 1.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'salmao',
      name: 'Salmão',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 211,
        protein: 23,
        carbs: 0,
        fats: 13
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'carne_magra',
      name: 'Carne magra',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 171,
        protein: 32,
        carbs: 0,
        fats: 4.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'tofu',
      name: 'Tofu',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 76,
        protein: 8,
        carbs: 1.9,
        fats: 4.8
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'soja',
      name: 'Soja (cozida)',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 141,
        protein: 12,
        carbs: 9.9,
        fats: 6
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'sardinha',
      name: 'Sardinha em lata',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 133,
        protein: 21,
        carbs: 0,
        fats: 5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'atum',
      name: 'Atum em lata ao natural',
      category: 'protein',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 108,
        protein: 26,
        carbs: 0,
        fats: 0.8
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    }
  ],

  // 🍚 CARBOIDRATOS - ALMOÇO E JANTAR
  lunch_carbs: [
    {
      id: 'batata_doce',
      name: 'Batata doce',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 77,
        protein: 0.6,
        carbs: 18.4,
        fats: 0.1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'arroz_integral',
      name: 'Arroz integral',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 124,
        protein: 2.6,
        carbs: 25.8,
        fats: 1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'arroz_branco',
      name: 'Arroz Branco Cozido',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 128,
        protein: 2.5,
        carbs: 28.1,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'macarrao_integral',
      name: 'Macarrão integral',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 126,
        protein: 4.5,
        carbs: 25,
        fats: 1.2
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'batata_inglesa',
      name: 'Batata inglesa cozida',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 52,
        protein: 1.2,
        carbs: 11.9,
        fats: 0.1
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'macarrao',
      name: 'Macarrão cozido',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 138,
        protein: 4.9,
        carbs: 28,
        fats: 0.8
      },
      restrictions: {
        gluten: true,
        lactose: false
      }
    },
    {
      id: 'mandioca',
      name: 'Mandioca cozida',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 125,
        protein: 0.6,
        carbs: 30,
        fats: 0.3
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'batata_baroa',
      name: 'Batata Baroa (Mandioquinha)',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 85,
        protein: 0.9,
        carbs: 20,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'inhame',
      name: 'Inhame',
      category: 'carb',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 97,
        protein: 1.5,
        carbs: 23,
        fats: 0.2
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    }
  ],

  // 🫘 LEGUMINOSAS - ALMOÇO E JANTAR (OPCIONAIS)
  legumes: [
    {
      id: 'lentilha',
      name: 'Lentilha',
      category: 'legume',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 93,
        protein: 6.3,
        carbs: 16,
        fats: 0.4
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'feijao',
      name: 'Feijão cozido',
      category: 'legume',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 77,
        protein: 4.8,
        carbs: 13.6,
        fats: 0.5
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'quinoa',
      name: 'Quinoa',
      category: 'legume',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 120,
        protein: 4.4,
        carbs: 21.3,
        fats: 1.9
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'grao_bico',
      name: 'Grão de Bico',
      category: 'legume',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 164,
        protein: 8.9,
        carbs: 27.4,
        fats: 2.6
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    },
    {
      id: 'ervilha',
      name: 'Ervilha',
      category: 'legume',
      mealGroup: ['lunch', 'dinner'],
      portion: {
        amount: 100,
        unit: 'g',
        description: '100g'
      },
      nutrition: {
        calories: 81,
        protein: 5.4,
        carbs: 14.5,
        fats: 0.4
      },
      restrictions: {
        gluten: false,
        lactose: false
      }
    }
  ]
};

// 📊 FUNÇÕES AUXILIARES

// Obter todos os alimentos de uma categoria específica
export function getFoodsByCategory(category: FoodCategory): FoodItem[] {
  const allFoods = Object.values(FOOD_DATABASE).flat();
  return allFoods.filter(food => food.category === category);
}

// Obter alimentos disponíveis para uma refeição específica
export function getFoodsByMeal(mealType: MealGroup): FoodItem[] {
  const allFoods = Object.values(FOOD_DATABASE).flat();
  return allFoods.filter(food => food.mealGroup.includes(mealType));
}

// Filtrar alimentos removendo intolerâncias
export function filterByIntolerances(foods: FoodItem[], intolerances: string[]): FoodItem[] {
  return foods.filter(food => {
    if (intolerances.includes('gluten') && food.restrictions.gluten) return false;
    if (intolerances.includes('lactose') && food.restrictions.lactose) return false;
    return true;
  });
}

// Obter alimento por ID
export function getFoodById(id: string): FoodItem | undefined {
  const allFoods = Object.values(FOOD_DATABASE).flat();
  return allFoods.find(food => food.id === id);
}

// Validar se chia excede o máximo diário
export function validateChiaLimit(selectedFoods: { [key: string]: { fats?: string[] } }): boolean {
  let totalChia = 0;
  Object.values(selectedFoods).forEach(meal => {
    if (meal.fats && meal.fats.includes('chia')) {
      totalChia += 15; // porção padrão
    }
  });
  return totalChia <= 15;
}