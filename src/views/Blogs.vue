<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div v-if="admin" class="toggle-edit">
        <input class="hidden-cintainer" @click="toggle" />
        <div ref="toggler" class="toggler"></div>
      </div>
      <BlogCard
        :post="post"
        :editPreview="editPreview"
        v-for="(post, index) in blogPosts"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard";
export default {
  name: "blogs",
  data() {
    return {
      editPreview: false,
    };
  },
  components: { BlogCard },
  methods: {
    toggle() {
      this.$refs.toggler.classList.toggle("toggle");
      this.editPreview = !this.editPreview;
    },
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    admin() {
      return this.$store.state.user.admin;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 180px;

    .hidden-cintainer {
      position: absolute;
      background: transparent;
      cursor: pointer;
      top: 0;
      width: 82px;
      left: 61px;
      height: 31px;
      border-radius: 20px;
    }

    .toggler {
      content: "";
      pointer-events: none;
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 120px;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
    }

    .toggler.toggle {
      background: #fff;
      left: 52px;
    }
  }
}
</style>
