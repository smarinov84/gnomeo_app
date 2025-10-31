// Location step gathers garden location with geolocation plus manual override.
// Rationale:
// - Permissionless manual fields prevent dead-ends when geolocation fails.
// - Zone is editable because auto-detection can be imperfect; we prefer explainability and control.
import React from 'react';
import { useOnboarding } from '../state';
import { suggestZoneFromLocation } from '../../services/geoZone';

export function LocationStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { state, dispatch } = useOnboarding();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleUseMyLocation() {
    setError(null);
    setLoading(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
      });
      const lat = Number(pos.coords.latitude.toFixed(5));
      const lon = Number(pos.coords.longitude.toFixed(5));
      dispatch({ type: 'set_location', location: { lat, lon } });
      const zoneSuggestion = await suggestZoneFromLocation({ lat, lon });
      if (zoneSuggestion) dispatch({ type: 'set_location', location: { zoneSuggestion, zone: zoneSuggestion } });
    } catch (e) {
      setError('Could not access location. You can enter it manually.');
    } finally {
      setLoading(false);
    }
  }

  function handleManualChange(key: 'city' | 'region' | 'country' | 'zone', value: string) {
    dispatch({ type: 'set_location', location: { [key]: value } });
  }

  return (
    <section>
      <h2 className="title">Where is your garden?</h2>
      <p className="subtitle">We use your location to tailor planting windows, weather alerts, and recommendations.</p>

      <div className="controls" style={{ marginBottom: 16 }}>
        <button onClick={handleUseMyLocation} disabled={loading}>Use my location</button>
        <button className="ghost" onClick={() => setError(null)}>Enter manually</button>
      </div>
      {error && <div role="alert" style={{ color: 'var(--danger)', marginBottom: 12 }}>{error}</div>}

      <div className="row">
        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" value={state.location.city ?? ''} onChange={(e) => handleManualChange('city', e.target.value)} placeholder="e.g., Portland" />
        </div>
        <div className="field">
          <label htmlFor="region">State/Region</label>
          <input id="region" value={state.location.region ?? ''} onChange={(e) => handleManualChange('region', e.target.value)} placeholder="e.g., OR" />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="country">Country</label>
          <input id="country" value={state.location.country ?? ''} onChange={(e) => handleManualChange('country', e.target.value)} placeholder="e.g., USA" />
        </div>
        <div className="field">
          <label htmlFor="zone">Zone (suggested)</label>
          <input id="zone" value={state.location.zone ?? state.location.zoneSuggestion ?? ''} onChange={(e) => handleManualChange('zone', e.target.value)} placeholder="e.g., USDA 8b" />
        </div>
      </div>

      <div className="controls">
        <button className="ghost" onClick={onBack}>Back</button>
        <button onClick={onNext}>Continue</button>
      </div>
    </section>
  );
}

