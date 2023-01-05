<template>
  <div class="create-post">
    <BlogCoverPreview
      v-show="preview"
      :imagePreview="blogCoverPhoto"
      @preview="preview = !preview"
    />
    <Loading v-show="loading" />
    <div class="container">
      <div v-if="error" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="title" />
        <input
          type="text"
          placeholder="Enter Blog description"
          v-model="desc"
        />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            @click="preview = !preview"
            class="preview"
            :class="{ 'button-inactive': !file }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ fileName }}</span>
        </div>
      </div>
      <div class="editor">
        <!-- <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        /> -->
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <!-- <router-link
          class="router-button"
          :to="{ name: 'BlogPreview', params: { id: newBlogId } }"
          >Post Preview</router-link
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebaseinit";
import { collection, addDoc } from "firebase/firestore";
// import { VueEditor } from "vue2-editor";
// import Quill from "quill";
// import ImageResize from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize.default);

export default {
  name: "CreatePost",
  data() {
    return {
      title: null,
      fileName: null,
      // blogHTML: null,
      preview: false,
      blogCoverPhoto: null,
      desc: null,
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      newBlog: null,
      newBlogId: "",
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    BlogCoverPreview,
    Loading,
    // VueEditor,
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      this.blogCoverPhoto = URL.createObjectURL(this.file);
      this.fileName = this.file.name;
    },

    openPreview() {
      this.preview = !preview;
    },

    // imageHandler(file, Editor, cursorLocation, resetUploader) {
    //   this.file = file;
    //   Editor.insertEmbed(cursorLocation, "image", URL.createObjectURL(file));
    //   resetUploader();
    // },

    async uploadBlog() {
      if (this.title && this.desc) {
        if (this.file) {
          this.loading = true;
          const name = new Date().getTime() + this.file.name;
          const storageRef = ref(storage, name);
          const uploadTask = uploadBytesResumable(storageRef, this.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              this.blogCoverPhoto = downloadURL;
              const timestamp = Date.now();
              const blog = await addDoc(collection(db, "blogPosts"), {
                blogDesc: this.desc,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.fileName,
                blogTitle: this.title,
                userId: this.userId,
                date: timestamp,
              });
              this.newBlog = blog;
              this.loading = false;
              this.$router.push({
                name: "ViewBlog",
                params: { id: blog.id },
              });
            }
          );
          return;
        }
        this.error = true;
        this.errorMsg = "Please ensure you uploaded a cover photo!";
        setTimeout(() => {
          this.error = null;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
      setTimeout(() => {
        this.error = null;
      }, 5000);
      return;
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 60px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    flex-direction: column;
    gap: 60px;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  /* .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  } */

  .blog-actions {
    margin-top: 64px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
