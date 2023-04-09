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
            <input type="file" @change="uploadFile"  />
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

          <!-- <ModalComp @close="toggleModal" :modalActive="modalActive">
            <div class="modal-content">
              <h1>This is a ModalComp Header</h1>
              <p>This is a modal message</p>
            </div>
          </ModalComp>
          <button @click="toggleModal" class="btn btn-primary" type="button">
            Open ModalComp
          </button> -->
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
// import ModalComp from "../components/ModalComp.vue";

export default defineComponent({
  name: "ViewAllUserView",
  components: {
    NavBar,
    // ModalComp,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

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

      confirm(
        "Welcome to our online feedback submission system. These terms and conditions govern your use of our platform and your submission of feedback through our website.\r\n\r\n- Acceptance of Terms\r\n\r\nBy accessing or using our website, you agree to be bound by these terms and conditions. \r\nIf you do not agree to these terms and conditions, please do not use our website.\r\n\r\n- Use of the Feedback Submission System\r\n\r\nOur feedback submission system is provided for the purpose of submitting feedback related to our products or services. \r\nYou may only use this system for lawful purposes and in a manner consistent with these terms and conditions. \r\nYou must not use the feedback submission system to submit any feedback that is offensive, defamatory, or infringing on the rights of others.\r\n\r\n- Ownership and License\r\n\r\nYou retain ownership of any feedback that you submit through our feedback submission system. \r\nHowever, by submitting feedback, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, \r\nmodify, and distribute your feedback in connection with our products or services.\r\n\r\n- Privacy\r\n\r\nWe take the privacy of our users seriously. Any personal information that you provide to us through our feedback submission system\r\nwill be subject to our privacy policy. By submitting feedback, you acknowledge that you have read and agree to our privacy policy.\r\n\r\n- Limitation of Liability\r\n\r\nTo the fullest extent permitted by law, we will not be liable for any damages arising out of or in connection \r\nwith the use of our feedback submission system, including but not limited to any damages for lost profits, revenue, data, or use.\r\n\r\n- Modification of Terms and Conditions\r\n\r\nWe reserve the right to modify these terms and conditions at any time without prior notice. Any such modifications will be \r\neffective immediately upon posting on our website. Your continued use of our feedback submission system after any modification \r\nconstitutes your acceptance of the modified terms and conditions.\r\n\r\n- Governing Law\r\n\r\nThese terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate. \r\nAny disputes arising out of or in connection with these terms and conditions will be subject to the exclusive jurisdiction of \r\nthe courts of that jurisdiction.\r\n\r\nBy using our feedback submission system, you agree to these terms and conditions in their entirety. \r\nIf you have any questions about these terms and conditions, please contact us."
      );

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
      modalActive,
      toggleModal,
    };
  },
});
</script>

<style scoped>
</style>