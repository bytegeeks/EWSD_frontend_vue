<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-3">
          <h1>Dashboard</h1>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <div class="card bg-dark text-light shadow rounded" style="width: 18rem">
            <div class="card-body">
              <h3 class="card-title">Total Users</h3>
              <hr />
              <h1 class="card-text">{{ state.userCount }}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card bg-dark text-light shadow rounded" style="width: 18rem">
            <div class="card-body">
              <h3 class="card-title">Total Idea Posts</h3>
              <hr />
              <h1 class="card-text">{{ state.postCount }}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card bg-dark text-light shadow rounded" style="width: 18rem">
            <div class="card-body">
              <h3 class="card-title">Total Categories</h3>
              <hr />
              <h1 class="card-text">{{ state.categoryCount }}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card bg-dark text-light shadow rounded" style="width: 18rem">
            <div class="card-body">
              <h3 class="card-title">Total Departments</h3>
              <hr />
              <h1 class="card-text">{{ state.deptCount }}</h1>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="row my-5 px-3">
        <table class="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Department Name</th>
              <th scope="col">Idea Post Count</th>
              <th scope="col">Overall Submission Percentages(%)</th>
            </tr>
          </thead>
          <tbody v-for="stat in state.deptStats" :key="stat.dept_id">
            <tr>
              <td>{{ stat.dept_name }}</td>
              <td>{{ stat.idea_post_count }}</td>
              <td>{{ stat.perc }}</td>
            </tr>
          </tbody>
        </table>
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
      userCount: 0,
      postCount: 0,
      categoryCount: 0,
      deptCount: 0,
      deptStats: [],
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/department/get-department-stats",
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
            state.deptStats = data.data;
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .post<any>(
            "http://localhost:5000/user/get-user-count",
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
            state.userCount = data.user_count;
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .post<any>(
            "http://localhost:5000/post/get-post-count",
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
            state.postCount = data.post_count;
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .post<any>(
            "http://localhost:5000/category/get-category-count",
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
            state.categoryCount = data.category_count;
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .post<any>(
            "http://localhost:5000/department/get-department-count",
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
            state.deptCount = data.department_count;
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
</style>