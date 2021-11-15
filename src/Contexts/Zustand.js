import create from "zustand";

const useStore = create((set) => ({
  listProduct: [],
  productCount: 0,
  addProduct: (product) =>
    set((state) => {
      // kiểm tra có trong list product ko
      const isIncluded = state.listProduct.some(
        (item) => item.id === product.id
      );
      if (isIncluded) {
        // trả lại list mới và tăng count product lên 1
        const newList = state.listProduct.map((item) => {
          if (item.id === product.id) {
            const newCount = item.count + 1;
            return { ...item, count: newCount };
          }
          // Không trùng id thì không cần làm gì cả
          return item;
        });
        return { listProduct: newList, productCount: state.productCount + 1 };
      } else {
        // trả lại list mới chứa product vừa add vô
        return {
          listProduct: [...state.listProduct, { ...product, count: 1 }],
          productCount: state.productCount + 1,
        };
      }
    }),
  minusProduct: (product) =>
    set((state) => {
      // kiểm tra có trong list product ko, lấy product đầu tiên sau khi filter
      const [productFilter] = state.listProduct.filter(
        (item) => item.id === product.id
      );

      if (!productFilter) {
        return;
      }
      // kiểm tra xem count có lớn hơn 1 không, xóa nếu bé hơn = 1
      const removeProduct = state.listProduct.filter(
        (item) => item.id !== productFilter.id
      );
      if (productFilter.count < 1) {
        return { listProduct: removeProduct };
      } else if (productFilter.count === 1) {
        return {
          listProduct: removeProduct,
          productCount: state.productCount - 1,
        };
      } else {
        // có sản phẩm và sản phẩm count đã lớn hơn 1
        // trả lại list mới và giảm count xuống 1
        const newList = state.listProduct.map((item) => {
          if (item.id === product.id) {
            const newCount = item.count - 1;
            return { ...item, count: newCount };
          }
          // Không trùng id thì không cần làm gì cả
          return item;
        });
        return { listProduct: newList, productCount: state.productCount - 1 };
      }
    }),
  removeProduct: (product) =>
    set((state) => {
      const newList = state.listProduct.filter(
        (item) => item.id !== product.id
      );
      const newCount = state.listProduct.reduce(
        (previousCount, currentProduct) => {
          if (currentProduct.id !== product.id) {
            return previousCount + currentProduct.count;
          }
          return previousCount;
        },
        0
      );
      return { listProduct: newList, productCount: newCount };
    }),
  clearStorage: () => set({ listProduct: [], productCount: 0 }),
}));

export default useStore;
