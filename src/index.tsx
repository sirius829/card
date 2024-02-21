import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CardInterface } from './interfaces';

interface CardContextProps {
  cards: CardInterface[],
  addCard: (card: CardInterface) => void;
  removeCard: (index: string) => void;
}
export const CardContext = createContext<CardContextProps>({
  cards: [],
  addCard: (card: CardInterface) => {},
  removeCard: (index: string) => {},
});

const CardProvider: React.FC = () => {
  const [cards, setCardList] = useState<CardInterface[]>([]);
  const addCard = (card: CardInterface) => {
    setCardList((prevCards) => [...prevCards.filter((prevCard) => prevCard.id !== card.id), card]);
  }
  const removeCard = (index: string) => {
    setCardList((prevCards) => prevCards.filter((prevCard) => prevCard.id !== index));
  }
  return (
    <CardContext.Provider value={{ cards, addCard, removeCard }}>
      <App />
    </CardContext.Provider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CardProvider />
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
