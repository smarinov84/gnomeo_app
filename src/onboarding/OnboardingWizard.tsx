// Step controller for the onboarding wizard.
// Rationale:
// - Local step index maintains simple linear flow now; can evolve to route-based steps later.
// - Keeps each step focused on a single responsibility to reduce cognitive load.
import React from 'react';
import { useOnboarding } from './state';
import { WelcomeStep } from './steps/WelcomeStep';
import { LocationStep } from './steps/LocationStep';
import { BedsStep } from './steps/BedsStep';
import { GoalsStep } from './steps/GoalsStep';
import { SummaryStep } from './steps/SummaryStep';

type StepKey = 'welcome' | 'location' | 'beds' | 'goals' | 'summary';

const steps: StepKey[] = ['welcome', 'location', 'beds', 'goals', 'summary'];

export function OnboardingWizard() {
  const { state } = useOnboarding();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  function next() {
    setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  const step = steps[currentIndex];

  return (
    <div>
      <div className="subtitle">Step {currentIndex + 1} of {steps.length}</div>
      {step === 'welcome' && <WelcomeStep onNext={next} />}
      {step === 'location' && <LocationStep onNext={next} onBack={back} />}
      {step === 'beds' && <BedsStep onNext={next} onBack={back} />}
      {step === 'goals' && <GoalsStep onNext={next} onBack={back} />}
      {step === 'summary' && <SummaryStep onBack={back} />}
    </div>
  );
}

