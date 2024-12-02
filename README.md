
# Proyecto: **Card Pokémon**

## Descripción

**Card Pokémon** es una aplicación interactiva que permite a los usuarios ver una lista de Pokémon, filtrarlos por tipo o habilidad, y visualizar información detallada sobre cada uno. La aplicación consume datos de la API pública de Pokémon (PokéAPI) para mostrar información precisa y actualizada sobre los Pokémon, incluyendo sus tipos, habilidades y otros detalles importantes.

Puedes acceder a la versión en producción del proyecto en el siguiente enlace:  
[https://card-pokemon.netlify.app/](https://card-pokemon.netlify.app/)

## Características

- **Filtro de Pokémon**: Los usuarios pueden filtrar la lista de Pokémon por tipo o habilidad.
- **Información detallada**: Al seleccionar un Pokémon, se muestra información relevante como el tipo, habilidades y estadísticas.
- **Diseño Responsivo**: El diseño es completamente responsivo, adaptándose a diferentes tamaños de pantalla (móviles, tabletas, computadoras de escritorio).
- **Interfaz limpia y moderna**: El uso de **Tailwind CSS** garantiza un diseño atractivo y fácil de usar.
- **Consumo de API**: La aplicación obtiene los datos de la API de Pokémon (PokéAPI) en tiempo real, garantizando información actualizada.

## Tecnologías utilizadas

- **React**: Librería de JavaScript para construir interfaces de usuario interactivas.
- **Axios**: Biblioteca para realizar solicitudes HTTP a la API de Pokémon.
- **Tailwind CSS**: Framework de CSS que facilita la creación de diseños responsivos y estilizados.
- **React Context**: Utilizado para manejar el estado global de la aplicación, permitiendo una gestión eficiente de los datos de los Pokémon.

## Funcionalidad

1. **Página principal**: En la página principal, los usuarios pueden ver una lista de Pokémon. La aplicación realiza una petición a la API para obtener la lista de Pokémon disponibles.
2. **Filtrado**: Los usuarios pueden seleccionar un tipo o habilidad para filtrar los Pokémon mostrados. Los tipos y habilidades están disponibles en un menú desplegable.
3. **Visualización de Pokémon**: Cada Pokémon es mostrado en una tarjeta que incluye información clave como su nombre, imagen, tipo y habilidades.
4. **Cargando y error**: Si ocurre algún error al cargar los datos o si la aplicación está esperando la respuesta de la API, se muestra un mensaje apropiado.

## Cómo usar el proyecto

1. **Clonar el repositorio**:

   Si deseas ejecutar este proyecto localmente, primero clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/card-pokemon.git
   ```

2. **Instalar dependencias**:

   Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   cd card-pokemon
   npm install
   ```

3. **Ejecutar el proyecto**:

   Para iniciar el servidor de desarrollo, utiliza el siguiente comando:

   ```bash
   npm start
   ```

   Esto iniciará la aplicación en `http://localhost:3000` en tu navegador.

## Estructura del proyecto

El proyecto está estructurado de la siguiente manera:

```
card-pokemon/
│
├── public/                # Archivos públicos, como el HTML principal
│   ├── index.html         # HTML principal
│
├── src/                   # Archivos fuente
│   ├── components/        # Componentes React reutilizables
│   │   ├── PokemonCard.js # Componente que muestra la información de cada Pokémon
│   │   └── PokemonList.js # Componente que muestra la lista de Pokémon
│   ├── context/           # Manejo de estado global con Context API
│   ├── App.js             # Componente principal
│   ├── index.js           # Entrada del proyecto
│   └── styles/            # Estilos globales (Tailwind CSS)
│
├── package.json           # Dependencias y scripts del proyecto
└── tailwind.config.js     # Configuración de Tailwind CSS
```

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una **nueva rama** para trabajar en tu característica o corrección de errores.
3. Realiza tus cambios y **realiza un commit** con un mensaje claro y descriptivo.
4. Abre un **pull request** describiendo los cambios realizados.

## Créditos

- [PokéAPI](https://pokeapi.co/) para los datos de los Pokémon.
- [React](https://reactjs.org/) para la construcción de la interfaz de usuario.
- [Tailwind CSS](https://tailwindcss.com/) para los estilos.

## Licencia

Este proyecto está bajo la Licencia MIT.
