import React, { useContext, useEffect, useState  } from 'react';
import axios from 'axios';
import { PokemonContext } from '../context/PokemonContext';  // Importamos el contexto de Pokémon
import PokemonCard from './PokemonCard';  // Importamos el componente de la tarjeta de Pokémon

// Este es el componente PokemonList que muestra la lista de Pokémon
const PokemonList = () => {
  // Usamos el contexto de PokemonContext para acceder al estado global y a la función 'dispatch' que nos permite enviar acciones
  const { state, dispatch } = useContext(PokemonContext);
  const [filter, setFilter] = useState(''); // Estado para almacenar el filtro seleccionado
  const [types, setTypes] = useState([]); // Estado para almacenar los tipos
  const [page, setPage] = useState(1); // Página actual
const [totalPages, setTotalPages] = useState(0); // Total de páginas disponibles



   // Mapeo de tipos en inglés a español
   const typeTranslations = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada',
    stellar: 'Estelar',
    unknown: 'otro', // Ejemplo de tipo adicional, puedes añadir más
  };

 // Obtener tipos de Pokémon desde la API
 useEffect(() => {
  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results); // Guardamos los tipos en el estado
    } catch (error) {
      console.error('Error al obtener los tipos', error);
    }
  };

  fetchTypes();
}, []);

  // useEffect se usa para realizar una acción cuando el componente se monta
  useEffect(() => {
    const fetchPokemons = async () => {
      // Despachamos una acción para indicar que estamos empezando a obtener los datos
      dispatch({ type: 'FETCH_POKEMONS_START' });
  
      try {
        // Realizamos la petición a la API de Pokémon para obtener una lista paginada
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=80&offset=${(page - 1) * 40}`);
  
        // Después de obtener los nombres de los Pokémon, hacemos peticiones adicionales para obtener más detalles de cada uno
        const details = await Promise.all(
          response.data.results.map((pokemon) => axios.get(pokemon.url))
        );
  
        // Extraemos los datos de cada Pokémon y los preparamos para ser enviados al estado global
        const pokemonData = details.map((detail) => detail.data);
  
        // Despachamos una acción con los datos de los Pokémon que se obtuvieron correctamente
        dispatch({ type: 'FETCH_POKEMONS_SUCCESS', payload: pokemonData });
  
        // Calculamos el total de páginas (por ejemplo, si hay 800 Pokémon en total, con 80 por página, habrá 10 páginas)
        const total = 800; // Este es el total de Pokémon disponibles en la API
        setTotalPages(Math.ceil(total / 40)); // 40 es el límite por página
      } catch (error) {
        // Si hay un error, despachamos una acción de error con el mensaje de error
        dispatch({ type: 'FETCH_POKEMONS_ERROR', payload: error.message });
      }
    };
  
    fetchPokemons();
  }, [dispatch, page]); // La función se ejecuta cada vez que cambie la página
    // La función useEffect se ejecuta cuando el componente se monta, y solo cuando el dispatch 
  
      // Filtrar los Pokémon por tipo o habilidad
  const filteredPokemons = state.pokemons.filter((pokemon) => {
    if (filter === '') return true;
    return (
      pokemon.types.some((type) => type.type.name === filter) ||
      pokemon.abilities.some((ability) => ability.ability.name === filter)
    );
  });

  // Si el estado de carga es verdadero, mostramos un mensaje de "Cargando..."
  if (state.loading) return <p>Loading...</p>;

  // Si hay un error en el estado, mostramos el mensaje de error
  if (state.error) return <p>Error: {state.error}</p>;

  // Si los Pokémon se han cargado correctamente, renderizamos las tarjetas de los Pokémon
  return (
    <div>
    <div className="p-4 bg-indigo-800 rounded-lg shadow-lg max-w-xs mx-auto mt-8">
      <label htmlFor="filter" className="block text-white text-lg font-semibold mb-2">
        Filtrar por tipo o habilidad:
      </label>
      <select
        id="filter"
        className="block w-full px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Todos</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {typeTranslations[type.name] || type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

        {/* Controles de Paginación */}
    <div className="flex justify-center mt-4 mb-4">
      <button
        onClick={() => setPage(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg mr-2"
      >
        Anterior
      </button>
      <span className="text-white">{page} / {totalPages}</span>
      <button
        onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
        disabled={page === totalPages}
        className="px-2 py-2 bg-indigo-600 text-white rounded-lg ml-2"
      >
        Siguiente
      </button>
    </div>
  </div>
    


  );
};

export default PokemonList;







/* 


Explicación detallada del flujo y los conceptos clave:
1. useContext y Acceso al Estado Global:
Usamos useContext(PokemonContext) para acceder al estado global que hemos creado en PokemonContext.
state contiene el estado global de los Pokémon, mientras que dispatch es la función que usamos para enviar acciones y actualizar ese estado.
2. useEffect:
El hook useEffect se ejecuta después de que el componente se monta. En este caso, la función fetchPokemons se ejecutará solo una vez cuando el componente PokemonList se haya montado en el DOM.
La función fetchPokemons hace una llamada a la API para obtener los datos de los Pokémon.
3. Llamada a la API:
Usamos Axios para hacer la solicitud HTTP a la API pública de Pokémon (https://pokeapi.co/api/v2/pokemon?limit=48).
La respuesta de la API contiene solo los nombres y las URLs de los 48 primeros Pokémon.
Hacemos una segunda petición para obtener detalles adicionales (como la imagen, las habilidades, etc.) de cada uno de estos Pokémon usando Promise.all para manejar múltiples solicitudes de manera eficiente.
4. Dispatch de Acciones:
dispatch({ type: 'FETCH_POKEMONS_START' }): Antes de realizar la solicitud, se despacha una acción para indicar que estamos comenzando a obtener los datos. Esto podría activarse para mostrar un indicador de carga.
dispatch({ type: 'FETCH_POKEMONS_SUCCESS', payload: pokemonData }): Si la solicitud es exitosa, se despacha una acción para guardar los datos de los Pokémon en el estado global.
dispatch({ type: 'FETCH_POKEMONS_ERROR', payload: error.message }): Si ocurre un error durante la solicitud, se despacha una acción con el mensaje de error.
5. Estado de Carga y Error:
Carga: Si el estado loading es verdadero (lo cual indicamos en el reducer), mostramos un mensaje de "Cargando...".
Error: Si ocurre un error (indicado por el estado error), mostramos un mensaje con el error.
6. Renderizado de los Pokémon:
Una vez que los Pokémon se cargan correctamente, los mapeamos a través de state.pokemons y renderizamos una tarjeta PokemonCard para cada uno, pasando la información del Pokémon como props.
7. Diseño Responsivo con Tailwind CSS:
El contenedor que envuelve las tarjetas de los Pokémon usa clases de Tailwind CSS para hacer que la lista sea responsiva. Según el tamaño de la pantalla, cambia el número de columnas:
En pantallas pequeñas (por ejemplo, móviles), habrá 1 columna.
En pantallas medianas (como tabletas), 2 columnas.
En pantallas grandes (como computadoras de escritorio), 4 columnas.
Resumen del flujo:
Montaje del componente → useEffect se ejecuta.
Acción de carga → Se despacha FETCH_POKEMONS_START.
Petición API → Se realiza la solicitud a la API de Pokémon.
Petición exitosa → Se despachan los datos con FETCH_POKEMONS_SUCCESS.
Error → Si ocurre un error, se despacha FETCH_POKEMONS_ERROR.
Renderizado → Si no hay error y los Pokémon se cargaron correctamente, se muestran en tarjetas usando el componente PokemonCard.
Conceptos Importantes:
useContext: Permite acceder al estado global gestionado en un contexto.
useEffect: Realiza efectos secundarios, como peticiones HTTP, cuando el componente se monta.
dispatch: Se utiliza para enviar acciones que actualizan el estado global.
Tailwind CSS: Se usa para aplicar estilos rápidos y responsivos sin necesidad de escribir CSS adicional.

*/