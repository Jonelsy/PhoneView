import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Headers from "@/components/Headers";
import LoginUp from "@/views/loginUp";
import sinUp from "@/views/sinUp"
import Appointment from "@/views/Appointment";
import InnerCard from "@/views/InnerCard";
import SelectPeople from "@/views/SelectPeople";
import addPeople from "@/views/addPeople";
import order from "@/views/order";
import user from "@/views/user"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginUp',
    component: LoginUp
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path: '/Headers',
    name: 'Headers',
    component: Headers
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sinUp',
    name: 'sinUp',
    component: sinUp
  },
  {
    path: '/Appointment',
    name: 'Appointment',
    component: Appointment
  },
  {
    path: '/InnerCard',
    name: 'InnerCard',
    component: InnerCard
  },
  {
    path: '/SelectPeople',
    name: 'SelectPeople',
    component: SelectPeople
  },
  {
    path: '/addPeople',
    name: 'addPeople',
    component: addPeople
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/user',
    name: 'user',
    component: user
  }
]

const router = new VueRouter({
  routes
})

export default router
