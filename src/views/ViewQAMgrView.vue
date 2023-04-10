<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-4">
          <h1>View QA Manager</h1>
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

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/user/get-qa-manager",
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