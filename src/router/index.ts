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
import SinglePostView from "../views/SinglePostView.vue";
import EditAcademicYearView from "../views/EditAcademicYearView.vue";
import EditCategoryView from "../views/EditCategoryView.vue";
import EditDepartmentView from "../views/EditDepartmentView.vue";
import EditUserView from "../views/EditUserView.vue";
import ViewQAMgrView from "../views/ViewQAMgrView.vue";
import ViewStaff from "../views/ViewStaff.vue";

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
        path: "/ideas/view-post/:post_id",
        name: "view_single_post",
        component: SinglePostView,
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
        path: "/users/view-qa-manager",
        name: "view_qa_manager",
        component: ViewQAMgrView,
    },
    {
        path: "/users/view-staff",
        name: "view_staff",
        component: ViewStaff,
    },
    {
        path: "/users/add-user",
        name: "add_user",
        component: AddUserView,
    },
    {
        path: "/users/edit-user/:user_id",
        name: "edit_user",
        component: EditUserView,
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
        path: "/academic-year/edit-academic-year/:academic_year_id",
        name: "edit_academic_year",
        component: EditAcademicYearView,
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
        path: "/category/edit-category/:category_id",
        name: "edit_category",
        component: EditCategoryView,
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
        path: "/department/edit-department/:dept_id",
        name: "edit_department",
        component: EditDepartmentView,
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
