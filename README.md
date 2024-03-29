# Проект: Stella-Burger

## Описание:

**P.S. Проект рассчитан для десктопных устройв и не имеет адаптивной верстки для мобильных устройств**

Проект **stella-Burger** представляет из себя веб-приложения для заказов бургеров.  
Лента заказов обновляется в режиме реального времени благодаря WebSocket соединению.  
Приложение имеет следующую функциональность:

- Конструктор бургеров. Для создания используется Drag and Drop
- Личный кабинет пользователя с возможностью сброса пароля
- Лента заказов, как общая, так и для конкретного пользователя в личном кабинете.
  Лента заказов обновляется в режиме реального времени благодаря webSocket соединению
- Приложение имеет динамические роуты. Также в зависимости от того, как открыть этот роут (кликом на заказ или ингридет, или же напрямую ввести URL), появляется модальное окно или переход на другую страницу.

[Ссылка на сайт](https://stellar-burger-iota.vercel.app/)

## Быстрый старт

<br />

1. Склонировать проект на свой компьютер

```bash
git clone https://github.com/SergeyKazarinov/stellar-burger.git
```

2. Перейти в папку с проектом и установить зависимости в проекте

```bash
cd stellar-burger
npm install
```

3. Запустить проект

```bash
npm start
```

## Stacks:

- TypeScript
- WebSocket
- React.js
- React Hooks
- React Routes
- Redux Toolkit
- Sass Module
- eslint
