<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-4">
          <div class="card bg-dark text-light" style="border-radius: 1rem">
            <div class="card-body p-4 text-center">
              <h3 class="mb-3">Add User</h3>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="typeUsernameX-2"
                  class="form-control form-control-lg"
                  placeholder="Username"
                  v-model="state.username"
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
                />
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="typePhoneX-2"
                  class="form-control form-control-lg"
                  placeholder="Phone"
                  v-model="state.phone"
                />
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="typeAddressX-2"
                  class="form-control form-control-lg"
                  placeholder="Address"
                  v-model="state.address"
                />
              </div>

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

              <div class="form-outline mb-4">
                <input
                  type="password"
                  id="typeConfirm PasswordX-2"
                  class="form-control form-control-lg"
                  placeholder="Confirm Password"
                  v-model="state.confirmPassword"
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

              <button
                class="btn btn-primary btn-lg btn-block"
                @click="onSubmit"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "AddUser",
  components: {
    NavBar,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }
    });

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
    });

    function onSubmit(e: any) {
      e.preventDefault();

      if (state.password !== state.confirmPassword) {
        alert("passwords do not match!!!");
        router.go(0);
      }

      const payload = {
        user: {
          username: state.username,
          user_dob: state.dob,
          user_gender: state.gender,
          user_phone: state.phone,
          user_address: state.address,
          user_email: state.email,
          user_password: state.password,
          user_role_id: state.role_id,
          user_dept_id: state.dept_id,
        },
      };

      axios
        .post<any>("http://localhost:5000/user/register", payload)
        .then(function ({ data, status }) {
          console.log(data.message);

          if (status) {
            router.push({
              path: "/users/view-all-users",
            });
            alert("register success");
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
</style>