<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-4">
          <h1>Single Post</h1>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="card px-3 pt-4 my-2 shadow p-3 mb-5 bg-white rounded">
          <div class="card-subtitle">
            Posted on: {{ state.post.post_date }} by: {{ state.post.username }}
          </div>
          <hr />
          <div class="card-body">
            <p>
              <strong> {{ state.post.post_content }} </strong>
            </p>
            <div v-if="state.post.post_attachment !== ''">
              <img
                :src="state.post.post_attachment"
                class="post-content-image"
              />
            </div>
            <hr />
            <div>
              <p>
                <strong>Likes:</strong>
                {{ state.post.post_likes ? state.post.post_likes.length : 0 }} |
                <strong>Dislikes:</strong>
                {{
                  state.post.post_dislikes ? state.post.post_dislikes.length : 0
                }}
              </p>
            </div>
            <hr />
            <div>
              <button
                type="button"
                class="btn btn-success mx-2"
                @click="likeHandler"
              >
                Like
              </button>
              <button
                type="button"
                class="btn btn-danger mx-2"
                @click="dislikeHandler"
              >
                Dislike
              </button>
            </div>

            <hr />
            <div class>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="true"
                  id="defaultCheck1"
                  v-model="state.anonCheck"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Comment as Anonymous
                </label>
              </div>

              <div class="justify-content-space-between">
                <input
                  type="text"
                  class="form-control mt-2"
                  placeholder="Write a comment"
                  v-model="state.comment"
                />
                <button
                  type="button"
                  class="btn btn-primary mt-2"
                  @click="addCommentHandler"
                >
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  name: "SinglePostView",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      post: {},
      comment: "",
      anonCheck: "false",
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/post/view-post",
            {
              post_id: route.params.post_id,
              user_id: sessionStorage.getItem("user_id"),
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            console.log(data.status);
            // console.log(data.user_count);
            state.post = data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    function likeHandler(e: any) {
      e.preventDefault();
      const accessToken = sessionStorage.getItem("acsTkn");

      axios
        .post<any>(
          "http://localhost:5000/post/like-post",
          {
            post_id: route.params.post_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          if (data.status) {
            router.go(0);
          }
        });
    }

    function dislikeHandler(e: any) {
      e.preventDefault();
      const accessToken = sessionStorage.getItem("acsTkn");

      axios
        .post<any>(
          "http://localhost:5000/post/dislike-post",
          {
            post_id: route.params.post_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          if (data.status) {
            router.go(0);
          }
        });
    }

    function addCommentHandler(e: any) {
      e.preventDefault();
      let comment_payload = {
        comment_content: state.comment,
        comment_type: state.anonCheck,
        comment_date: new Date().toLocaleString("en-GB", {
          hour12: false,
        }),
        user_id: store.state.user_id,
        post_id: route.params.post_id,
      };

      const accessToken = sessionStorage.getItem("acsTkn");

      axios
        .post<any>(
          "http://localhost:5000/comment/create-comment",
          {
            comment: comment_payload,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data.status);
          if (data.status) {
            alert("comment added successfully");
            router.go(0);
          }
        });
    }

    return {
      state,
      addCommentHandler,
      likeHandler,
      dislikeHandler,
    };
  },
});
</script>

<style scoped>
.post-content-image {
  width: 60%;
}
</style>