import {
  createAsyncThunk,
  createSlice,
  ThunkAction,
  ThunkDispatch,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import {
  createAccount,
  generateKeys,
  getUserMenuList,
  getUserProfileInfo,
  getUserTypes,
  login,
  updateAccount,
} from "../../services/masterServices";
import {
  AllServiceMaster,
  Login,
  ReduxToolkitType,
  Role,
  SelectOption,
  SignUpAccount,
  UpdateAccount,
  UserMenuItem,
} from "../../models/AllData.model";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { handleLoading, RsetShowToast } from "./mainSlice";
import { browserName, browserVersion } from "react-device-detect";

interface Account {
  userType?: SelectOption[];
  userRole?: Role;
  userMenu?: UserMenuItem[];
}

const initialState: Account = {
  userType: [],
  userRole: {},
  userMenu: [],
};

// handle get User Types
export const handleCreateAccount = createAsyncThunk(
  "account/handleCreateAccount",
  async (obj: any, { dispatch, getState }: any) => {
    dispatch(handleLoading({ loading: true }));
    try {
      // console.log(obj?.username, "obj");
      const postData: SignUpAccount = {
        name: obj?.data?.name || null,
        username: obj?.data?.username || null,
        password: obj?.data?.password || null,
        lastName: obj?.data?.lastName || null,
        nationalId: obj?.data?.nationalId || null,
        personTypeId: obj?.data?.personTypeId?.id || null,
        mobileNumber: obj?.data?.mobileNumber || null,
        twoStageLogin: 0,
        confirmPassword: obj?.data?.confirmPassword || null,
        economicCode: obj?.data?.economicCode || null,
      };
      console.log(postData, "postData");
      const resCreateAccount = await createAccount(postData);
      console.log(resCreateAccount);
      if (resCreateAccount?.data?.code === 0) {
        dispatch(handleLoading({ loading: false }));
        dispatch(RsetUserRole(resCreateAccount?.data?.result));
        dispatch(
          RsetShowToast({
            show: true,
            title: resCreateAccount?.data?.message,
            bg: "success",
          }),
        );
        obj.navigate("/login");
        dispatch(handleLoading({ loading: false }));
      } else {
        dispatch(handleLoading({ loading: false }));
      }
    } catch (error) {
      dispatch(handleLoading({ loading: false }));
      console.log(error);
      throw Error;
    }
  },
);

// handle Login
export const handleLogin = createAsyncThunk(
  "account/handleLogin",
  async (obj: any, { dispatch, getState }: any) => {
    try {
      const postData = {
        username: obj?.data?.userName,
        password: obj?.data?.password,
        session: {
          browserName: browserName,
          browserVersion: browserVersion,
          operatingSystem: obj.opratingSystem,
        },
      };
      dispatch(handleLoading({ loading: true }));
      const resLogin = await login(postData);
      dispatch(handleLoading({ loading: false }));
      console.log(resLogin);
      if (resLogin?.data?.code === 0) {
        dispatch(RsetUserRole(resLogin?.data?.result));
        localStorage.setItem("tokenId", resLogin?.data?.result?.token);
        localStorage.setItem(
          "refreshToken",
          resLogin?.data?.result?.refreshToken,
        );
        obj.navigate("/");
        dispatch(
          RsetShowToast({
            show: true,
            title: resLogin?.data?.message,
            bg: "success",
          }),
        );
      }
    } catch (error) {
      dispatch(handleLoading({ loading: false }));
      console.log(error);
      throw Error;
    }
  },
);

// handle refresh
export const handleGetUserProfileInfo = createAsyncThunk(
  "account/handleGetUserProfileInfo",
  async (obj, { dispatch, getState }: any) => {
    try {
      dispatch(handleLoading({ loading: true }));
      const resRefresh = await getUserProfileInfo();
      dispatch(handleLoading({ loading: false }));
      if (resRefresh?.data?.code === 0) {
        dispatch(RsetUserRole(resRefresh?.data?.result));
      }
    } catch (error) {
      dispatch(handleLoading({ loading: false }));
      console.log(error);
      throw Error;
    }
  },
);

// handle update account
export const handleUpdateAccount = createAsyncThunk(
  "account/handleUpdateAccount",
  async (obj: any, { dispatch, getState }: any) => {
    console.log("obj", obj?.strategyType?.id);
    try {
      const postData: UpdateAccount = {
        memoryId: obj?.data?.memoryId,
        keysunMemoryId: obj?.data?.keysunMemoryId,
        name: obj?.data?.name,
        lastName: obj?.data?.lastName,
        password: obj?.data?.password,
        mobileNumber: obj?.data?.mobileNumber,
        username: obj?.data?.username,
        nationalCode: obj?.data?.nationalCode,
        birthDate: obj?.data?.birthDate,
        strategyType: obj?.data?.strategyType?.id,
        keysunUsername: obj?.data?.keysunUsername,
        keysunPassword: obj?.data?.keysunPassword,
        shouldKeysunInfoBeUpdated: obj?.data?.shouldKeysunInfoBeUpdated,
        confirmPassword: obj?.data?.confirmPassword,
      };
      dispatch(handleLoading({ loading: true }));
      console.log("postData", postData);
      const resUpdateAccount = await updateAccount(postData);
      if (resUpdateAccount?.data?.code === 0) {
        dispatch(
          RsetShowToast({
            show: true,
            title: resUpdateAccount?.data?.message,
            bg: "success",
          }),
        );
        obj?.navigate("/");
        dispatch(handleGetUserProfileInfo());
        dispatch(handleLoading({ loading: false }));
      } else {
        dispatch(handleLoading({ loading: false }));
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

// -> handle get user menu list
export const handleGetUserMenuList: ReduxToolkitType = createAsyncThunk(
  "account/handleGetUserMenuList",
  async (obj: any, { dispatch, getState }) => {
    try {
      dispatch(handleLoading({ loading: true }));
      const resUserMenuList = await getUserMenuList();
      dispatch(handleLoading({ loading: false }));
      if (resUserMenuList?.data?.code === 0) {
        return resUserMenuList.data;
      }
    } catch (error) {
      dispatch(handleLoading({ loading: false }));

      console.log(error);
      throw Error;
    }
  },
);

//-> handle handle Generate Keys
export const handleGenerateKeys: ReduxToolkitType = createAsyncThunk(
  "account/handleGenerateKeys",
  async (__, { dispatch, getState }: any) => {
    try {
      const res: any = await generateKeys();
      const url = window.URL.createObjectURL(new Blob([res?.data]));
      const link: any = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `publickey.pem`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      dispatch(handleLoading({ loading: true }));
      return res.data;
    } catch (error) {
      dispatch(handleLoading({ loading: true }));
      console.log(error);
      throw Error;
    }
  },
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    RsetUserRole: (state, actions: PayloadAction<Role>) => {
      return { ...state, userRole: actions.payload };
    },
    RsetUserType: (state, actions: PayloadAction<SelectOption[]>) => {
      return { ...state, userType: actions.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        handleGetUserMenuList.fulfilled,
        (state, action: PayloadAction<any>) => {
          try {
            if (action.payload.code === 0) {
              const filterMenu = action?.payload?.result?.sort(
                (a: any, b: any) => a.priority - b.priority,
              );
              return { ...state, userMenu: filterMenu };
            }
          } catch (error) {
            console.log(error);
            throw Error;
          }
        },
      )
      .addCase(
        handleUpdateAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          // if (action.payload.code === 0) {
          // }
          // return {}
        },
      );
  },
});

export const { RsetUserType, RsetUserRole } = accountSlice.actions;
export default accountSlice.reducer;
