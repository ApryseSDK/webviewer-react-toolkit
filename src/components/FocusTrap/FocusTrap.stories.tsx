import { boolean } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { useFocusTrap } from '../../hooks';
import { FocusTrap } from '../FocusTrap';
import readme from './README.md';

export default { title: 'Components/FocusTrap', component: FocusTrap, parameters: { readme } };

export const Basic = () => {
  const [showLock, setShowLock] = useState(false);
  return (
    <div className="App">
      <input />
      <button onClick={() => setShowLock(true)}>Lock from outside</button>
      <FocusTrap locked={showLock} focusLastOnUnlock={boolean('focusLastOnUnlock', false)}>
        <div className={showLock ? 'App__lockzone App__lockzone--locked' : 'App__lockzone'}>
          <p>Zone is {showLock ? 'locked' : 'unlocked'}</p>
          <input />
          <button onClick={() => setShowLock(prev => !prev)}>{showLock ? 'Unlock' : 'Lock from inside'}</button>
        </div>
      </FocusTrap>
    </div>
  );
};

export const JustUseFocusTrapHook = () => {
  const [showLock, setShowLock] = useState(false);
  const focusRef = useFocusTrap<HTMLDivElement>(showLock, { focusLastOnUnlock: boolean('focusLastOnUnlock', false) });
  return (
    <div className="App">
      <input />
      <button onClick={() => setShowLock(true)}>Lock from outside</button>
      <div ref={focusRef} className={showLock ? 'App__lockzone App__lockzone--locked' : 'App__lockzone'}>
        <p>Zone is {showLock ? 'locked' : 'unlocked'}</p>
        <input />
        <button onClick={() => setShowLock(prev => !prev)}>{showLock ? 'Unlock' : 'Lock from inside'}</button>
      </div>
    </div>
  );
};

JustUseFocusTrapHook.story = { name: 'Just useFocusTrap Hook' };
