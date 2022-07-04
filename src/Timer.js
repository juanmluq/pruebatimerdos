import './Timer.css';
import React, { useState, useEffect, useRef } from 'react';  
    const Timer = () => {
      //useState es una funcion que nos devuelve un array con dos elementos. Nuestro primer elemento sera nuestro `state` y el segundo es el metodo para mutar el state. Usamos destructuring para separar cada elemnto del array.
    const [segundos, setSegundos] = useState(0);//1- Nuestros segundos, los guardaremos en un state para poder mutarlos.
    const [activo, setActivo] = useState(false); //2- Un estado para llevar el control de nuestro boton de Inicio y Pausa.
    const [tipo, setTipo] = useState('Contador'); //3- Por ultimo necesitaremos un estado para cambiar entre nuestro Contador y nuestra Cuenta Regresiva.
    const myRef = useRef(null);

    
 //Agregamos la funcionalidad de Inicio, Pausa y Reseteo del Timer. Primero agregamos una funcion para cambiar nuestro 
 //estado `active`. La llamamos 'toggle'. Y cuando esta sea llamada cambiara el state activo.
    function toggle() {
      setActivo(!activo);
    }

    function reset() {
      setSegundos(0);
      setActivo(false);
      //Al ejecutarse esta funcion volvemos a nuestros valores iniciales. Por ultimo, una funcion para cambiar entre 'Contador'
      // y 'Cuenta Regresiva'.
    }

    function cambioTipo() {
      if(tipo === 'Contador') setTipo('Cuenta Regresiva')
      if(tipo === 'Cuenta Regresiva') setTipo('Contador')
 //     una funcion para cambiar entre 'Contador' y 'Cuenta Regresiva'.
  }
  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    setSegundos(Number (ref))
    //Agregamos la funcionalidad para cambiar nuestros segundos al cambiar el valor en el input:
}

  // el useEffect va debajo de las funciones
  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {      
//*`setInterval`: nos permite ejecutar una determinada función o bloque de código cada cierto intervalo de tiempo definido
// en milisegundos. Esto se va a ejecutar hasta el momento en que se llamé al método `clearInterval`*
        setSegundos(segundos => segundos + 1);
      }, 1000);
      // En primer lugar, inicializamos un nuevo intervalo con el valor null. Luego, detectamos si `activo` es true.
      // Si es así, asignamos la variable de intervalo creada previamente a un nuevo intervalo que se dispara cada
      // 1 segundo. Dentro del intervalo es donde incrementamos el valor de los segundos en uno.
    }
    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    //Si el valor `activo` es falso, entonces estamos limpiando el intervalo . También estamos devolviendo clearInterval
    // fuera del método useEffect, nuevamente, para limpiar después de nosotros mismos. Esto es equivalente a llamar a
    // componentWillUnmount en un componente de Clase.
    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }
    //para agregar la funcionalidad de 'Cuenta Regresiva'. Useremos otro `setInterval` para restar la cantidad de segundos 
    //que tengamos en nuestro state. Y otra condicion para resetear nuestro Timer al llegar a 0.
    if (segundos <= 0 && tipo === 'Cuenta Regresiva') {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  return (
    <div className="app">
      <div className="time">
        {segundos}s {/* las llaves son para leer el estado segundos. Y la s por decoracion */}
      </div>
      <div className="row">
      <button className={`button button-primary 
      button-primary-${activo ? 'active' : 'inactive'}`} 
      onClick={toggle}>
        {activo ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
      {tipo}
      </button>
      {/* Despues agregamos nuestra `ref` en el input que se encuentra al final de nuestro return dentro de Timer: */}

      {tipo === 'Cuenta Regresiva' && <input type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>}
      </div>
  );
};

export default Timer;

