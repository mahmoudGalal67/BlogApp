import { createStore } from "vuex";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebaseinit";

export default createStore({
  state: {
    user: {},
    blogPosts: [],
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user.id = user.id;
      state.user.email = user.data().email;
      state.user.firstName = user.data().firstName;
      state.user.lastName = user.data().lastName;
      state.user.userName = user.data().username;
      state.user.admin = user.data().admin;
      state.user.logo = user.data().firstName[0] + user.data().lastName[0];
    },
    changeFirstName(state, payload) {
      state.user.firstName = payload;
    },
    changeLastName(state, payload) {
      state.user.lastName = payload;
    },
    changeUsername(state, payload) {
      state.user.userName = payload;
    },
    setProfileInitials(state) {
      state.user.logo = state.user.firstName[0] + state.user.lastName[0];
    },
    updateBlog(state, payload) {
      state.blogPosts = state.blogPosts.map((post) => {
        if (post.blogID === payload.blogID) {
          return {
            blogID: payload.blogID,
            blogDesc: payload.blogDesc,
            blogCoverPhoto: payload.blogCoverPhoto,
            blogTitle: payload.blogTitle,
            blogDate: payload.blogDate,
            blogCoverPhotoName: payload.blogCoverPhotoName,
            blogUserId: payload.blogUserId,
          };
        } else {
          return post;
        }
      });
    },
  },
  actions: {
    async setUser(state, user) {
      if (user) {
        const userData = await getDoc(doc(db, "user", auth.currentUser.uid));
        state.commit("updateUser", userData);
      } else {
        state.user = {};
      }
    },
    async updateUserSettings({ state, commit }) {
      const dataBase = await setDoc(doc(db, "user", state.user.id), {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        username: state.user.userName,
        email: state.user.email,
        admin: state.user.admin,
      });
      commit("setProfileInitials");
    },
    async getPosts({ state }) {
      state.blogPosts = [];
      const Blogs = await getDocs(collection(db, "blogPosts"));
      Blogs.forEach((doc) => {
        const data = {
          blogID: doc.id,
          blogDesc: doc.data().blogDesc,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogUserId: doc.data().userId,
        };
        state.blogPosts.push(data);
      });
    },
    async deletePost({ state }, payload) {
      state.blogPosts = state.blogPosts.filter((post) => {
        return post.blogID !== payload;
      });
      await deleteDoc(doc(db, "blogPosts", payload));
    },
  },
  modules: {},
});
