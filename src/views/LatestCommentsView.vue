<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-4">
          <h1>Latest Comments</h1>
        </div>
      </div>
      <hr />
      <div v-for="cmt in state.comments" :key="cmt.comment_id">
        <div class="row">
          <div class="card my-2 shadow mb-5 bg-white rounded">
            <div class="card-body">
              <p>
                <strong>
                  Posted on: {{ cmt.comment_date }} by: {{ cmt.user_id }}
                </strong>
              </p>
              <p>{{ cmt.comment_content }}</p>

              <hr />
              <div>
                <button type="button" class="btn btn-success">View Post</button>
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
      comments: [],
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/comment/view-latest-comments",
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
            state.comments = data.data;
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