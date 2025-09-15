export interface GreetingOptions {
  name: string;
  relation?: 'rodina' | 'priatel' | 'partner' | 'kolega' | 'ucitel' | 'sused';
  style?: 'formal' | 'casual' | 'romantic' | 'funny';
  length?: 'short' | 'medium' | 'long';
}

export interface Greeting {
  text: string;
  type: 'sms' | 'email' | 'card' | 'social';
  length: 'short' | 'medium' | 'long';
}

// Greeting templates organized by relation and style
const GREETING_TEMPLATES = {
  rodina: {
    formal: [
      "Všetko najlepšie k meninám, {name}!",
      "Srdečne gratulujem k meninám, {name}!",
      "Prajem ti krásne meniny, {name}!",
      "Nech ti meniny prinesú veľa radosti, {name}!"
    ],
    casual: [
      "Všetko najlepšie k meninám, {name}! 🎉",
      "Gratulujem k meninám, {name}! 🎂",
      "Krásne meniny, {name}! 🎈",
      "Všetko najlepšie, {name}! 🥳"
    ],
    romantic: [
      "Môj milovaný/á {name}, všetko najlepšie k meninám! ❤️",
      "S láskou ti prajem krásne meniny, {name}! 💕",
      "Môj drahý/á {name}, nech ti meniny prinesú veľa šťastia! 💖"
    ],
    funny: [
      "Všetko najlepšie k meninám, {name}! Už si starší/á o rok! 😄",
      "Gratulujem k meninám, {name}! Kde je torta? 🍰",
      "Krásne meniny, {name}! Dnes si kráľ/kráľovná dňa! 👑"
    ]
  },
  priatel: {
    formal: [
      "Všetko najlepšie k meninám, {name}!",
      "Srdečne gratulujem k meninám, {name}!",
      "Prajem ti krásne meniny, {name}!"
    ],
    casual: [
      "Všetko najlepšie k meninám, {name}! 🎉",
      "Gratulujem k meninám, {name}! 🎂",
      "Krásne meniny, {name}! 🎈",
      "Všetko najlepšie, {name}! 🥳"
    ],
    romantic: [
      "Môj milovaný/á {name}, všetko najlepšie k meninám! ❤️",
      "S láskou ti prajem krásne meniny, {name}! 💕",
      "Môj drahý/á {name}, nech ti meniny prinesú veľa šťastia! 💖"
    ],
    funny: [
      "Všetko najlepšie k meninám, {name}! Už si starší/á o rok! 😄",
      "Gratulujem k meninám, {name}! Kde je torta? 🍰",
      "Krásne meniny, {name}! Dnes si kráľ/kráľovná dňa! 👑"
    ]
  },
  partner: {
    formal: [
      "Môj drahý/á {name}, všetko najlepšie k meninám!",
      "S láskou ti prajem krásne meniny, {name}!",
      "Môj milovaný/á {name}, nech ti meniny prinesú veľa šťastia!"
    ],
    casual: [
      "Všetko najlepšie k meninám, {name}! ❤️",
      "Gratulujem k meninám, {name}! 💕",
      "Krásne meniny, {name}! 🎂",
      "Všetko najlepšie, {name}! 🥳"
    ],
    romantic: [
      "Môj milovaný/á {name}, všetko najlepšie k meninám! ❤️",
      "S láskou ti prajem krásne meniny, {name}! 💕",
      "Môj drahý/á {name}, nech ti meniny prinesú veľa šťastia! 💖",
      "Môj najmilší/á {name}, prajem ti najkrajšie meniny! 🌹"
    ],
    funny: [
      "Všetko najlepšie k meninám, {name}! Už si starší/á o rok! 😄",
      "Gratulujem k meninám, {name}! Kde je torta? 🍰",
      "Krásne meniny, {name}! Dnes si kráľ/kráľovná dňa! 👑"
    ]
  },
  kolega: {
    formal: [
      "Všetko najlepšie k meninám, {name}!",
      "Srdečne gratulujem k meninám, {name}!",
      "Prajem ti krásne meniny, {name}!"
    ],
    casual: [
      "Všetko najlepšie k meninám, {name}! 🎉",
      "Gratulujem k meninám, {name}! 🎂",
      "Krásne meniny, {name}! 🎈"
    ],
    romantic: [
      "Všetko najlepšie k meninám, {name}! ❤️",
      "S láskou ti prajem krásne meniny, {name}! 💕"
    ],
    funny: [
      "Všetko najlepšie k meninám, {name}! Už si starší/á o rok! 😄",
      "Gratulujem k meninám, {name}! Kde je torta? 🍰"
    ]
  },
  ucitel: {
    formal: [
      "Všetko najlepšie k meninám, {name}!",
      "Srdečne gratulujem k meninám, {name}!",
      "Prajem ti krásne meniny, {name}!"
    ],
    casual: [
      "Všetko najlepšie k meninám, {name}! 🎉",
      "Gratulujem k meninám, {name}! 🎂"
    ],
    romantic: [
      "Všetko najlepšie k meninám, {name}! ❤️"
    ],
    funny: [
      "Všetko najlepšie k meninám, {name}! Už si starší/á o rok! 😄"
    ]
  },
  sused: {
    formal: [
      "Všetko najlepšie k meninám, {name}!",
      "Srdečne gratulujem k meninám, {name}!"
    ],
    casual: [
      "Všetko najlepšie k meninám, {name}! 🎉",
      "Gratulujem k meninám, {name}! 🎂"
    ],
    romantic: [
      "Všetko najlepšie k meninám, {name}! ❤️"
    ],
    funny: [
      "Všetko najlepšie k meninám, {name}! Už si starší/á o rok! 😄"
    ]
  }
};

// Extended greetings for different lengths
const EXTENDED_GREETINGS = {
  short: [
    "Všetko najlepšie k meninám, {name}!",
    "Gratulujem k meninám, {name}!",
    "Krásne meniny, {name}!"
  ],
  medium: [
    "Všetko najlepšie k meninám, {name}! Nech ti tento deň prinesie veľa radosti a šťastia!",
    "Srdečne gratulujem k meninám, {name}! Prajem ti krásny deň plný lásky a úsmevov!",
    "Krásne meniny, {name}! Nech sa ti splnia všetky tvoje sny a túžby!"
  ],
  long: [
    "Všetko najlepšie k meninám, {name}! Nech ti tento špeciálny deň prinesie veľa radosti, šťastia a lásky. Prajem ti, aby si sa cítil/a milovaný/á a obklopený/á ľuďmi, ktorí ťa majú radi. Nech sa ti splnia všetky tvoje sny a túžby!",
    "Srdečne gratulujem k meninám, {name}! Tento deň je len tvoj, tak si ho užij naplno. Prajem ti veľa zdravia, šťastia a úspechov vo všetkom, čo robíš. Nech ti život prinesie len krásne chvíle a nezabudnuteľné zážitky!",
    "Krásne meniny, {name}! Nech ti tento deň prinesie veľa radosti a pozitívnej energie. Prajem ti, aby si sa cítil/a šťastný/á a spokojný/á so svojím životom. Nech sa ti splnia všetky tvoje plány a sny!"
  ]
};

/**
 * Generate greeting messages for name days
 */
export function generateGreetings(options: GreetingOptions): Greeting[] {
  const { name, relation = 'rodina', style = 'casual', length = 'short' } = options;
  
  const greetings: Greeting[] = [];
  
  // Get templates for the relation and style
  const templates = GREETING_TEMPLATES[relation]?.[style] || GREETING_TEMPLATES.rodina.casual;
  
  // Generate greetings for different types
  const types: Array<'sms' | 'email' | 'card' | 'social'> = ['sms', 'email', 'card', 'social'];
  
  types.forEach(type => {
    // Select appropriate template based on type
    let selectedTemplates = templates;
    
    if (type === 'sms' || type === 'social') {
      // Shorter greetings for SMS and social media
      selectedTemplates = templates.filter(t => t.length < 100);
    } else if (type === 'email' || type === 'card') {
      // Can use longer greetings
      selectedTemplates = templates;
    }
    
    // Generate 2-3 variations for each type
    const variations = selectedTemplates.slice(0, 3).map(template => {
      const text = template.replace(/{name}/g, name);
      return {
        text,
        type,
        length: text.length < 50 ? 'short' : text.length < 150 ? 'medium' : 'long'
      };
    });
    
    greetings.push(...variations);
  });
  
  // Add extended greetings if requested
  if (length === 'medium' || length === 'long') {
    const extendedTemplates = EXTENDED_GREETINGS[length];
    const extendedGreetings = extendedTemplates.map(template => ({
      text: template.replace(/{name}/g, name),
      type: 'card' as const,
      length
    }));
    
    greetings.push(...extendedGreetings);
  }
  
  return greetings;
}

/**
 * Get a single greeting for quick use
 */
export function getSingleGreeting(options: GreetingOptions, type: 'sms' | 'email' | 'card' | 'social' = 'sms'): string {
  const greetings = generateGreetings(options);
  const filteredGreetings = greetings.filter(g => g.type === type);
  
  if (filteredGreetings.length === 0) {
    return `Všetko najlepšie k meninám, ${options.name}!`;
  }
  
  // Return a random greeting of the requested type
  const randomIndex = Math.floor(Math.random() * filteredGreetings.length);
  return filteredGreetings[randomIndex].text;
}

/**
 * Get SMS variant for calendar reminders
 */
export function getSMSGreeting(name: string, relation: string = 'rodina'): string {
  return getSingleGreeting({ name, relation, style: 'casual', length: 'short' }, 'sms');
}
