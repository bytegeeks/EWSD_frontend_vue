<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Add Department</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <div class="card bg-dark">
          <div class="card-body p-4">
            <div class="form-outline mb-4">
              <input
                type="text"
                id="typeAYNameX-2"
                class="form-control form-control-lg"
                placeholder="Department Name"
                v-model="state.dept_name"
              />
            </div>

            <button class="btn btn-primary btn-lg btn-block" @click="onSubmit">
              Add
            </button>
          </div>
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

export default defineComponent({
  name: "ViewAllUserView",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      dept_name: "",
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }
    });

    function onSubmit(e: any) {
      e.preventDefault();

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/department/create-department",
            {
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
              alert("added department successfully");

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