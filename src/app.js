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
  const bascet = store.getState().bascet;
  const totalPriceBascet = store.getState().totalPriceBascet;
  // const [bascet, setBascet] = useState([]);
  // const [count, setCount] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    openModal: useCallback(() => {
      setIsOpenModal(true);
    }, [isOpenModal]),

    closeModal: useCallback(() => {
      setIsOpenModal(false);
    }, [isOpenModal]),

    deleteItemFromCard: useCallback((code) => {
      store.deleteItemFromCard(code);
    }, [store]),
  }

  return (
  <>
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        array={bascet}
        totalPrice={totalPriceBascet}
        modal={callbacks.openModal}
        buttonName='Перейти'
      />
      <List list={list}
        buttonAction={callbacks.addToCart} button='Добавить' />
    </PageLayout>
    {isOpenModal && (
      (<Modal onClose={callbacks.closeModal}>
        <>
        <Head title='Корзина' array={bascet} totalPrice={totalPriceBascet} modal={callbacks.closeModal} buttonName='Закрыть' />
        {bascet.length ? (<List list={bascet}
          totalPrice={totalPriceBascet}
          buttonAction={callbacks.deleteItemFromCard}
          button='Удалить' />) : <EmptyPage description='Пусто'/>}
        </>
      </Modal>)
    )}
  </>
  );
}

export default App;
