import { create } from "zustand";

interface ModalState {
  isContactOpen: boolean;
  isQuizOpen: boolean;
  isCallOpen: boolean;
  isChatOpen: boolean;
  unreadCount: number;
  selectedService: string | null;
  openContact: (service?: string) => void;
  closeContact: () => void;
  openQuiz: () => void;
  closeQuiz: () => void;
  openCall: () => void;
  closeCall: () => void;
  openChat: () => void;
  closeChat: () => void;
  addUnreadMessage: () => void;
  markMessagesAsRead: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isContactOpen: false,
  isQuizOpen: false,
  isCallOpen: false,
  isChatOpen: false,
  unreadCount: 0,
  selectedService: null,
  openContact: (service) =>
    set({ isContactOpen: true, selectedService: service || null }),
  closeContact: () => set({ isContactOpen: false, selectedService: null }),
  openQuiz: () => set({ isQuizOpen: true }),
  closeQuiz: () => set({ isQuizOpen: false }),
  openCall: () => set({ isCallOpen: true }),
  closeCall: () => set({ isCallOpen: false }),
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  addUnreadMessage: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  markMessagesAsRead: () => set({ unreadCount: 0 }),
}));

interface QuizState {
  currentStep: number;
  answers: {
    service: string | null;
    scale: string | null;
    budget: string | null;
    name: string;
    contact: string;
  };
  setStep: (step: number) => void;
  setAnswer: <K extends keyof QuizState["answers"]>(
    key: K,
    value: QuizState["answers"][K]
  ) => void;
  reset: () => void;
  calculatePrice: () => { min: number; max: number };
}

const initialAnswers = {
  service: null,
  scale: null,
  budget: null,
  name: "",
  contact: "",
};

export const useQuizStore = create<QuizState>((set, get) => ({
  currentStep: 0,
  answers: initialAnswers,
  setStep: (step) => set({ currentStep: step }),
  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),
  reset: () => set({ currentStep: 0, answers: initialAnswers }),
  calculatePrice: () => {
    const { answers } = get();
    let baseMin = 30000;
    let baseMax = 100000;

    // Service multiplier
    const serviceMultipliers: Record<string, number> = {
      site: 2.5,
      ads: 1.5,
      geo: 1.2,
      smm: 1.3,
      telegram: 1.8,
      complex: 4,
    };
    const serviceMult = answers.service
      ? serviceMultipliers[answers.service] || 1
      : 1;

    // Scale multiplier
    const scaleMultipliers: Record<string, number> = {
      startup: 0.8,
      small: 1,
      medium: 1.5,
      large: 2.5,
    };
    const scaleMult = answers.scale ? scaleMultipliers[answers.scale] || 1 : 1;

    // Budget adjustment
    const budgetRanges: Record<string, { min: number; max: number }> = {
      "50k": { min: 30000, max: 50000 },
      "150k": { min: 50000, max: 150000 },
      "500k": { min: 150000, max: 500000 },
      "500k+": { min: 500000, max: 1500000 },
    };

    if (answers.budget && budgetRanges[answers.budget]) {
      baseMin = budgetRanges[answers.budget].min;
      baseMax = budgetRanges[answers.budget].max;
    }

    return {
      min: Math.round((baseMin * serviceMult * scaleMult) / 1000) * 1000,
      max: Math.round((baseMax * serviceMult * scaleMult) / 1000) * 1000,
    };
  },
}));
