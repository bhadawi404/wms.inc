import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MasterPartView from '../views/MasterPartView.vue'
import StockTakeView from '../views/StockTakeView.vue'
import ScanBarcodeView from '../views/ScanBarcodeView.vue'
import PurchaseOrder from '../views/PurchaseOrder.vue'
import ScanScreen from '../views/ScanScreen.vue'
import store from '../store'



const routes = [
  
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/master-part',
    name: 'master-part',
    component: MasterPartView,
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/stock-take',
    name: 'stock-take',
    component: StockTakeView,
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/scan-barcode',
    name: 'scan-barcode',
    component: ScanBarcodeView,
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/purchase-order',
    name: 'purchase-order',
    component: PurchaseOrder,
    meta:{
      requireLogin:true
    }
  },
  {
    path: '/scan-screen',
    name: 'scan-screen',
    component: ScanScreen,
    meta:{
      requireLogin:true
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next('/')
  }else{
    next()
  }
})
export default router