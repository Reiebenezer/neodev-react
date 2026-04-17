const loadedFonts = {
  Poppins: {
    url: [
      'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    ],
    isLoaded: false,
  },
  Inter: {
    url: [
      'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    ],
    isLoaded: false,
  },
  Arial: {
    url: [],
    isLoaded: true,
  },
  Montserrat: {
    url: [
      'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
    ],
    isLoaded: false,
  },
  'Times New Roman': {
    url: [],
    isLoaded: true,
  },
  Merriweather: {
    url: [
      'https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap',
    ],
    isLoaded: false,
  },
  'Playfair Display': {
    url: [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
    ],
    isLoaded: false,
  },
  Oswald: {
    url: [
      'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap',
    ],
    isLoaded: false,
  },
  'Bebas Neue': {
    url: ['https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'],
    isLoaded: false,
  },
  'Indie Flower': {
    url: ['https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap'],
    isLoaded: false,
  },
  Caveat: {
    url: [
      'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap',
    ],
    isLoaded: false,
  },
  Satisfy: {
    url: ['https://fonts.googleapis.com/css2?family=Satisfy&display=swap'],
    isLoaded: false,
  },
  'Great Vibes': {
    url: ['https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'],
    isLoaded: false,
  },
};

export type ProvidedFonts = keyof typeof loadedFonts;
export async function loadFont(fontName: ProvidedFonts) {
  if (loadedFonts[fontName].isLoaded) return;

  await Promise.all(
    loadedFonts[fontName].url.map(
      (url) =>
        new Promise<void>((resolve) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          document.head.appendChild(link);

          link.onload = () => resolve();
        })
    )
  );

  loadedFonts[fontName].isLoaded = true;

  return;
}
