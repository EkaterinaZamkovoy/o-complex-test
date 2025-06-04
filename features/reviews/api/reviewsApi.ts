import { baseApi } from '@/shared';

type Review = {
  id: number;
  text: string;
};

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => 'reviews',
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
