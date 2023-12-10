import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      listAll: [],
      limit: 0,
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      listAll: json.result.items,
    }, 'Загружены товары из АПИ');
  }


  async loadPages(page){
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(page*10)-10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      limit: json.result.count,
      // pages: (Math.ceil(json.result.count / 10))
    }, 'Новый список товаров');
  }
}

export default Catalog;
