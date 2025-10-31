// Location step tests favor manual entry to avoid flaky geolocation permissions in CI.
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { LocationStep } from '../onboarding/steps/LocationStep';
import { OnboardingProvider } from '../onboarding/state';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}

describe('LocationStep', () => {
  it('allows manual city entry', () => {
    const onNext = vi.fn();
    const onBack = vi.fn();
    render(<LocationStep onNext={onNext} onBack={onBack} />, { wrapper: Wrapper as any });

    const city = screen.getByLabelText(/city/i);
    fireEvent.change(city, { target: { value: 'Portland' } });
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);
    expect(onNext).toHaveBeenCalled();
  });
});


