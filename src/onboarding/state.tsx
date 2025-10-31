// Centralized onboarding state with React context + reducer.
// Rationale:
// - Reducer provides predictable updates for a multi-step wizard.
// - Context avoids prop drilling across steps.
// - LocalStorage persistence lets users resume onboarding without backend dependency.
import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type Units = 'imperial' | 'metric';
export type BedType = 'raised_bed' | 'ground_bed' | 'container';

export interface Bed {
  id: string;
  name: string;
  type: BedType;
  length: number; // in selected units (ft or m)
  width: number; // in selected units
}

export interface LocationState {
  lat?: number;
  lon?: number;
  city?: string;
  region?: string;
  country?: string;
  zoneSuggestion?: string; // e.g., USDA 7b
  zone?: string;
}

export interface GoalsState {
  focus: 'yield' | 'variety' | 'learning';
  experience: 'new' | 'intermediate';
}

export interface OnboardingState {
  units: Units;
  location: LocationState;
  beds: Bed[];
  goals: GoalsState;
  completed: boolean;
}

type Action =
  | { type: 'set_units'; units: Units }
  | { type: 'set_location'; location: Partial<LocationState> }
  | { type: 'add_bed'; bed: Bed }
  | { type: 'update_bed'; id: string; bed: Partial<Bed> }
  | { type: 'remove_bed'; id: string }
  | { type: 'set_goals'; goals: Partial<GoalsState> }
  | { type: 'set_completed'; completed: boolean }
  | { type: 'hydrate'; state: OnboardingState };

const defaultState: OnboardingState = {
  units: 'imperial',
  location: {},
  beds: [],
  goals: { focus: 'yield', experience: 'new' },
  completed: false,
};

// Reducer focuses on small, explicit actions to keep step logic simple.
function reducer(state: OnboardingState, action: Action): OnboardingState {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'set_units':
      return { ...state, units: action.units };
    case 'set_location':
      return { ...state, location: { ...state.location, ...action.location } };
    case 'add_bed':
      return { ...state, beds: [...state.beds, action.bed] };
    case 'update_bed':
      return {
        ...state,
        beds: state.beds.map((b) => (b.id === action.id ? { ...b, ...action.bed } : b)),
      };
    case 'remove_bed':
      return { ...state, beds: state.beds.filter((b) => b.id !== action.id) };
    case 'set_goals':
      return { ...state, goals: { ...state.goals, ...action.goals } };
    case 'set_completed':
      return { ...state, completed: action.completed };
    default:
      return state;
  }
}

const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const STORAGE_KEY = 'gnomeo:onboarding:v1';

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as OnboardingState;
    } catch {}
    return init;
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}

export function createBedName(beds: Bed[]): string {
  const nextIndex = beds.length + 1;
  return `Bed ${nextIndex}`;
}

