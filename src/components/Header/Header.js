import React from 'react';
import './header.css';


function Header({taches}){
    const nbTache = taches.length
    const nbTachesEnCours = taches.filter(t => !t.done).length
    return (
        <>
        <header>
  <h1>To do AMU</h1>
        </header>
        <h3 className="infoTache"> {nbTache} taches dont {nbTachesEnCours} en cours</h3>
        </>)
}

export default Header;
