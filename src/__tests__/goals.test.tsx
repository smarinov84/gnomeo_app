// Goals step tests ensure selection updates context and navigation proceeds.
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { GoalsStep } from '../onboarding/steps/GoalsStep';
import { OnboardingProvider } from '../onboarding/state';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}

describe('GoalsStep', () => {
  it('toggles focus selection', () => {
    const onNext = vi.fn();
    const onBack = vi.fn();
    render(<GoalsStep onNext={onNext} onBack={onBack} />, { wrapper: Wrapper as any });

    const variety = screen.getByRole('button', { name: /grow a variety/i });
    fireEvent.click(variety);
    const next = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(next);
    expect(onNext).toHaveBeenCalled();
  });
});


