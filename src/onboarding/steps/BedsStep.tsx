// Beds step: capture bed/container dimensions and type.
// Rationale:
// - Dimensions unlock spacing/yield guidance later.
// - Units toggle keeps international users unblocked; conversion can be added later.
import React from 'react';
import { useOnboarding, createBedName } from '../state';

export function BedsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { state, dispatch } = useOnboarding();

  function addBed() {
    const id = crypto.randomUUID();
    dispatch({
      type: 'add_bed',
      bed: {
        id,
        name: createBedName(state.beds),
        type: 'raised_bed',
        length: 4,
        width: 4,
      },
    });
  }

  function updateBed(id: string, key: 'name' | 'type' | 'length' | 'width', value: string) {
    if (key === 'length' || key === 'width') {
      const num = Number(value);
      if (Number.isNaN(num)) return;
      dispatch({ type: 'update_bed', id, bed: { [key]: num } });
    } else if (key === 'type') {
      dispatch({ type: 'update_bed', id, bed: { type: value as any } });
    } else {
      dispatch({ type: 'update_bed', id, bed: { name: value } });
    }
  }

  function removeBed(id: string) {
    dispatch({ type: 'remove_bed', id });
  }

  return (
    <section>
      <h2 className="title">Define your beds</h2>
      <p className="subtitle">Add raised beds, ground beds, or containers. We'll use size to suggest plant counts and spacing later.</p>

      <div className="field">
        <label>Units</label>
        <select value={state.units} onChange={(e) => dispatch({ type: 'set_units', units: e.target.value as any })}>
          <option value="imperial">Feet (ft)</option>
          <option value="metric">Meters (m)</option>
        </select>
      </div>

      {state.beds.map((bed) => (
        <div key={bed.id} className="card" style={{ marginBottom: 12 }}>
          <div className="row">
            <div className="field">
              <label>Name</label>
              <input value={bed.name} onChange={(e) => updateBed(bed.id, 'name', e.target.value)} />
            </div>
            <div className="field">
              <label>Type</label>
              <select value={bed.type} onChange={(e) => updateBed(bed.id, 'type', e.target.value)}>
                <option value="raised_bed">Raised bed</option>
                <option value="ground_bed">Ground bed</option>
                <option value="container">Container</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>Length ({state.units === 'imperial' ? 'ft' : 'm'})</label>
              <input inputMode="decimal" value={String(bed.length)} onChange={(e) => updateBed(bed.id, 'length', e.target.value)} />
            </div>
            <div className="field">
              <label>Width ({state.units === 'imperial' ? 'ft' : 'm'})</label>
              <input inputMode="decimal" value={String(bed.width)} onChange={(e) => updateBed(bed.id, 'width', e.target.value)} />
            </div>
          </div>
          <div className="controls">
            <button className="ghost" onClick={() => removeBed(bed.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="controls" style={{ marginTop: 12 }}>
        <button className="secondary" onClick={addBed}>Add a bed</button>
      </div>

      <div className="controls" style={{ marginTop: 16 }}>
        <button className="ghost" onClick={onBack}>Back</button>
        <button onClick={onNext} disabled={state.beds.length === 0}>Continue</button>
      </div>
    </section>
  );
}

