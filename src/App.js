import './App.css';
import Die from './components/Die'
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  function allNewDice() {
    const elems = [];
    for (let i = 0; i < 10; i++) {
      elems.push(generateNewDie());
    }
    return elems;
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('YOU WON');
    }
  }, [dice])

  const elements = dice.map(el => {
    return <Die value={el.value} isHeld={el.isHeld} key={el.id} 
    id={el.id} holdDice={holdDice}/>
  });

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }));
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }));
  }

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll untill all dice are the same. Click each die to freeze
        it at its current value between rolls.
      </p>
      <div className='dice-container'>
        {elements}
      </div>
      {!tenzies && <button className="roll-dice" onClick={rollDice}>Roll</button>}
      {tenzies && <button className="roll-dice" onClick={newGame}>New Game</button>}
    </main>
  );
}

export default App;