<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Edit Academic Year</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <div class="card bg-dark text-light" style="border-radius: 1rem">
          <div class="card-body p-4">
            <div class="form-outline mb-4">
              <label for="typeAYNameX-2"
                ><strong>Academic Year Name (*)</strong></label
              >
              <input
                type="text"
                id="typeAYNameX-2"
                class="form-control form-control-lg"
                placeholder="Academic Year Name"
                v-model="state.academic_year_name"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <label for="typeStartDateX-2"
                ><strong>Start Date (*)</strong></label
              >
              <input
                type="date"
                id="typeStartDateX-2"
                class="form-control form-control-lg"
                placeholder="Start Date"
                v-model="state.start_date"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <label for="typeClosureDateX-2"
                ><strong>Closure Date (*)</strong></label
              >
              <input
                type="date"
                id="typeClosureDateX-2"
                class="form-control form-control-lg"
                placeholder="Closure Date"
                v-model="state.closure_date"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <label for="typeFinalClosureDateX-2"
                ><strong>Final Closure Date (*)</strong></label
              >
              <input
                type="date"
                id="typeFinalClosureDateX-2"
                class="form-control form-control-lg"
                placeholder="Final Closure Date"
                v-model="state.final_closure_date"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="{{ state.active }}"
                  id="defaultCheck1"
                  v-model="state.active"
                  required
                />
                <label class="form-check-label" for="defaultCheck1">
                  Active
                </label>
              </div>
            </div>

            <div>
              <i>(*) - required</i>
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
      academic_year_name: "",
      start_date: "",
      closure_date: "",
      final_closure_date: "",
      active: "",
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      // fetch academic year details by ay id
      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/academic-year/view-academic-year",
            {
              academic_year_id: route.params.academic_year_id,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            state.academic_year_name = data.data.academic_year_name;
            state.start_date = data.data.start_date;
            state.closure_date = data.data.closure_date;
            state.final_closure_date = data.data.final_closure_date;
            state.active = data.data.active;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    function onSubmit(e: any) {
      e.preventDefault();
      if (
        state.academic_year_name === "" ||
        state.start_date === "" ||
        state.closure_date === "" ||
        state.final_closure_date === ""
      ) {
        alert("please fill in all the required fields");
        router.go(0);
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/academic-year/edit-academic-year",
            {
              academic_year_id: route.params.academic_year_id,
              academicYear: {
                academic_year_name: state.academic_year_name,
                start_date: state.start_date,
                closure_date: state.closure_date,
                final_closure_date: state.final_closure_date,
                active: state.active,
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
              sessionStorage.setItem("academic_year_active", state.active);
              alert("updated academic year successfully");

              router.push({
                path: "/academic-year/view-academic-year",
              });
            } else {
              alert(data.message);
              router.go(0);
            }
          })
          .catch((error) => {
            //console.log(error);
            alert("must have at least one active academic year");
            router.go(0);
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