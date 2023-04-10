<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-3">
          <h1>Dashboard</h1>
        </div>
      </div>
      <hr />
      <div class="row mt-4">
        <h3>
          Staff can post suggestions from
          <strong>{{ state.academic_year_start_date }} </strong> to
          <strong>{{ state.academic_year_closure_date }} </strong>
          but can comment on posts until
          <strong>{{ state.academic_year_final_closure_date }}</strong>
          for academic year of
          <strong> {{ state.academic_year_name }}</strong>
        </h3>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <div
            class="card bg-dark text-light shadow rounded"
            style="width: 18rem"
          >
            <div class="card-body">
              <h3 class="card-title">Total Users</h3>
              <hr />
              <h1 class="card-text">{{ state.userCount }}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="card bg-dark text-light shadow rounded"
            style="width: 18rem"
          >
            <div class="card-body">
              <h3 class="card-title">Total Idea Posts</h3>
              <hr />
              <h1 class="card-text">{{ state.postCount }}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="card bg-dark text-light shadow rounded"
            style="width: 18rem"
          >
            <div class="card-body">
              <h3 class="card-title">Total Categories</h3>
              <hr />
              <h1 class="card-text">{{ state.categoryCount }}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="card bg-dark text-light shadow rounded"
            style="width: 18rem"
          >
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
      userCount: 0,
      postCount: 0,
      categoryCount: 0,
      deptCount: 0,
      deptStats: [],
      academic_year_closure_date: "" as null | string,
      academic_year_final_closure_date: "" as null | string,
      academic_year_start_date: "" as null | string,
      academic_year_name: "" as null | string,
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      state.academic_year_closure_date = sessionStorage.getItem(
        "academic_year_closure_date"
      );

      state.academic_year_final_closure_date = sessionStorage.getItem(
        "academic_year_final_closure_date"
      );
      state.academic_year_start_date = sessionStorage.getItem(
        "academic_year_start_date"
      );
      state.academic_year_name = sessionStorage.getItem("academic_year_name");

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
            //console.log(error);
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
            //console.log(error);
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
            //console.log(error);
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
            //console.log(error);
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
            //console.log(error);
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