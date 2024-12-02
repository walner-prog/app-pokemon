// Importamos el proveedor del contexto para Pokémon y el componente que lista los Pokémon
import { PokemonProvider } from './context/PokemonContext';
import PokemonList from './components/PokemonList';
import PokemonIcon from './components/PokemonIcon';
import './App.css'; // Importamos el archivo de estilos CSS para la app

// Componente principal de la aplicación
const App = () => {
  return (
    // Usamos el proveedor de contexto que rodeará a todos los componentes que necesiten acceder a los datos globales de los Pokémon
    <PokemonProvider>
      <div className="App">
        {/* Título de la aplicación */}
        <div className="flex items-center justify-center mb-4">
          {/* Componente PokemonIcon con el nombre del Pokémon, en este caso Pikachu */}
          <PokemonIcon pokemonName="pikachu" />
          
          {/* Título de la aplicación */}
          <h1 className="text-3xl mt-4 text-slate-950 ml-2">Pokémon List</h1>
        </div>
        
        {/* Descripción breve del proyecto */}
        <p className="  text-sky-950 text-center">
          Este proyecto avanzado en <span className=' bg-amber-100 p-2 text-cyan-950'>React js</span>  consume una API para mostrar información en tiempo real sobre Pokémon, 
          integrando Tailwind CSS para un diseño moderno y responsivo. 
          </p>
          <p className="  text-sky-950 text-center">
          Utiliza useState, createContext, useReducer, useEffect y llamadas a la API con 
          axios para gestionar datos dinámicos, además de internacionalización y manejo robusto de errores.
        </p>

        {/* Componente que contiene y muestra la lista de Pokémon */}
        <div className="text-3xl mt-4">
          <PokemonList />
        </div>
      </div>
    </PokemonProvider>
  );
};

// Exportamos el componente App como el principal de la aplicación
export default App;











/*


  PokemonList:
Este es el componente donde se muestra la lista de los Pokémon. Dentro de App, se está llamando a PokemonList, que está envuelto dentro del PokemonProvider. Esto significa que PokemonList tiene acceso al contexto de los Pokémon y puede obtener datos del estado global.

¿Cómo interactúa PokemonList con el contexto?

El componente PokemonList es el encargado de consumir el contexto proporcionado por PokemonProvider. A través de useContext(PokemonContext), PokemonList puede acceder al estado de los Pokémon y la función dispatch para actualizar dicho estado.
PokemonList solicitará los datos de los Pokémon a través de la API (con Axios) y actualizará el estado global a través de dispatch.
Flujo de datos:
Carga Inicial: Al cargar la aplicación, el estado global está vacío, es decir, pokemons es un array vacío, loading es false y error es null.

PokemonProvider:

Cuando se carga el componente App, el PokemonProvider se monta y el contexto global se encuentra disponible para cualquier componente que lo consuma (como PokemonList).
El estado de los Pokémon se mantiene globalmente dentro del contexto, lo que permite acceder a él desde cualquier parte de la aplicación.
Renderización de la Lista de Pokémon:

El componente PokemonList se renderiza, y en su interior se dispara una llamada a la API (a través del efecto useEffect), para cargar los datos de los Pokémon.
Una vez que los datos se obtienen exitosamente, el estado global se actualiza y la lista de Pokémon se renderiza en la UI.
Si ocurre un error, se maneja dentro del PokemonList y el estado de error se actualizará para reflejarlo.
Interactividad:

Mientras tanto, el PokemonList puede mostrar un mensaje de carga si los datos aún no han llegado, o un mensaje de error si algo sale mal durante la solicitud de los datos.
Conceptos Clave:
PokemonProvider y Context: Usamos createContext para crear un contexto que proporciona el estado global de los Pokémon. PokemonProvider es el componente que envuelve otros componentes y les da acceso al contexto.
useContext: Es un hook que permite consumir el contexto y acceder a su estado o a sus funciones, como dispatch en este caso.
React y Axios: Axios se utiliza para hacer la solicitud HTTP a la API de Pokémon, y React maneja el estado y la lógica de la UI.
Tailwind CSS: Se usa para diseñar la interfaz de manera rápida y responsiva, proporcionando una forma eficiente de aplicar estilos.
Resumen:
El componente App se encarga de envolver la aplicación con el PokemonProvider, lo que permite que los componentes hijos (como PokemonList) accedan a los datos globales del estado de los Pokémon.
PokemonList maneja la lógica de la solicitud de la API y muestra la lista de Pokémon, mientras que App proporciona una breve descripción del proyecto y mantiene el diseño de la interfaz.


*/