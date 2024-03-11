-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 07. 11:19
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `flytech`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `flights`
--

CREATE TABLE `flights` (
  `starting_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `distance` int(11) NOT NULL,
  `period` int(250) NOT NULL,
  `price` int(11) NOT NULL,
  `direction` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `flights`
--

INSERT INTO `flights` (`starting_id`, `name`, `distance`, `period`, `price`, `direction`) VALUES
(1, 'Balatoni körút', 344, 100, 60000, 'Dunakeszi - Budapest - Székesfehérvár - Siófok - Keszthely - Balatonfüred - Székesfehérvár -Budapest - Dunakeszi'),
(1, 'Déli körút', 162, 50, 30000, 'Dunakeszi - Budapest - Szigetszentmiklós - Ráckeve - Dunaújváros - Kunszentmiklós - Dabas - Budapest - Dunakeszi'),
(1, 'Keleti körút', 270, 80, 50000, 'Dunakeszi - Vác - Salgótarján - Eger - Tiszafüred - Jászberény - Gödöllő - Dunakeszi'),
(2, 'Balatoni körút', 190, 60, 35000, 'Hévíz - Keszthely - Fonyód - Balatonszemes - Siófok - Balatonkenese - Balatonfüred - Badacsonytomaj - Hévíz'),
(2, 'Északi kör', 314, 90, 55000, 'Hévíz - Zalaegerszeg- Vasvár - Szombathely - Kőszeg - Bük - Celldömölk - Devecser - Tapolca - Hévíz'),
(2, 'Déli körút', 240, 70, 45000, 'Hévíz - Marcali - Kaposvár - Szigetvár - Csurgó - Zalakaros - Hévíz'),
(3, 'Északi körút', 230, 70, 40000, 'Szeged - Hódmezővásárhely - Szentes - Kecskemét - Kiskunfélegyház - Kiskunhalas - Mórahalom - Szeged'),
(3, 'Nyugati körút', 250, 75, 45000, 'Szeged - Mórahalom - Bácsalmás - Baja - Kiskörős - Kiskunmajsa - Szeged'),
(3, 'Keleti körút', 300, 90, 55000, 'Szeged - Makó - Gyula - Békéscsaba - Szarvas - Szentes - Szeged'),
(4, 'Északi körút', 350, 105, 60000, 'Debrecen - Nyíregyháza - Miskolc - Eger - Tiszafüred - Debrecen'),
(4, 'Déli körút', 300, 90, 55000, 'Debrecen - Berettyóújfalu - Békéscsaba - Törökszentmiklós - Karcag - Debrecen'),
(4, 'Nyugati körút', 60, 90, 35000, 'Debrecen - Tiszaújváros - Mezőkövesd - Tiszafüred - Debrecen');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `begin` datetime NOT NULL,
  `ended` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `planes`
--

CREATE TABLE `planes` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `seats` int(11) NOT NULL,
  `img` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `planes`
--

INSERT INTO `planes` (`id`, `name`, `seats`, `img`) VALUES
(1, 'Hawker 400xp', 7, 'hawker.jpg'),
(2, 'King air 250', 8, 'king_air.jpg'),
(3, 'Citation Mustang', 7, 'citation_mustang.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `starting_point`
--

CREATE TABLE `starting_point` (
  `id` int(11) NOT NULL,
  `city` varchar(10) NOT NULL,
  `img` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `starting_point`
--

INSERT INTO `starting_point` (`id`, `city`, `img`) VALUES
(1, 'Dunakeszi', 'dunakeszi'),
(2, 'Hévíz', 'heviz'),
(3, 'Szeged', 'szeged'),
(4, 'Debrecen', 'debrecen');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `testdrive`
--

CREATE TABLE `testdrive` (
  `id` int(11) NOT NULL,
  `plane_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `country_code` varchar(3) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `experience` tinyint(1) NOT NULL,
  `comment` text NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `starting_point`
--
ALTER TABLE `starting_point`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `testdrive`
--
ALTER TABLE `testdrive`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `testdrive`
--
ALTER TABLE `testdrive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
