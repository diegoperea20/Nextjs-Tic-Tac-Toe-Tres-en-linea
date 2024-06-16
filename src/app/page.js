import React from 'react';
import Game from '@/components/Game';
import Link from 'next/link';
const Home = () => {
  return (
    <div>
      <h1>Tic-Tac-Toe (Tres en linea)</h1>
      <Game />
      <div className="project-github">
      <p>This project is in </p>
      <Link href="https://github.com/diegoperea20/Nextjs-Tic-Tac-Toe-Tres-en-linea">
        <img width="96" height="96" src="https://img.icons8.com/fluency/96/github.png" alt="github"/>
      </Link>
    </div>
    </div>
  );
};

export default Home;
