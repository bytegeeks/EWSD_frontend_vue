<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>View Academic Year</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <table class="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Academic Year ID</th>
              <th scope="col">Academic Year Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">Closure Date</th>
              <th scope="col">Final Closure Date</th>
              <th scope="col">Active</th>
              <th colspan="2">Options</th>
            </tr>
          </thead>
          <tbody v-for="ay in state.academicYears" :key="ay.academic_year_id">
            <tr>
              <td>{{ ay.academic_year_id }}</td>
              <td>{{ ay.academic_year_name }}</td>
              <td>{{ ay.start_date }}</td>
              <td>{{ ay.closure_date }}</td>
              <td>{{ ay.final_closure_date }}</td>
              <td>{{ ay.active }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="
                    (e) => editAcademicYearHandler(e, ay.academic_year_id)
                  "
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="
                    (e) => deleteAcademicYearHandler(e, ay.academic_year_id)
                  "
                >
                  Delete
                </button>
              </td>
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
      academicYears: [],
    });

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        axios
          .post<any>(
            "http://localhost:5000/academic-year/view-all-academic-year",
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
            state.academicYears = data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    function editAcademicYearHandler(e: any, _academic_year_id: string) {
      router.push({
        name: "edit_academic_year",
        params: { academic_year_id: _academic_year_id },
      });
    }

    function deleteAcademicYearHandler(e: any, _academic_year_id: string) {
      // call delete api
      alert("are u sure you want to delete?");
      const accessToken = sessionStorage.getItem("acsTkn");
      axios
        .post<any>(
          "http://localhost:5000/academic-year/delete-academic-year",
          { academic_year_id: _academic_year_id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          alert("academic year delete success");
          router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      state,
      editAcademicYearHandler,
      deleteAcademicYearHandler,
    };
  },
});
</script>

<style scoped>
</style>