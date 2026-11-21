/* ============================================================
   FASTWOK — app logic (vanilla, zero dipendenze)
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- DATA ---------------- */
  const FORMATS = [
    { id: 'classic', name: 'Wok Box Classic', sub: 'La taglia che ti salva la giornata.', tag: 'Regular', icon: '🥡', price: 9.5, mult: 1 },
    { id: 'xl', name: 'Wok Box XL', sub: 'Perché “ancora un po’” non basta mai.', tag: 'Big Hunger', icon: '🍱', price: 12.5, mult: 1.5 },
    { id: 'fit', name: 'Fit / Low-Carb Bowl', sub: 'Più proteine, più verdure, base ridotta.', tag: 'Smart Fuel', icon: '🥗', price: 11, mult: 1 },
    { id: 'soup', name: 'Soup / Ramen Mode', sub: 'Tutto in una bowl di brodo caldo.', tag: 'Brodo', icon: '🍜', price: 11, mult: 1 }
  ];

  const SOUPS = [
    { id: 'miso', name: 'Miso', sub: 'Umami caldo e cremoso', icon: '🍵', kcal: 60, pro: 4, carbs: 6, fat: 2, allergens: ['soia'] },
    { id: 'lemongrass', name: 'Spicy Lemongrass', sub: 'Citronella & pepe', icon: '🌿', kcal: 45, pro: 1, carbs: 5, fat: 2, allergens: [] },
    { id: 'umami', name: 'Rich Umami', sub: 'Brodo scuro profondo', icon: '🍲', kcal: 80, pro: 3, carbs: 8, fat: 3, allergens: ['soia'] }
  ];

  const BASES = [
    { id: 'egg-noodles', name: 'Egg Noodles', icon: '🍜', price: 0, kcal: 280, pro: 9, carbs: 52, fat: 4, allergens: ['glutine', 'uova'], animal: true },
    { id: 'whole-wheat', name: 'Whole-Wheat Noodles', icon: '🌾', price: 0.5, kcal: 260, pro: 11, carbs: 48, fat: 3, allergens: ['glutine'] },
    { id: 'rice-noodles', name: 'Rice Noodles', sub: 'Senza glutine', icon: '🍚', price: 0.5, kcal: 240, pro: 3, carbs: 54, fat: 1, allergens: [], gf: true },
    { id: 'udon', name: 'Udon Noodles', sub: 'Spesse e morbide', icon: '🍲', price: 0.7, kcal: 300, pro: 8, carbs: 60, fat: 2, allergens: ['glutine'] },
    { id: 'jasmine', name: 'Jasmine White Rice', icon: '🍚', price: 0, kcal: 250, pro: 5, carbs: 56, fat: 1, allergens: [], gf: true },
    { id: 'brown-quinoa', name: 'Brown Rice & Quinoa', icon: '🌾', price: 0.8, kcal: 270, pro: 9, carbs: 50, fat: 3, allergens: [], gf: true },
    { id: 'veggie-mix', name: 'Wok Veggie Mix', sub: 'Solo verdure croccanti', icon: '🥬', price: 0, kcal: 90, pro: 4, carbs: 14, fat: 2, allergens: [], gf: true },
    { id: 'konjac', name: 'Konjac / Shirataki', sub: 'Zero-carb', icon: '🥒', price: 1, kcal: 20, pro: 1, carbs: 4, fat: 0, allergens: [], gf: true }
  ];

  const PROTEINS = [
    { id: 'pollo', name: 'Pollo al Wok', icon: '🍗', price: 3, kcal: 180, pro: 32, carbs: 2, fat: 5, allergens: [], animal: true, meatFish: true },
    { id: 'teriyaki', name: 'Pollo Teriyaki', icon: '🍗', price: 3.2, kcal: 210, pro: 30, carbs: 12, fat: 6, allergens: ['soia'], animal: true, meatFish: true },
    { id: 'karaage', name: 'Karaage croccante', icon: '🍗', price: 3.5, kcal: 260, pro: 28, carbs: 14, fat: 13, allergens: ['glutine', 'soia'], animal: true, meatFish: true },
    { id: 'manzo', name: 'Manzo marinato', icon: '🥩', price: 4.5, kcal: 240, pro: 33, carbs: 3, fat: 11, allergens: ['soia'], animal: true, meatFish: true },
    { id: 'char-siu', name: 'Maiale Char Siu', icon: '🥓', price: 4, kcal: 250, pro: 30, carbs: 9, fat: 12, allergens: ['soia'], animal: true, meatFish: true },
    { id: 'gamberi', name: 'Gamberi', icon: '🦐', price: 5, kcal: 120, pro: 24, carbs: 1, fat: 2, allergens: ['crostacei'], animal: true, meatFish: true },
    { id: 'tofu', name: 'Tofu croccante', icon: '🧈', price: 2.5, kcal: 150, pro: 16, carbs: 6, fat: 9, allergens: ['soia'], vegan: true },
    { id: 'tempeh', name: 'Tempeh marinato', icon: '🫘', price: 3, kcal: 170, pro: 19, carbs: 8, fat: 10, allergens: ['soia'], vegan: true },
    { id: 'edamame', name: 'Edamame boost', icon: '🫛', price: 1.5, kcal: 90, pro: 9, carbs: 7, fat: 4, allergens: ['soia'], vegan: true },
    { id: 'uovo-extra', name: 'Extra Uovo', icon: '🥚', price: 1.5, kcal: 70, pro: 6, carbs: 1, fat: 5, allergens: ['uova'], animal: true }
  ];

  const VEGGIES = [
    { id: 'pak-choi', name: 'Pak Choi', icon: '🥬', price: 0.6, kcal: 20, pro: 2, carbs: 3, fat: 0, allergens: [] },
    { id: 'broccoli', name: 'Broccoli', icon: '🥦', price: 0.6, kcal: 30, pro: 3, carbs: 5, fat: 0, allergens: [] },
    { id: 'champignon', name: 'Funghi Champignon', icon: '🍄', price: 0.7, kcal: 20, pro: 2, carbs: 3, fat: 0, allergens: [] },
    { id: 'shiitake', name: 'Funghi Shiitake', icon: '🍄', price: 0.9, kcal: 25, pro: 2, carbs: 4, fat: 0, allergens: [] },
    { id: 'peperoni', name: 'Peperoni mix', icon: '🫑', price: 0.6, kcal: 25, pro: 1, carbs: 5, fat: 0, allergens: [] },
    { id: 'baby-corn', name: 'Baby Corn', icon: '🌽', price: 0.6, kcal: 25, pro: 1, carbs: 5, fat: 0, allergens: [] },
    { id: 'germogli', name: 'Germogli di soia', icon: '🌱', price: 0.5, kcal: 15, pro: 2, carbs: 2, fat: 0, allergens: ['soia'] },
    { id: 'zucchine', name: 'Zucchine', icon: '🥒', price: 0.5, kcal: 15, pro: 1, carbs: 3, fat: 0, allergens: [] },
    { id: 'cipollotto', name: 'Cipollotto', icon: '🧅', price: 0.3, kcal: 10, pro: 0, carbs: 2, fat: 0, allergens: [] },
    { id: 'ananas', name: 'Ananas fresco', icon: '🍍', price: 0.8, kcal: 40, pro: 0, carbs: 10, fat: 0, allergens: [] },
    { id: 'carote', name: 'Carote', icon: '🥕', price: 0.5, kcal: 20, pro: 1, carbs: 4, fat: 0, allergens: [] }
  ];

  const SAUCES = [
    { id: 'tokyo', name: 'Tokyo', sub: 'Teriyaki', icon: '🗼', price: 0, kcal: 60, pro: 1, carbs: 14, fat: 0, allergens: ['soia'], group: 'classic' },
    { id: 'hongkong', name: 'Hong Kong', sub: 'Agrodolce', icon: '🏙️', price: 0, kcal: 70, pro: 0, carbs: 17, fat: 0, allergens: [], group: 'classic' },
    { id: 'saigon', name: 'Saigon', sub: 'Aglio, lime & pepe nero', icon: '🌿', price: 0, kcal: 40, pro: 0, carbs: 4, fat: 2, allergens: [], group: 'classic' },
    { id: 'beijing', name: 'Beijing', sub: 'Ostrica / Umami', icon: '🐉', price: 0, kcal: 50, pro: 2, carbs: 8, fat: 1, allergens: ['soia'], animal: true, meatFish: true, group: 'classic' },
    { id: 'bangkok', name: 'Bangkok', sub: 'Curry giallo & cocco', icon: '🛕', price: 0, kcal: 110, pro: 1, carbs: 8, fat: 9, allergens: [], group: 'classic' },
    { id: 'seoul', name: 'Seoul', sub: 'Gochujang Korean BBQ', icon: '🇰🇷', price: 0.5, kcal: 80, pro: 1, carbs: 16, fat: 1, allergens: ['soia'], group: 'special' },
    { id: 'sichuan', name: 'Sichuan', sub: 'Pepe di Sichuan & chili', icon: '🌶️', price: 0.5, kcal: 70, pro: 0, carbs: 6, fat: 5, allergens: [], group: 'special' },
    { id: 'kungpao', name: 'Kung Pao', sub: 'Arachidi & spezie', icon: '🥜', price: 0.5, kcal: 120, pro: 3, carbs: 8, fat: 9, allergens: ['arachidi', 'soia'], group: 'special' },
    { id: 'mango', name: 'Mango Habanero', sub: 'Dolce & fuoco', icon: '🥭', price: 0.6, kcal: 90, pro: 0, carbs: 20, fat: 1, allergens: [], group: 'special' },
    { id: 'satay', name: 'Satay', sub: 'Crema d’arachidi', icon: '🥜', price: 0.6, kcal: 150, pro: 4, carbs: 8, fat: 12, allergens: ['arachidi', 'soia'], group: 'special' },
    { id: 'sweetchili', name: 'Sweet Chili', sub: 'Dolce piccante', icon: '🌶️', price: 0, kcal: 70, pro: 0, carbs: 17, fat: 0, allergens: [], group: 'special' },
    { id: 'zero', name: 'Zero Salsa', sub: 'Al naturale', icon: '✨', price: 0, kcal: 0, pro: 0, carbs: 0, fat: 0, allergens: [], group: 'special' },

    /* ---- Cocco & Curry ---- */
    { id: 'cocco', name: 'Cocco Cream', sub: 'Latte di cocco, lime, coriandolo', icon: '🥥', price: 0.6, kcal: 120, pro: 1, carbs: 6, fat: 11, allergens: [], group: 'curry' },
    { id: 'curry-rosso', name: 'Bangkok Rosso', sub: 'Curry rosso thai', icon: '🌶️', price: 0.5, kcal: 130, pro: 2, carbs: 8, fat: 11, allergens: [], group: 'curry' },
    { id: 'curry-verde', name: 'Green Curry', sub: 'Curry verde e basilico', icon: '🍛', price: 0.5, kcal: 120, pro: 2, carbs: 7, fat: 10, allergens: [], group: 'curry' },
    { id: 'curry-giallo', name: 'Mandarino', sub: 'Curry giallo e cocco', icon: '🟡', price: 0.5, kcal: 125, pro: 1, carbs: 9, fat: 10, allergens: [], group: 'curry' },
    { id: 'curry-giapponese', name: 'Tokyo Curry', sub: 'Curry giapponese dolce', icon: '🍛', price: 0.5, kcal: 110, pro: 2, carbs: 14, fat: 5, allergens: ['glutine'], group: 'curry' },
    { id: 'massala', name: 'Bombay Massala', sub: 'Curry massala speziato', icon: '🇮🇳', price: 0.6, kcal: 120, pro: 2, carbs: 8, fat: 9, allergens: [], group: 'curry' },

    /* ---- Altre salse asiatiche ---- */
    { id: 'sriracha', name: 'Saigon Fire', sub: 'Sriracha e lime', icon: '🌶️', price: 0.4, kcal: 45, pro: 0, carbs: 8, fat: 1, allergens: [], group: 'special' },
    { id: 'hoisin', name: 'Canton Hoisin', sub: 'Dolce, densa, umami', icon: '🐉', price: 0.4, kcal: 80, pro: 1, carbs: 18, fat: 0, allergens: ['soia', 'glutine'], group: 'special' },
    { id: 'unagi', name: 'Unagi Glaze', sub: 'Salsa di anguilla dolce', icon: '🍢', price: 0.6, kcal: 90, pro: 1, carbs: 20, fat: 0, allergens: ['soia', 'pesce'], group: 'special' },
    { id: 'ponzu', name: 'Osaka Ponzu', sub: 'Agrumi e soia', icon: '🍋', price: 0.4, kcal: 30, pro: 1, carbs: 5, fat: 0, allergens: ['soia'], group: 'special' },
    { id: 'tamarindo', name: 'Mumbai Tamarindo', sub: 'Agro e piccante', icon: '🥭', price: 0.4, kcal: 50, pro: 0, carbs: 12, fat: 0, allergens: [], group: 'special' },
    { id: 'sesamo-miele', name: 'Seoul Sesamo', sub: 'Sesamo tostato e miele', icon: '🍯', price: 0.5, kcal: 100, pro: 1, carbs: 16, fat: 3, allergens: ['sesamo'], group: 'special' },
    { id: 'yuzu', name: 'Kyoto Yuzu', sub: 'Agrume giapponese', icon: '🍊', price: 0.5, kcal: 40, pro: 0, carbs: 9, fat: 0, allergens: [], group: 'special' },
    { id: 'shoyu', name: 'Shoyu Classic', sub: 'Salsa di soia', icon: '🥢', price: 0, kcal: 25, pro: 2, carbs: 3, fat: 0, allergens: ['soia', 'glutine'], group: 'classic' }
  ];

  const SPICE = [
    { id: 0, name: 'Chill', flames: 0, desc: 'Zero pepe, solo vibes.', icon: '🧊' },
    { id: 1, name: 'Warm', flames: 1, desc: 'Un calore gentile.', icon: '🌶️' },
    { id: 2, name: 'Fire', flames: 2, desc: 'Adesso si accende.', icon: '🔥' },
    { id: 3, name: 'Inferno Roma', flames: 3, desc: 'Olio chili & jalapeño. Resisti.', icon: '🌶️🔥' }
  ];

  const TOPPINGS = [
    { id: 'sesamo', name: 'Sesamo tostato', icon: '⚪', price: 0.5, kcal: 40, pro: 1, carbs: 2, fat: 3, allergens: ['sesamo'] },
    { id: 'cipolla-cr', name: 'Cipolla croccante', icon: '🧅', price: 0.5, kcal: 35, pro: 0, carbs: 5, fat: 1, allergens: [] },
    { id: 'aglio-cr', name: 'Aglio croccante', icon: '🧄', price: 0.5, kcal: 30, pro: 1, carbs: 4, fat: 1, allergens: [] },
    { id: 'arachidi', name: 'Arachidi tritate', icon: '🥜', price: 0.7, kcal: 60, pro: 3, carbs: 2, fat: 5, allergens: ['arachidi'] },
    { id: 'anacardi', name: 'Anacardi', icon: '🌰', price: 0.9, kcal: 70, pro: 2, carbs: 4, fat: 6, allergens: ['frutta a guscio'] },
    { id: 'coriandolo', name: 'Coriandolo fresco', icon: '🌿', price: 0, kcal: 5, pro: 0, carbs: 1, fat: 0, allergens: [] },
    { id: 'lime', name: 'Lime fresco', icon: '🍋', price: 0.3, kcal: 5, pro: 0, carbs: 1, fat: 0, allergens: [] },
    { id: 'nori', name: 'Alghe Nori', icon: '🌊', price: 0.6, kcal: 10, pro: 1, carbs: 1, fat: 0, allergens: [] },
    { id: 'jalapenos', name: 'Jalapeños', icon: '🌶️', price: 0.5, kcal: 10, pro: 0, carbs: 2, fat: 0, allergens: [] },
    { id: 'zenzero-rosa', name: 'Zenzero Rosa', icon: '🌸', price: 0.6, kcal: 15, pro: 0, carbs: 4, fat: 0, allergens: [] }
  ];

  const SIGNATURES = [
    {
      id: 'trastevere-fire', name: 'Trastevere Fire', emoji: '🌶️', tag: 'PICCANTE', tagClass: 'hot', price: 13.5,
      desc: 'Pollo, gamberi, doppia salsa Seoul + Sichuan e Inferno Roma. Quella che ti fa sudare ma non ti molla.',
      chips: ['🍗 Pollo', '🦐 Gamberi', '🔥 Inferno'],
      config: { format: 'classic', soup: 'miso', base: 'egg-noodles', eggMode: 'standard', proteins: ['pollo', 'gamberi'], veggies: ['pak-choi', 'peperoni'], sauces: ['seoul', 'sichuan'], spice: 3, toppings: ['sesamo', 'cipolla-cr'] },
      nameSuggest: 'Trastevere Fire'
    },
    {
      id: 'gym-bro', name: 'Gym Bro High-Protein', emoji: '💪', tag: 'HIGH-PROTEIN', tagClass: 'pro', price: 14.5,
      desc: 'Fit bowl, quinoa, pollo + manzo + uovo extra. 50 g di proteine e zero sensi di colpa.',
      chips: ['🥩 Manzo', '🥚 Extra uovo', '💪 50g pro'],
      config: { format: 'fit', soup: 'umami', base: 'brown-quinoa', eggMode: 'standard', proteins: ['pollo', 'manzo', 'uovo-extra'], veggies: ['broccoli', 'zucchine'], sauces: ['tokyo'], spice: 1, toppings: ['sesamo'] },
      nameSuggest: 'Gym Bro 50g'
    },
    {
      id: 'green-zen', name: 'Green Zen Vegan', emoji: '🌱', tag: 'VEGAN', tagClass: 'green', price: 12,
      desc: 'Rice noodles, tofu, tempeh ed edamame, curry Bangkok, coriandolo e lime. Zen dentro, fuoco fuori.',
      chips: ['🧈 Tofu', '🫘 Tempeh', '🌱 Vegan'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'plant', proteins: ['tofu', 'tempeh', 'edamame'], veggies: ['pak-choi', 'broccoli', 'zucchine'], sauces: ['bangkok'], spice: 0, toppings: ['coriandolo', 'lime', 'sesamo'] },
      nameSuggest: 'Green Zen'
    },
    {
      id: 'seoul-street', name: 'Seoul Street', emoji: '🇰🇷', tag: 'FUSION', tagClass: '', price: 12.5,
      desc: 'Udon, karaage croccante e Seoul BBQ con Sweet Chili. Il sapore di Seul in una via di Roma.',
      chips: ['🍗 Karaage', '🇰🇷 Gochujang', '🧅 Croccante'],
      config: { format: 'classic', soup: 'miso', base: 'udon', eggMode: 'standard', proteins: ['karaage', 'pollo'], veggies: ['germogli', 'cipollotto'], sauces: ['seoul', 'sweetchili'], spice: 2, toppings: ['cipolla-cr', 'sesamo'] },
      nameSuggest: 'Seoul Street'
    },
    {
      id: 'student-combo', name: 'Student Combo Box', emoji: '🎓', tag: 'PREZZO STUDENTE', tagClass: 'green', price: 9.9,
      desc: 'Riso jasmine, pollo teriyaki, Hong Kong agrodolce e cipolla croccante. La tua facoltà ti ringrazierà.',
      chips: ['🍚 Jasmine', '🍗 Teriyaki', '💸 Conveniente'],
      config: { format: 'classic', soup: 'umami', base: 'jasmine', eggMode: 'standard', proteins: ['teriyaki'], veggies: ['broccoli', 'baby-corn'], sauces: ['hongkong'], spice: 1, toppings: ['cipolla-cr', 'sesamo'] },
      nameSuggest: 'Student Combo'
    },
    {
      id: 'notturna', name: 'Notturna di San Lorenzo', emoji: '🌙', tag: 'BIG HUNGER', tagClass: 'hot', price: 15.5,
      desc: 'XL, manzo e char siu, Kung Pao + Sichuan, arachidi e lime. Per finire la notte a masticare.',
      chips: ['🥩 Manzo', '🥓 Char Siu', '🥜 Kung Pao'],
      config: { format: 'xl', soup: 'umami', base: 'egg-noodles', eggMode: 'standard', proteins: ['manzo', 'char-siu'], veggies: ['peperoni', 'ananas'], sauces: ['kungpao', 'sichuan'], spice: 3, toppings: ['arachidi', 'cipolla-cr', 'lime'] },
      nameSuggest: 'La Notturna di San Lorenzo'
    },
    {
      id: 'pad-thai', name: 'Pad Thai Street', emoji: '🥜', tag: 'TOP SELLER', tagClass: 'green', price: 11.5,
      desc: 'Rice noodles saltati con pollo, lime fresco e arachidi. Dolce, acido, croccante: il classico che non sbaglia.',
      chips: ['🍗 Pollo', '🍋 Lime', '🥜 Arachidi'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'standard', proteins: ['pollo'], veggies: ['germogli', 'cipollotto'], sauces: ['satay', 'sweetchili'], spice: 1, toppings: ['arachidi', 'lime', 'coriandolo'] },
      nameSuggest: 'Pad Thai Street'
    },
    {
      id: 'yakisoba', name: 'Yakisoba Manzo', emoji: '🥩', tag: 'WOK CLASSIC', tagClass: '', price: 12.5,
      desc: 'Noodles saltati con manzo marinato, peperoni e broccoli. Salsa Tokyo, sesamo tostato, zero chiacchiere.',
      chips: ['🥩 Manzo', '🫑 Peperoni', '🌶️ Sesamo'],
      config: { format: 'classic', soup: 'umami', base: 'egg-noodles', eggMode: 'standard', proteins: ['manzo'], veggies: ['peperoni', 'broccoli', 'cipollotto'], sauces: ['tokyo'], spice: 1, toppings: ['sesamo'] },
      nameSuggest: 'Yakisoba Manzo'
    },
    {
      id: 'teriyaki-rice', name: 'Teriyaki Rice Bowl', emoji: '🍚', tag: 'HIGH-PROTEIN', tagClass: 'pro', price: 12,
      desc: 'Riso jasmine, pollo Teriyaki lucido, uovo a sole, edamame e cipollotto. Il pranzo che ti guarda negli occhi.',
      chips: ['🍗 Teriyaki', '🥚 Uovo', '🫛 Edamame'],
      config: { format: 'classic', soup: 'miso', base: 'jasmine', eggMode: 'standard', proteins: ['teriyaki', 'edamame'], veggies: ['cipollotto'], sauces: ['tokyo'], spice: 0, toppings: ['sesamo'] },
      nameSuggest: 'Teriyaki Rice Bowl'
    },
    {
      id: 'udon-gamberi', name: 'Udon Mare & Funghi', emoji: '🍜', tag: 'SOUP MODE', tagClass: '', price: 13.5,
      desc: 'Udon spessi in brodo umami con gamberi, pak choi, funghi shiitake e zucchine. Caldo, profondo, consolatorio.',
      chips: ['🦐 Gamberi', '🍄 Shiitake', '🍜 Brodo'],
      config: { format: 'soup', soup: 'umami', base: 'udon', eggMode: 'standard', proteins: ['gamberi'], veggies: ['pak-choi', 'shiitake', 'zucchine'], sauces: ['saigon'], spice: 1, toppings: ['nori', 'cipolla-cr'] },
      nameSuggest: 'Udon Mare & Funghi'
    },
    {
      id: 'wok-pollo-verdure', name: 'Wok Pollo & Verdure', emoji: '🥦', tag: 'WOK CLASSIC', tagClass: '', price: 11.5,
      desc: 'Noodles saltati con pollo, broccoli croccanti, peperoni e cipollotto. Sesamo tostato e salsa Tokyo: semplice, vincente.',
      chips: ['🍗 Pollo', '🥦 Broccoli', '🫑 Peperoni'],
      config: { format: 'classic', soup: 'umami', base: 'egg-noodles', eggMode: 'standard', proteins: ['pollo'], veggies: ['broccoli', 'peperoni', 'cipollotto'], sauces: ['tokyo'], spice: 1, toppings: ['sesamo'] },
      nameSuggest: 'Wok Pollo & Verdure'
    },
    {
      id: 'pad-thai-grigliato', name: 'Pad Thai Grigliato', emoji: '🍗', tag: 'GRIGLIATO', tagClass: '', price: 12,
      desc: 'Rice noodles, pollo alla griglia, germogli, arachidi e lime. Il profumo della griglia che incontra il wok.',
      chips: ['🍗 Pollo griglia', '🥜 Arachidi', '🍋 Lime'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'standard', proteins: ['pollo'], veggies: ['germogli', 'cipollotto'], sauces: ['satay'], spice: 1, toppings: ['arachidi', 'lime', 'coriandolo'] },
      nameSuggest: 'Pad Thai Grigliato'
    },
    {
      id: 'combo-fastwok', name: 'Fast Combo Box', emoji: '🥡', tag: 'COMBO', tagClass: 'green', price: 15.9,
      desc: 'Wok Box con pollo e tofu + 5 gyoza di pollo + bubble tea a scelta. Il pacchetto completo per non alzarsi dal divano.',
      chips: ['🥡 Wok Box', '🥟 5 Gyoza', '🧋 Bubble Tea'],
      config: { format: 'classic', soup: 'umami', base: 'egg-noodles', eggMode: 'standard', proteins: ['pollo', 'tofu'], veggies: ['broccoli', 'peperoni'], sauces: ['tokyo'], spice: 1, toppings: ['sesamo', 'cipolla-cr'] },
      nameSuggest: 'Fast Combo Box'
    },
    {
      id: 'pad-thai-gamberi', name: 'Pad Thai Gamberi', emoji: '🦐', tag: 'TOP SELLER', tagClass: 'green', price: 13.5,
      desc: 'Noodle di riso, gamberi, uovo, arachidi, germogli e lime. Il Pad Thai che ti porta a Bangkok in un boccone.',
      chips: ['🦐 Gamberi', '🥜 Arachidi', '🍋 Lime'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'standard', proteins: ['gamberi'], veggies: ['germogli', 'cipollotto'], sauces: ['satay'], spice: 1, toppings: ['arachidi', 'lime', 'coriandolo'] },
      nameSuggest: 'Pad Thai Gamberi'
    },
    {
      id: 'drunken-noodles', name: 'Drunken Noodles', emoji: '🌶️', tag: 'PICCANTE', tagClass: 'hot', price: 12.5,
      desc: 'Noodle di riso spessi, pollo, basilico thai e peperoni. Quelli che ti fanno vedere due volte la stessa via.',
      chips: ['🍗 Pollo', '🌿 Basilico', '🫑 Peperoni'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'standard', proteins: ['pollo'], veggies: ['peperoni', 'cipollotto'], sauces: ['sichuan', 'sweetchili'], spice: 2, toppings: ['coriandolo', 'lime'] },
      nameSuggest: 'Drunken Noodles'
    },
    {
      id: 'yaki-udon', name: 'Yaki Udon Manzo', emoji: '🥩', tag: 'WOK CLASSIC', tagClass: '', price: 13.5,
      desc: 'Udon spessi saltati con manzo, broccoli, verdure croccanti e sesamo tostato. Giappone in versione fiamma.',
      chips: ['🥩 Manzo', '🥦 Broccoli', '🌾 Sesamo'],
      config: { format: 'classic', soup: 'umami', base: 'udon', eggMode: 'standard', proteins: ['manzo'], veggies: ['broccoli', 'zucchine', 'cipollotto'], sauces: ['tokyo'], spice: 1, toppings: ['sesamo'] },
      nameSuggest: 'Yaki Udon Manzo'
    },
    {
      id: 'egg-noodles-pollo', name: 'Egg Noodles Pollo', emoji: '🍜', tag: 'CLASSICO', tagClass: '', price: 11.5,
      desc: 'Noodle all’uovo, pollo tenero, cavolo croccante e carote. La comfort food che non delude mai.',
      chips: ['🍗 Pollo', '🥬 Cavolo', '🥕 Carote'],
      config: { format: 'classic', soup: 'miso', base: 'egg-noodles', eggMode: 'standard', proteins: ['pollo'], veggies: ['pak-choi', 'carote'], sauces: ['tokyo'], spice: 0, toppings: ['sesamo'] },
      nameSuggest: 'Egg Noodles Pollo'
    },
    {
      id: 'jasmine-rice', name: 'Jasmine Rice Bowl', emoji: '🍚', tag: 'FRESH', tagClass: 'green', price: 11.5,
      desc: 'Riso jasmine profumato con pollo al wok e verdure fresche. Leggero, completo, sempre azzeccato.',
      chips: ['🍚 Jasmine', '🍗 Pollo', '🥦 Verdure'],
      config: { format: 'classic', soup: 'umami', base: 'jasmine', eggMode: 'standard', proteins: ['pollo'], veggies: ['broccoli', 'zucchine', 'peperoni'], sauces: ['hongkong'], spice: 1, toppings: ['cipolla-cr', 'sesamo'] },
      nameSuggest: 'Jasmine Rice Bowl'
    },
    {
      id: 'green-curry-tofu', name: 'Green Curry Tofu', emoji: '🍛', tag: 'VEGAN', tagClass: 'green', price: 12,
      desc: 'Curry verde thai cremoso con tofu croccante e noodle di riso. Fresco, profumato, 100% vegetale.',
      chips: ['🧈 Tofu', '🍛 Curry verde', '🌿 Basilico'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'plant', proteins: ['tofu'], veggies: ['pak-choi', 'zucchine'], sauces: ['bangkok'], spice: 2, toppings: ['coriandolo', 'lime'] },
      nameSuggest: 'Green Curry Tofu'
    },
    {
      id: 'riso-fritto-box', name: 'Riso Fritto Box', emoji: '🍚', tag: 'CLASSICO', tagClass: '', price: 11.5,
      desc: 'Riso jasmine saltato al wok con pollo, uovo, broccoli e carote. Quello che ordini quando hai già deciso, ma non vuoi pensarci.',
      chips: ['🍚 Riso fritto', '🍗 Pollo', '🥕 Verdure'],
      config: { format: 'classic', soup: 'umami', base: 'jasmine', eggMode: 'standard', proteins: ['pollo'], veggies: ['broccoli', 'carote', 'cipollotto'], sauces: ['hongkong'], spice: 1, toppings: ['sesamo', 'lime'] },
      nameSuggest: 'Riso Fritto Box'
    },
    {
      id: 'veggie-wok-box', name: 'Veggie Wok Box', emoji: '🥬', tag: 'VEGAN', tagClass: 'green', price: 11.5,
      desc: 'Rice noodles, tofu croccante, edamame e verdure croccanti al curry Bangkok. Leggera, profumata, senza compromessi.',
      chips: ['🧈 Tofu', '🫛 Edamame', '🥬 Verdure'],
      config: { format: 'classic', soup: 'lemongrass', base: 'rice-noodles', eggMode: 'plant', proteins: ['tofu', 'edamame'], veggies: ['pak-choi', 'zucchine', 'broccoli'], sauces: ['bangkok'], spice: 1, toppings: ['coriandolo', 'sesamo'] },
      nameSuggest: 'Veggie Wok Box'
    }
  ];

  const BITES_FOOD = [
    { id: 'gyoza-pollo', name: 'Gyoza di pollo', sub: '5 pezzi, panzerotti', emoji: '🥟', price: 5.5, tag: 'HOT', flags: ['glutine', 'soia'] },
    { id: 'gyoza-veg', name: 'Gyoza veg', sub: '5 pezzi, verdure', emoji: '🥬', price: 5, tag: 'VEGAN', flags: ['glutine', 'soia'] },
    { id: 'bao', name: 'Bao Buns', sub: '2 panini al vapore', emoji: '🥯', price: 6, tag: 'TOP', flags: ['glutine', 'soia'] },
    { id: 'karaage-bites', name: 'Pollo Karaage', sub: 'Croccante, 6 pezzi', emoji: '🍗', price: 6.5, tag: 'CRUNCH', flags: ['glutine', 'soia'] },
    { id: 'spring-rolls', name: 'Involtini Primavera', sub: '4 pezzi', emoji: '🥠', price: 4.5, tag: 'VEG', flags: ['glutine'] },
    { id: 'edamame-piccanti', name: 'Edamame piccanti', sub: 'Con chili e sale', emoji: '🫛', price: 4, tag: 'VEGAN', flags: ['soia'] },
    { id: 'nuvole', name: 'Nuvole di Drago', sub: 'Chips di wonton croccanti', emoji: '☁️', price: 5.5, tag: 'CRUNCH', flags: ['glutine', 'soia'] },
    { id: 'wonton-fritti', name: 'Wonton Fritti', sub: 'Raviolini fritti con ripieno', emoji: '🥟', price: 6, tag: 'HOT', flags: ['glutine', 'soia'] },
    { id: 'dumplings-fritti', name: 'Dim Sum Fritti', sub: 'Ravioli croccanti, 6 pezzi', emoji: '🥟', price: 6, tag: 'CRUNCH', flags: ['glutine', 'soia'] },
    { id: 'dimsum-curry', name: 'Dim Sum al Curry', sub: 'Ravioli in salsa curry', emoji: '🍛', price: 6.5, tag: 'HOT', flags: ['glutine', 'soia'] },
    { id: 'siu-mai', name: 'Siu Mai', sub: 'Ravioli al vapore, 4 pezzi', emoji: '🥟', price: 5.5, tag: 'TOP', flags: ['glutine', 'soia'] },
    { id: 'dimsum-basket', name: 'Dim Sum Basket', sub: 'Assortimento al vapore', emoji: '🧺', price: 8, tag: 'SHARE', flags: ['glutine', 'soia'] },
    { id: 'har-gow', name: 'Har Gow', sub: 'Ravioli di gambero, 4 pezzi', emoji: '🦐', price: 6.5, tag: 'TOP', flags: ['glutine', 'crostacei'] },
    { id: 'xiao-long-bao', name: 'Xiao Long Bao', sub: 'Bao zuppa, 4 pezzi', emoji: '🥟', price: 7, tag: 'HOT', flags: ['glutine', 'soia'] },
    { id: 'dimsum-quaglia', name: 'Dim Sum Quaglia', sub: 'Ravioli e uova di quaglia', emoji: '🥚', price: 7, tag: 'SPECIAL', flags: ['glutine', 'uova'] },
    { id: 'shumai', name: 'Shumai', sub: 'Ravioli cantonesi al vapore', emoji: '🥟', price: 5.5, tag: 'CLASSIC', flags: ['glutine', 'soia'] },
    { id: 'bao-vapore', name: 'Bao al Vapore', sub: 'Panini soffici, 3 pezzi', emoji: '🥯', price: 5.5, tag: 'VEG', flags: ['glutine'] },
    { id: 'momos', name: 'Momos', sub: 'Ravioli delle montagne, 5 pezzi', emoji: '🥟', price: 5.5, tag: 'STREET', flags: ['glutine', 'soia'] },
    { id: 'dimsum-mix', name: 'Dim Sum Mix', sub: 'Dolci e salati al vapore', emoji: '🧺', price: 8.5, tag: 'SHARE', flags: ['glutine', 'soia'] },
    { id: 'hargow-mix', name: 'Har Gow Mix', sub: 'Selezione gambero e maiale', emoji: '🦐', price: 8, tag: 'SHARE', flags: ['glutine', 'crostacei'] },
    { id: 'shumai-gambero', name: 'Shumai Gambero', sub: 'Ravioli gambero, 4 pezzi', emoji: '🦐', price: 6.5, tag: 'TOP', flags: ['glutine', 'crostacei'] },
    { id: 'tempura-gamberi', name: 'Tempura Gamberi', sub: 'Croccanti, 5 pezzi', emoji: '🍤', price: 7.5, tag: 'CRUNCH', flags: ['glutine', 'crostacei'] },
    { id: 'gamberi-fritti', name: 'Gamberi Croccanti', sub: 'Con salsa agrodolce', emoji: '🍤', price: 7, tag: 'HOT', flags: ['glutine', 'crostacei'] },
    { id: 'chicken-wings', name: 'Ali di Pollo Wok', sub: 'Glassate, 6 pezzi', emoji: '🍗', price: 6.5, tag: 'HOT', flags: ['soia'] },
    { id: 'misto-box', name: 'Snack Box Misto', sub: 'Gyoza, edamame e croccanti', emoji: '🥡', price: 9.5, tag: 'SHARE', flags: ['glutine', 'soia'] },
    { id: 'sate-ayam', name: 'Sate Ayam', sub: 'Spiedini indonesiani, salsa arachidi', emoji: '🍢', price: 6.5, tag: 'INDONESIA', flags: ['arachidi', 'soia'] },
    { id: 'mango-sticky', name: 'Mango Sticky Rice', sub: 'Riso glutinoso, mango e cocco', emoji: '🥭', price: 5.5, tag: 'DOLCE', flags: [] },
    { id: 'pisang-goreng', name: 'Pisang Goreng', sub: 'Banana fritta croccante', emoji: '🍌', price: 4.5, tag: 'DOLCE', flags: ['glutine'] },
    { id: 'tod-mun-pla', name: 'Tod Mun Pla', sub: 'Polpette di pesce thai', emoji: '🐟', price: 6, tag: 'THAILANDIA', flags: ['glutine', 'soia'] },
    { id: 'tempe-fritti', name: 'Tempe Fritti', sub: 'Frittelle di tempeh e sambal', emoji: '🫘', price: 5.5, tag: 'VEGAN', flags: ['soia', 'glutine'] }
  ];
  const BITES_DRINK = [
    { id: 'bubble-tea', name: 'Bubble Tea', sub: 'Taro / mango / matcha', emoji: '🧋', price: 5.5, tag: 'BEST', flags: [] },
    { id: 'te-freddo', name: 'Tè freddo artigianale', sub: 'Asiatico, 4 gusti', emoji: '🍵', price: 3.5, tag: 'FRESH', flags: [] },
    { id: 'birra-asia', name: 'Birra asiatica', sub: 'Lager / rice beer', emoji: '🍺', price: 4.5, tag: '18+', flags: ['glutine'] },
    { id: 'soft', name: 'Soft drink', sub: 'Classici e orientali', emoji: '🥤', price: 2.5, tag: 'FIZZY', flags: [] }
  ];
  const ALLERGENS = ['glutine', 'soia', 'uova', 'crostacei', 'pesce', 'arachidi', 'frutta a guscio', 'sesamo'];

  /* foto reali (Pexels, salvate in assets/) — una foto per famiglia di ingredienti */
  const PHOTOS = {
    classic: 'mix-01', xl: 'mix-05', fit: 'mix-12', soup: 'mix-04',
    miso: 'ing-noodles', lemongrass: 'ing-chili', umami: 'ing-beef',
    'egg-noodles': 'ing-noodles', 'whole-wheat': 'ing-noodles', 'rice-noodles': 'ing-noodles',
    udon: 'ing-noodles', jasmine: 'ing-noodles', 'brown-quinoa': 'ing-veggies',
    'veggie-mix': 'ing-veggies', konjac: 'ing-veggies',
    pollo: 'ing-chicken', teriyaki: 'ing-chicken', karaage: 'ing-chicken',
    manzo: 'ing-beef', 'char-siu': 'ing-beef', gamberi: 'ing-shrimp',
    tofu: 'ing-tofu', tempeh: 'ing-tofu', edamame: 'ing-veggies', 'uovo-extra': 'ing-eggs',
    'pak-choi': 'ing-veggies', broccoli: 'ing-broccoli', champignon: 'ing-veggies',
    shiitake: 'ing-veggies', peperoni: 'ing-veggies', 'baby-corn': 'ing-veggies',
    germogli: 'ing-veggies', zucchine: 'ing-veggies', cipollotto: 'ing-veggies', ananas: 'ing-veggies', carote: 'ing-veggies',
    tokyo: 'ing-noodles', hongkong: 'ing-chili', saigon: 'ing-chili', beijing: 'ing-noodles',
    bangkok: 'ing-chili', seoul: 'ing-chili', sichuan: 'ing-chili', kungpao: 'ing-peanuts',
    mango: 'ing-chili', satay: 'ing-peanuts', sweetchili: 'ing-chili', zero: 'ing-veggies',
    cocco: 'ing-tofu', 'curry-rosso': 'ing-chili', 'curry-verde': 'ing-broccoli',
    'curry-giallo': 'ing-tofu', 'curry-giapponese': 'ing-noodles', massala: 'ing-chili',
    sriracha: 'ing-chili', hoisin: 'ing-beef', unagi: 'ing-shrimp', ponzu: 'ing-chili',
    tamarindo: 'ing-chili', 'sesamo-miele': 'ing-peanuts', yuzu: 'ing-veggies', shoyu: 'ing-noodles',
    sesamo: 'top-sesamo', 'cipolla-cr': 'top-cipolla', 'aglio-cr': 'top-aglio',
    arachidi: 'top-arachidi', anacardi: 'top-anacardi', coriandolo: 'top-coriandolo',
    lime: 'top-lime', nori: 'top-nori', jalapenos: 'top-jalapeno', 'zenzero-rosa': 'top-zenzero'
  };
  const SIG_PHOTOS = {
    'trastevere-fire': 'brand-fire.webp', 'gym-bro': 'mix-06.jpg',
    'green-zen': 'brand-mushroom.webp', 'seoul-street': 'brand-shrimp.webp',
    'student-combo': 'brand-classic.webp', 'notturna': 'mix-07.jpg',
    'pad-thai': 'special-pad-thai-new.jpg', 'yakisoba': 'special-yakisoba.jpg',
    'teriyaki-rice': 'special-teriyaki-rice.jpg', 'udon-gamberi': 'special-udon-gamberi.jpg',
    'wok-pollo-verdure': 'special-wok-pollo-verdure.jpg',
    'pad-thai-grigliato': 'special-pollo-grigliato.jpg', 'combo-fastwok': 'sig-wok-box.webp',
    'pad-thai-gamberi': 'sig-pad-thai-gamberi-hq.jpg', 'drunken-noodles': 'sig-drunken-noodles-hq.jpg',
    'yaki-udon': 'sig-yaki-udon-hq.jpg', 'egg-noodles-pollo': 'sig-egg-noodles-pollo-hq.jpg',
    'jasmine-rice': 'sig-jasmine-rice-hq.jpg', 'green-curry-tofu': 'sig-green-curry-tofu-hq.jpg',
    'riso-fritto-box': 'sig-riso-fritto-box.jpg', 'veggie-wok-box': 'sig-veggie-wok-box.jpg'
  };
  const BITE_PHOTOS = {
    'gyoza-pollo': 'bite-gyoza-pollo', 'gyoza-veg': 'bite-gyoza-veg', bao: 'bite-bao',
    'karaage-bites': 'bite-karaage', 'spring-rolls': 'bite-spring-rolls',
    'edamame-piccanti': 'bite-edamame', nuvole: 'bite-nuvole', 'wonton-fritti': 'bite-wonton-fritti',
    'dumplings-fritti': 'snack-dumplings-fritti', 'dimsum-curry': 'snack-dimsum-curry', 'siu-mai': 'snack-siu-mai',
    'dimsum-basket': 'snack-dimsum-basket', 'har-gow': 'snack-har-gow', 'xiao-long-bao': 'snack-xiao-long-bao',
    'dimsum-quaglia': 'snack-dimsum-quaglia', shumai: 'snack-shumai', 'bao-vapore': 'snack-bao-vapore',
    momos: 'snack-momos', 'dimsum-mix': 'snack-dimsum-mix', 'hargow-mix': 'snack-hargow-mix',
    'shumai-gambero': 'snack-shumai-gambero', 'tempura-gamberi': 'snack-tempura-gamberi',
    'gamberi-fritti': 'snack-gamberi-fritti', 'chicken-wings': 'snack-chicken-wings', 'misto-box': 'snack-misto-box',
    'sate-ayam': 'snack-sate-ayam', 'mango-sticky': 'snack-mango-sticky', 'pisang-goreng': 'snack-pisang-goreng',
    'tod-mun-pla': 'snack-tod-mun-pla', 'tempe-fritti': 'snack-tempe-fritti',
    'bubble-tea': 'drink-bubble-tea', 'te-freddo': 'drink-te-freddo',
    'birra-asia': 'drink-birra', soft: 'drink-soft'
  };

  /* ingredienti mostrati nel lightbox */
  const BITE_INGREDIENTS = {
    'gyoza-pollo': ['Pasta di grano', 'Pollo', 'Cavolo', 'Cipollotto', 'Salsa di soia'],
    'gyoza-veg': ['Pasta di grano', 'Cavolo', 'Carote', 'Shiitake', 'Salsa di soia'],
    bao: ['Pane al vapore', 'Pollo', 'Cetrioli', 'Corriandolo', 'Salsa hoisin'],
    'karaage-bites': ['Pollo', 'Fecola', 'Aglio', 'Zenzero', 'Salsa di soia'],
    'spring-rolls': ['Pasta fillo', 'Verdure', 'Germogli', 'Salsa agrodolce'],
    'edamame-piccanti': ['Edamame', 'Chili', 'Aglio', 'Sale marino', 'Olio di sesamo'],
    nuvole: ['Sfoglie di wonton', 'Olio per friggere', 'Sale', 'Salsa agrodolce'],
    'wonton-fritti': ['Pasta wonton', 'Pollo', 'Verdure', 'Salsa di soia'],
    'dumplings-fritti': ['Pasta di grano', 'Carne', 'Cavolo', 'Cipollotto', 'Salsa di soia'],
    'dimsum-curry': ['Ravioli al vapore', 'Curry giallo', 'Latte di cocco', 'Verdure'],
    'siu-mai': ['Pasta di grano', 'Maiale', 'Gamberi', 'Shiitake', 'Sesamo'],
    'dimsum-basket': ['Ravioli al vapore', 'Bao', 'Pollo', 'Verdure', 'Salsa di soia'],
    'har-gow': ['Pasta di riso', 'Gamberi', 'Bambù', 'Corriandolo'],
    'xiao-long-bao': ['Pasta al vapore', 'Maiale', 'Brodo', 'Cipollotto', 'Zenzero'],
    'dimsum-quaglia': ['Ravioli al vapore', 'Uova di quaglia', 'Maiale', 'Erbe aromatiche'],
    shumai: ['Pasta di grano', 'Maiale', 'Gamberi', 'Cipollotto'],
    'bao-vapore': ['Pane al vapore', 'Verdure', 'Salsa hoisin', 'Corriandolo'],
    momos: ['Pasta di grano', 'Pollo o verdure', 'Cavolo', 'Salsa chili'],
    'dimsum-mix': ['Ravioli al vapore', 'Torte di riso', 'Sesamo nero', 'Salsa di soia'],
    'hargow-mix': ['Ravioli di gambero', 'Maiale', 'Bambù', 'Corriandolo'],
    'shumai-gambero': ['Pasta di grano', 'Gamberi', 'Pesce', 'Cipollotto', 'Sesamo'],
    'tempura-gamberi': ['Gamberi', 'Pastella tempura', 'Olio', 'Sale', 'Salsa tentsuyu'],
    'gamberi-fritti': ['Gamberi', 'Panko', 'Uovo', 'Salsa agrodolce'],
    'chicken-wings': ['Ali di pollo', 'Salsa teriyaki', 'Sesamo', 'Cipollotto'],
    'misto-box': ['Gyoza', 'Edamame', 'Cipolla croccante', 'Salsa di soia'],
    'bubble-tea': ['Tè', 'Latte', 'Perle di tapioca', 'Sciroppo'],
    'te-freddo': ['Tè asiatico', 'Ghiaccio', 'Limone', 'Zucchero'],
    'birra-asia': ['Lager asiatica', 'Malto', 'Luppolo'],
    soft: ['Bevanda gassata', 'Ghiaccio', 'Limone'],
    'sate-ayam': ['Pollo', 'Spiedini di legno', 'Salsa di arachidi', 'Cetrioli', 'Cipolla'],
    'mango-sticky': ['Riso glutinoso', 'Mango', 'Latte di cocco', 'Zucchero di palma', 'Sesamo'],
    'pisang-goreng': ['Banana', 'Farina di riso', 'Zucchero', 'Olio per friggere'],
    'tod-mun-pla': ['Pesce', 'Pasta di riso', 'Fagiolini', 'Kaffir lime', 'Salsa chili'],
    'tempe-fritti': ['Tempeh', 'Sambal', 'Farina', 'Erbe aromatiche']
  };
  const GALLERY_INGREDIENTS = {
    'Broccoli Wok': ['Noodles', 'Broccoli', 'Aglio', 'Salsa di soia', 'Sesamo'],
    'Crunch Box': ['Rice noodles', 'Verdure croccanti', 'Arachidi', 'Salsa Sweet Chili'],
    'Shrimp Fire': ['Gamberi', 'Noodles', 'Chili', 'Peperoni', 'Lime'],
    'Rice Mixed': ['Riso jasmine', 'Pollo', 'Uovo', 'Verdure', 'Sesamo'],
    'Lime Noodle': ['Noodles', 'Lime', 'Corriandolo', 'Cipollotto', 'Salsa Saigon'],
    'Street Special': ['Gamberi', 'Riso', 'Verdure', 'Salsa agrodolce', 'Sesamo']
  };

  function imgTag(file, cls, extra) {
    return `<img class="${cls}" src="assets/${file}.jpg" alt="" loading="lazy" ${extra || ''}>`;
  }

  /* ---------------- STATE ---------------- */
  const DEFAULTS = {
    format: 'classic', soup: 'miso', base: 'egg-noodles', eggMode: 'standard',
    proteins: [], veggies: [], sauces: ['tokyo'], spice: 1, toppings: [], name: ''
  };
  let state = clone(DEFAULTS);
  let currentStep = 0;
  let sauceTab = 'classic';
  let bitesTab = 'food';
  let cart = [];
  let activeFilters = new Set();
  let quickFilters = new Set();
  let lang = 'it';
  try { lang = localStorage.getItem('fw-lang') || 'it'; } catch (e) {}

  /* icone SVG coerenti (niente emoji nell'UI) */
  const ICONS = {
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6"/>',
    dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/>',
    infinity: '<path d="M6.5 8c-3 0-4.5 2-4.5 4s1.5 4 4.5 4c4 0 5.5-8 11-8 3 0 4.5 2 4.5 4s-1.5 4-4.5 4c-4 0-5.5-8-11-8z"/>',
    leaf: '<path d="M20 4C11 4 5 9 5 16c0 2 1 4 1 4s8-1 12-6c3-4 2-10 2-10z"/><path d="M4 21c2-5 6-9 11-12"/>',
    shield: '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-9 0 3-2 4-3 5-1-2-1-4-1-6-3 3-6 6-6 10 0 4 3 7 7 7z"/>',
    heart: '<path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 00-7.1 7.1L12 21l8.8-8.3a5 5 0 000-7.1z"/>',
    pin: '<path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.flame) + '</svg>';
  }
  function hydrateIcons() {
    $$('.ico[data-icon]').forEach(el => { if (!el.dataset.done) { el.innerHTML = iconSvg(el.dataset.icon); el.dataset.done = '1'; } });
  }
  function tr(s) { return lang === 'en' && window.t ? window.t(s) : s; }

  /* ---------------- HELPERS ---------------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function get(arr, id) { return arr.find(x => String(x.id) === String(id)); }
  function money(n) { return '€' + n.toFixed(2); }
  function esc(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
  function $ (sel) { return document.querySelector(sel); }
  function $$ (sel) { return Array.from(document.querySelectorAll(sel)); }
  function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function sample(arr, min, max) {
    const n = min + Math.floor(Math.random() * (max - min + 1));
    const pool = arr.slice();
    const out = [];
    for (let i = 0; i < n && pool.length; i++) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    return out;
  }

  /* ---------------- CALC ---------------- */
  function calc(cfg) {
    cfg = cfg || state;
    const fmt = get(FORMATS, cfg.format) || FORMATS[0];
    let price = fmt.price, kcal = 0, pro = 0, carbs = 0, fat = 0;
    const allergens = new Set();
    let animal = false, meatFish = false;
    const add = it => {
      if (!it) return;
      price += it.price || 0; kcal += it.kcal || 0; pro += it.pro || 0;
      carbs += it.carbs || 0; fat += it.fat || 0;
      (it.allergens || []).forEach(a => allergens.add(a));
      if (it.animal) animal = true;
      if (it.meatFish) meatFish = true;
    };

    const base = get(BASES, cfg.base);
    if (base) {
      const b = Object.assign({}, base, {
        price: base.price, kcal: base.kcal * fmt.mult, pro: base.pro * fmt.mult,
        carbs: (fmt.id === 'fit' ? base.carbs * 0.55 : base.carbs * fmt.mult),
        fat: base.fat * fmt.mult
      });
      if (fmt.id === 'fit') b.pro += 8;
      add(b);
    }
    if (fmt.id === 'soup') add(get(SOUPS, cfg.soup));
    if (cfg.eggMode === 'standard') add({ price: 1, kcal: 70, pro: 6, carbs: 1, fat: 5, allergens: ['uova'], animal: true });

    (cfg.proteins || []).forEach(id => add(get(PROTEINS, id)));
    (cfg.veggies || []).forEach(id => add(get(VEGGIES, id)));
    (cfg.sauces || []).forEach(id => add(get(SAUCES, id)));
    if ((cfg.sauces || []).length > 1) price += 0.5;
    (cfg.toppings || []).forEach(id => add(get(TOPPINGS, id)));
    if (cfg.spice === 3) add({ price: 0, kcal: 30, pro: 0, carbs: 1, fat: 3 });

    kcal = Math.round(kcal); pro = Math.round(pro); carbs = Math.round(carbs); fat = Math.round(fat);
    price = Math.round(price * 100) / 100;

    const badges = [];
    if (!animal) badges.push({ cls: 'vegan', text: '🌱 VEGAN' });
    else if (!meatFish) badges.push({ cls: 'veg', text: '🥬 VEGETARIAN' });
    if (pro >= 35) badges.push({ cls: 'protein', text: '💪 HIGH-PROTEIN' });
    if (carbs < 35) badges.push({ cls: 'lowcarb', text: '⚡ LOW-CARB' });
    if (base && base.gf && !allergens.has('glutine')) badges.push({ cls: 'gf', text: 'GF OPTION' });

    const sp = get(SPICE, cfg.spice) || SPICE[0];
    return { price, kcal, pro, carbs, fat, allergens, badges, spice: sp, fmt };
  }

  /* ---------------- RENDER OPTIONS ---------------- */
  function optCard(it, kind, selected) {
    const flags = [];
    if (it.gf) flags.push('<span class="flag gf">GF</span>');
    if (it.vegan) flags.push('<span class="flag">VEGAN</span>');
    if (it.sub) flags.push('<span class="flag">' + esc(tr(it.sub)) + '</span>');
    const photo = PHOTOS[it.id] || (kind === 'spice' && it.id > 0 ? 'ing-chili' : null);
    const ico = photo
      ? `<span class="opt-ico"><img class="opt-img" src="assets/${photo}.jpg" alt="" loading="lazy" onload="this.nextElementSibling.style.display='none'" onerror="this.style.display='none'"><span class="opt-emoji">${it.icon || ''}</span></span>`
      : `<span class="opt-ico emoji-only"><span class="opt-emoji">${it.icon || ''}</span></span>`;
    return `<button class="opt${selected ? ' selected' : ''}" data-kind="${kind}" data-id="${esc(it.id)}" aria-pressed="${selected}">
      ${it.tag ? `<span class="opt-tag">${esc(it.tag)}</span>` : ''}
      ${ico}
      <span class="opt-name">${esc(tr(it.name))}</span>
      ${flags.length ? `<span class="opt-flags">${flags.join('')}</span>` : ''}
      <span class="opt-price">${it.price ? '+' + money(it.price) : tr('incluso')}</span>
    </button>`;
  }
  function isSel(kind, id) {
    switch (kind) {
      case 'format': return state.format === id;
      case 'soup': return state.soup === id;
      case 'base': return state.base === id;
      case 'protein': return state.proteins.includes(id);
      case 'veggie': return state.veggies.includes(id);
      case 'sauce': return state.sauces.includes(id);
      case 'topping': return state.toppings.includes(id);
      default: return false;
    }
  }
  function renderGrid(sel, arr, kind) {
    const el = $(sel);
    if (el) el.innerHTML = arr.map(it => optCard(it, kind, isSel(kind, it.id))).join('');
  }
  function renderSpice() {
    $('#step3-spice').innerHTML = SPICE.map(s => `<button class="spice-opt${state.spice === s.id ? ' selected' : ''}" data-kind="spice" data-id="${s.id}" aria-pressed="${state.spice === s.id}">
      <span class="flames">${'🔥'.repeat(s.flames) || s.icon}</span>
      <strong>${esc(s.name)}</strong><small>${esc(s.desc)}</small>
    </button>`).join('');
  }
  function renderAllOptions() {
    renderGrid('#step0-formats', FORMATS, 'format');
    renderGrid('#step0-soups', SOUPS, 'soup');
    $('#soupBlock').hidden = state.format !== 'soup';
    renderGrid('#step1-bases', BASES, 'base');
    renderGrid('#step2-proteins', PROTEINS, 'protein');
    renderGrid('#step2-veggies', VEGGIES, 'veggie');
    renderGrid('#step3-sauces', SAUCES.filter(s => s.group === sauceTab), 'sauce');
    renderGrid('#step4-toppings', TOPPINGS, 'topping');
    renderSpice();
    $$('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === state.eggMode));
    $('#mashupNote').textContent = state.sauces.length > 1 ? '✅ Mashup attivo (+€0.50) — ' + state.sauces.length + ' salse' : '💡 Scegli 2 salse per il mashup (+€0.50)';
  }

  /* ---------------- SUMMARY ---------------- */
  function renderSummary() {
    const r = calc();
    $('#totalPrice').textContent = money(r.price);
    $('#mobilePrice').textContent = money(r.price);
    $('#macroKcal').textContent = r.kcal;
    $('#macroProt').textContent = r.pro + 'g';
    $('#macroCarb').textContent = r.carbs + 'g';
    $('#macroFat').textContent = r.fat + 'g';
    $('#macroBars').innerHTML = `
      <div class="mbar" title="Kcal"><i style="width:${Math.min(100, r.kcal / 12)}%;background:var(--flame)"></i></div>
      <div class="mbar" title="Proteine"><i style="width:${Math.min(100, r.pro * 2)}%;background:var(--yellow)"></i></div>
      <div class="mbar" title="Carboidrati"><i style="width:${Math.min(100, r.carbs * 1.4)}%;background:var(--blue)"></i></div>
      <div class="mbar" title="Grassi"><i style="width:${Math.min(100, r.fat * 3)}%;background:var(--lime)"></i></div>`;
    $('#spiceDisplay').innerHTML = `<span class="sl">${esc(r.spice.name.toUpperCase())}</span>` +
      [0, 1, 2].map(i => `<span class="sf${state.spice >= i + 1 ? ' on' : ''}">🔥</span>`).join('');
    $('#dietBadges').innerHTML = r.badges.length ? r.badges.map(b => `<span class="badge ${b.cls}">${esc(tr(b.text))}</span>`).join('') : '<span class="none" style="font-size:.75rem;color:var(--muted)">' + tr('Nessun badge') + '</span>';
    $('#allergenChips').innerHTML = r.allergens.size
      ? Array.from(r.allergens).map(a => `<span class="allergen-chip">⚠ ${esc(a)}</span>`).join('')
      : '<span class="none">Nessuno rilevato</span>';

    const icons = [];
    const fmt = get(FORMATS, state.format);
    if (fmt) icons.push(fmt.icon);
    const base = get(BASES, state.base); if (base) icons.push(base.icon);
    if (state.eggMode === 'standard') icons.push('🥚');
    state.proteins.forEach(id => { const p = get(PROTEINS, id); if (p) icons.push(p.icon); });
    state.veggies.forEach(id => { const v = get(VEGGIES, id); if (v) icons.push(v.icon); });
    state.sauces.forEach(id => { const s = get(SAUCES, id); if (s) icons.push(s.icon); });
    state.toppings.forEach(id => { const t = get(TOPPINGS, id); if (t) icons.push(t.icon); });
    $('#bowlPreview').innerHTML = icons.slice(0, 16).map((ic, i) => `<span style="animation-delay:${i * 25}ms">${ic}</span>`).join('');

    const nm = state.name.trim() || 'Senza nome';
    $('#bowlNameDisplay').textContent = nm;
  }

  /* ---------------- STEPS ---------------- */
  function goStep(n) {
    currentStep = Math.max(0, Math.min(4, n));
    $$('.step-panel').forEach(p => p.classList.toggle('active', +p.dataset.step === currentStep));
    $$('#stepper li').forEach(li => {
      const i = +li.dataset.goto;
      li.classList.toggle('active', i === currentStep);
      li.classList.toggle('done', i < currentStep);
      const lbl = li.querySelector('.step-label');
      if (lbl && !lbl.dataset.base) lbl.dataset.base = lbl.textContent;
      if (lbl) lbl.textContent = (i + 1) + '/5 · ' + tr(lbl.dataset.base || lbl.textContent);
    });
    const fill = $('#stepProgressFill'); if (fill) fill.style.width = ((currentStep + 1) * 20) + '%';
    $('#prevStep').disabled = currentStep === 0;
    $('#nextStep').textContent = currentStep === 4 ? tr('✅ Ho finito') : tr('Avanti') + ' →';
  }

  /* ---------------- SELECTION ---------------- */
  function toggleOption(kind, id) {
    if (kind === 'spice') { state.spice = +id; }
    else if (kind === 'format') { state.format = id; }
    else if (kind === 'soup') { state.soup = id; }
    else if (kind === 'base') { state.base = id; }
    else {
      const key = kind === 'protein' ? 'proteins' : kind === 'veggie' ? 'veggies' : kind === 'sauce' ? 'sauces' : 'toppings';
      const arr = state[key];
      const idx = arr.indexOf(id);
      if (kind === 'sauce') {
        if (id === 'zero') { state.sauces = ['zero']; }
        else {
          state.sauces = state.sauces.filter(s => s !== 'zero');
          const i2 = state.sauces.indexOf(id);
          if (i2 >= 0) state.sauces.splice(i2, 1);
          else if (state.sauces.length >= 2) { toast('Max 2 salse per il mashup! 🔥', '⚠️'); return; }
          else state.sauces.push(id);
        }
      } else {
        if (idx >= 0) arr.splice(idx, 1); else arr.push(id);
      }
    }
    renderAllOptions(); renderSummary();
  }

  /* ---------------- SPIN ---------------- */
  function spinWok(scrollToBuilder) {
    const ov = $('#spinOverlay');
    ov.classList.add('show');
    $('#spinEmoji').textContent = '🎲';
    $('#spinText').textContent = 'Stiamo girando il wok…';
    const bar = $('.spin-bar-fill');
    bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    const emojis = ['🥡', '🍜', '🔥', '🍗', '🌶️', '🥢'];
    let k = 0;
    const tic = setInterval(() => { $('#spinEmoji').textContent = emojis[k++ % emojis.length]; }, 130);
    setTimeout(() => {
      clearInterval(tic);
      const adj = rnd(['Notturna', 'Veloce', 'Furiosa', 'Verde', 'Bollente', 'Segreta', 'Ribelle', 'Lampo', 'Explosive']);
      const place = rnd(['San Lorenzo', 'Trastevere', 'Roma', 'Monti', 'Porta Furba', 'Testaccio']);
      state = {
        format: rnd(FORMATS).id, soup: rnd(SOUPS).id, base: rnd(BASES).id,
        eggMode: Math.random() < .5 ? 'standard' : 'plant',
        proteins: sample(PROTEINS, 1, 3).map(p => p.id),
        veggies: sample(VEGGIES, 2, 4).map(v => v.id),
        sauces: sample(SAUCES.filter(s => s.id !== 'zero'), 1, 2).map(s => s.id),
        spice: Math.floor(Math.random() * 4),
        toppings: sample(TOPPINGS, 1, 3).map(t => t.id),
        name: 'La ' + adj + ' di ' + place
      };
      $('#bowlName').value = state.name;
      renderAllOptions(); renderSummary(); goStep(0);
      $('#spinEmoji').textContent = '🔥';
      $('#spinText').textContent = state.name.toUpperCase() + ' — PRONTA!';
      setTimeout(() => {
        ov.classList.remove('show');
        toast('Wok girato! Ecco la tua ' + state.name + ' 🎲', '🔥');
        if (scrollToBuilder) { $('#builder').scrollIntoView({ behavior: 'smooth' }); openSummaryOnMobile(); }
      }, 750);
    }, 1300);
  }

  function randomBalanced(scroll) { spinWok(scroll); }

  /* ---------------- SIGNATURES ---------------- */
  function renderSignatures() {
    $('#signatureGrid').innerHTML = SIGNATURES.map(s => `<article class="sig-card" data-sig="${s.id}">
      <div class="sig-top"><span class="sig-photo-wrap"><img src="assets/${SIG_PHOTOS[s.id]}" alt="${esc(tr(s.name))}" loading="lazy"><span class="sig-photo-emoji">${s.emoji}</span></span><div><div class="sig-title">${esc(tr(s.name))}</div><span class="sig-tag ${s.tagClass}">${esc(tr(s.tag))}</span></div></div>
      <p class="sig-desc">${esc(tr(s.desc))}</p>
      <div class="sig-tags">${s.chips.map(c => `<span>${esc(tr(c))}</span>`).join('')}</div>
      <div class="sig-bottom"><span class="sig-price">${money(s.price)}</span>
        <div class="sig-actions">
          <button class="btn btn-outline" data-act="customize" data-id="${s.id}">Personalizza</button>
          <button class="btn btn-lime" data-act="order" data-id="${s.id}">Ordina →</button>
        </div>
      </div>
    </article>`).join('');
  }

  /* ---------------- BITES ---------------- */
  function renderBites() {
    const arr = bitesTab === 'food' ? BITES_FOOD : BITES_DRINK;
    $('#bitesGrid').innerHTML = arr.map(b => {
      const hot = b.tag === 'HOT' || b.tag === 'PICCANTE';
      return `<article class="bite" data-id="${b.id}" data-flags="${(b.flags || []).join(',')}">
        <span class="bite-tag${hot ? ' hot' : ''}">${esc(b.tag)}</span>
        <div class="bite-photo">${imgTag(BITE_PHOTOS[b.id], '', '')}</div>
        <h4>${esc(tr(b.name))}</h4><p>${esc(tr(b.sub))}</p>
        <div class="bite-flags">${(b.flags || []).map(f => `<span>⚠ ${esc(f)}</span>`).join('')}</div>
        <div class="bite-foot"><span class="bite-price">${money(b.price)}</span>
          <button class="bite-add" data-act="bite" data-id="${b.id}" aria-label="Aggiungi ${esc(b.name)}">+</button>
        </div>
      </article>`;
    }).join('');
    applyFilters();
  }

  /* ---------------- FILTERS ---------------- */
  function renderFilters() {
    $('#allergenFilters').innerHTML = ALLERGENS.map(a => `<button class="allergen-filter" data-filter="${a}" aria-pressed="false">${esc(a)}</button>`).join('');
  }
  function applyFilters() {
    const cards = $$('.bite, .sig-card');
    if (!activeFilters.size) {
      cards.forEach(c => c.classList.remove('filtered-out', 'filtered-hit'));
      $('#filterResult').textContent = 'Nessun filtro attivo — tutto il menu è show.';
      return;
    }
    let hits = 0;
    cards.forEach(c => {
      const flags = (c.dataset.flags || '').split(',').filter(Boolean);
      const sig = SIGNATURES.find(s => s.id === c.dataset.sig);
      let list = flags;
      if (sig) {
        const r = calc(sig.config);
        list = Array.from(r.allergens);
      }
      const match = Array.from(activeFilters).some(f => list.includes(f));
      c.classList.toggle('filtered-hit', match);
      c.classList.toggle('filtered-out', !match);
      if (match) hits++;
    });
    $('#filterResult').textContent = `⚠ ${hits} piatti contengono: ${Array.from(activeFilters).join(', ')}`;
  }

  /* ---------------- CART ---------------- */
  function addCart(item) {
    item.qty = item.qty || 1;
    cart.push(item);
    saveCart(); renderCart();
    toast(item.name + ' ' + tr('aggiunto al carrello!') , '✅');
  }
  function renderCart() {
    const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
    $('#cartCount').textContent = count;
    const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    $('#cartTotal').textContent = money(Math.round(total * 100) / 100);
    $('#cartItems').innerHTML = cart.length
      ? cart.map((it, i) => `<div class="cart-item">
          <button class="ci-remove" data-remove="${i}" aria-label="Rimuovi">✕</button>
          <h4>${esc(it.name)}</h4><div class="ci-meta">${esc(it.meta || 'Wok personalizzato')}</div>
          <div class="cart-item-line"><span class="ci-price">${money(it.price * (it.qty || 1))}</span>
            <span class="qty"><button data-qty="${i}" data-d="-1" aria-label="Meno">−</button><span>${it.qty || 1}</span><button data-qty="${i}" data-d="1" aria-label="Più">+</button></span>
          </div>
        </div>`).join('')
      : '<p class="empty-cart">' + tr('Carrello vuoto. Ma non per lungo… 🔥') + '</p>';
  }
  function openCart() {
    $('#cartDrawer').classList.add('open');
    $('#cartDrawer').setAttribute('aria-hidden', 'false');
    $('#drawerBackdrop').hidden = false;
    requestAnimationFrame(() => $('#drawerBackdrop').classList.add('show'));
  }
  function closeCart() {
    $('#cartDrawer').classList.remove('open');
    $('#cartDrawer').setAttribute('aria-hidden', 'true');
    $('#drawerBackdrop').classList.remove('show');
    setTimeout(() => { $('#drawerBackdrop').hidden = true; }, 300);
  }

  /* ---------------- SWEETS & DRINKS ---------------- */
  const SWEETS = [
    { id: 'sw-mango', name: 'Mango Sticky Rice', sub: 'Riso glutinoso, mango e cocco', price: 5.5, photo: 'snack-mango-sticky', cat: 'Dolci', flags: [] },
    { id: 'sw-pisang', name: 'Pisang Goreng', sub: 'Banana fritta croccante', price: 4.5, photo: 'snack-pisang-goreng', cat: 'Dolci', flags: ['glutine'] },
    { id: 'sw-bubble', name: 'Bubble Tea', sub: 'Taro / mango / matcha', price: 5.5, photo: 'drink-bubble-tea', cat: 'Bevande', flags: [] },
    { id: 'sw-tea', name: 'Tè freddo thai', sub: 'Asiatico, 4 gusti', price: 3.5, photo: 'drink-te-freddo', cat: 'Bevande', flags: [] },
    { id: 'sw-beer', name: 'Birra asiatica', sub: 'Lager / rice beer', price: 4.5, photo: 'drink-birra', cat: 'Bevande', flags: ['glutine'] },
    { id: 'sw-soft', name: 'Soft drink', sub: 'Classici e orientali', price: 2.5, photo: 'drink-soft', cat: 'Bevande', flags: [] }
  ];
  function renderSweets() {
    const el = $('#sweetsGrid'); if (!el) return;
    el.innerHTML = SWEETS.map(s => `<article class="sweet" data-flags="${(s.flags||[]).join(',')}">
      <img src="assets/${s.photo}.jpg" alt="${esc(tr(s.name))}" loading="lazy">
      <div class="sweet-body">
        <span class="sig-tag ${s.cat === 'Dolci' ? 'green' : ''}">${tr(s.cat)}</span>
        <h4>${esc(tr(s.name))}</h4><p>${esc(tr(s.sub))}</p>
        <div class="sweet-foot"><span class="sweet-price">${money(s.price)}</span>
          <button class="bite-add" data-act="sweet" data-id="${s.id}" aria-label="Aggiungi ${esc(tr(s.name))}">+</button>
        </div>
      </div>
    </article>`).join('');
  }

  /* ---------------- QUICK FILTERS ---------------- */
  const NON_HALAL = ['char-siu', 'unagi', 'hoisin'];
  function optionAllowed(kind, it) {
    if (quickFilters.has('vegan')) {
      if (it.animal || it.meatFish) return false;
      if (kind === 'base' && it.id === 'egg-noodles') return false;
    }
    if (quickFilters.has('halal') && NON_HALAL.indexOf(it.id) >= 0) return false;
    if (quickFilters.has('protein') && kind === 'protein' && (it.pro || 0) < 10) return false;
    if (quickFilters.has('lowcarb') && kind === 'base' && (it.carbs || 0) > 20) return false;
    return true;
  }
  function applyQuickFilters() {
    $$('#signatureGrid .sig-card').forEach(card => {
      const s = get(SIGNATURES, card.dataset.sig); if (!s) return;
      const r = calc(s.config);
      let ok = true;
      if (quickFilters.has('vegan') && !r.badges.some(b => b.cls === 'vegan')) ok = false;
      if (quickFilters.has('protein') && r.pro < 35) ok = false;
      if (quickFilters.has('lowcarb') && r.carbs >= 35) ok = false;
      if (quickFilters.has('halal')) {
        const bad = s.config.proteins.some(id => NON_HALAL.indexOf(id) >= 0) ||
                    s.config.sauces.some(id => NON_HALAL.indexOf(id) >= 0) ||
                    s.config.toppings.some(id => NON_HALAL.indexOf(id) >= 0);
        if (bad) ok = false;
      }
      card.classList.toggle('filtered-out', !ok);
    });
    $$('#step0-formats .opt, #step0-soups .opt, #step1-bases .opt, #step2-proteins .opt, #step2-veggies .opt, #step3-sauces .opt, #step4-toppings .opt').forEach(el => {
      const kind = el.dataset.kind, id = el.dataset.id;
      const list = kind === 'format' ? FORMATS : kind === 'soup' ? SOUPS : kind === 'base' ? BASES :
                   kind === 'protein' ? PROTEINS : kind === 'veggie' ? VEGGIES : kind === 'sauce' ? SAUCES : TOPPINGS;
      const it = get(list, id);
      el.classList.toggle('filtered-out', !!(it && !optionAllowed(kind, it)));
    });
  }

  /* ---------------- SAVED BOWLS ---------------- */
  function savedStore() {
    try { return JSON.parse(localStorage.getItem('fw-saved') || '{}'); } catch (e) { return {}; }
  }
  function savedEmail() { return ($('#savedEmail') && $('#savedEmail').value.trim().toLowerCase()) || ''; }
  function saveCurrentBowl() {
    const email = savedEmail();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast(tr('Inserisci la tua email'), '⚠️'); return; }
    const store = savedStore();
    const list = store[email] || [];
    const nm = state.name.trim() || ('Bowl ' + (list.length + 1));
    list.unshift({ id: 'b' + Date.now(), name: nm, cfg: clone(state), price: calc().price });
    store[email] = list.slice(0, 20);
    try { localStorage.setItem('fw-saved', JSON.stringify(store)); } catch (e) {}
    renderSaved(); toast(tr('Bowl salvata! 💾'), '✅');
  }
  function renderSaved() {
    const el = $('#savedList'); if (!el) return;
    const email = savedEmail();
    const list = email ? (savedStore()[email] || []) : [];
    el.innerHTML = list.length
      ? list.map(b => `<div class="saved-item">
          <span class="si-emoji">🥡</span>
          <div class="si-info"><strong>${esc(b.name)}</strong><small>${money(b.price)} · ${tr('La tua Wok')}</small></div>
          <button data-act="reorder" data-id="${b.id}">${tr('Riordina')}</button>
          <button class="si-del" data-act="delsaved" data-id="${b.id}" aria-label="Elimina">✕</button>
        </div>`).join('')
      : `<div class="saved-empty">${tr('Nessuna bowl salvata. Crea la tua combinazione nel builder e salvala qui.')}</div>`;
  }
  function reorderSaved(id) {
    const email = savedEmail(); const list = (savedStore()[email] || []);
    const b = list.find(x => x.id === id); if (!b) return;
    state = clone(b.cfg); $('#bowlName').value = state.name;
    renderAllOptions(); renderSummary(); goStep(0);
    const r = calc();
    addCart({ name: state.name || 'Bowl', price: r.price, meta: r.fmt.name + ' · ' + r.spice.name });
    $('#builder').scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------------- CART PERSISTENCE ---------------- */
  function loadCart() {
    try { cart = JSON.parse(localStorage.getItem('fw-cart') || '[]'); } catch (e) { cart = []; }
  }
  function saveCart() { try { localStorage.setItem('fw-cart', JSON.stringify(cart)); } catch (e) {} }
  function changeQty(i, d) {
    if (!cart[i]) return;
    cart[i].qty = Math.max(1, (cart[i].qty || 1) + d);
    renderCart();
  }

  /* ---------------- LIGHTBOX / ZOOM ---------------- */
  let lbList = [], lbIndex = 0;
  function getZoomables() {
    return $$('.hero-photo, .sig-photo-wrap img, .bite-photo img, .sig-gallery img');
  }
  function lbCaption(img) {
    const card = img.closest('.sig-card, .bite, .sig-gallery figure, .hero-art');
    if (card) {
      const t = card.querySelector('.sig-title, h4, figcaption') || card.querySelector('.bite h4');
      if (t && t.textContent.trim()) return t.textContent.trim();
    }
    return img.alt || 'FastWok';
  }
  function lbDetails(img) {
    const sigCard = img.closest('.sig-card');
    if (sigCard) {
      const s = get(SIGNATURES, sigCard.dataset.sig);
      if (s) {
        const items = [];
        const base = get(BASES, s.config.base);
        if (base) items.push(base.name);
        if (s.config.eggMode === 'standard') items.push('Uovo');
        s.config.proteins.forEach(id => { const p = get(PROTEINS, id); if (p) items.push(p.name); });
        s.config.veggies.forEach(id => { const v = get(VEGGIES, id); if (v) items.push(v.name); });
        s.config.sauces.forEach(id => { const sa = get(SAUCES, id); if (sa && sa.id !== 'zero') items.push(sa.name + ' sauce'); });
        s.config.toppings.forEach(id => { const t = get(TOPPINGS, id); if (t) items.push(t.name); });
        return { items: items, allergens: Array.from(calc(s.config).allergens) };
      }
    }
    const bite = img.closest('.bite');
    if (bite) {
      const id = bite.dataset.id;
      const b = get(BITES_FOOD, id) || get(BITES_DRINK, id);
      return { items: BITE_INGREDIENTS[id] || (b ? [b.sub] : []), allergens: b ? (b.flags || []) : [] };
    }
    const fig = img.closest('.sig-gallery figure');
    if (fig) {
      const cap = fig.querySelector('figcaption');
      const key = cap ? cap.textContent.trim() : '';
      return { items: GALLERY_INGREDIENTS[key] || ['Wok appena saltato'], allergens: ['glutine', 'soia'] };
    }
    return { items: ['Egg Noodles', 'Pollo al Wok', 'Broccoli', 'Peperoni', 'Sesamo', 'Salsa Tokyo'], allergens: ['glutine', 'uova', 'soia'] };
  }
  function showLb(i) {
    if (!lbList.length) return;
    lbIndex = (i + lbList.length) % lbList.length;
    const img = lbList[lbIndex];
    $('#lbImage').src = img.src;
    $('#lbImage').alt = img.alt || 'Piatto FastWok';
    $('#lbCaption').textContent = lbCaption(img);
    const d = lbDetails(img);
    $('#lbIngredients').innerHTML = d.items.map((n, k) => `<span style="animation-delay:${k * 35}ms">${esc(tr(n))}</span>`).join('');
    $('#lbAllergens').textContent = d.allergens.length ? '⚠ Allergeni: ' + d.allergens.join(', ') : '✓ Nessun allergene dichiarato';
  }
  function openLightbox(img) {
    lbList = getZoomables();
    lbList.forEach(i => { i.loading = 'eager'; });
    lbIndex = Math.max(0, lbList.indexOf(img));
    const lb = $('#lightbox');
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showLb(lbIndex);
    $('#lbClose').focus();
  }
  function closeLightbox() {
    $('#lightbox').classList.remove('open');
    $('#lightbox').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------------- TOAST ---------------- */
  function toast(text, emoji) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span class="t-emoji">${emoji || '🔥'}</span><span>${esc(text)}</span>`;
    $('#toastStack').appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 3200);
  }

  /* ---------------- MOBILE SUMMARY ---------------- */
  function openSummaryOnMobile() {
    if (window.innerWidth <= 640) $('#summaryPanel').classList.add('mobile-open');
  }
  function closeSummaryOnMobile() { $('#summaryPanel').classList.remove('mobile-open'); }

  /* ---------------- SHARE ---------------- */
  function shareBowl() {
    const r = calc();
    const nm = state.name.trim() || 'La mia Wok';
    const fmt = r.fmt.name;
    const base = get(BASES, state.base);
    const parts = [];
    if (base) parts.push(base.name);
    state.proteins.forEach(id => { const p = get(PROTEINS, id); if (p) parts.push(p.name); });
    state.veggies.forEach(id => { const v = get(VEGGIES, id); if (v) parts.push(v.name); });
    state.sauces.forEach(id => { const s = get(SAUCES, id); if (s) parts.push(s.name); });
    state.toppings.forEach(id => { const t = get(TOPPINGS, id); if (t) parts.push(t.name); });
    const text = `🔥 ${nm} — FastWok Roma\n${fmt} · ${parts.join(' + ')}\nPiccante: ${r.spice.name} · ${r.kcal} kcal · ${r.pro}g proteine\nTotale: ${money(r.price)}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('Ricetta copiata negli appunti! 📋', '✅'))
        .catch(() => fallbackCopy(text));
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); toast('Ricetta copiata! 📋', '✅'); } catch (e) { toast('Copia non riuscita 😕', '⚠️'); }
    ta.remove();
  }

  /* ---------------- EVENTS ---------------- */
  function bindEvents() {
    document.addEventListener('click', e => {
      const langBtn = e.target.closest('[data-lang]');
      if (langBtn) {
        lang = langBtn.dataset.lang;
        $$('.lang-switch button').forEach(b => b.classList.toggle('active', b === langBtn));
        window.applyI18n(lang); hydrateIcons();
        renderAllOptions(); renderSignatures(); renderBites(); renderSweets(); renderSaved(); renderSummary(); goStep(currentStep); applyQuickFilters();
        return;
      }
      const qf = e.target.closest('[data-qf]');
      if (qf) {
        const k = qf.dataset.qf;
        if (quickFilters.has(k)) quickFilters.delete(k); else quickFilters.add(k);
        qf.classList.toggle('active', quickFilters.has(k));
        applyQuickFilters();
        return;
      }
      const qbtn = e.target.closest('[data-qty]');
      if (qbtn) { changeQty(+qbtn.dataset.qty, +qbtn.dataset.d); saveCart(); return; }
      const zoom = e.target.closest('.hero-photo, .sig-photo-wrap img, .bite-photo img, .sig-gallery img, .sweet img');
      if (zoom) { e.preventDefault(); e.stopPropagation(); openLightbox(zoom); return; }
      if (e.target.closest('#lbClose')) { closeLightbox(); return; }
      if (e.target.closest('#lbPrev')) { showLb(lbIndex - 1); return; }
      if (e.target.closest('#lbNext')) { showLb(lbIndex + 1); return; }
      if (e.target.id === 'lightbox') { closeLightbox(); return; }

      const sel = e.target.closest('[data-kind]');
      if (sel) { toggleOption(sel.dataset.kind, sel.dataset.id); return; }

      const stepLi = e.target.closest('#stepper li');
      if (stepLi) { goStep(+stepLi.dataset.goto); $('#builder').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }

      const mode = e.target.closest('.mode-btn');
      if (mode) { state.eggMode = mode.dataset.mode; renderAllOptions(); renderSummary(); return; }

      const tab = e.target.closest('.sauce-tab');
      if (tab) { sauceTab = tab.dataset.tab; $$('.sauce-tab').forEach(t => t.classList.toggle('active', t === tab)); renderAllOptions(); return; }

      const btab = e.target.closest('.bites-tab');
      if (btab) { bitesTab = btab.dataset.tab; $$('.bites-tab').forEach(t => t.classList.toggle('active', t === btab)); renderBites(); return; }

      const filt = e.target.closest('[data-filter]');
      if (filt) {
        const a = filt.dataset.filter;
        if (activeFilters.has(a)) activeFilters.delete(a); else activeFilters.add(a);
        filt.classList.toggle('active', activeFilters.has(a));
        filt.setAttribute('aria-pressed', activeFilters.has(a));
        applyFilters(); return;
      }

      const rem = e.target.closest('[data-remove]');
      if (rem) { cart.splice(+rem.dataset.remove, 1); saveCart(); renderCart(); return; }

      const act = e.target.closest('[data-act]');
      if (act) {
        const id = act.dataset.id, a = act.dataset.act;
        if (a === 'bite') {
          const b = get(BITES_FOOD, id) || get(BITES_DRINK, id);
          addCart({ name: tr(b.name), price: b.price, meta: tr('Street bite') + ' · ' + tr(b.sub) });
        } else if (a === 'sweet') {
          const s = SWEETS.find(x => x.id === id);
          addCart({ name: tr(s.name), price: s.price, meta: tr(s.cat) });
        } else if (a === 'reorder') {
          reorderSaved(id);
        } else if (a === 'delsaved') {
          const email = savedEmail(), store = savedStore();
          if (store[email]) { store[email] = store[email].filter(x => x.id !== id); try { localStorage.setItem('fw-saved', JSON.stringify(store)); } catch (err) {} }
          renderSaved(); toast(tr('Bowl rimossa'), '🗑️');
        } else if (a === 'order') {
          const s = get(SIGNATURES, id);
          addCart({ name: s.name, price: s.price, meta: 'Signature Bowl · ' + s.tag });
        } else if (a === 'customize') {
          const s = get(SIGNATURES, id);
          state = clone(s.config); state.name = s.nameSuggest;
          $('#bowlName').value = state.name;
          renderAllOptions(); renderSummary(); goStep(0);
          $('#builder').scrollIntoView({ behavior: 'smooth' });
          openSummaryOnMobile();
          toast(s.name + ' caricata nel Builder! 🔧', '✨');
        }
        return;
      }

      if (e.target.closest('#nextStep')) { goStep(currentStep + 1); return; }
      if (e.target.closest('#prevStep')) { goStep(currentStep - 1); return; }
      if (e.target.closest('#spinBtn')) { spinWok(false); return; }
      if (e.target.closest('#heroSurprise')) { spinWok(true); return; }
      if (e.target.closest('#resetBtn')) {
        state = clone(DEFAULTS); $('#bowlName').value = '';
        renderAllOptions(); renderSummary(); goStep(0); toast('Wok pulita, si ricomincia! 🔥', '↺'); return;
      }
      if (e.target.closest('#addToCart')) {
        const r = calc();
        const nm = state.name.trim() || 'Wok Custom';
        addCart({ name: nm, price: r.price, meta: r.fmt.name + ' · ' + r.spice.name + ' · ' + r.kcal + ' kcal' });
        closeSummaryOnMobile(); return;
      }
      if (e.target.closest('#shareBowl')) { shareBowl(); return; }
      if (e.target.closest('#saveCurrentBowl')) { saveCurrentBowl(); return; }
      if (e.target.closest('#cartBtn')) { openCart(); return; }
      if (e.target.closest('#cartClose') || e.target.closest('#drawerBackdrop')) { closeCart(); return; }
      if (e.target.closest('#checkoutBtn')) {
        toast('Ordine pronto! Passa a ritirare tra 7 minuti ⚡', '🎉'); closeCart(); return;
      }
      if (e.target.closest('#mobileBarToggle')) {
        $('#summaryPanel').classList.toggle('mobile-open'); return;
      }
      if (e.target.closest('#summaryClose')) { closeSummaryOnMobile(); return; }
      if (e.target.closest('#menuToggle')) {
        const nav = $('.main-nav'); nav.classList.toggle('open');
        $('#menuToggle').setAttribute('aria-expanded', nav.classList.contains('open')); return;
      }
      if (e.target.closest('.main-nav a')) { $('.main-nav').classList.remove('open'); }
    });

    $('#bowlName').addEventListener('input', e => { state.name = e.target.value; renderSummary(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeLightbox(); closeCart(); closeSummaryOnMobile(); }
      if ($('#lightbox').classList.contains('open')) {
        if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
        if (e.key === 'ArrowRight') showLb(lbIndex + 1);
      }
    });
    window.addEventListener('scroll', () => {
      $('#siteHeader').classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
    window.addEventListener('resize', () => { if (window.innerWidth > 640) closeSummaryOnMobile(); });
  }

  /* ---------------- REVEAL ---------------- */
  function initReveal() {
    const els = $$('.section-head, .sig-card, .bite, .trans-card, .location-card, .head-badge');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    els.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ---------------- INIT ---------------- */
  function init() {
    if (window.applyI18n) window.applyI18n(lang);
    $$('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    hydrateIcons();
    loadCart();
    renderAllOptions();
    renderSummary();
    goStep(0);
    renderSignatures();
    renderBites();
    renderSweets();
    renderSaved();
    renderFilters();
    renderCart();
    applyQuickFilters();
    bindEvents();
    initReveal();
    const se = $('#savedEmail');
    if (se) se.addEventListener('input', renderSaved);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
