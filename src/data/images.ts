export interface ImageData {
  id: number;
  src: string;
  isAI: boolean;
  description?: string;
}

export const gameImages: ImageData[] = [
  { id: 1, src: '/images/ai1.svg', isAI: true, description: 'AI Generated Image 1' },
  { id: 2, src: '/images/real1.svg', isAI: false, description: 'Real Photo 1' },
  { id: 3, src: '/images/ai2.svg', isAI: true, description: 'AI Generated Image 2' },
  { id: 4, src: '/images/real2.svg', isAI: false, description: 'Real Photo 2' },
  { id: 5, src: '/images/ai3.svg', isAI: true, description: 'AI Generated Image 3' },
  { id: 6, src: '/images/real3.svg', isAI: false, description: 'Real Photo 3' },
  { id: 7, src: '/images/ai4.svg', isAI: true, description: 'AI Generated Image 4' },
  { id: 8, src: '/images/real4.svg', isAI: false, description: 'Real Photo 4' },
];

// Function to shuffle array for random game order
export const shuffleImages = (images: ImageData[]): ImageData[] => {
  const shuffled = [...images];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get 7 random images for a game round
export const getGameImages = (): ImageData[] => {
  const shuffled = shuffleImages(gameImages);
  return shuffled.slice(0, 7);
};
