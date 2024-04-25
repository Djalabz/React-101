import { useReducer } from 'react';

// 1) On crée un reducer pour gérer les actions de la calculette
const calculatorReducer = (state, action) => {
  const { type } = action

  switch (type) {
    case 'ADD':
      return { ...state, input: state.input + action.value };
    case 'SUBTRACT':
      return { ...state, input: state.input - action.value };
    case 'MULTIPLY':
      return { ...state, input: state.input * action.value };
    case 'DIVIDE':
      return { ...state, input: state.input / action.value };
    case 'CLEAR':
      return { input: 0 };
    default:
      return state;
  }
};

function Calculator() {
  // 2) Utilisez useReducer avec le reducer et définier un état initial
  const [calculatorState, dispatch] = useReducer(calculatorReducer, { input: 0 });
  
  // 3) Créez les fonctions de nos différentes opérations
  const add = (value) => {
    dispatch({ type: 'ADD', value });
  };

  const subtract = (value) => {
    dispatch({ type: 'SUBTRACT', value });
  };

  const multiply = (value) => {
    dispatch({ type: 'MULTIPLY', value });
  };

  const divide = (value) => {
    dispatch({ type: 'DIVIDE', value });
  };

  const clear = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <div>
      <h1>Calculette</h1>
      <p>Résultat : {calculatorState.input}</p>
      <button onClick={() => add(2)}>Ajouter 2</button>
      <button onClick={() => subtract(5)}>Soustraire 5</button>
      <button onClick={() => multiply(4)}>Multiplier par 4</button>
      <button onClick={() => divide(2)}>Diviser par 2</button>
      <button onClick={clear}>Effacer</button>
    </div>
  );
}

export default Calculator;