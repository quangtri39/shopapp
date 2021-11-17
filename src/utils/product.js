import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";

import { useAuth } from "../Contexts/AuthContext";

function useSnapshotCollection(collectionName, whereKey, whereValue) {
  const [status, setStatus] = React.useState("loading");
  const [error, setError] = React.useState(null);
  const [listData, setListData] = React.useState([]);

  React.useEffect(() => {
    // console.log("useSnapshotCollection");

    if (!collectionName) {
      return;
    }
    let q;
    if (whereKey && whereValue) {
      q = query(
        collection(db, collectionName),
        where(whereKey, "==", whereValue)
      );
    } else {
      q = collection(db, collectionName);
    }
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let result = [];

        if (querySnapshot.empty) {
          setStatus("error");
          setError(`There is no item!`);
        } else {
          querySnapshot.forEach((doc) => {
            result = [...result, { id: doc.id, ...doc.data() }];
          });
          setListData(result);
          setStatus("success");
        }
      },
      (error) => {
        setStatus("error");
        setError(error.toString());
      }
    );
    return unsubscribe;
  }, [collectionName, whereKey, whereValue]);

  return {
    listData,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
}

function useSnapshotCollectionUID(collectionName, paramName) {
  const [status, setStatus] = React.useState("loading");
  const [error, setError] = React.useState(null);
  const [listData, setListData] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    // console.log("useSnapshotCollectionUID");
    if (!currentUser) {
      return;
    }
    const unsubscribe = onSnapshot(
      query(
        collection(db, collectionName),
        where(paramName, "==", currentUser.uid)
      ),
      (querySnapshot) => {
        let result = [];

        if (querySnapshot.empty) {
          setStatus("error");
          setError(`There is no item!`);
        } else {
          querySnapshot.forEach((doc) => {
            result = [...result, { id: doc.id, ...doc.data() }];
          });
          setListData(result);
          setStatus("success");
        }
      },
      (error) => {
        setStatus("error");
        setError(error.toString());
      }
    );
    return unsubscribe;
  }, [currentUser, collectionName, paramName]);

  return {
    listData,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
}

function useSnapshotCollectionParam(collectionName, paramName) {
  const [status, setStatus] = React.useState("loading");
  const [error, setError] = React.useState(null);
  const [listData, setListData] = React.useState([]);

  const params = useParams();

  React.useEffect(() => {
    // console.log("useSnapshotCollectionParam");
    if (!collectionName) {
      return;
    }
    let q;
    if (params[paramName]) {
      q = query(
        collection(db, collectionName),
        where(paramName, "==", params[paramName])
      );
    } else {
      q = collection(db, collectionName);
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let result = [];
        if (querySnapshot.empty) {
          setStatus("error");
          setError(`There is no item!`);
        } else {
          querySnapshot.forEach((doc) => {
            result = [...result, { id: doc.id, ...doc.data() }];
          });
          setListData(result);
          setStatus("success");
        }
      },
      (error) => {
        setStatus("error");
        setError(error.toString());
      }
    );
    return unsubscribe;
  }, [collectionName, paramName, params]);

  return {
    listData,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
}

function useSnapshotCollectionDocId(collectionName, filterArray) {
  const [status, setStatus] = React.useState("loading");
  const [error, setError] = React.useState(null);
  const [listData, setListData] = React.useState([]);

  React.useEffect(() => {
    // console.log("useSnapshotCollectionDocId");
    if (!collectionName) {
      return;
    }
    let q;
    if (!filterArray?.length) {
      setStatus("error");
      setError(`There is no item!`);
      return;
    } else {
      q = query(
        collection(db, collectionName),
        where(documentId(), "in", filterArray)
      );
    }
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let result = [];

        if (querySnapshot.empty) {
          setStatus("error");
          setError(`There is no item!`);
        } else {
          querySnapshot.forEach((doc) => {
            result = [...result, { id: doc.id, ...doc.data() }];
          });
          setListData(result);
          setStatus("success");
        }
      },
      (error) => {
        setStatus("error");
        setError(error.toString());
      }
    );
    return unsubscribe;
  }, [collectionName, filterArray]);

  return {
    listData,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
}

function useSnapshotCollectionQueryIn(collectionName, field, filterArray) {
  const [status, setStatus] = React.useState("loading");
  const [error, setError] = React.useState(null);
  const [listData, setListData] = React.useState([]);

  React.useEffect(() => {
    // console.log("useSnapshotCollectionQueryIn");
    if (!collectionName) {
      return;
    }
    let q;
    if (field && filterArray.length) {
      q = query(
        collection(db, collectionName),
        where(field, "in", filterArray)
      );
    } else {
      q = collection(db, collectionName);
    }
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let result = [];

        if (querySnapshot.empty) {
          setStatus("error");
          setError(`There is no item!`);
        } else {
          querySnapshot.forEach((doc) => {
            result = [...result, { id: doc.id, ...doc.data() }];
          });
          setListData(result);
          setStatus("success");
        }
      },
      (error) => {
        setStatus("error");
        setError(error.toString());
      }
    );
    return unsubscribe;
  }, [collectionName, field, filterArray]);

  return {
    listData,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
}

function useCollectionParamDocId(collectionName, paramName) {
  const [status, setStatus] = React.useState("loading");
  const [error, setError] = React.useState(null);
  const [listData, setListData] = React.useState([]);

  const params = useParams();

  React.useEffect(() => {
    // console.log("useCollectionParamDocId");
    if (!collectionName) {
      return;
    }
    let q;
    if (params[paramName]) {
      q = query(
        collection(db, collectionName),
        where(documentId(), "==", params[paramName])
      );
    } else {
      q = collection(db, collectionName);
    }
    async function getData() {
      try {
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach((doc) => {
          result = [...result, { id: doc.id, ...doc.data() }];
        });
        if (!result.length) {
          setStatus("error");
          setError(`There is no item!`);
        } else {
          setListData(result);
          setStatus("success");
        }
      } catch (e) {
        setStatus("error");
        setError(e);
      }
    }
    getData();
  }, [collectionName, paramName, params]);

  return {
    listData,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
}

async function addFirebaseDoc(docName, data) {
  return await addDoc(collection(db, docName), data);
}

async function updateFirebaseDoc(docName, data, idDoc) {
  return await updateDoc(doc(db, docName, idDoc), data);
}

async function deleteFirebaseDoc(docName, idDoc) {
  return await deleteDoc(doc(db, docName, idDoc));
}

async function getShopInfo(shopId) {
  if (!shopId) {
    throw Error("UserID Not yet entered!");
  }
  let result = [];
  const q = query(collection(db, "shop"), where("shopId", "==", shopId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result = [...result, { id: doc.id, ...doc.data() }];
  });
  return result;
}

async function updateShopInfo(shopInfo) {
  let [firstShop] = await getShopInfo(shopInfo.shopId);

  if (firstShop) {
    // update
    const docRef = doc(db, "shop", firstShop.id);
    await updateDoc(docRef, shopInfo);
  } else {
    //add new
    await addDoc(collection(db, "shop"), shopInfo);
  }
}

function findProducts(listProducts, search, selectedShop) {
  if (selectedShop) {
    return listProducts.filter((product) => {
      const productName = convertName(product.name);
      return (
        productName.includes(search) > 0 && selectedShop === product.userID
      );
    });
  }
  return listProducts.filter((product) => {
    const productName = convertName(product.name);
    return productName.includes(search) > 0;
  });
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}
function convertName(name) {
  return removeVietnameseTones(name.trim().toLowerCase());
}

export {
  useSnapshotCollection,
  useSnapshotCollectionParam,
  useSnapshotCollectionQueryIn,
  useSnapshotCollectionUID,
  useSnapshotCollectionDocId,
  useCollectionParamDocId,
  findProducts,
  convertName,
  addFirebaseDoc,
  updateShopInfo,
  updateFirebaseDoc,
  deleteFirebaseDoc,
};
