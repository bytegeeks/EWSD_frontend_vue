<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-3">
          <h1>Profile</h1>
        </div>
      </div>
      <hr />

      <div class="row">
        <div class="col p-3">
          <ul class="list-group shadow p-3 mb-5 bg-white rounded">
            <li class="list-group-item">
              <b>Name:</b> {{ state.user.username }}
            </li>
            <li class="list-group-item">
              <b>Date of Birth:</b> {{ state.user.user_dob }}
            </li>
            <li class="list-group-item">
              <b>Gender:</b> {{ state.user.user_gender }}
            </li>
            <li class="list-group-item">
              <b>Phone:</b> {{ state.user.user_phone }}
            </li>
            <li class="list-group-item">
              <b>Address:</b> {{ state.user.user_address }}
            </li>
            <li class="list-group-item">
              <b>Email:</b> {{ state.user.user_email }}
            </li>
            <li class="list-group-item">
              <b>Role:</b> {{ state.user.user_role_id }}
            </li>
          </ul>
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
      user: {},
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/user/get-user-profile",
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
            state.user = data.user;
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