import axios from "axios";
import { RsetMessageModal } from "../common/slices/mainSlice";
import { store } from "../common/store/store";

axios.defaults.baseURL = 'http://2.186.229.181:3322/api'

axios.interceptors.request.use(
  function (config) {
    // const dispatch = store.dispatch()
    const state = store.getState();
    if (config.url.toLowerCase().includes("bill/batchinsert")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    if (localStorage.getItem("tokenId") !== null) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "tokenId"
      )}`;
      // store.dispatch(handleGetUserProfileInfo())
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  async function (response) {
    const rowMsgMod = response?.data?.message?.split("//");
    const allRowMsgMod = rowMsgMod?.map((item) => (
      <ul className="px-4 py-2">
        <li className=""> {item} </li>
      </ul>
    ));

    // if (!!response?.headers?.authorization) {
    //     console.log(!!response?.headers?.authorization, "This is set token");
    //     const fixTokenId = response?.headers?.authorization?.split(" ")?.[1]
    //     localStorage?.setItem("tokenId", fixTokenId)
    // }

    if (
      !!response?.data?.code &&
      response?.data?.code !== 0 &&
      response?.data?.code !== 2 &&
      response?.data?.code !== 5 &&
      response?.data?.code !== 10 &&
      response?.data?.code !== 11
    ) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title: allRowMsgMod || "مشکلی در سرور به وجود آمده است.",
        })
      );
    }
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      store.dispatch(
        RsetMessageModal({
          show: true,
          title:
            error.response.data.message || "مشکلی در سرور به وجود آمده است.",
        })
      );
      localStorage.clear();
      window.location = "/login";
    }
    try {
      const expectedErrors =
        error.response &&
        error.response.status !== 401 &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedErrors) {
        store.dispatch(
          RsetMessageModal({
            show: true,
            title:
              error.response.data.message || "مشکلی در سرور به وجود آمده است.",
          })
        );
        return;
      }
    } catch (error) {
      console.log(error);
      const { message } = error;
      // Do something with response error
      store.dispatch(
        RsetMessageModal({
          show: true,
          title:
            error.response.data.message || "مشکلی در سرور به وجود آمده است.",
        })
      );
      return Promise.reject(message);
    }
  }
);
//   async function (error) {
//     const expectedErrors = error.response && error.response.status !== 401 && error.response.status >= 400 && error.response.status < 500
//     if (expectedErrors) {
//       setTimeout(() => {
//         window.location = "/login";
//         localStorage.clear();
//       }, 2000);
//       store.dispatch(
//         RsetMessageModal({
//           show: true,
//           title:
//             error.response.data.message || "مشکلی در سرور به وجود آمده است.",
//         })
//       );
//       return error;
//     } else {
//       localStorage.clear();
//       return error;
//     }
//   }
// );
