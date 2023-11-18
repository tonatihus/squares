import React from 'react';
import Square from '../Square/Square';
import Universe from '../Universe/Universe';

export const SquareContext = React.createContext();

function SquarePlayground() {
  const [squares, setSquares] = React.useState(['', '']);
  const addSquares = React.useCallback((sideLength) => {
    setSquares((current) => [...current, sideLength, sideLength]);
  },[]);

  return (
    <SquareContext.Provider value={addSquares}>
      <div className='playground'>
        <Universe>
          {squares.map((valor, index) => {
              return (
                valor==='' 
                ? <Square key={index} /> 
                : <Square key={index} lado={valor} />
              ); 
          })}
        </Universe>
      </div>
    </SquareContext.Provider>
  );
}

export default SquarePlayground;
