import React from 'react';

// Este es el componente funcional PokemonCard, que recibe 'pokemon' como prop
const PokemonCard = ({ pokemon }) => {
  // Extraemos las propiedades relevantes del pokemon que nos llegaron como prop
  const { name, sprites, species, abilities, weight, height, base_experience } = pokemon;

  return (
    // Aquí comienza el contenedor de la tarjeta, con clases de Tailwind CSS para estilo
    <div className="max-w-sm bg-indigo-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-300">
      
      {/* Contenedor para el encabezado de la tarjeta, que incluye el fondo con gradiente y la imagen del Pokémon */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-700 p-4 text-center text-white">
        {/* Imagen del Pokémon con clase de Tailwind para redondearla y aplicarle un borde */}
        <img 
          src={sprites.front_default}  // Utilizamos la URL de la imagen proporcionada por la API
          alt={name}  // Usamos el nombre como alt para la accesibilidad
          className="w-24 h-24 mx-auto rounded-full border-4 border-white"  // Aplicamos el estilo para que la imagen sea redonda y tenga un borde
        />
        
        {/* Nombre del Pokémon */}
        <h3 className="text-2xl font-bold capitalize mt-2">{name}</h3>
        
        {/* Especie del Pokémon */}
        <p className="text-sm mt-1">({species.name})</p>
      </div>

      {/* Contenedor con los detalles adicionales del Pokémon */}
      <div className="p-4 text-white-800">
        {/* Mostramos el peso del Pokémon dividiendo por 10 para que el valor sea más legible */}
        <p className="text-sm text-yellow-100">
          <strong>Peso:</strong> {weight / 10} kg
        </p>
        
        {/* Mostramos la altura del Pokémon, también dividiendo por 10 */}
        <p className="text-sm text-yellow-100">
          <strong>Altura:</strong> {height / 10} m
        </p>
        
        {/* Mostramos la experiencia base del Pokémon */}
        <p className="text-sm text-yellow-100">
          <strong>Experiencia Base:</strong> {base_experience}
        </p>

        {/* Mostramos las habilidades del Pokémon, unidas por una coma */}
        <p className="text-sm text-yellow-100">
          <strong>Habilidades:</strong> {abilities.map((a) => a.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;












/*

Explicación del flujo y la lógica:
Props (pokemon):

El componente PokemonCard recibe una prop llamada pokemon que contiene toda la información de un Pokémon, como su nombre, imagen, especie, habilidades, peso, altura y experiencia base.
Desestructuración de Props:

Se usa la desestructuración para extraer las propiedades más relevantes del objeto pokemon. Esto nos permite acceder a los valores como name, sprites, species, abilities, weight, height, y base_experience directamente en el cuerpo del componente.
Estilo con Tailwind CSS:

Se usan clases de Tailwind CSS para aplicar estilos a la tarjeta del Pokémon. Esto incluye bordes, fondos, sombras y transformaciones en el hover para mejorar la interacción del usuario.
Uso de map en abilities:

La propiedad abilities de un Pokémon es una lista de habilidades. Se utiliza el método map para iterar sobre estas habilidades y extraer solo el nombre de cada una. Luego se usa join(', ') para mostrar todas las habilidades separadas por comas.
Cálculos y formateo de datos:

El peso y la altura de los Pokémon se presentan de forma más amigable para el usuario dividiendo por 10, ya que los valores originales están en decímetros y hectogramos, respectivamente.
Flujos y Conceptos Importantes:
Estado y Efectos (aunque no se manejan directamente aquí):

Aunque en PokemonCard no estamos usando el estado o efectos, este componente es típicamente usado en un flujo donde se maneja el estado en un componente padre, como PokemonList. En ese componente, probablemente gestionamos el estado de la lista de Pokémon utilizando useState y useEffect.
Props:

Las props son una forma de pasar datos entre componentes. En este caso, PokemonCard recibe pokemon como una prop, que contiene toda la información necesaria para mostrar los detalles de cada Pokémon.
Componente Funcional:

Este es un componente funcional, una de las formas en las que podemos escribir componentes en React. Dentro del componente, no usamos estado o hooks, ya que solo estamos recibiendo y mostrando datos.
Tailwind CSS:

Se están utilizando las clases de Tailwind CSS para aplicar un diseño rápido y responsivo. Estas clases son ideales para proyectos donde se necesita un diseño estilizado rápidamente sin tener que escribir CSS adicional.


*/