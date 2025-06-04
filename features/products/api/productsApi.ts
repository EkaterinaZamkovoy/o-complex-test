import { baseApi } from '@/shared';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, pageSize = 20 }) =>
        `products?page=${page}&page_size=${pageSize}`,
    }),
    sendOrder: builder.mutation({
      query: (body) => ({
        url: 'order',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useSendOrderMutation,
} = productsApi;
