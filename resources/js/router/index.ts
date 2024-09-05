import { createRouter,createWebHistory, type RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

declare module 'vue-router'
{
    interface RouteMeta { 
        pageTitle?: string
        permission?: string
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        name: 'Dashboard',
        meta: {
            pageTitle: 'Dashboard'
        },
        component: () => import('@/Layouts/Dashboard.vue'),
    },
    { 
        path:'/login',
        name: 'login',
        meta: {
            pageTitle: 'Login'
        },
        component: () => import('@/Pages/auth/SignIn.vue'),
    },
    {
        path:'/register',
        name: 'register',
        meta: {
            pageTitle: 'Register'
        },
        component: () => import('@/Pages/auth/SignUp.vue'),
    },
    
    
]

const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 0,
                behavior: 'smooth'
            } 
        } else {
            return {
                top: 0,
                left: 0,
                behavior: 'smooth'
            }
        }
    }
})

router.beforeEach(async(to,from,next) => {
    if (to.name) {
        NProgress.start();
    }
    if (to.meta.pageTitle) {
        document.title = `${to.meta.pageTitle}`;
     } else {
        document.title = import.meta.env.VITE_APP_NAME as string;
     }
     next()
})

router.afterEach(() => {
   NProgress.done()
})

export default router;