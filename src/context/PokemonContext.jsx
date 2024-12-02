import React, { createContext, useReducer } from 'react';  // Importamos React, createContext y useReducer

// Creación del contexto global para Pokémon
const PokemonContext = createContext();

// Estado inicial del contexto: pokemons está vacío, loading es falso y error es null
const initialState = {
  pokemons: [],
  loading: false,
  error: null,
};

// Reducer que maneja el estado global basado en las acciones que despachamos
const pokemonReducer = (state, action) => {
  switch (action.type) {
    // Si la acción es de inicio de carga, cambiamos loading a true y limpiamos errores
    case 'FETCH_POKEMONS_START':
      return { ...state, loading: true, error: null };

    // Si la acción es de éxito en la carga de Pokémon, guardamos los datos y cambiamos loading a false
    case 'FETCH_POKEMONS_SUCCESS':
      return { ...state, pokemons: action.payload, loading: false };

    // Si ocurre un error en la carga de Pokémon, almacenamos el error y cambiamos loading a false
    case 'FETCH_POKEMONS_ERROR':
      return { ...state, error: action.payload, loading: false };

    // Si la acción no coincide con ninguno de los casos, devolvemos el estado actual sin cambios
    default:
      return state;
  }
};

// Componente que provee el contexto a sus hijos
const PokemonProvider = ({ children }) => {
  // Usamos useReducer para manejar el estado con el reducer y el estado inicial
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  // Proveemos el estado y la función dispatch a través del contexto
  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}  {/* Los componentes hijos pueden acceder al estado y dispatch a través de este contexto */}
    </PokemonContext.Provider>
  );
};

// Exportamos el contexto y el proveedor para que otros componentes puedan usarlos
export { PokemonContext, PokemonProvider };




/*


Explicación detallada del flujo y los conceptos clave:
1. createContext:
createContext() se usa para crear un contexto global en React. Este contexto nos permite compartir datos entre componentes sin necesidad de pasar props manualmente por cada nivel de la jerarquía de componentes.
PokemonContext es el objeto de contexto que va a contener el estado global de los Pokémon y la función dispatch para actualizar dicho estado.
2. initialState:
initialState define el estado inicial del contexto. En este caso, el estado incluye:
pokemons: una lista vacía que se llenará con los datos de los Pokémon.
loading: un valor booleano que indica si se está cargando la información (inicialmente es false).
error: un valor para almacenar el error en caso de que ocurra algún problema durante la carga de los datos (inicialmente es null).
3. pokemonReducer:
pokemonReducer es una función que recibe el estado actual y una acción, y retorna el nuevo estado basado en el tipo de acción que se despacha.
Acción FETCH_POKEMONS_START: Cuando la acción indica que comienza la carga de los Pokémon, cambiamos el estado para reflejar que se está cargando (loading: true) y limpiamos cualquier error previo (error: null).
Acción FETCH_POKEMONS_SUCCESS: Si la carga de los Pokémon es exitosa, actualizamos el estado con los nuevos datos de los Pokémon (action.payload contiene la lista de Pokémon) y cambiamos loading a false.
Acción FETCH_POKEMONS_ERROR: Si hay un error en la carga de los Pokémon, se guarda el error en el estado y también se cambia loading a false.
4. useReducer:
useReducer es un hook de React que nos permite gestionar el estado de manera más compleja que con useState, especialmente cuando tenemos acciones diferentes que deben modificar el estado.
El primer argumento es el reducer (pokemonReducer), que maneja cómo cambiar el estado basado en las acciones.
El segundo argumento es el estado inicial (initialState).
useReducer retorna un array con dos elementos: el estado actual (state) y la función dispatch que se usa para enviar acciones al reducer.
5. PokemonProvider:
PokemonProvider es el componente que proporciona el contexto a los componentes hijos. Cualquier componente dentro de este proveedor puede acceder a state y dispatch.
Dentro de este proveedor, utilizamos el valor { state, dispatch } en el PokemonContext.Provider, lo que permite a los componentes que consumen este contexto acceder tanto al estado global como a la función para actualizar ese estado.
6. export { PokemonContext, PokemonProvider }:
Exportamos tanto el PokemonContext como el PokemonProvider. Esto permite que otros componentes puedan usar el contexto para acceder o actualizar el estado de Pokémon, utilizando PokemonContext.Consumer o el hook useContext (como se ve en el componente PokemonList).
Flujo de Datos:
Inicialización del Estado:

El estado inicial se define en initialState, que tiene los Pokémon vacíos, el loading en false y el error en null.
Cambio de Estado a través del Reducer:

El pokemonReducer escucha diferentes tipos de acciones:
FETCH_POKEMONS_START cambia el estado a loading: true.
FETCH_POKEMONS_SUCCESS actualiza los Pokémon en el estado y establece loading: false.
FETCH_POKEMONS_ERROR guarda el error en el estado y establece loading: false.
Proveemos el Estado con PokemonProvider:

El PokemonProvider envuelve la parte de la aplicación que necesita acceso al estado de los Pokémon. Los componentes dentro de este proveedor pueden acceder al estado global y despachar acciones para cambiarlo.
Consumo del Estado:

Los componentes consumidores (por ejemplo, PokemonList) pueden usar useContext(PokemonContext) para acceder al estado global y a la función dispatch.
Conceptos Importantes:
Contexto (createContext): Crea un "contenedor" para almacenar datos globalmente en la aplicación.
useReducer: Un hook que permite gestionar el estado de manera más avanzada que useState, especialmente útil cuando tenemos múltiples acciones que afectan el estado.
dispatch: Función que permite enviar acciones que modifican el estado global.
Provider: Provee el contexto a todos los componentes hijos que necesitan acceder al estado global.


*/