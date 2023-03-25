<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Add Academic Year</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <div class="card bg-dark text-light" style="border-radius: 1rem">
          <div class="card-body p-4">
            <div class="form-outline mb-4">
              <label for="typeAYNameX-2"
                ><strong>Academic Year Name</strong></label
              >
              <input
                type="text"
                id="typeAYNameX-2"
                class="form-control form-control-lg"
                placeholder="Academic Year Name"
                v-model="state.academic_year_name"
              />
            </div>

            <div class="form-outline mb-4">
              <label for="typeStartDateX-2"><strong>Start Date</strong></label>
              <input
                type="date"
                id="typeStartDateX-2"
                class="form-control form-control-lg"
                placeholder="Start Date"
                v-model="state.start_date"
              />
            </div>

            <div class="form-outline mb-4">
              <label for="typeClosureDateX-2"
                ><strong>Closure Date</strong></label
              >
              <input
                type="date"
                id="typeClosureDateX-2"
                class="form-control form-control-lg"
                placeholder="Closure Date"
                v-model="state.closure_date"
              />
            </div>

            <div class="form-outline mb-4">
              <label for="typeFinalClosureDateX-2"
                ><strong>Final Closure Date</strong></label
              >
              <input
                type="date"
                id="typeFinalClosureDateX-2"
                class="form-control form-control-lg"
                placeholder="Final Closure Date"
                v-model="state.final_closure_date"
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
      academic_year_name: "",
      start_date: "",
      closure_date: "",
      final_closure_date: "",
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
            "http://localhost:5000/academic-year/create-academic-year",
            {
              academicYear: {
                academic_year_name: state.academic_year_name,
                start_date: state.start_date,
                closure_date: state.closure_date,
                final_closure_date: state.final_closure_date,
                active: true,
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
              alert("added academic year successfully");

              router.push({
                path: "/academic-year/view-academic-year",
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