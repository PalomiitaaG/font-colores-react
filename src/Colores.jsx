import { useState, useEffect } from 'react'
import Formulario from './Formulario.jsx'
import Color from './Color.jsx'


function Colores() {
  
  let [colores,setColores] = useState([])  //le damos como valor final una array vacío.

  useEffect(() => {
    fetch("https://api-colores-ufkw.onrender.com/colores")
    .then(respuesta =>  respuesta.json())
    .then(respuesta => { 
        setColores(respuesta) //le das el valores de la repsuesta a colores. Basicamente todos los colores que tenga en la db
    })
  }, []) //dejar el array de dependecias vacío ya que quiero que se ejecute una vez.

  function crearColor(color){
    setColores([...colores,color])
  }

  function borrarColor(id){
    fetch(`https://api-colores-ufkw.onrender.com/colores/borrar/${id}`,{
      method : "DELETE"
    })
      .then(respuesta => respuesta.json())
      .then(({resultado}) => {
        if(resultado == "ok"){
          return setColores(colores.filter(color => color.id != id))
        }
        console.log("error usuario")
      })
  }

  // le pasas en el map la informacion de la db (id,r,g,b), invocas la funcion pasandole los props para luego en la funcion de color ppoder extraerlo.
  return (
    <>
        <Formulario crearColor={crearColor} />
        <ul>
           { colores.map(({id,r,g,b}) => <Color key={id} id={id} r={r} g={g} b={b} borrarColor={borrarColor} />) }
        </ul>
    </>
  )
}

export default Colores
