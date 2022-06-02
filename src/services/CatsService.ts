import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// import {IPost} from "../models/IPost";
import { ICat } from '../models/types';

export const catsAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Cats'],
  endpoints: (build) => ({
    fetchCats: build.query<ICat[], number>({
      query: (limit: number = 5) => ({
        url: `/photos`,
        params: {
          _limit: limit,
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
