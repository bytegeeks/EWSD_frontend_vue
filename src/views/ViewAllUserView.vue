<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-3">
          <h1>View All Users</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <table class="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">DOB</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Department</th>
              <th colspan="2">Options</th>
            </tr>
          </thead>
          <tbody v-for="user in state.users" :key="user.user_id">
            <tr>
              <td>{{ user.username }}</td>
              <td>{{ user.user_dob }}</td>
              <td>{{ user.user_gender }}</td>
              <td>{{ user.user_phone }}</td>
              <td>{{ user.user_address }}</td>
              <td>{{ user.user_email }}</td>
              <td>{{ user.user_role_id }}</td>
              <td>{{ user.user_dept_id }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="(e) => editUserHandler(e, user.user_id)"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="(e) => deleteUserHandler(e, user.user_id)"
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
      users: [],
    });

    function editUserHandler(e: any, _user_id: string) {
      router.push({
        name: "edit_user",
        params: { user_id: _user_id },
      });
    }

    function deleteUserHandler(e: any, _user_id: string) {
      alert("are u sure you want to delete?");
      const accessToken = sessionStorage.getItem("acsTkn");
      axios
        .post<any>(
          "http://localhost:5000/user/delete-user",
          { user_id: _user_id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          alert("user delete success");
          router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/user/get-all-user",
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
            state.users = data.users;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    return {
      state,
      editUserHandler,
      deleteUserHandler,
    };
  },
});
</script>

<style scoped>
</style>