import item from "./components/item";
import { generateCode, totalPrice } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   */

  addToCart(code, quantity = 1) {
    const itemFind = this.state.bascet.find(el => el.code === code);
    if (!itemFind) {
      //сначала создадим переменную с новым эдементом
      const newItem = {
        ...this.state.list.find(el => el.code === code),
        quantity: quantity
      };
      this.setState({
        ...this.state,
        bascet: [...this.state.bascet, newItem],
        totalPriceBascet: totalPrice([...this.state.bascet, newItem])
      });
    } else {
      itemFind.quantity = itemFind?.quantity + 1;
      this.setState({
        ...this.state,
        bascet: [...this.state.bascet],
        totalPriceBascet: totalPrice([...this.state.bascet])
      });
    }
  };



  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItemFromCard(code) {
    const newArr = [...this.state.bascet].filter(item => item.code !== code);
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      bascet: newArr,
      totalPriceBascet: totalPrice(newArr)
    })
  };
}
/**
 * Выделение записи по коду
 * @param code
 */
//   selectItem(code) {
//     this.setState({
//       ...this.state,
//       list: this.state.list.map(item => {
//         if (item.code === code) {
//           // Смена выделения и подсчёт
//           return {
//             ...item,
//             selected: !item.selected,
//             count: item.selected ? item.count : item.count + 1 || 1,
//           };
//         }
//         // Сброс выделения если выделена
//         return item.selected ? {...item, selected: false} : item;
//       })
//     })
//   }
// }

export default Store;
