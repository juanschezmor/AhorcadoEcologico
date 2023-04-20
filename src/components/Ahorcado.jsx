import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import world0 from "../assets/world.png";
import world1 from "../assets/world1.png";
import world2 from "../assets/world2.png";
import world3 from "../assets/world3.png";
import world4 from "../assets/world4.png";
import world5 from "../assets/world5.png";
import world6 from "../assets/world6.png";
import Confetti from "./ConfettiComponent";

const Ahorcado = () => {
  const palabras = [
    "carbono",
    "clima",
    "renovable",
    "eco",
    "energia",
    "transporte",
    "emision",
    "ecologica",
    "consumo",
    "mitigacion",
    "adaptacion",
    "biodiversidad",
    "sostenible",
    "invernadero",
    "solar",
    "eolica",
    "hidraulica",
    "reciclaje",
    "economia",
    "agricultura",
    "deforestacion",
    "suelo",
    "antropogenico",
    "acidificacion",
    "riesgo",
    "CO2",
    "hidrica",
    "sobrepesca",
    "marina",
    "geotermica",
    "movilidad",
    "bioenergia",
    "huertos",
    "infraestructura",
    "politica",
    "etiquetado",
    "normativa",
    "impacto",
    "crisis",
    "accion",
    "resiliencia",
    "nuclear",
    "tecnologia",
    "biomasa",
    "organico",
    "ecosistema",
    "contaminacion",
    "reutilizacion",
  ];
  const [palabra, setPalabra] = useState("");
  const [palabraAdivinada, setPalabraAdivinada] = useState([]);
  const [letraIntentada, setLetraIntentada] = useState("");
  const [letrasFalladas, setletrasFalladas] = useState([]);
  const [intentos, setIntentos] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [palabraIngresada, setpalabraIngresada] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    seleccionarPalabra();
    setOpen(false);
  };

  useEffect(() => {
    seleccionarPalabra();
  }, []);

  const seleccionarPalabra = () => {
    const palabraSeleccionada =
      palabras[Math.floor(Math.random() * palabras.length)];
    setPalabra(palabraSeleccionada);
    setPalabraAdivinada(Array(palabraSeleccionada.length).fill(""));
    setIntentos(0);
    setFallos(0);
    setletrasFalladas([]);
    setpalabraIngresada("");
  };

  const ManejarIntento = () => {
    console.log(fallos);
    if (letraIntentada.length === 1) {
      const nuevaPalabraAdivinada = palabraAdivinada.map((letra, index) => {
        if (palabra[index] === letraIntentada) {
          return letraIntentada;
        } else {
          return letra;
        }
      });

      if (palabraAdivinada.join("") === nuevaPalabraAdivinada.join("")) {
        setletrasFalladas((letrasFalladas) => [
          ...letrasFalladas,
          letraIntentada,
        ]);
        setFallos(fallos + 1);
      }

      setPalabraAdivinada(nuevaPalabraAdivinada);
      setLetraIntentada("");
      setIntentos(intentos + 1);
    }
  };

  const ManejarInputLetra = (event) => {
    setLetraIntentada(event.target.value);
  };

  const ManejarInputPalabra = (event) => {
    setpalabraIngresada(event.target.value);
  };
  const ManejarPalabra = () => {
    if (palabraIngresada === palabra) {
      setPalabraAdivinada(palabra.split(""));
    } else {
      setFallos(fallos + 1);
    }
  };

  const RenderResultado = () => {
    if (palabraAdivinada.join("") === palabra) {
      onOpenModal();

      return (
        <>
          <Confetti />
          <Modal open={open} onClose={onCloseModal} center>
            <p>¡Ganaste! La palabra correcta era "{palabra}".</p>
            <button onClick={seleccionarPalabra}>Volver a jugar</button>
          </Modal>
        </>
      );
    } else if (fallos === 6) {
      return (
        <Modal open={open} onClose={onCloseModal} center>
          <p>¡Perdiste! La palabra correcta era "{palabra}".</p>
          <button onClick={seleccionarPalabra}>Volver a jugar</button>
        </Modal>
      );
    }
  };

  return (
    <div className="container">
      <div className="h-1/5 bg-black">
        <h1>Adivina la palabra ecológica</h1>
      </div>
      <div className="palabra">
        {palabraAdivinada.map((letra, index) => (
          <div
            key={index}
            className={`letra ${
              palabraAdivinada.length <= 5
                ? "letra-pequena"
                : palabraAdivinada.length <= 8
                ? "letra-mediana"
                : "letra-grande"
            }`}
          >
            {letra}
          </div>
        ))}
      </div>
      <div className="datos">
        <div className="intentos">
          <p>Intentos restantes: {6 - fallos}</p>
        </div>
        <div className="letrasincorrectas">
          <p>Letras incorrectas: {letrasFalladas.join(", ")}</p>
        </div>
      </div>
      <div className="cosas">
        <RenderResultado />
        <img
          className="imagen "
          src={
            fallos === 0
              ? world0
              : fallos === 1
              ? world1
              : fallos === 2
              ? world2
              : fallos === 3
              ? world3
              : fallos === 4
              ? world4
              : fallos === 5
              ? world5
              : world6
          }
          alt="mundo"
        />
      </div>
      <div className="cosas">
        <input
          type="text"
          maxLength="1"
          onChange={ManejarInputLetra}
          value={letraIntentada}
        />
        <button onClick={ManejarIntento}>Ingresar letra</button>
      </div>
      <div className="cosas">
        <input
          type="text"
          onChange={ManejarInputPalabra}
          value={palabraIngresada}
        />
        <button onClick={ManejarPalabra}>Ingresar palabra</button>
      </div>
    </div>
  );
};

export default Ahorcado;
