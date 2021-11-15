import React from "react";

import {
  useSnapshotCollection,
  findProducts,
  convertName,
} from "../utils/product";

const ProductContext = React.createContext();

export function useProduct() {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used in ProductProvider component");
  }
  return context;
}

export function ProductProvider(props) {
  const {
    listData: listProducts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSnapshotCollection("product");

  const [productsSearch, setProductsSearch] = React.useState("");

  // Array of userID of shop in firebase
  const [SelectedShop, setSelectedShop] = React.useState("");

  const [resultSearch, setResultSearch] = React.useState([]);

  React.useEffect(() => {
    const result = findProducts(listProducts, productsSearch, SelectedShop);
    setResultSearch(result);
  }, [listProducts, productsSearch, SelectedShop]);

  function searchProduct(search) {
    const productSearch = convertName(search);
    setProductsSearch(productSearch);
  }

  function selectShop(shopID) {
    if (SelectedShop === shopID) {
      //remove shop
      setSelectedShop("");
    } else {
      setSelectedShop(shopID);
    }
  }

  const value = {
    searchProduct,
    selectShop,
    SelectedShop,
    resultSearch,

    listProducts,
    isLoading,
    isSuccess,
    isError,
    error,
  };

  return <ProductContext.Provider value={value} {...props} />;
}
