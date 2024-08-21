import { baseApi } from "./api/baseApi";
// import tripReducer from "./api/Trip/tripSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
//   trip: tripReducer,
};


