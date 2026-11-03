-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2026 a las 21:13:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `huella_amiga`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre_mascota` varchar(80) DEFAULT NULL,
  `raza_mascota` varchar(80) DEFAULT NULL,
  `tipo_mascota` varchar(20) DEFAULT NULL,
  `edad_mascota` varchar(40) DEFAULT NULL,
  `peso_mascota` varchar(40) DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `tamano` varchar(10) DEFAULT NULL,
  `esterilizado` varchar(5) DEFAULT NULL,
  `vacunas` varchar(15) DEFAULT NULL,
  `temperamento` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `nombre_contacto` varchar(120) DEFAULT NULL,
  `correo_contacto` varchar(150) DEFAULT NULL,
  `telefono_contacto` varchar(25) DEFAULT NULL,
  `ciudad_contacto` varchar(80) DEFAULT NULL,
  `motivo` varchar(20) DEFAULT NULL,
  `confirmaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `usuario_id`, `nombre_mascota`, `raza_mascota`, `tipo_mascota`, `edad_mascota`, `peso_mascota`, `sexo`, `tamano`, `esterilizado`, `vacunas`, `temperamento`, `descripcion`, `nombre_contacto`, `correo_contacto`, `telefono_contacto`, `ciudad_contacto`, `motivo`, `confirmaciones`) VALUES
(3, NULL, 'samuel', 'perro salchicha', 'gato', '3', '12', 'macho', 'grande', 'no', 'parcialmente', 'Juguetón, Tranquilo, Sociable, Tímido, Bueno con otras mascotas', '', 'cuasimodo frentardo delaspriella', 'agudelojuanesteban69@gmail.com', '12345678', 'manizales', 'reubicacion', 'Información verídica, Autoriza verificación y publicación, Mantiene a la mascota hasta su adopción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_adopcion`
--

CREATE TABLE `solicitudes_adopcion` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `mascota_id` int(11) DEFAULT NULL,
  `nombre` varchar(120) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `telefono` varchar(25) DEFAULT NULL,
  `ciudad` varchar(80) DEFAULT NULL,
  `vivienda` varchar(20) DEFAULT NULL,
  `patio` varchar(5) DEFAULT NULL,
  `mascotas` varchar(5) DEFAULT NULL,
  `otras_mascotas` varchar(255) DEFAULT NULL,
  `personas_hogar` int(11) DEFAULT NULL,
  `tipo_mascota` varchar(20) DEFAULT NULL,
  `tamano` varchar(100) DEFAULT NULL,
  `edad_pref` varchar(100) DEFAULT NULL,
  `mascota_mente` varchar(100) DEFAULT NULL,
  `compromisos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes_adopcion`
--

INSERT INTO `solicitudes_adopcion` (`id`, `usuario_id`, `mascota_id`, `nombre`, `correo`, `telefono`, `ciudad`, `vivienda`, `patio`, `mascotas`, `otras_mascotas`, `personas_hogar`, `tipo_mascota`, `tamano`, `edad_pref`, `mascota_mente`, `compromisos`) VALUES
(1, NULL, NULL, 'joaquin miguel valencia', 'juan.holguinr@autonoma.edu.co', '34343434343', 'manizales', 'finca', 'si', 'si', '67', 10, 'gato', 'Pequeño, Mediano', 'Cachorro, Joven', 'Luna', ''),
(2, NULL, NULL, 'gfhgfgjhgfj', 'fdgfghc@gmail.com', '545464', 'msnizales', 'apartamento', 'si', 'si', 'un gato negro', 2, 'gato', 'Pequeño, Mediano', 'Cachorro, Joven', 'Ares', 'Alimentación y atención veterinaria, Visita de seguimiento, Compromiso de por vida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_paseo`
--

CREATE TABLE `solicitudes_paseo` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre_dueno` varchar(120) DEFAULT NULL,
  `telefono` varchar(25) DEFAULT NULL,
  `nombre_mascota` varchar(80) DEFAULT NULL,
  `raza_mascota` varchar(80) DEFAULT NULL,
  `tamano` varchar(10) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `dias` varchar(100) DEFAULT NULL,
  `turnos` varchar(255) DEFAULT NULL,
  `plan` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes_paseo`
--

INSERT INTO `solicitudes_paseo` (`id`, `usuario_id`, `nombre_dueno`, `telefono`, `nombre_mascota`, `raza_mascota`, `tamano`, `direccion`, `dias`, `turnos`, `plan`) VALUES
(1, NULL, 'sergio', '34343434343', 'samuel', 'hot dog', 'mediano', 'cr26', 'Sáb, Dom', 'Mañana (7:00 - 9:00), Tarde (12:00 - 14:00)', 'Paquete Semanal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `nacimiento` date NOT NULL,
  `ciudad` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `nacimiento`, `ciudad`, `password`) VALUES
(1, 'joaquin miguel valencia', 'juan.holguinr@autonoma.edu.co', '3434343', '2007-12-29', 'manizales', '$2y$10$Mt2o.I7i7CxkV4UmMHquQuJWO35.GQB0qXko3BpFaRQcV5qUYMi3S'),
(2, 'Maria Alejandra Gallego', 'maria.gallegoa@auotnoma.edu.co', '3218211498', '2026-10-20', 'Manizales', '$2y$10$sJw.rA1.9FKJ8BfxBuzUUOGMhEj5IQDIJVJXxUS8TCHg3YunxTIw.'),
(3, 'Andres Felipe Zea', 'andres.zeaq@atutonoma.edu.co', '3218211498', '2026-10-21', 'Caldas', '$2y$10$2husx.CyBcWn5QfmXDRe9uHPz2K4mM2I7qFWep4UnG00dKK3Krmxi'),
(4, 'joaquin miguel valencia', 'juan.valenciau@autonoma.edu.co', '3218211498', '2026-10-13', 'manizales', '$2y$10$nTYbacHGdieTBlumTomybuoSPYxixoVrqEVDFt5R8CA34P2GbzPDG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunaciones`
--

CREATE TABLE `vacunaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre_dueno` varchar(120) DEFAULT NULL,
  `telefono` varchar(25) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `nombre_mascota` varchar(80) DEFAULT NULL,
  `tipo_mascota` varchar(10) DEFAULT NULL,
  `raza` varchar(80) DEFAULT NULL,
  `edad` varchar(40) DEFAULT NULL,
  `peso` varchar(40) DEFAULT NULL,
  `vacunas` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `horario` varchar(20) DEFAULT NULL,
  `estado` varchar(15) DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacunaciones`
--

INSERT INTO `vacunaciones` (`id`, `usuario_id`, `nombre_dueno`, `telefono`, `correo`, `nombre_mascota`, `tipo_mascota`, `raza`, `edad`, `peso`, `vacunas`, `fecha`, `horario`, `estado`) VALUES
(1, NULL, 'Juan Diego Holguin Ruiz', '34343434343', 'juan.holguinr@autonoma.edu.co', 'sara', 'perro', 'gordo', '23', '10', 'Parvovirus, Moquillo, Triple Felina', '2000-12-23', 'manana', 'Pendiente'),
(2, NULL, 'Juan Diego Holguin Ruiz', '34343434343', 'juan.holguinr@autonoma.edu.co', 'sara', 'gato', 'kljj', '23', '10', 'Rabia', '2026-10-15', 'manana-tarde', 'Pendiente'),
(3, 3, 'Maria Alejandra Gallego', '3218211498', 'maria.gallegoa@autonoma.edu.co', 'Nova', 'gato', 'Mestizo', '1', '5', 'Rabia, Parvovirus', '2026-10-31', 'manana', 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntarios_spa`
--

CREATE TABLE `voluntarios_spa` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre` varchar(120) DEFAULT NULL,
  `genero` varchar(15) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `experiencia` varchar(20) DEFAULT NULL,
  `horarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `voluntarios_spa`
--

INSERT INTO `voluntarios_spa` (`id`, `usuario_id`, `nombre`, `genero`, `edad`, `experiencia`, `horarios`) VALUES
(1, NULL, 'joaquin miguel valencia', 'femenino', 67, 'propias', 'Mañana (L-V), Tarde (L-V), Noche (L-V), Sábado completo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `solicitudes_adopcion`
--
ALTER TABLE `solicitudes_adopcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `mascota_id` (`mascota_id`);

--
-- Indices de la tabla `solicitudes_paseo`
--
ALTER TABLE `solicitudes_paseo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `vacunaciones`
--
ALTER TABLE `vacunaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `voluntarios_spa`
--
ALTER TABLE `voluntarios_spa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitudes_adopcion`
--
ALTER TABLE `solicitudes_adopcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitudes_paseo`
--
ALTER TABLE `solicitudes_paseo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `vacunaciones`
--
ALTER TABLE `vacunaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `voluntarios_spa`
--
ALTER TABLE `voluntarios_spa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `solicitudes_adopcion`
--
ALTER TABLE `solicitudes_adopcion`
  ADD CONSTRAINT `solicitudes_adopcion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_adopcion_ibfk_2` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `solicitudes_paseo`
--
ALTER TABLE `solicitudes_paseo`
  ADD CONSTRAINT `solicitudes_paseo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `vacunaciones`
--
ALTER TABLE `vacunaciones`
  ADD CONSTRAINT `vacunaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `voluntarios_spa`
--
ALTER TABLE `voluntarios_spa`
  ADD CONSTRAINT `voluntarios_spa_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
