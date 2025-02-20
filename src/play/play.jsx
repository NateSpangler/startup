import React from 'react';

export function Play() {
  return (
    <main>
      <br></br>
      <div id="highScoreDisplay" className="score">Score: 0</div> 
      <div className="avatar"><img src="/images/blueguy.png"/></div>
      <div className='ball'>
          <div className="ball_effect"></div>
      </div>
      <br></br>
      <br></br>
      <div className='ball2'>
          <div className="ball_effect"></div>
      </div>
    </main>
  );
}