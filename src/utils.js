const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export const createPluralization = (countNumber, arrayCases) => {
  //добавила переменную, которая возвращает наименьшую 
  //значащую цифру, для создания условий отображения
  let number = countNumber % 10;
  if (number > 10 && number < 20){ 
      return `${countNumber} ${arrayCases[0]}`; 
  }
  if (number > 1 && number < 5){
       return `${countNumber} ${arrayCases[1]}`; 
      }
  if (number === 1){ 
      return `${countNumber} ${arrayCases[0]}`; 
  }
  return `${countNumber} ${arrayCases[0]}`;
}

// console.log(create(756, ['раз', 'раза']))