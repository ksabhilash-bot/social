import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    openAddPostModal: false,
    openEditProfileModal: false,
    anchorE1: null,
    anchorE2: null,
    darkMode: false,
    myInfo: null,
    user: {},
    allPosts: [],
    postId: null,
    searchedUsers: [],
  },
  reducers: {
    addPostModal: (state, action) => {
      state.openAddPostModal = action.payload;
    },
    addProfileModal: (state, action) => {
      state.openEditProfileModal = action.payload;
    },
    toggleMainMenu: (state, action) => {
      state.anchorE1 = action.payload;
    },
    toggleMyMenu: (state, action) => {
      state.anchorE2 = action.payload;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    addMyInfo: (state, action) => {
      state.myInfo = action.payload?.me ?? null;
    },
    addUser: (state, action) => {
      state.user = action.payload?.user ?? {};
    },
    addToAllPosts: (state, action) => {
      const newPostArr = [...action.payload.post];
      if (state.allPosts.length === 0) {
        state.allPosts = newPostArr;
        return;
      }
      const existingpost = [...state.allPosts];
      newPostArr.forEach((e) => {
        const existingIndex = existingpost.findIndex((i) => {
          return i._id === e._id;
        });
        if (existingIndex !== -1) {
          existingpost[existingIndex] = e;
        } else {
          existingpost.push(e);
        }
      }),
        (state.allPosts = existingpost);
    },
    addSinglePost: (state, action) => {
      let newArr = [...state.allPosts];
      let updatedArr = [action.payload.newPost, ...newArr];
      let uniqueArr = new Set();
      let uniquePosts = updatedArr.filter((e) => {
        if (!uniqueArr.has(e._id)) {
          uniqueArr.add(e);
          return true;
        }
        return false;
      });
      state.allPosts - [...uniquePosts];
    },
    deleteThePost: (state, action) => {
      let postArr = [...state.allPosts];
      let newArr = postArr.filter((e) => e._id !== state.postId);
      state.allPosts = newArr;
    },
    addPostId: (state, action) => {
      state.postId = action.payload;
    },
    addToSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
    resetState: (state) => {
      state.myInfo = null;
      state.user = {};
      state.allPosts = [];
      state.postId = null;
      state.searchedUsers = [];
    },
  },
});

export const {
    resetState,
  toggleMyMenu,
  addPostModal,
  addProfileModal,
  toggleMainMenu,
  toggleTheme,
  addMyInfo,
  addUser,
  addToAllPosts,
  addSinglePost,
  deleteThePost,
  addToSearchedUsers,
  addPostId,
} = serviceSlice.actions;
export default serviceSlice.reducer;
