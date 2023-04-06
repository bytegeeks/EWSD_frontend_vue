<template>
  <div>
    <header class="navbar navbar-dark fixed-top navbar-expand-md bg-dark p-2">
      <router-link class="navbar-brand" to="/"
        >Bytegeeks University Dashboard</router-link
      >

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="store.state.loggedIn">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>

          <li class="nav-item dropdown" v-if="store.state.loggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Posts
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/ideas"
                  >View All Posts</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/ideas/create"
                  >Create Post</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" v-if="store.state.loggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Users
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/users/view-all-users"
                  >View All Users</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/users/view-qa-coor"
                  >View QA Coordinator</router-link
                >
              </li>

              <li v-if="store.state.role === 'admin'">
                <router-link class="dropdown-item" to="/users/add-user"
                  >Add User</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" v-if="store.state.loggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Comments
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/comments/view-latest-comment"
                  >Latest Comments</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/comments/view-anon-comment"
                  >Anonymous Comments</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" v-if="store.state.loggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Academic Year
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/academic-year/view-academic-year"
                  >View Academic Year</router-link
                >
              </li>
              <li v-if="store.state.role === 'admin'">
                <router-link
                  class="dropdown-item"
                  to="/academic-year/add-academic-year"
                  >Add Academic Year</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" v-if="store.state.loggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/category/view-categories"
                  >View Categories</router-link
                >
              </li>
              <li v-if="store.state.role === 'admin'">
                <router-link class="dropdown-item" to="/category/add-category"
                  >Add Category</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" v-if="store.state.loggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Departments
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/department/view-departments"
                  >View Departments</router-link
                >
              </li>
              <li v-if="store.state.role === 'admin'">
                <router-link
                  class="dropdown-item"
                  to="/department/add-department"
                  >Add Department</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item" v-if="store.state.loggedIn">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>

          <li class="nav-item" v-if="!store.state.loggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <!-- <li class="nav-item" v-if="!store.state.loggedIn">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li> -->
        </ul>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const state = reactive({
      username: "" as string | null,
      role: "" as string | null,
    });

    onMounted(() => {
      state.username = sessionStorage.getItem("username");
    });
    console.log(">>>>", store.state.role);
    // console.log(state.isLoggedIn);

    return {
      store,
      state,
    };
  },
});
</script>
