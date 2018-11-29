import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Center     from '@/components/Center'
import MyVotes    from '@/components/MyVotes'
import NewVote    from '@/components/NewVote'
import Vote       from '@/components/Vote'
import Login      from '@/components/Login'
import Register   from '@/components/Register'
import History    from '@/components/History'
import store      from "../store/store";
import cookies from 'vue-cookies';


Vue.use(Router);

let vm = new Vue();

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/vote/:id',
      name: 'vote',
      component: Vote
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      redirect: '/center/myVotes',
      children:[
        {
          path: '/center/myVotes',
          name: 'myVotes',
          component: MyVotes
        },
        {
          path: '/center/newVote',
          name: 'newVote',
          component: NewVote
        },
        {
          path: '/center/history',
          name: 'history',
          component: History
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
    console.log("%c[TO_ROUTE]",'color:green; font-weight:bold', to.path);
    console.log("%c[FR_ROUTE]", 'color:blue; font-weight:bold', from.path);
    console.log("%c[USER__ID]", 'color:red; font-weight:bold', store.state.userId);
    // todo 没有userId 直接跳回注册登陆页面
    if (to.path === '/login' || to.path === '/register') {
      next();
    } else if (!store.state.userId) {
      if (cookies.get('userId')) {
        store.setLogin(cookies.get('userId'));
        next();
        return;
      }
      vm.$message.error("请先登录");
      next('/login');
    } else {
      next();
    }

});

export default router;
