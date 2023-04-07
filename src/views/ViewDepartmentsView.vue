<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-4">
          <h1>View Departments</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <table class="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Department ID</th>
              <th scope="col">Department Name</th>
              <th colspan="2" v-if="store.state.role == 'admin'">Options</th>
            </tr>
          </thead>
          <tbody v-for="dept in state.departments" :key="dept.dept_id">
            <tr>
              <td>{{ dept.dept_id }}</td>
              <td>{{ dept.dept_name }}</td>
              <td v-if="store.state.role == 'admin'">
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="(e) => editDepartmentHandler(e, dept.dept_id)"
                >
                  Edit
                </button>
              </td>
              <td v-if="store.state.role == 'admin'">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="(e) => deleteDepartmentHandler(e, dept.dept_id)"
                >
                  Delete
                </button>
              </td>
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
  name: "ViewAllUserView",
  components: {
    NavBar,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      departments: [],
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/department/view-all-department",
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
            state.departments = data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    function editDepartmentHandler(e: any, _dept_id: string) {
      router.push({
        name: "edit_department",
        params: { dept_id: _dept_id },
      });
    }

    function deleteDepartmentHandler(e: any, _dept_id: string) {
      // call delete api
      alert("are u sure you want to delete?");
      const accessToken = sessionStorage.getItem("acsTkn");
      axios
        .post<any>(
          "http://localhost:5000/department/delete-department",
          { dept_id: _dept_id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          alert("department delete success");
          router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      state,
      store,
      editDepartmentHandler,
      deleteDepartmentHandler,
    };
  },
});
</script>

<style scoped>
</style>