import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import IdeaView from "../views/IdeaView.vue";
import ViewAllUserView from "../views/ViewAllUserView.vue";
import ViewQAView from "../views/ViewQAView.vue";
import AddUserView from "../views/AddUserView.vue";
import LatestCommentsView from "../views/LatestCommentsView.vue";
import AnonCommentsView from "../views/AnonCommentsView.vue";
import AcademicYearView from "../views/AcademicYearView.vue";
import AddAcademicYearView from "../views/AddAcademicYearView.vue";
import ViewCategoriesView from "../views/ViewCategoriesView.vue";
import AddCategoryView from "../views/AddCategoryView.vue";
import ViewDepartmentsView from "../views/ViewDepartmentsView.vue";
import AddDepartmentView from "../views/AddDepartmentView.vue";
import Logout from "../views/Logout.vue";
import AddPostView from "../views/AddPostView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView,
    },
    {
        path: "/ideas",
        name: "ideas",
        component: IdeaView,
    },
    {
        path: "/ideas/create",
        name: "create_post",
        component: AddPostView,
    },
    {
        path: "/users/view-all-users",
        name: "view_all_users",
        component: ViewAllUserView,
    },
    {
        path: "/users/view-qa-coor",
        name: "view_qa_coor",
        component: ViewQAView,
    },
    {
        path: "/users/add-user",
        name: "add_user",
        component: AddUserView,
    },
    {
        path: "/comments/view-latest-comment",
        name: "view_latest_comment",
        component: LatestCommentsView,
    },
    {
        path: "/comments/view-anon-comment",
        name: "view_anon_comment",
        component: AnonCommentsView,
    },
    {
        path: "/academic-year/view-academic-year",
        name: "view_academic_year",
        component: AcademicYearView,
    },
    {
        path: "/academic-year/add-academic-year",
        name: "add_academic_year",
        component: AddAcademicYearView,
    },
    {
        path: "/category/view-categories",
        name: "view_categories",
        component: ViewCategoriesView,
    },
    {
        path: "/category/add-category",
        name: "add_category",
        component: AddCategoryView,
    },
    {
        path: "/department/view-departments",
        name: "view_departments",
        component: ViewDepartmentsView,
    },
    {
        path: "/department/add-department",
        name: "add_department",
        component: AddDepartmentView,
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
