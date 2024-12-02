// PokemonIcon.js

// Importamos React y el hook useState de React para manejar el estado local.
// También importamos el hook personalizado 'usePokemonIcon' que nos permite obtener la imagen de un Pokémon.
import React, { useState } from 'react';
import usePokemonIcon from './usePokemonIcon'; // Importamos el hook personalizado

// Componente 'PokemonIcon' que recibe el 'pokemonName' como prop (nombre del Pokémon).
const PokemonIcon = ({ pokemonName }) => {
  
  // Estado 'hovered' para saber si el mouse está sobre el ícono (hover).
  // useState(false) significa que inicialmente no está en hover.
  const [hovered, setHovered] = useState(false);

  // Usamos el hook personalizado 'usePokemonIcon' pasando 'pokemonName'.
  // Esto devuelve tres valores:
  // 1. 'spriteUrl': URL de la imagen del Pokémon.
  // 2. 'loading': Estado de carga, si los datos todavía se están obteniendo.
  // 3. 'error': Mensaje de error si la solicitud a la API falla.
  const { spriteUrl, loading, error } = usePokemonIcon(pokemonName); 

  return (
    <div 
      // Aquí se define el estilo del ícono de Pokémon usando Tailwind CSS.
      // Se aplican estilos de transición, tamaño y flexbox. La clase 'scale-110' aumenta el tamaño y 'shadow-xl' añade una sombra
      // cuando el ícono está en estado 'hovered'.
      className={`w-16 h-16 rounded-full bg-yellow-200 p-2 mx-2 flex justify-center items-center transform transition-all duration-300 
      ${hovered ? 'scale-110 shadow-xl' : ''}`}
      
      // Se usa el evento 'onMouseEnter' para detectar cuando el mouse entra sobre el ícono, y cambiamos el estado 'hovered' a 'true'.
      // 'onMouseLeave' detecta cuando el mouse sale del ícono, y cambiamos el estado 'hovered' a 'false'.
      onMouseEnter={() => setHovered(true)} // Al pasar el ratón sobre el ícono
      onMouseLeave={() => setHovered(false)} // Al quitar el ratón del ícono
    >
      
      {/* Aquí mostramos el contenido dependiendo de los estados 'loading' y 'error' */}
      
      {loading ? (
        // Si 'loading' es true, mostramos un mensaje de carga.
        <div className="w-full h-full bg-gray-300 flex justify-center items-center">Cargando...</div>
      ) : error ? (
        // Si hubo un error al obtener los datos, mostramos un mensaje de error.
        <div className="text-red-500">Error al cargar</div>
      ) : (
        // Si todo está bien, mostramos la imagen del Pokémon obtenida del hook 'usePokemonIcon'.
        <img src={spriteUrl} alt={pokemonName} className="w-full h-full object-contain" />
      )}
      
    </div>
  );
};

// Exportamos el componente para que se pueda usar en otras partes de la aplicación.
export default PokemonIcon;





/*

Explicación paso a paso:
Estado hovered:

Usamos el hook useState para crear un estado llamado hovered, que indica si el mouse está sobre el ícono de Pokémon. Este estado se inicializa en false, lo que significa que al principio no estamos en "hover".
Hook usePokemonIcon:

El hook usePokemonIcon(pokemonName) se utiliza para obtener la imagen de un Pokémon. Recibe como parámetro el nombre del Pokémon (que es una prop llamada pokemonName), y devuelve tres valores:
spriteUrl: la URL de la imagen del Pokémon.
loading: un valor booleano que indica si los datos están siendo cargados.
error: un mensaje de error si hubo algún problema al obtener los datos.
Manejo del "hover":

En el div que contiene el ícono, utilizamos dos eventos: onMouseEnter y onMouseLeave.
onMouseEnter: Cuando el mouse entra en el área del ícono, cambiamos el estado hovered a true, lo que activa las clases CSS para agrandar el ícono y agregarle una sombra.
onMouseLeave: Cuando el mouse sale del ícono, el estado hovered se cambia a false, eliminando los efectos de agrandamiento y sombra.
Condicional de carga y error:

Si el estado loading es true, mostramos un mensaje de "Cargando...".
Si hay un error (error no es null), mostramos un mensaje de error que indica que hubo un problema al obtener la imagen del Pokémon.
Si todo está bien, mostramos la imagen del Pokémon usando la URL que obtenemos de spriteUrl.
Estilos con Tailwind CSS:

Usamos Tailwind CSS para aplicar estilos rápidamente:
w-16 h-16: Define el tamaño del ícono.
rounded-full: Hace que el ícono tenga bordes redondeados (círculo).
bg-yellow-200: Fondo amarillo claro para el ícono.
transform transition-all duration-300: Permite animaciones suaves y transformaciones.
scale-110 shadow-xl: Al pasar el mouse, el ícono crece y muestra una sombra adicional.
Exportación del componente:

Finalmente, exportamos el componente PokemonIcon para que pueda ser utilizado en otras partes de la aplicación.
¿Cómo funciona todo?
Este componente está diseñado para mostrar un ícono de un Pokémon de forma interactiva. El ícono tiene animaciones de "hover" y se conecta a una API para obtener la imagen de ese Pokémon.
El componente es flexible: puedes pasarlo cualquier nombre de Pokémon y él se encargará de hacer la solicitud a la API y mostrar la imagen correspondiente.
Además, maneja los estados de carga y error para asegurar una experiencia de usuario adecuada, mostrando mensajes de carga o error si es necesario.
Este patrón de diseño es útil cuando queremos reutilizar lógica (como la obtención de datos de la API) y componentes visuales (como el ícono del Pokémon) de manera eficiente.
*/