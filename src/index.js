import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';
//добавила функцию, которая запускает счетчик через замыкание, 
//для определения уникального id
function counterid(){
  var i = 0;

  return function(){
      return i++;
  };
};
//объявила константу
export const uuid = counterid();
//для элементов массива создала новые начальные состояния для счетчика и id
const store = new Store({
  list: [
    { code: 1, title: 'Название элемента', counter: 0, id: uuid() },
    { code: 2, title: 'Некий объект', counter: 0, id: uuid() },
    { code: 3, title: 'Заголовок', counter: 0, id: uuid() },
    { code: 4, title: 'Очень длинное название элемента из семи слов', counter: 0, id: uuid() },
    { code: 5, title: 'Запись', counter: 0, id: uuid() },
    { code: 6, title: 'Шестая запись', counter: 0, id: uuid() },
    { code: 7, title: 'Седьмая запись', counter: 0, id: uuid() },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
