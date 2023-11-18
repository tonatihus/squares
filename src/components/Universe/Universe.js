import React from 'react';

export const UniverseContext = React.createContext();

function Universe({children}) {
  const universeRef = React.useRef();
  return (
    <UniverseContext.Provider value={universeRef}>
      <div ref={universeRef} className='universe'>
        {children}
      </div>
    </UniverseContext.Provider>
  );
}

export default Universe;
