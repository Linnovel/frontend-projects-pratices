import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import GuitarCard from "./components/GuitarCard";
import { db } from "./data/database";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCard(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  return (
    <Fragment>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <GuitarCard
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCard={addToCard}
            />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </Fragment>
  );
}

export default App;
