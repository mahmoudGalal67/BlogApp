import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import Blogs from "../views/Blogs.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: {
      title: "ForgetPassword",
    },
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/CreatePost",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "CreatePost",
    },
  },
  {
    path: "/BlogPreview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "BlogPreview",
    },
  },
  {
    path: "/Blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/ViewBlog/:id",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "ViewBlog",
    },
  },
  ,
  {
    path: "/EditBlog/:id",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "EditBlog",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});
export default router;
