const ApiBase = import.meta.env.GET_API;

export const endPoints = {
  user: {
    getTokenInfo: {
      url: ApiBase + "Bill/GetBillInitializeData",
      method: "get",
    },
  },
};
