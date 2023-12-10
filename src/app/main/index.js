import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useMatch, Outlet,useParams } from "react-router-dom";
import ProductInfo from '../../pages/index'
let PageSize = 10;
function Main() {

  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const homeLink = useMatch("/");
  const itemLink = useMatch("/:id");
   const { id } = useParams();


  useEffect(() => {
    store.actions.catalog.loadPages(currentPage);
  }, [store]);

  const handleChange = useCallback((newPage) => {
    setCurrentPage(newPage)
    store.actions.catalog.loadPages(newPage);
  }, [store]);
  // store.actions.catalog.load();
  const select = useSelector(state => ({
    list: state.catalog.list,
    listAll: state.catalog.listAll,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.catalog.limit,
    listNext: state.catalog.listNext,
    pages: state.catalog.pages,
    itemInfo: state.item.itemInfo,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //открытие страницы с информацией
    getItemInfo: useCallback((_id) =>
    store.actions.item.getItemInfo(_id)
    , [store]),
    getItemById: useCallback((id) =>
    store.actions.item.getItemById(id)
    , [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} getItemInfo={callbacks.getItemInfo} />
    }, [callbacks.addToBasket, callbacks.getItemInfo]),
  };
console.log(id)
  return (
    <PageLayout>
      <Head title={homeLink ? 'Магазин' : (select.itemInfo? select.itemInfo?.title: '')} />
      {(homeLink || itemLink) && <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />}
      {homeLink &&
        (<>
         <List list={select.list} renderItem={renders.item} />
          <Pagination
            totalPages={select.limit}
            currentPage={currentPage}
            limit={10}
            onPageChange={handleChange}
          />
        </>)}
      {!!itemLink && (
        <ProductInfo renderItem={renders.item} item={select.itemInfo !== null? select.itemInfo : callbacks.getItemById(id)}/>
      )}
      <Outlet />
    </PageLayout>

  );
}

export default memo(Main);
