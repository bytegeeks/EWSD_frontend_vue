<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
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
                  id="typeDOBX-2"
                  class="form-control form-control-lg"
                  placeholder="Date of Birth"
                  v-model="state.dob"
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
                  type="text"
                  id="typeRoleX-2"
                  class="form-control form-control-lg"
                  placeholder="Role"
                  v-model="state.role_id"
                />
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="typeDeptX-2"
                  class="form-control form-control-lg"
                  placeholder="Dept"
                  v-model="state.dept_id"
                />
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="typeGenderX-2"
                  class="form-control form-control-lg"
                  placeholder="Gender"
                  v-model="state.gender"
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

export default defineComponent({
  name: "AddUser",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }
    });

    const state = reactive({
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

    function onSubmit(e: any) {
      e.preventDefault();

      if (state.password !== state.confirmPassword) {
        alert("passwords do not match!!!");
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