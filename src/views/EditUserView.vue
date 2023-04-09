<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Edit User Details</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <div class="card bg-dark text-light" style="border-radius: 1rem">
          <div class="card-body p-4">
            <div class="form-outline mb-4">
              <input
                type="text"
                id="typeUsernameX-2"
                class="form-control form-control-lg"
                placeholder="Username"
                v-model="state.username"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <label for="dateofbirth"><strong>Date of Birth</strong></label>
              <input
                class="form-control form-control-lg"
                type="date"
                name="dateofbirth"
                id="dateofbirth"
                v-model="state.dob"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <input
                type="text"
                id="typePhoneX-2"
                class="form-control form-control-lg"
                placeholder="Phone"
                v-model="state.phone"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <input
                type="text"
                id="typeAddressX-2"
                class="form-control form-control-lg"
                placeholder="Address"
                v-model="state.address"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <input
                type="email"
                id="typeEmailX-2"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="state.email"
                required
              />
            </div>

            <div class="form-group mb-4">
              <label for="role-select"><strong>Select Role</strong></label>
              <select
                class="form-select mt-2"
                id="role-select"
                aria-label="Role select"
                v-model="state.role_id"
              >
                <option value="admin" selected>Admin</option>
                <option value="qa_manager">QA Manager</option>
                <option value="qa_coordinator">QA Coordinator</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div class="form-group mb-4">
              <label for="dept-select"
                ><strong>Select Department</strong></label
              >
              <select
                class="form-select mt-2"
                id="dept-select"
                aria-label="Department select"
                v-model="state.dept_id"
              >
                <option
                  v-for="dept in state.departments"
                  :key="dept.dept_id"
                  :value="dept.dept_name"
                >
                  {{ dept.dept_name }}
                </option>

                <p>{{ state.departments }}</p>
              </select>
            </div>

            <div class="form-group mb-4">
              <label for="role-select"><strong>Select Gender</strong></label>
              <select
                class="form-select mt-2"
                id="gender-select"
                aria-label="Gender select"
                v-model="state.gender"
              >
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button class="btn btn-primary btn-lg btn-block" @click="onSubmit">
              Update User
            </button>
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
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "ViewAllUserView",
  components: {
    NavBar,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      departments: [],
      username: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: "",
      dept_id: "",
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      console.log("sending department fetch...");
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
          state.departments = data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      // fetch academic year details by ay id
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
            state.username = data.user.username;
            state.dob = data.user.user_dob;
            state.gender = data.user.user_gender;
            state.phone = data.user.user_phone;
            state.address = data.user.user_address;
            state.email = data.user.user_email;
            state.role_id = data.user.user_role_id;
            state.dept_id = data.user.user_dept_id;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    function onSubmit(e: any) {
      e.preventDefault();

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/user/edit-user",
            {
              user: {
                username: state.username,
                user_dob: state.dob,
                user_gender: state.gender,
                user_phone: state.phone,
                user_address: state.address,
                user_email: state.email,
                user_role_id: state.role_id,
                user_dept_id: state.dept_id,
              },
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
              alert("user updated successfully");

              router.push({
                path: "/users/view-all-users",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    return {
      state,
      onSubmit,
    };
  },
});
</script>

<style scoped>
</style>