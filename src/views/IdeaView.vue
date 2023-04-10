<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-3">
          <h1>Posts</h1>
        </div>
      </div>
      <hr />
      <button
        type="button"
        @click="(e) => viewAllPostHandler(e)"
        class="btn btn-outline-secondary mx-3"
      >
        View All Posts
      </button>
      <button
        type="button"
        @click="(e) => viewPopularPostHandler(e)"
        class="btn btn-outline-secondary mx-3"
      >
        View Popular Posts
      </button>

      <button
        type="button"
        @click="(e) => viewMyPostHandler(e)"
        class="btn btn-outline-secondary mx-3"
      >
        View My Posts
      </button>

      <a
        type="button"
        @click="(e) => downloadPosts(e)"
        class="btn btn-outline-success mx-3"
        v-show="
          !state.isActiveAcademicYear && store.state.role === 'qa_manager'
        "
      >
        Download Idea Posts CSV
      </a>

      <a
        type="button"
        @click="(e) => downloadAttachments(e)"
        class="btn btn-outline-success mx-3"
        v-show="
          !state.isActiveAcademicYear && store.state.role === 'qa_manager'
        "
      >
        Download Attachment ZIP
      </a>
      <hr />
      <div v-for="post in state.posts" :key="post.post_id">
        <div class="row">
          <div class="card px-3 pt-4 my-2 shadow p-3 mb-5 bg-white rounded">
            <div class="card-subtitle">
              Posted on: <strong>{{ post.post_date }}</strong> by:
              <strong>{{
                store.state.role === "admin"
                  ? post.username
                  : !post.post_type
                  ? post.username
                  : "ANONYMOUS"
              }}</strong>
              on: <strong>{{ post.category_name }}</strong> in:
              <strong>{{ post.dept_name }}</strong>
            </div>
            <hr />
            <div class="card-body">
              <p>
                <strong> {{ post.post_content }} </strong>
              </p>
              <div v-if="post.post_attachment !== ''">
                <img :src="post.post_attachment" class="post-content-image" />
              </div>
              <hr />
              <div>
                <p>
                  <!-- <strong>Views:</strong> {{ post.post_view_count }} | -->
                  <strong>Likes:</strong> {{ post.post_likes.length }} |
                  <strong>Dislikes:</strong> {{ post.post_dislikes.length }} |
                  <strong>Comments:</strong> {{ post.post_comment_count }}
                </p>
              </div>
              <hr />
              <div>
                <button
                  type="button"
                  @click="(e) => addCommentHandler(e, post.post_id)"
                  class="btn btn-success mx-2"
                >
                  View Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    NavBar,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      posts: [],
      isActiveAcademicYear: true as boolean | null,
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      let final_closure_date = sessionStorage.getItem(
        "academic_year_final_closure_date"
      );

      if (final_closure_date) {
        const tf = Date.parse(final_closure_date);
        const tn = Date.now();
        console.log(tf, tn, tf > tn);
        // if tf < tn -> it has passed the final closure date
        state.isActiveAcademicYear = tf > tn;
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/post/view-all-post",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            console.log(data.status);
            // console.log(data.user_count);
            state.posts = data.data;
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    });

    function addCommentHandler(e: any, _post_id: any) {
      router.push({ name: "view_single_post", params: { post_id: _post_id } });
    }

    function viewAllPostHandler(e: any) {
      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/post/view-all-post",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            console.log(data.status);
            // console.log(data.user_count);
            state.posts = data.data;
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    }

    function viewPopularPostHandler(e: any) {
      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/post/view-popular-post",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            console.log(data.status);
            // console.log(data.user_count);
            state.posts = data.data;
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    }

    function viewMyPostHandler(e: any) {
      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/post/view-my-post",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            console.log(data.status);
            // console.log(data.user_count);
            state.posts = data.data;
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    }

    function downloadPosts(e: any) {
      const accessToken = sessionStorage.getItem("acsTkn");
      axios({
        url: "http://localhost:5000/post/download-posts-csv", // File URL Goes Here
        method: "POST",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        var FILE = window.URL.createObjectURL(new Blob([res.data]));

        var docUrl = document.createElement("a");
        docUrl.href = FILE;
        docUrl.setAttribute("download", "idea_posts.csv");
        document.body.appendChild(docUrl);
        docUrl.click();
      });
    }

    function downloadAttachments(e: any) {
      const accessToken = sessionStorage.getItem("acsTkn");
      axios({
        url: "http://localhost:5000/post/download-attachments", // File URL Goes Here
        method: "POST",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        var FILE = window.URL.createObjectURL(new Blob([res.data]));

        var docUrl = document.createElement("a");
        docUrl.href = FILE;
        docUrl.setAttribute("download", "attachments.zip");
        document.body.appendChild(docUrl);
        docUrl.click();
      });
    }

    return {
      state,
      store,
      addCommentHandler,
      viewAllPostHandler,
      viewPopularPostHandler,
      viewMyPostHandler,
      downloadPosts,
      downloadAttachments,
    };
  },
});
</script>

<style scoped>
.post-content-image {
  width: 60%;
}
</style>