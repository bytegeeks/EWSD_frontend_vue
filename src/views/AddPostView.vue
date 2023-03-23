<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-6">
          <h1>Create Post</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <div class="card-body p-4 text-center">
          <div class="form-outline mb-4">
            <input
              type="text"
              id="typePostContentX-2"
              class="form-control form-control-lg"
              placeholder="Post Content"
              v-model="state.post_content"
            />
          </div>

          <div class="form-outline mb-4">
            <input
              type="text"
              id="typeDateX-2"
              class="form-control form-control-lg"
              placeholder="Date"
              v-model="state.post_date"
            />
          </div>

          <div class="form-outline mb-4">
            <input
              type="text"
              id="typeCategoryX-2"
              class="form-control form-control-lg"
              placeholder="Category"
              v-model="state.category_id"
            />
          </div>

          <div class="form-outline mb-4">
            <input
              type="text"
              id="typeDepartmentX-2"
              class="form-control form-control-lg"
              placeholder="Department"
              v-model="state.dept_id"
            />
          </div>

          <div class="form-outline mb-4">
            <input
              type="text"
              id="typeAcademicYearX-2"
              class="form-control form-control-lg"
              placeholder="Academic Year"
              v-model="state.academic_year_id"
            />
          </div>

          <button class="btn btn-primary btn-lg btn-block" @click="onSubmit">
            Create
          </button>
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
      post_content: "",
      post_date: "",
      category_id: "",
      dept_id: "",
      academic_year_id: "",
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
            "http://localhost:5000/post/create-post",
            {
              post: {
                post_type: "text",
                post_content: state.post_content,
                post_attachment: "",
                post_date: state.post_date,
                dept_id: state.dept_id,
                category_id: state.category_id,
                academic_year_id: state.academic_year_id,
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