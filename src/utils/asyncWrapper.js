import { handleLoading } from "../common/slices/mainSlice";
import { store } from "../common/store/store";

const asyncWrapper = (fn) => {
  return (...args) => {
    return fn(...args).catch((error) => {
      store.dispatch(handleLoading({ loading: false }));
      console.error(error);
      throw error;
    });
  };
};

export default asyncWrapper;
