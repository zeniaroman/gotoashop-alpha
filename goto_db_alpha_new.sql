-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 08 2020 г., 18:41
-- Версия сервера: 5.7.23
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `goto_db_alpha`
--

-- --------------------------------------------------------

--
-- Структура таблицы `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `iso` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `country`
--

INSERT INTO `country` (`id`, `name`, `iso`) VALUES
(1, 'Online', 'ON'),
(2, 'United States of America', 'US');

-- --------------------------------------------------------

--
-- Структура таблицы `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `store` int(11) NOT NULL,
  `seller` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` text NOT NULL,
  `amount` text NOT NULL,
  `preview` text NOT NULL,
  `images` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `goods`
--

INSERT INTO `goods` (`id`, `store`, `seller`, `name`, `price`, `amount`, `preview`, `images`, `description`) VALUES
(1, 1, 1, 'Individual Online Lesson', '$ 25', '1h', '', '', ''),
(2, 1, 1, 'Group Online Lesson', '$ 10', '1h', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `country` int(11) NOT NULL,
  `city` text NOT NULL,
  `area` text NOT NULL,
  `name` text NOT NULL,
  `payment` text NOT NULL,
  `address` text NOT NULL,
  `maplink` text NOT NULL,
  `worktime` text NOT NULL,
  `contact` text NOT NULL,
  `description` text NOT NULL,
  `preview` text NOT NULL,
  `json` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `stores`
--

INSERT INTO `stores` (`id`, `owner`, `country`, `city`, `area`, `name`, `payment`, `address`, `maplink`, `worktime`, `contact`, `description`, `preview`, `json`) VALUES
(1, 1, 1, 'New York', 'Online', 'English Teacher', '', '', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1548761.119528575!2d-75.10031943786443!3d40.697670069222035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sua!4v1588963130964!5m2!1sen!2sua', '', '', '', 'https://cdn.dribbble.com/users/101713/screenshots/6597581/one.png', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `permission` int(11) NOT NULL,
  `email` char(255) NOT NULL,
  `hash` char(255) NOT NULL,
  `key` char(255) NOT NULL,
  `name` char(255) NOT NULL,
  `username` char(50) NOT NULL,
  `avatar` char(255) NOT NULL,
  `json` char(255) NOT NULL,
  `reg_date` char(255) NOT NULL,
  `session_tokens` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `permission`, `email`, `hash`, `key`, `name`, `username`, `avatar`, `json`, `reg_date`, `session_tokens`) VALUES
(1, 1, 'r@m.c', '$2y$05$Ro7QbDJ9vpuyrKf7WvbSeuDjrg7M8AlgXJ8vE1zkw9ct9B0pIasKC', '', '', '', '', '', '', '{\"1602754342\":{\"hash\":\"xRcoDSntvBY\"},\"1602757547\":{\"hash\":\"YMsPCRVu_1U\"}}'),
(2, 3, 't@m.c', '$2y$05$BfOVWGfBpt1UtpTBTGqADeOTCKsnMiuua9B.rHTK2S/Z7l.sVWpC2', '', 'Visitor', '', '', '', '', '{\"1602783680\":{\"hash\":\"WBvzrxqgtDY\"}}');

-- --------------------------------------------------------

--
-- Структура таблицы `user_permission`
--

CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL,
  `name` char(50) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_permission`
--

INSERT INTO `user_permission` (`id`, `name`, `value`) VALUES
(1, 'Administrator', 100),
(2, 'Moderator', 90),
(3, 'User', 20),
(4, 'Guest', 10);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store` (`store`),
  ADD KEY `seller` (`seller`);

--
-- Индексы таблицы `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country` (`country`),
  ADD KEY `owner` (`owner`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission` (`permission`);

--
-- Индексы таблицы `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`store`) REFERENCES `stores` (`id`),
  ADD CONSTRAINT `goods_ibfk_2` FOREIGN KEY (`seller`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`country`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `stores_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permission`) REFERENCES `user_permission` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
