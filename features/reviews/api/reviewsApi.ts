import { baseApi } from '@/shared';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => 'reviews',
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
