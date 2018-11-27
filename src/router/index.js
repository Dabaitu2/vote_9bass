import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Center     from '@/components/Center'
import MyVotes    from '@/components/MyVotes'
import NewVote    from '@/components/NewVote'
import Vote       from '@/components/Vote'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
        }
      ]
    }
  ]
})
