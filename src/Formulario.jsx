import { useEffect, useState } from 'react' 
import Color from './Color'

function Formulario({crearColor}){

    let [textoTemporal,setTextoTemporal] = useState("")
    let [error,setError] = useState(false)
    let [msgError,setMsgError] = useState("")

    return (
        <form onSubmit={evento => {
            evento.preventDefault()

            setError(false)

            let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoTemporal)

            if(valido){
                //Primero hacemos un array con el string en el que lo separamos con la coma, despues con el map le decimos que lo combierte a numero ya qye lo que se escribe en un input es un string
                let [r,g,b] = textoTemporal.split(",").map(n => Number(n)); // hay que poner los dos puntos para cortar la linea por que si no JS entiende que el arrey todavia no ha terminado

                [r,g,b].forEach(n => valido = valido && n <= 255) //valido es igual a valido y numero es mejor o igual a 255

                if(valido){
                    return fetch("https://api-colores-ufkw.onrender.com/colores/nuevo",{
                        method : "POST",
                        body : JSON.stringify({r,g,b}),
                        headers : {
                            "Content-type" : "application/json"
                        }
                    })
                    .then(respuesta => respuesta.json())
                    .then(({id,error}) => {
                        if(!error){
                            crearColor({id,r,g,b})
                            return setTextoTemporal("")
                        }
                        console.log("error a usuario")
                    })
                }
               setMsgError("Deben ser tres números entre 0 - 255")
               return setError(true)
            }

            setMsgError("formato invalido")
            setError(true)

            //if(/^(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5]),(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5]),(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])$/.test(textoTemporal)){
                //console.log("Eres un maquina y sabes leer")

               /* return fetch("http://localhost:4000/crear-color",{
                    method : "POST",
                    body : JSON.stringify({r,g,b}),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id,error}) => {
                    if(!error){
                        return useEffect(() => )
                    }
                })*/
            //}
        }}>
            <input type="text" 
                placeholder='rrr,ggg,bbb' 
                value={textoTemporal}
                onChange={evento => setTextoTemporal(evento.target.value)} />
            <p className={ `error ${ error ? "visible" : "" }` }>{ msgError }</p>
            <input type="submit" value="crear color" />
        </form>
    )
}

export default Formulario