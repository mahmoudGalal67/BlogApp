<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" to="/">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link
            v-if="user.admin"
            class="link"
            :to="{ name: 'CreatePost' }"
            >Create Post</router-link
          >
          <router-link
            v-if="!user.email"
            class="link"
            :to="{ name: 'Register' }"
            >Login/Register</router-link
          >
        </ul>
        <div
          v-if="user.email"
          :class="{ 'mobile-user-menu': mobile }"
          @click="toggleProfileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ user.logo }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ user.logo }}</p>
              <div class="right">
                <p>
                  {{ user.firstName }}
                </p>
                <p>{{ user.lastName }}</p>
                <p>{{ user.email }}</p>
              </div>
            </div>
            <div class="options">
              <div @click="profileMenu = !profileMenu" class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <img src="../assets/Icons/user-alt-light.svg" class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <div v-if="user.admin" class="option">
                <img src="../assets/Icons/user-crown-light.svg" class="icon" />
                <p>Admin</p>
              </div>
              <div @click="signOut" class="option">
                <img
                  src="../assets/Icons/sign-out-alt-regular.svg"
                  class="icon"
                />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <img
      src="../assets/Icons/bars-regular.svg"
      @click="toggleMobileNav"
      class="menu-icon"
      v-show="mobile"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" to="#">Home</router-link>
        <router-link class="link" to="#">Blogs</router-link>
        <router-link v-if="user.admin" class="link" :to="{ name: 'CreatePost' }"
          >Create Post</router-link
        >
        <router-link v-if="!user.email" class="link" to="#"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import { auth } from "../firebase/firebaseinit";
export default {
  name: "navigation",
  components: {},
  data() {
    return {
      mobile: null,
      mobileNav: null,
      profileMenu: false,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 750) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false;
      }
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },

    signOut() {
      auth.signOut();
      this.$router.push({ name: "Home" });
      // window.location.reload();
      this.$store.commit("resetUser");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              padding: 5px;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
