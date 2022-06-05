import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICatDTO, IFetchCatsParams } from '../models/types';

export const catsAPI = createApi({
  reducerPath: 'catsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Cats'],
  endpoints: (build) => ({
    fetchCats: build.query<ICatDTO[], IFetchCatsParams>({
      query: (params) => ({
        url: `/photos`,
        params: {
          _limit: params.limit,
          _page: params.page,
        },
      }),
      providesTags: (result) => ['Cats'],
    }),

    // createPost: build.mutation<IPost, IPost>({
    //     query: (post) => ({
    //         url: `/posts`,
    //         method: 'POST',
    //         body: post
    //     }),
    //     invalidatesTags: ['Post']
    // }),
    // updatePost: build.mutation<IPost, IPost>({
    //     query: (post) => ({
    //         url: `/posts/${post.id}`,
    //         method: 'PUT',
    //         body: post
    //     }),
    //     invalidatesTags: ['Post']
    // }),
    // deletePost: build.mutation<IPost, IPost>({
    //     query: (post) => ({
    //         url: `/posts/${post.id}`,
    //         method: 'DELETE',
    //     }),
    //     invalidatesTags: ['Post']
    // }),
  }),
});
