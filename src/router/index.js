import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

import store from '../store'

// Amplify読み込み
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'

Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)


let user;

// ユーザー管理
getUser().then((user) => {
    if (user) {
        router.push({path: '/'});
    }
});

function getUser() {
    return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
        if (data && data.signInUserSession) {
            store.commit('setUser', data);
            return data;
        }
    }).catch(() => {
        store.commit('setUser', null);
        return null;
    });
}

// ログイン状態管理
AmplifyEventBus.$on('authState', async (state) => {
    if (state === 'signedOut'){
        user = null;
        store.commit('setUser', null);
        router.push({path: '/login'});
    } else if (state === 'signedIn') {
        user = await getUser();
        router.push({path: '/'});
    }
});

const routes = [
  {
    // トップページ
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true}
  },
  {
    // ログインページ
    path: '/login',
    name: 'login',
    component: Login
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// リダイレクト設定
router.beforeResolve(async (to, from, next) => {
    // 認証が必要なページならば
    if (to.matched.some(record => record.meta.requiresAuth)) {
        user = await getUser();
        if (!user) {
            return next({
                path: '/login'
            });
        }
        return next()
    }
    return next()
});

export default router