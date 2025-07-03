import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addMyInfo,
  addSinglePost,
  addToAllPosts,
  addUser,
  deleteThePost,
} from "./slice";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["Post", "User", "Me"],
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "api/user/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (data) => ({
        body: data,
        method: "POST",
        url: "api/user/login",
      }),
      invalidatesTags: ["Me"],
    }),
    myInfo: builder.query({
      query: () => ({
        url: "api/user/me",
        method: "GET",
      }),
      providesTags: ["Me"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMyInfo(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "api/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),
    userDetails: builder.query({
      query: (id) => ({
        url: `api/user/userdetail/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        {
          type: "User",
          id,
        },
      ],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "api/user/update",
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Me"],
    }),
    allPost: builder.query({
      query: (page) => ({
        url: `api/post/getallpost?page=${page}`,
        method: "GET",
      }),
      providesTags: (result, error, args) => {
        return result
          ? [
              ...result.post.map(({ _id }) => ({ type: "Post", id: _id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }];
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToAllPosts(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    searchUser: builder.query({
      query: (query) => ({
        url: `api/user/search/${query}`,
        method: "GET",
      }),
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `api/user/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "User",
          id,
        },
      ],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `api/post/addpost`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addSinglePost(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `api/post/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteThePost(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `api/post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Post",
          id,
        },
      ],
    }),
    singlePost: builder.query({
      query: (id) => ({
        url: `api/post/singlepost/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        {
          type: "Post",
          id,
        },
      ],
    }),
    repost: builder.mutation({
      query: (id) => ({
        url: `api/post/reposts/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    addTheComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `api/post/addcomment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteTheComment: builder.mutation({
      query: ({ postId, id }) => ({
        url: `api/post/deletecomment/${postId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        {
          type: "Post",
          id: postId,
        },
      ],
    }),
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMutation,
  useLazyUserDetailsQuery,
  useLazySearchUserQuery,
  useAllPostQuery,
  useFollowUserMutation,
  useAddPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useSinglePostQuery,
  useRepostMutation,
  useAddTheCommentMutation,
  useDeleteTheCommentMutation,
  useUpdateProfileMutation,
} = serviceApi;
