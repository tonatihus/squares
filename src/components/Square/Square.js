import React from 'react';
import {UniverseContext} from '../Universe/Universe';
import {SquareContext} from '../SquarePlayground/SquarePlayground';

function Square({lado = window.innerHeight*0.7}) {
  const universeRef = React.useContext(UniverseContext);
  const addSquares = React.useContext(SquareContext);
  
  const cuadro = React.useRef();
  const [shiftX, setShiftX] = React.useState(0);
  const [shiftY, setShiftY] = React.useState(0);
  
  const incrementos = React.useMemo(() => {
    const min = -5;
    const max = 5;
    const incrX = Math.random() * (max - min + 1) + min;
    const incrY = Math.random() * (max - min + 1) + min;
    if(incrX===0 && incrY===0) return [1, 1];
    return [incrX, incrY];
  }, []);

  const color = React.useMemo(() => {
    const COLORS = ['blue', 'green', 'pink', 'red', 'orange', 'yellow', 'purple', 'brown', 'black', 'gray', 'rebeccapurple', 'hotpink', 'cyan', 'magenta', 'lime', 'teal', 'navy', 'olive', 'maroon', 'fuchsia', 'silver'];
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }, []);

  React.useEffect(() => {
    if (!cuadro.current || !universeRef.current) {
      return;
  }
    const intervalo = setInterval( () => {
      setShiftX(current => current + incrementos[0]);
      setShiftY(current => current + incrementos[1]);
      cuadro.current.style.transform = `translateX(${shiftX}px) translateY(${shiftY}px)`;
    }, 10); 

    const {top, bottom, left, right} = cuadro.current.getBoundingClientRect();
    const {top: ut, bottom: ub, left: ul, right: ur} = universeRef.current.getBoundingClientRect();

    if(Math.floor(top)<Math.floor(ut) || Math.floor(bottom)>Math.floor(ub) || Math.floor(left)<Math.floor(ul) || Math.floor(right)>Math.floor(ur)){
      clearInterval(intervalo);
      //cuadro.current.style.backgroundColor = 'transparent';
      cuadro.current.remove();
      if((lado*0.8)>5)
        addSquares(lado*0.8); 
      else
        addSquares(5);
    }

    return () =>  clearInterval(intervalo);
    
  }, [shiftX, shiftY, incrementos, lado, addSquares, universeRef])

  return (
   <div
    ref={cuadro}
    className='square'
    style={{
      backgroundColor: color,
      width: lado,
      height: lado,
    }}
    ></div>
  );
}

export default Square;
