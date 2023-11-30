import React, { useCallback, useState, useMemo } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import EmptyPage from './components/empty-page';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [bascet, setBascet] = useState([]);
  const [count, setCount] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    addToCart: useCallback((item, quantity = 1) => {
      // нужно проверить, нет ли уже такого товара в корзине
      const itemFind = bascet.find(el => el.code === item.code);
      const updatedArray = [...bascet];
      if (!itemFind) {
        const newItem = {
          ...item,
          quantity: quantity
        };
        setBascet([...bascet, newItem]);
        setCount(count + 1)
      } else {
        itemFind.quantity = itemFind?.quantity + 1;
        setBascet(updatedArray);
        setCount(count + 1)
      }
    }, [bascet]),

    openModal: useCallback(() => {
      setIsOpenModal(true);
    }, [isOpenModal]),

    closeModal: useCallback(() => {
      setIsOpenModal(false);
    }, [isOpenModal]),

    deleteItemFromCard: useCallback((item) => {
      const updatedArray = bascet.filter(el => el.code !== item.code);
      setBascet(updatedArray);
      setCount(count - item.quantity)
    }, [bascet]),
  }
  // // console.log(bascet)
  // console.log(count)
  return (
  <>
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        array={bascet}
        count={count}
        modal={callbacks.openModal}
        buttonName='Перейти'
      />
      <List list={list}
        buttonAction={callbacks.addToCart} button='Добавить' />
    </PageLayout>
    {isOpenModal && (
      (<Modal onClose={callbacks.closeModal}>
        <>
        <Head title='Корзина' array={bascet} count={count} modal={callbacks.closeModal} buttonName='Закрыть' />
        {bascet.length ? (<List list={bascet}
          buttonAction={callbacks.deleteItemFromCard}
          button='Удалить' />) : <EmptyPage description='Пусто'/>}
        </>
      </Modal>)
    )}
  </>
  );
}

export default App;
