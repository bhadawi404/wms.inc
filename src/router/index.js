import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MasterPartView from '../views/MasterPartView.vue'
import StockTakeView from '../views/StockTakeView.vue'
import ScanBarcodeView from '../views/ScanBarcodeView.vue'



const routes = [
  
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/master-part',
    name: 'master-part',
    component: MasterPartView
  },
  {
    path: '/stock-take',
    name: 'stock-take',
    component: StockTakeView
  },
  {
    path: '/scan-barcode',
    name: 'scan-barcode',
    component: ScanBarcodeView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router