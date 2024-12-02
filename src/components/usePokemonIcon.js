// usePokemonIcon.js

// Importamos los hooks useState y useEffect de React.
// useState nos permite manejar el estado local dentro de nuestro hook.
// useEffect nos permite realizar efectos secundarios, como la obtención de datos.
import { useState, useEffect } from 'react';

// Creamos un hook personalizado llamado 'usePokemonIcon', que toma un 'pokemonName' como argumento.
// Este hook se encargará de obtener la imagen del Pokémon usando la API.
const usePokemonIcon = (pokemonName) => {
  
  // Usamos useState para manejar tres estados:
  // 1. 'spriteUrl' para almacenar la URL de la imagen del Pokémon.
  // 2. 'loading' para manejar el estado de carga de la solicitud.
  // 3. 'error' para manejar posibles errores durante la solicitud.
  const [spriteUrl, setSpriteUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect nos permite realizar efectos secundarios. En este caso, hacemos la solicitud a la API.
  // useEffect se ejecuta cuando el componente se monta y cada vez que el 'pokemonName' cambia.
  useEffect(() => {
    // Función asincrónica que se encarga de hacer la solicitud a la API.
    const fetchPokemonIcon = async () => {
      try {
        // Indicamos que la carga ha comenzado, estableciendo el estado 'loading' como true.
        setLoading(true);
        
        // Hacemos una solicitud GET a la API de Pokémon usando el 'pokemonName' pasado como argumento.
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        // Convertimos la respuesta de la API a formato JSON.
        const data = await response.json();
        
        // Extraemos la URL de la imagen del Pokémon y la almacenamos en el estado 'spriteUrl'.
        setSpriteUrl(data.sprites.front_default);
      } catch (error) {
        // Si ocurre un error en la solicitud, lo capturamos y lo almacenamos en el estado 'error'.
        setError('Error fetching Pokémon icon');
      } finally {
        // Independientemente de si hubo un error o no, finalizamos la carga cambiando 'loading' a false.
        setLoading(false);
      }
    };

    // Llamamos a la función 'fetchPokemonIcon' para hacer la solicitud cuando el hook se ejecute.
    fetchPokemonIcon();
  }, [pokemonName]); // Dependencia de 'pokemonName': el efecto se vuelve a ejecutar cada vez que 'pokemonName' cambie.

  // El hook devuelve un objeto con tres propiedades:
  // 1. 'spriteUrl': la URL de la imagen del Pokémon.
  // 2. 'loading': el estado de carga.
  // 3. 'error': cualquier error que haya ocurrido.
  return { spriteUrl, loading, error };
};

// Exportamos el hook para poder usarlo en otros componentes.
export default usePokemonIcon;







/**
 




Explicación detallada:
useState:

Utilizamos useState para definir tres estados:
spriteUrl: Para almacenar la URL de la imagen del Pokémon.
loading: Para indicar si los datos están siendo cargados (valor booleano).
error: Para manejar cualquier error que ocurra durante la solicitud.
useEffect:

useEffect se ejecuta cuando el componente se monta y cada vez que cambia pokemonName. Este hook se usa para manejar la lógica asíncrona de hacer la solicitud a la API de Pokémon.
Dentro de useEffect, creamos una función fetchPokemonIcon, que se ejecuta de manera asincrónica (async/await):
Primero, establece el estado loading como true para indicar que los datos están siendo cargados.
Luego, realiza una solicitud fetch a la URL de la API de Pokémon usando el nombre del Pokémon (pokemonName).
Después, convierte la respuesta de la API a formato JSON.
Extrae la URL de la imagen del Pokémon y la guarda en el estado spriteUrl.
Si ocurre un error durante la solicitud, se captura y se guarda en el estado error.
Finalmente, se establece el estado loading a false, lo que indica que la solicitud ha terminado.
Dependencia en useEffect:

El segundo argumento de useEffect es un arreglo de dependencias. En este caso, la dependencia es [pokemonName]. Esto significa que el efecto se ejecutará cada vez que el valor de pokemonName cambie.
Retorno del hook:

El hook devuelve un objeto con tres propiedades:
spriteUrl: la URL de la imagen del Pokémon.
loading: el estado de carga.
error: el mensaje de error si ocurrió alguno.
Estas propiedades pueden ser utilizadas por el componente que use este hook.
¿Cómo se usa este hook en un componente?
Este hook personalizado se puede usar en cualquier componente donde se necesite obtener el ícono de un Pokémon. Por ejemplo, en un componente como PokemonIcon, podríamos usarlo para mostrar la imagen del Pokémon:

javascript
Copiar código
import React, { useState } from 'react';
import usePokemonIcon from './usePokemonIcon'; // Importamos el hook personalizado

const PokemonIcon = ({ pokemonName }) => {
  const [hovered, setHovered] = useState(false); // Estado para manejar el hover
  const { spriteUrl, loading, error } = usePokemonIcon(pokemonName); // Usamos el hook

  return (
    <div
      className={`w-16 h-16 rounded-full bg-yellow-200 p-2 mx-2 flex justify-center items-center transform transition-all duration-300 
      ${hovered ? 'scale-110 shadow-xl' : ''}`}
      onMouseEnter={() => setHovered(true)} // Al pasar el ratón sobre el ícono
      onMouseLeave={() => setHovered(false)} // Al quitar el ratón del ícono
    >
      {loading ? (
        <div className="w-full h-full bg-gray-300 flex justify-center items-center">Cargando...</div>
      ) : error ? (
        <div className="text-red-500">Error al cargar</div>
      ) : (
        <img src={spriteUrl} alt={pokemonName} className="w-full h-full object-contain" />
      )}
    </div>
  );
};

export default PokemonIcon;
Flujo de la aplicación:
Componente: El componente que usa usePokemonIcon (por ejemplo, PokemonIcon) pasa un nombre de Pokémon como argumento.
Hook: El hook personalizado usePokemonIcon hace la solicitud a la API de Pokémon.
Carga: Mientras la solicitud está en progreso, el estado loading es true, y el componente puede mostrar un mensaje de "Cargando...".
Error: Si la solicitud falla, el estado error es actualizado, y el componente puede mostrar un mensaje de error.
Resultado: Si la solicitud tiene éxito, el estado spriteUrl se llena con la URL de la imagen del Pokémon y se muestra en el componente.
 */