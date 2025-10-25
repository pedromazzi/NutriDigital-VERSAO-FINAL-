// 📊 LISTA COMPLETA DE ALIMENTOS - NUTRIDIGITAL
// 81 alimentos organizados por categoria e refeição

// ☕ ALIMENTOS PARA CAFÉ DA MANHÃ E LANCHE
export const BREAKFAST_SNACK_FOODS = {
  proteins: [
    'Ovos',
    'Iogurte grego natural',
    'Whey Protein em pó',
    'Queijo Mussarela',
    'Queijo Minas Frescal',
    'Requeijão Light',
    'Creme de Ricota Light',
    'Queijo Cottage'
  ],
  
  carbs: [
    'Aveia',
    'Pão integral',
    'Tapioca',
    'Pão francês',
    'Pão de forma',
    'Granola',
    'Cuscuz de Milho'
  ],
  
  fruits: [
    'Maçã',
    'Banana',
    'Frutas vermelhas (mix)',
    'Laranja',
    'Abacaxi',
    'Mamão',
    'Morango',
    'Melancia',
    'Melão',
    'Uva',
    'Manga',
    'Pera',
    'Kiwi',
    'Pêssego',
    'Ameixa',
    'Goiaba'
  ],
  
  dairy: [
    'Leite sem lactose',
    'Leite de amêndoas',
    'Leite Integral',
    'Iogurte Natural Integral'
  ],
  
  fats: [
    'Abacate',
    'Azeite de oliva extra virgem',
    'Castanhas (mix)',
    'Sementes de chia',
    'Sementes de girassol',
    'Sementes de linhaça',
    'Pasta de amendoim integral',
    'Amêndoas'
  ]
};

// 🍽️ ALIMENTOS PARA ALMOÇO E JANTAR
export const LUNCH_DINNER_FOODS = {
  proteins: [
    'Peito de frango',
    'Filé de tilápia',
    'Salmão',
    'Carne magra',
    'Tofu',
    'Soja (cozida)',
    'Sardinha em lata',
    'Atum em lata ao natural'
  ],
  
  carbs: [
    'Batata doce',
    'Arroz integral',
    'Arroz Branco Cozido',
    'Macarrão integral',
    'Batata inglesa cozida',
    'Macarrão cozido',
    'Mandioca cozida',
    'Batata Baroa (Mandioquinha)',
    'Inhame'
  ],
  
  legumes: [
    'Lentilha',
    'Feijão cozido',
    'Quinoa',
    'Grão de Bico',
    'Ervilha'
  ],
  
  fats: [
    'Abacate',
    'Azeite de oliva extra virgem',
    'Castanhas (mix)',
    'Amêndoas'
  ]
};

// 📋 ESTRUTURA DE CATEGORIAS POR REFEIÇÃO
export const MEAL_CATEGORIES = {
  breakfast: {
    name: 'Café da Manhã',
    categories: [
      { id: 'proteins', name: 'Proteínas', foods: BREAKFAST_SNACK_FOODS.proteins, required: true },
      { id: 'carbs', name: 'Carboidratos', foods: BREAKFAST_SNACK_FOODS.carbs, required: true },
      { id: 'fruits', name: 'Frutas', foods: BREAKFAST_SNACK_FOODS.fruits, required: true },
      { id: 'dairy', name: 'Laticínios', foods: BREAKFAST_SNACK_FOODS.dairy, required: false },
      { id: 'fats', name: 'Gorduras Boas', foods: BREAKFAST_SNACK_FOODS.fats, required: false }
    ]
  },
  
  lunch: {
    name: 'Almoço',
    categories: [
      { id: 'proteins', name: 'Proteínas', foods: LUNCH_DINNER_FOODS.proteins, required: true },
      { id: 'carbs', name: 'Carboidratos', foods: LUNCH_DINNER_FOODS.carbs, required: true },
      { id: 'legumes', name: 'Leguminosas', foods: LUNCH_DINNER_FOODS.legumes, required: false },
      { id: 'fats', name: 'Gorduras Boas', foods: LUNCH_DINNER_FOODS.fats, required: false }
    ]
  },
  
  snack: {
    name: 'Lanche da Tarde',
    categories: [
      { id: 'proteins', name: 'Proteínas', foods: BREAKFAST_SNACK_FOODS.proteins, required: true },
      { id: 'carbs', name: 'Carboidratos', foods: BREAKFAST_SNACK_FOODS.carbs, required: true },
      { id: 'fruits', name: 'Frutas', foods: BREAKFAST_SNACK_FOODS.fruits, required: true },
      { id: 'dairy', name: 'Laticínios', foods: BREAKFAST_SNACK_FOODS.dairy, required: false },
      { id: 'fats', name: 'Gorduras Boas', foods: BREAKFAST_SNACK_FOODS.fats, required: false }
    ]
  },
  
  dinner: {
    name: 'Jantar',
    categories: [
      { id: 'proteins', name: 'Proteínas', foods: LUNCH_DINNER_FOODS.proteins, required: true },
      { id: 'carbs', name: 'Carboidratos', foods: LUNCH_DINNER_FOODS.carbs, required: true },
      { id: 'legumes', name: 'Leguminosas', foods: LUNCH_DINNER_FOODS.legumes, required: false },
      { id: 'fats', name: 'Gorduras Boas', foods: LUNCH_DINNER_FOODS.fats, required: false }
    ]
  }
};

// 🏷️ INFORMAÇÕES SOBRE GLÚTEN E LACTOSE (para filtrar quando necessário)
export const FOOD_RESTRICTIONS = {
  gluten: [
    'Aveia',
    'Pão integral',
    'Pão francês',
    'Pão de forma',
    'Granola',
    'Macarrão integral',
    'Macarrão cozido'
  ],
  
  lactose: [
    'Iogurte grego natural',
    'Whey Protein em pó',
    'Queijo Mussarela',
    'Queijo Minas Frescal',
    'Requeijão Light',
    'Creme de Ricota Light',
    'Queijo Cottage',
    'Leite Integral',
    'Iogurte Natural Integral'
  ]
};

// 📊 CONTADOR DE ALIMENTOS
export const FOOD_COUNT = {
  breakfast_proteins: BREAKFAST_SNACK_FOODS.proteins.length, // 8
  breakfast_carbs: BREAKFAST_SNACK_FOODS.carbs.length, // 7
  fruits: BREAKFAST_SNACK_FOODS.fruits.length, // 16
  dairy: BREAKFAST_SNACK_FOODS.dairy.length, // 4
  lunch_proteins: LUNCH_DINNER_FOODS.proteins.length, // 8
  lunch_carbs: LUNCH_DINNER_FOODS.carbs.length, // 9
  legumes: LUNCH_DINNER_FOODS.legumes.length, // 5
  fats: BREAKFAST_SNACK_FOODS.fats.length, // 8
  total: 81
};