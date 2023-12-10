
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Routes, Route } from "react-router-dom";
import ProductInfo from '../pages/index'
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes >
        <Route path={'/'} element={<Main />}>
          <Route path={'/:id'} element={<ProductInfo/>} />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
