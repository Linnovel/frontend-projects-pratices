import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import GuitarCard from "./components/GuitarCard";
import { db } from "./data/database";

function App() {
  const [data, setData] = useState(db);

  return (
    <Fragment>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((data) => (
            <GuitarCard key={data.id} {...data} />
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
