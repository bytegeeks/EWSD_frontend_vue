<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <NavBar />

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row my-3">
        <div class="col-4">
          <h1>View Categories</h1>
        </div>
      </div>
      <hr />

      <div class="row p-3">
        <table class="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Category ID</th>
              <th scope="col">Category Name</th>
              <th colspan="2" v-if="store.state.role == 'admin'">Options</th>
            </tr>
          </thead>
          <tbody
            v-for="category in state.categories"
            :key="category.category_id"
          >
            <tr>
              <td>{{ category.category_id }}</td>
              <td>{{ category.category_name }}</td>
              <td v-if="store.state.role == 'admin'">
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="(e) => editCategoryHandler(e, category.category_id)"
                >
                  Edit
                </button>
              </td>
              <td v-if="store.state.role == 'admin'">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="(e) => deleteCategoryHandler(e, category.category_id)"
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
      categories: [],
    });

    function editCategoryHandler(e: any, _category_id: string) {
      router.push({
        name: "edit_category",
        params: { category_id: _category_id },
      });
    }

    function deleteCategoryHandler(e: any, _category_id: string) {
      // call delete api
      alert("are u sure you want to delete?");
      const accessToken = sessionStorage.getItem("acsTkn");
      axios
        .post<any>(
          "http://localhost:5000/category/delete-category",
          { category_id: _category_id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          alert("category delete success");
          router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      if (!store.state.loggedIn) {
        router.push({ path: "/login" });
      }

      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
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
            console.log(data.status);
            // console.log(data.user_count);
            state.categories = data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    return {
      state,
      store,
      deleteCategoryHandler,
      editCategoryHandler,
    };
  },
});
</script>

<style scoped>
</style>