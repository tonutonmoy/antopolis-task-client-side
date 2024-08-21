import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api", 
  baseUrl: "https://antopolis-task-server-side.vercel.app/api", 
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = ''; 
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["category","animal"],
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});
