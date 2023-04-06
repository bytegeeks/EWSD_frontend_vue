<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-4">
          <div class="card bg-dark text-light" style="border-radius: 1rem">
            <div class="card-body p-4 text-center">
              <h3 class="mb-3">Login</h3>

              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="typeEmailX-2"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  v-model="state.email"
                />
              </div>

              <div class="form-outline mb-4">
                <input
                  type="password"
                  id="typePasswordX-2"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  v-model="state.password"
                />
              </div>

              <button
                class="btn btn-primary btn-lg btn-block"
                @click="onSubmit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "LoginView",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      if (store.state.loggedIn) {
        router.push({ path: "/" });
      }
    });

    const state = reactive({
      email: "",
      password: "",
    });

    function onSubmit(e: any) {
      e.preventDefault();
      axios
        .post<any>("http://localhost:5000/user/login", {
          email: state.email,
          password: state.password,
        })
        .then(function ({ data, status }) {
          console.log(data.message);

          var accessToken = data.accessToken;
          var username = data.username;
          var user_id = data.user_id;
          var user_role_id = data.user_role_id;

          axios
            .post<any>(
              "http://localhost:5000/academic-year/get-latest-active-academic-year",
              {},
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then(({ data, status }) => {
              var academicYear = data.data;
              console.log(academicYear);

              if (typeof Storage !== "undefined") {
                sessionStorage.setItem("acsTkn", accessToken);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("user_id", user_id);
                sessionStorage.setItem(
                  "academic_year_id",
                  academicYear.academic_year_id
                );
                sessionStorage.setItem(
                  "academic_year_name",
                  academicYear.academic_year_name
                );
                sessionStorage.setItem(
                  "academic_year_active",
                  academicYear.active
                );
                sessionStorage.setItem(
                  "academic_year_start_date",
                  academicYear.start_date
                );
                sessionStorage.setItem(
                  "academic_year_closure_date",
                  academicYear.closure_date
                );
                sessionStorage.setItem(
                  "academic_year_final_closure_date",
                  academicYear.final_closure_date
                );
                sessionStorage.setItem("role", user_role_id);
                console.log("setting role now");
                store.dispatch("setRole", user_role_id);

                // set loggedIn status
                store.dispatch("updateLoggedIn", true);
                store.dispatch("setUsername", username);
                store.dispatch("setUserId", user_id);
              }
            });

          // when successful -> redirect to home
          if (status) {
            router.push({
              path: "/",
            });
            alert("login success");
          }
        })
        .catch(function ({ response }) {
          alert(response.data.message);
        });
    }

    return {
      state,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.login-page {
  margin-top: 20px;
}
</style>