import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';
//добавила функцию, которая запускает счетчик через замыкание, 
//для определения уникального id
function counterid(){
  let i = 1;

  return function(){
      return i++;
  };
};
//объявила константу
export const uuid = counterid();
//для элементов массива создала новые начальные состояния для счетчика и id
const store = new Store({
  list: [
    { code: uuid(), title: 'Название элемента', counter: 0},
    { code: uuid(), title: 'Некий объект', counter: 0},
    { code: uuid(), title: 'Заголовок', counter: 0},
    { code: uuid(), title: 'Очень длинное название элемента из семи слов', counter: 0},
    { code: uuid(), title: 'Запись', counter: 0},
    { code: uuid(), title: 'Шестая запись', counter: 0},
    { code: uuid(), title: 'Седьмая запись', counter: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
