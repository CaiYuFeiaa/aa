import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Welcome from '../views/Welcome.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import UploadImg from '../views/UploadImg.vue'
import UpCategory from '../views/UpCategory.vue'
import UpIcon from '../views/UpIcon.vue'
import User from '../views/User.vue'
import ImgDetails from '../views/ImgDetails.vue'
import EditInterest from '../views/EditInterest.vue'
import ImgList from '../views/ImgList.vue'
import UserList from '../views/UserList.vue'
import ResetPassword from '../views/ResetPassword.vue'
import UserDetails from '../views/UserDetails.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminIndex from '../views/AdminIndex.vue'
import AdminQuestion from '../views/AdminQuestion.vue'
import AdminImg from '../views/AdminImg.vue'
import AdminCategoryList from '../views/AdminCategoryList.vue'
import AdminIconList from '../views/AdminIconList.vue'
import AdminQuestionList from '../views/AdminQuestionList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: 'index',
        component: Index
    },
    {
        path: 'welcome',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/uploadImg',
        name: 'uploadImg',
        component: UploadImg
    },
    {
        path: '/upCategory',
        name: 'upCategory',
        component: UpCategory
    },
    {
        path: '/upIcon',
        name: 'upIcon',
        component: UpIcon
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/imgDetails',
        name: 'imgDetails',
        component: ImgDetails
    },
    {
        path: '/editInterest',
        name: 'editInterest',
        component: EditInterest
    },
    {
        path: '/imgList',
        name: 'imgList',
        component: ImgList
    },
    {
        path: '/userList',
        name: 'userList',
        component: UserList
    },
    {
        path: '/resetPassword',
        name: 'resetPassword',
        component: ResetPassword
    },
    {
        path: '/userDetails',
        name: 'userDetails',
        component: UserDetails
    },
    {
        path: '/adminLogin',
        name: 'adminLogin',
        component: AdminLogin
    },
    {
        path: '/adminIndex',
        name: 'adminIndex',
        component: AdminIndex
    },
    {
        path: '/adminQuestion',
        name: 'adminQuestion',
        component: AdminQuestion
    },
    {
        path: '/adminImg',
        name: 'adminImg',
        component: AdminImg
    },
    {
        path: '/adminCategoryList',
        name: 'adminCategoryList',
        component: AdminCategoryList
    },
    {
        path: '/adminIconList',
        name: 'adminIconList',
        component: AdminIconList
    },
    {
        path: '/adminQuestionList',
        name: 'adminQuestionList',
        component: AdminQuestionList
    },
]

const router = new VueRouter({
    routes
})

export default router
