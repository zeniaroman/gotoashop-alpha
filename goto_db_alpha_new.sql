-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 13 2020 г., 12:52
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
(1, 1, 1, '	Cherry Cheesecake', '3.95', 'slice', '', '', ''),
(2, 1, 1, '	NY Famous Cheesecake', '4.95', 'slice', '', '', ''),
(3, 1, 1, 'Lemon CoconutCake', '1.95', 'slice', 'https://aclassictwist.com/wp-content/uploads/2018/01/Meyer-Lemon-Coconut-Cake-3-480x480.jpg', '', ''),
(4, 2, 1, 'Schar Artisan Baker Bread - Multigrain , 14.1 Oz', '4.87', '', 'https://i5.walmartimages.com/asr/4a1f2478-895d-4de8-b197-90a400f3dd14_1.4ade4606d96f1fed36d18cafc34f8636.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `shops`
--

CREATE TABLE `shops` (
  `id` int(10) NOT NULL,
  `owner` int(10) NOT NULL,
  `country` int(10) NOT NULL,
  `category` int(10) NOT NULL,
  `city` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `verified` tinyint(4) NOT NULL,
  `payments` text NOT NULL,
  `address` text NOT NULL,
  `maplink` text NOT NULL,
  `worktime` text NOT NULL,
  `contact` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `preview` text NOT NULL,
  `joined` date NOT NULL,
  `referral` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `shops`
--

INSERT INTO `shops` (`id`, `owner`, `country`, `category`, `city`, `area`, `name`, `rating`, `verified`, `payments`, `address`, `maplink`, `worktime`, `contact`, `description`, `preview`, `joined`, `referral`) VALUES
(1, 1, 2, 1, 'New York', 'NY', 'Hudson Market Place', 4.5, 1, '', '755 9th Ave', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3021.940694459247!2d-73.9916142!3d40.7633291!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xee3032278a602204!2sHudson%20Market%20Place!5e0!3m2!1sen!2sua!4v1589272306866!5m2!1sen!2sua', '[{\"all\": \"Open 24 hours\"}]', '(541) 754-3010', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'https://lh5.googleusercontent.com/p/AF1QipOACOK9QDYZB9v8WTQ1nM3NbgwSCO15pH03-1Fo=w426-h240-k-no', '2020-05-12', 0),
(2, 1, 2, 1, 'New York', 'NY', 'Amish Market', 4.8, 1, '', '731 9th Ave', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3021.940694459247!2d-73.9916142!3d40.7633291!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7924b7353e0f599b!2sAmish%20Market!5e0!3m2!1sen!2sua!4v1589365535964!5m2!1sen!2sua', '[{\"all\": \"Open 24 hours\"}]', '(541) 754-3012', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'https://lh5.googleusercontent.com/p/AF1QipMR9mj_qQL6ZxnDyQ_XbEfZhDTjxCLuH3XG4KiI=w408-h306-k-no', '2020-05-13', 0),
(3, 1, 2, 1, 'New York', 'NY', 'Green Rancho', 4.7, 1, '', '741 9th Ave', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.922608354562!2d-73.9912956845935!3d40.76372687932629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25850d3f10ed9%3A0x50a5a6f94212f7c5!2s741%209th%20Ave%2C%20New%20York%2C%20NY%2010019%2C%20USA!5e0!3m2!1sen!2sua!4v1589366467428!5m2!1sen!2sua', '[{\"all\": \"Open 24 hours\"}]', '(541) 754-3012', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'https://geo0.ggpht.com/cbk?panoid=gOnU9e6-LkDqIABwjCrktQ&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=292.0643&pitch=0&thumbfov=100', '2020-05-13', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `shop_categories`
--

CREATE TABLE `shop_categories` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `shop_categories`
--

INSERT INTO `shop_categories` (`id`, `name`) VALUES
(1, 'grocery'),
(2, 'petshop');

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
(1, 1, 1, 'New York', 'NY', 'Hudson Market Place', '', '755 9th Ave', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1548761.119528575!2d-75.10031943786443!3d40.697670069222035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sua!4v1588963130964!5m2!1sen!2sua', '', '', '', 'https://lh5.googleusercontent.com/p/AF1QipOACOK9QDYZB9v8WTQ1nM3NbgwSCO15pH03-1Fo=w426-h240-k-no', ''),
(2, 1, 1, 'New York', 'NY', 'Hudson Market Place', '', '755 9th Ave', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1548761.119528575!2d-75.10031943786443!3d40.697670069222035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sua!4v1588963130964!5m2!1sen!2sua', '', '', '', 'https://lh5.googleusercontent.com/p/AF1QipOACOK9QDYZB9v8WTQ1nM3NbgwSCO15pH03-1Fo=w426-h240-k-no', '');

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
(1, 1, 'r@m.c', '$2y$05$Ro7QbDJ9vpuyrKf7WvbSeuDjrg7M8AlgXJ8vE1zkw9ct9B0pIasKC', '', '', '', '', '', '', '{\"1602754342\":{\"hash\":\"xRcoDSntvBY\"},\"1602757547\":{\"hash\":\"YMsPCRVu_1U\"},\"1602853466\":{\"hash\":\"thtp-jecXrc\"},\"1603181245\":{\"hash\":\"wVNzdiec3io\"},\"1603187456\":{\"hash\":\"JVXxl50Mb7Y\"},\"1603188290\":{\"hash\":\"gp3DNvzV1lg\"}}'),
(2, 3, 't@m.c', '$2y$05$BfOVWGfBpt1UtpTBTGqADeOTCKsnMiuua9B.rHTK2S/Z7l.sVWpC2', '', 'Visitor', '', '', '', '', '[]');

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
-- Индексы таблицы `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `country` (`country`),
  ADD KEY `category` (`category`);

--
-- Индексы таблицы `shop_categories`
--
ALTER TABLE `shop_categories`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `shops`
--
ALTER TABLE `shops`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `shop_categories`
--
ALTER TABLE `shop_categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Ограничения внешнего ключа таблицы `shops`
--
ALTER TABLE `shops`
  ADD CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `shops_ibfk_2` FOREIGN KEY (`country`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `shops_ibfk_3` FOREIGN KEY (`category`) REFERENCES `shop_categories` (`id`);

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
