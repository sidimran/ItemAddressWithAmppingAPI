import axios from "axios";

const item_base_url = "http://localhost:8082/item/getAllItem";
 const item_by_name = "http://localhost:8082/item/getByItemFirstname?itemName=";

class ItemService {
  getAllItems() {
    return axios.get(item_base_url);
  }

  getByItemName(itemName) {
    return axios.get(`${item_by_name}?${itemName}`);
  }
}

export default new ItemService();
