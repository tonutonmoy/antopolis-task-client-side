import { baseApi } from "../api/baseApi";

// Define TypeScript interfaces for request and response types if needed
interface Animal {
  name: string;
  img: string;
  category: string;
}

interface Category {
  name: string;
}

const AnimalAndCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimal: builder.query<Animal[], { name?: string }>({
        query: (params) => ({
          url:`/animal/${params}`,
          method: "GET",
          
        }),
        providesTags: ["animal"],
      
      }),
    getCategory: builder.query<Category[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    createAnimal: builder.mutation<void, Animal>({
      query: (animal) => ({
        url: "/animal",
        method: "POST",
        body: animal,
      }),
     
      invalidatesTags: ["animal"],
    }),
    createCategory: builder.mutation<void, Category>({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateAnimalMutation,
  useCreateCategoryMutation,
  useGetAnimalQuery,
  useGetCategoryQuery,
} = AnimalAndCategoryApi;
