import './App.css';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Content1 from './pages/content1/main/Content1';
import Content2 from './pages/content2/Content2';
import Content3 from './pages/content3/Content3';
import Content4 from './pages/content4/Content4';
import AppRouter from './appRouter/AppRouter';
import OfferForm from './elements/offerForm/OfferForm';
import Footer from './pages/contentFooter/Footer';

function App() {
  const [show, setShow] = useState(false)
  const yourState = useSelector((state) => state.OfferReducer.makingOffer);
  useEffect(() => {
    // Код, який виконується при зміні стану стору (yourState)
    // Наприклад, виклик функції або оновлення компонента
    yourState ? setShow(true) : setShow(false)
  }, [yourState]); // Передайте залежність вашого ефекту, яка відслідковує ваш стан

  return (
    <Router>
      <div className="App">
        {show ? <OfferForm /> : null}
        <Content1 />
        <AppRouter />
        <Content2 />
        <Content3 />
        <Content4 />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
