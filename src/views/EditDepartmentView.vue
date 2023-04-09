<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Edit Department</h1>
        </div>
      </div>
      <hr />

      <div class="row p-4">
        <div class="card bg-dark">
          <div class="card-body p-4">
            <div class="form-outline mb-4">
              <input
                type="text"
                id="typeAYNameX-2"
                class="form-control form-control-lg"
                placeholder="Category Name"
                v-model="state.dept_name"
                required
              />
            </div>

            <button class="btn btn-primary btn-lg btn-block" @click="onSubmit">
              Update
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
      dept_name: "",
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");

      axios
        .post<any>(
          "http://localhost:5000/department/view-department",
          {
            dept_id: route.params.dept_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          state.dept_name = data.data.dept_name;
        });
    });

    function onSubmit(e: any) {
      e.preventDefault();

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/department/edit-department",
            {
              dept_id: route.params.dept_id,
              dept: {
                dept_name: state.dept_name,
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
              alert("updated department successfully");

              router.push({
                path: "/department/view-departments",
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