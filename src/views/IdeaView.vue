<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-3">
          <h1>Posts</h1>
        </div>
      </div>
      <hr />
      <div v-for="post in state.posts" :key="post.post_id">
        <div class="row">
          <div class="card px-3 pt-4 my-2 shadow p-3 mb-5 bg-white rounded">
            <div class="card-subtitle">
              Posted on: {{ post.post_date }} by: {{ post.user_id }}
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
                  <strong>Views:</strong> {{ post.post_view_count }} |
                  <strong>Likes:</strong> {{ post.post_likes }} |
                  <strong>Dislikes:</strong> {{ post.post_dislikes }} |
                  <strong>Comments:</strong> {{ post.post_comment_count }}
                </p>
              </div>
              <hr />
              <div>
                <button type="button" class="btn btn-success mx-2">Like</button>
                <button type="button" class="btn btn-danger mx-2">
                  Dislike
                </button>
                <button type="button" class="btn btn-primary mx-2">
                  Add Comment
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

export default defineComponent({
  name: "HomeView",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      posts: [],
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
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
            console.log(error);
          });
      }
    });

    return {
      state,
    };
  },
});
</script>

<style scoped>
.post-content-image {
  width: 60%;
}
</style>