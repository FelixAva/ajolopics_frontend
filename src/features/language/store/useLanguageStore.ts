import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  // El middleware 'persist' guarda automáticamente el estado en localStorage
  persist(
    (set) => ({
      language: 'es', // Idioma por defecto
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage', // Nombre de la llave con la que se guardará en localStorage
    }
  )
);
