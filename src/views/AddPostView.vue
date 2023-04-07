<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Create Post</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <div class="card-body p-2" v-if="state.canUserPost">
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              value="true"
              id="defaultCheck1"
              v-model="state.anonCheck"
            />
            <label class="form-check-label" for="defaultCheck1">
              Post as Anonymous
            </label>
          </div>

          <div class="form-group mb-4">
            <textarea
              class="form-control"
              id="post-content"
              rows="3"
              v-model="state.post_content"
              placeholder="Enter content here"
            ></textarea>
          </div>

          <div class="form-group mb-4">
            <input type="file" @change="uploadFile" />
            <!-- <button @click="submitFile">Submit</button> -->
          </div>

          <div class="form-group mb-4">
            <label for="cat-select"><strong>Select Category</strong></label>
            <select
              class="form-select mt-2"
              id="cat-select"
              aria-label="Category select"
              v-model="state.category_name"
            >
              <option
                v-for="cat in state.categories"
                :key="cat.category_id"
                :value="cat.category_name"
              >
                {{ cat.category_name }}
              </option>
            </select>
          </div>

          <div class="form-group mb-4">
            <label for="dept-select"><strong>Select Department</strong></label>
            <select
              class="form-select mt-2"
              id="dept-select"
              aria-label="Department select"
              v-model="state.dept_name"
            >
              <option
                v-for="dept in state.departments"
                :key="dept.dept_id"
                :value="dept.dept_name"
              >
                {{ dept.dept_name }}
              </option>
            </select>
          </div>

          <div class="form-group mb-4">
            <label for="dept-select"
              ><strong>Select Academic Year</strong></label
            >
            <select
              class="form-select mt-2"
              id="dept-select"
              aria-label="Academic Year select"
              v-model="state.academic_year_name"
            >
              <option
                v-for="ay in state.academicYears"
                :key="ay.academic_year_id"
                :value="ay.academic_year_name"
              >
                {{ ay.academic_year_name }}
              </option>
            </select>
          </div>

          <button class="btn btn-primary btn-lg btn-block" @click="onSubmit">
            Create
          </button>
        </div>
        <div v-else>
          Post submissions cannot be done as it has passed the closure date...
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
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
      post_content: "",
      post_date: "",
      categories: [],
      departments: [],
      academicYears: [],
      category_name: "",
      dept_name: "",
      anonCheck: "false",
      academic_year_name: "",
      post_attachment: "",
      canUserPost: null as boolean | null,
    });

    const file = ref();

    function uploadFile(e: any) {
      file.value = e.target.files[0];
    }

    // function submitFile(): string {
    //   const formData = new FormData();
    //   formData.append("file", file.value);
    //   const accessToken = sessionStorage.getItem("acsTkn");
    //   const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${accessToken}`,
    //   };
    //   axios
    //     .post<any>("http://localhost:5000/file/upload", formData, { headers })
    //     .then((res) => {
    //       return res.data.location;
    //     })
    //     .catch((err) => console.log(err));
    // }

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const start_date = sessionStorage.getItem("academic_year_start_date");
      const end_date = sessionStorage.getItem("academic_year_closure_date");
      if (start_date && end_date) {
        const ts = Date.parse(start_date);
        const te = Date.parse(end_date);
        const tn = Date.now();
        // if tf < tn -> it has passed the final closure date
        state.canUserPost = tn >= ts && tn < te;
      }

      const accessToken = sessionStorage.getItem("acsTkn");

      axios
        .post<any>(
          "http://localhost:5000/category/view-all-category",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          state.categories = data.data;
        })
        .catch((error) => {
          console.log(error);
        });

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
          state.academicYears = data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    async function onSubmit(e: any) {
      e.preventDefault();

      const accessToken = sessionStorage.getItem("acsTkn");
      const username = sessionStorage.getItem("username");
      if (accessToken) {
        const formData = new FormData();
        formData.append("file", file.value);
        const accessToken = sessionStorage.getItem("acsTkn");
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        };

        axios
          .post<any>("http://localhost:5000/file/upload", formData, { headers })
          .then(({ data }) => {
            console.log(data.data.location);
            if (data.status) {
              state.post_attachment = data.data.location;
            }

            axios
              .post<any>(
                "http://localhost:5000/post/create-post",
                {
                  post: {
                    post_type: state.anonCheck,
                    username: username,
                    post_content: state.post_content,
                    post_date: new Date().toLocaleString("en-GB", {
                      hour12: false,
                    }),
                    dept_name: state.dept_name,
                    category_name: state.category_name,
                    academic_year_name: state.academic_year_name,
                    post_attachment: state.post_attachment,
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
                  alert("added post successfully");

                  router.push({
                    path: "/ideas",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => console.log(err));
      }
    }

    return {
      state,
      onSubmit,
      uploadFile,
    };
  },
});
</script>

<style scoped>
</style>