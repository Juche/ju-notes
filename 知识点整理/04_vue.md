# Vue

[🔻底部](#bottom)<a id="top">⚓</a>

- [Vue](#vue)
  - [基本知识](#基本知识)
    - [简答](#简答)
    - [v-model](#v-model)
    - [v-if和v-for同时使用的问题](#v-if和v-for同时使用的问题)
    - [delete和Vue.delete删除数组的区别](#delete和vuedelete删除数组的区别)
    - [$nextTick](#nexttick)
    - [vue.cli项目中src目录](#vuecli项目中src目录)
    - [修饰符](#修饰符)
    - [v-bind.sync](#v-bindsync)
    - [vue初始化页面闪动](#vue初始化页面闪动)
  - [vue高级](#vue高级)
    - [MVVM](#mvvm)
    - [响应式数据原理（Vue2和3）](#响应式数据原理vue2和3)
    - [vue双向绑定原理](#vue双向绑定原理)
    - [Proxy与Object.defineProperty的优劣对比](#proxy与objectdefineproperty的优劣对比)
    - [vue2和vue3的区别](#vue2和vue3的区别)
    - [项目构建](#项目构建)
    - [实例化vue](#实例化vue)
    - [Vuex](#vuex)
    - [axios](#axios)
    - [render函数](#render函数)
    - [Vue-router跳转和location.href有什么区别](#vue-router跳转和locationhref有什么区别)
    - [生命周期 hook 钩子](#生命周期-hook-钩子)
    - [组件间传值和获取数据](#组件间传值和获取数据)
    - [自定义指令](#自定义指令)
    - [生命周期](#生命周期)
    - [computed和watch](#computed和watch)
    - [computed和methods](#computed和methods)
    - [监听一个对象内部的变化](#监听一个对象内部的变化)
    - [vue路由](#vue路由)
    - [vue怎么重置data](#vue怎么重置data)
    - [强制刷新组件](#强制刷新组件)
    - [优化首页的加载速度](#优化首页的加载速度)
    - [diff算法](#diff算法)
    - [缓存组件及缓存组件更新](#缓存组件及缓存组件更新)
    - [axios解决跨域请求](#axios解决跨域请求)

---

## 基本知识

### 简答

- 给vue定义全局的方法: Vue.prototype.方法名称
- vue打包后静态资源图片失效的问题: 将静态资源的存放位置放在src目录下
- vue动态设置img的src不生效: 因为动态添加src被当做静态资源处理了，没有进行编译，所以要加上require
- 跟keep-alive有关的生命周期: activated和deactivated
<!-- - vue中key的原理: -->
- 监听到数组变化的方法: 观察数组变化主要通过以下7个方法: push、pop、shift、unshift、splice、sort、reverse
- v-for循环时为什么要加key: 为了高效的更新虚拟DOM，使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点
- 单页面应用优缺点

优: 用户体验好，内容的改变不需要重新加载整个页面，对服务器压力较小
缺: 不利于seo,初次加载时耗时多

- vue的两个核心点

数据驱动： ViewModel，保证数据和视图的一致性。
组件系统： 应用类UI可以看作全部是由组件树构成的。

- data为什么必须是一个函数: 以函数返回值的形式定义，复用组件的时候都会返回一份新的 data，每个组件实例都有自己私有的数据空间。写成对象形式，那么所有的组件实例共用了一个 data,会相互影响

### v-model

用于表单数据的双向绑定，其实它就是一个语法糖，v-bind 绑定 value 属性；v-on 指令给当前元素绑定对应表单事件

### v-if和v-for同时使用的问题

v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级，这意味着 v-if 将分别重复运行于每个 v-for 循环中。所以，不推荐

```js
template: `
  <input
    type="checkbox"
    v-bind:checked="checked"
    v-on:change="$emit('change', $event.target.checked)"
  >`
```

### delete和Vue.delete删除数组的区别

- delete 只是被删除的元素变成了 empty/undefined
- Vue.delete 直接删除了数组 改变了数组的键值

### $nextTick

在修改数据之后立即使用这个方法，获取更新后的 DOM,在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用

Promise
MutationObserver
setImmediate
如果以上都不行则采用setTimeout

定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列

### vue.cli项目中src目录

- assets 静态资源
- components 组件
- router 路由相关的配置;
- app.vue 应用主组件
- main.js 入口文件

### 修饰符

- .lazy
- .number
- .trim
- .stop：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡；
- .prevent ：等同于 JavaScript 中的 event.preventDefault() ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；
- .capture ：与事件冒泡的方向相反，事件捕获由外到内；
- .self ：只会触发自己范围内的事件，不包含子元素；
- .once ：只会触发一次。

### v-bind.sync

```vue
<!-- 子组件传值给父级： -->
this.$emit('update:title', newValue)
<!-- 父级可以监听该事件并更新本地 data property -->
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
<!-- 使用 .sync 修饰符来缩写 -->
<ChildComponent :title.sync="pageTitle" />
```

### vue初始化页面闪动

`[v-cloak] { display: none; }`

## vue高级

### MVVM

MVVM是Model-View-ViewModel缩写，也就是把MVC中的Controller演变成ViewModel。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

### 响应式数据原理（Vue2和3）

Vue2.x在初始化数据时，会使用Object.defineProperty重新定义data中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的watcher)，如果属性发生变化会通知相关依赖进行派发更细(发布订阅模式)。
vue3.0采用es6中的proxy代替Object.defineProperty做数据监听。

### vue双向绑定原理

采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调

具体步骤如下。

（1）对需要观察的数据对象进行递归遍历，包括子属性对象的属性，设置set和get特性方法。当给这个对象的某个值赋值时，会触发绑定的set特性方法，于是就能监听到数据变化。

（2）用 compile解析模板指令，将模板中的变量替换成数据。然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者。一旦数据有变动，就会收到通知，并更新视图

（3） Watcher订阅者是 Observer和 Compile之间通信的桥梁，主要功能如下。

在自身实例化时向属性订阅器（dep）里面添加自己。
自身必须有一个 update( )方法。
在 dep.notice()发布通知时，能调用自身的 updat()方法，并触发 Compile中绑定的回调函数。
（4）MVVM是数据绑定的入口，整合了 Observer、 Compile和 Watcher三者，通过Observer来监听自己的 model数据变化，通过 Compile来解析编译模板指令，最终利用Watcher搭起 Observer和 Compile之间的通信桥梁，达到数据变化通知视图更新的效果。利用视图交互，变化更新数据 model变更的双向绑定效果。


### Proxy与Object.defineProperty的优劣对比

Proxy的优势如下:
Proxy可以直接监听对象而非属性
Proxy可以直接监听数组的变化
Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的
Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改
Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty的优势如下:
兼容性好,支持IE9

### vue2和vue3的区别

[值得注意的新特性](https://v3.cn.vuejs.org/guide/migration/introduction.html#值得注意的新特性)

- Composition API
- 去除了 $on, $off, $once 等方法
- 创建 vue 实例

```js
// 2.x 时代的 Vue 没有“应用”的概念，所谓的应用只是一个 Vue 的根实例  new Vue(),当我们需要修改一些全局属性的时候，只能通过 Vue 对象本身来修改
new Vue({
  render: h => h(App),
}).$mount('#app');
// 从表面上看，createApp 只是改良版的 render 函数，但其实他解决了 2.x 中的一些不太优雅用法
// 这样的行为会污染 Vue 对象，导致从同一个 Vue 创建的实例会共享相同的全局配置
Vue.prototype.$http = axios;
Vue.directive('focus', {
  inserted: el => el.focus()
});
Vue.config.errorHandler = errorHandler;

// 3.x createApp
// 而通过 createApp 返回的是独立的实例，修改该实例的属性不会影响其他 createApp 创建的实例
// foo 和 bar 都具备了 focus 指令，但这两个指令的内容相互独立
const foo = createApp(Foo);
foo.directive('focus' /* ... */);
const bar = createApp(Bar);
bar.directive('focus' /* ... */);

// 如果确实需要两个应用共享配置，还可以通过 createApp 创建一个工厂函数：
const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)
  return app
}
const foo = createMyApp(Foo).mount('#foo')
const bar = createMyApp(Bar).mount('#bar')
```

### 项目构建

```sh
# vite
npm init vite@latest
yarn create vite  # 创建项目

# vue-cli
yarn global add @vue/cli  # 安装
yarn global upgrade --latest @vue/cli  # 升级
vue ui  # 图形化界面创建项目
vue create PROJECTNAME  # 命令行创建项目
```

### 实例化vue

```js
/*Vue 2*/
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

/*Vue 3*/
Vue.createApp({
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-rendering')
```

### Vuex

vuex: State、Getter、Mutation 、Action、 Module

state => 基本数据(数据源存放地)
getters => 从基本数据派生出来的数据
mutations => 提交更改数据的方法，同步！
actions => 包裹mutations，使之可以异步。
<!-- modules => 模块化Vuex -->

```js
// 提交 mutation
commit(mutation: Object, options?: Object)
// 分发 action
dispatch(action: Object, options?: Object): Promise<any>x

commit: 同步操作
存储
this.$store.commit('changeValue',name)
取值
this.$store.state.changeValue

dispatch: 异步操作
存储
this.$store.dispatch('getlists',name)
取值
this.$store.getters.getlists

mapGetters/mapMutations

message: {
    get () {
        return this.$store.state.message
    },
    set (value) {
        this.$store.commit('updateMessage', value)
    }
}
```

ajax请求: 1. 仅仅在请求的组件内使用，就不需要放入vuex 的state里
1. 被其他地方复用，这个很大几率上是需要的，如果需要，请将请求放入action里

### axios

- 支持Promise API
- 拦截请求和响应
- axios中的发送字段的参数是data跟params两个，两者的区别在于params是跟请求地址一起发送的，data的作为一个请求体进行发送,params一般适用于get请求，data一般适用于post put 请求

### render函数

[render函数](https://www.jianshu.com/p/7508d2a114d3)

### Vue-router跳转和location.href有什么区别

使用 location.href= /url 来跳转，简单方便，但是刷新了页面；使用 history.pushState( /url ) ，无刷新页面，静态跳转；引进 router ，然后使用 router.push( /url ) 来跳转，使用了 diff 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 history.pushState() 没什么差别的，因为vue-router就是用了 history.pushState() ，尤其是在history模式下。

### 生命周期 hook 钩子

在 vue3 中为 `vnode-`

```js
mounted(){
 const timer = setInterval(()=>{
    console.log(1)
 },1000)
 this.$once('hook:beforeDestroy',()=>{
  clearInterval(timer)
 })
}
```

### 组件间传值和获取数据

```vue
props, $emit, ref, $parent / $children, EventBus （$emit / $on）,$attrs/$listeners, provide / inject, Vuex

- $attrs
- $props
- $listeners

## 获取数据
// 1. 父访问子 $children, $ref(建议)
// 2. 子访问父 $parent,
// 3. 父到孙 $attrs, inheritAttrs
// 4. 跨代(后代获取祖先) provide, inject

## 传值
<!-- [Vue3中使用Eventbus组件](https://blog.csdn.net/weixin_35958891/article/details/110441771)
Vue3 从实例中完全删除了 $on、$off 和 $once 方法。$emit 仍然是现有API的一部分，因为它用于触发由父组件以声明方式附加的事件, 因此 this.$root.$on, 和创建空实例来完成 EventBus 的做法已不适用 -->
// 1. 父传子: props
// 2. 子传父: $emit 组件绑定该事件(vue2 也可以用 $on)
// 3. 简单场景也可以用 this.$root.$emit 和 this.$root.$on(只适用 vue2)
// 4. EventBus: 简单的状态管理: EventBus事件总线(记得销毁事件)
// [Vue 事件总线](https://zhuanlan.zhihu.com/p/72777951)
// 实质上EventBus是一个不具备 DOM 的组件，它具有的仅仅只是它实例方法而已
  // 1. 通过 js 文件 event-bus.js
  import Vue from 'vue'
  export const EventBus = new Vue()
  // 2. 在入口文件全局创建 main.js
  Vue.prototype.$EventBus = new Vue()

<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>

<script>
import { EventBus } from "../event-bus.js";
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
};
</script>

<!-- B.vue -->
<template>
  <p>{{msg}}</p>
</template>

<script>
import {
  EventBus
} from "../event-bus.js";
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>

可以使用 EventBus.$off('aMsg') 来移除应用内所有对此某个事件的监听。或者直接调用 EventBus.$off() 来移除所有事件频道

// 5. 复杂状态管理 Vuex
```

### 自定义指令

```js
// 2.x 语法
<p v-highlight="'yellow'">高亮显示此文本亮黄色</p>
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})

几个可用的钩子（生命周期）, 每个钩子可以选择一些参数
- bind: 一旦指令附加到元素时触发
- inserted: 一旦元素被添加到父元素时触发
- update: 每当元素本身更新(但是子元素还未更新)时触发
- componentUpdate: 每当组件和子组件被更新时触发
- unbind: 一旦指令被移除时触发。

每个钩子都有 el, binding, 和 vnode 参数可用.
update 和 componentUpdated 钩子还暴露了 oldVnode, 以区分传递的旧值和较新的值.
el 就是所绑定的元素.
binding 是一个保护传入钩子的参数的对象. 有很多可用的参数, 包括 name, value, oldValue, expression, arguments, arg 及修饰语.
vnode 有一个更不寻常的用例, 它可用于你需要直接引用到虚拟 DOM 中的节点.
binding 和 vnode 都应该被视为只读.

// 3.x 语法
然而，在 Vue 3 中，我们为自定义指令创建了一个更具凝聚力的 API。正如你所看到的，它们与我们的组件生命周期方法有很大的不同，即使我们正与类似的事件钩子，我们现在把它们统一起来了：

created - 新的！在元素的 attribute 或事件侦听器应用之前调用。
bind → beforeMount
inserted → mounted
beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 updated。
componentUpdated → updated
beforeUnmount：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
unbind -> unmounted

最终 API 如下：
const MyDirective = {
  created(el, binding, vnode, prevVnode) {}, // 新增
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // 新增
  updated() {},
  beforeUnmount() {}, // 新增
  unmounted() {}
}

<p v-highlight="'yellow'">高亮显示此文本亮黄色</p>

const app = Vue.createApp({})
app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

### 生命周期

- beforeCreate: 组件实例被创建之初，组件的属性生效之前
- created: 组件实例已经完全创建，属性也绑定，但真实dom还没有生成，$el还不可用
- beforeMount: 在挂载开始之前被调用：相关的 render 函数首次被调用
- mounted: el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
- beforeUpdate: 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前
- update: 组件数据更新之后
- activited: keep-alive专属，组件被激活时调用
- deadctivated: keep-alive专属，组件被销毁时调用
- beforeDestory: 组件销毁前调用
- destoryed: 组件销毁后调用

### computed和watch

- computed:
  - ① 有缓存机制；② 不能接受参数；③ 可以依赖其他 computed，甚至是其他组件的 data；④ 不能与 data 中的属性重复
  - 一个属性受多个属性影响的时候建议使用 computed
- watch:
  - ① 可接受两个参数；② 监听时可触发一个回调，并做一些事情；③ 监听的属性必须是存在的；④ 允许异步
  - handler、deep（是否深度）、immeditate （是否立即执行）
  - 一条数据影响多条数据的时候,要执行一些业务逻辑或异步操作的时候建议使用 watch

### computed和methods

- 可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的
- computed: 计算属性是基于它们的依赖进行缓存的,只有在它的相关依赖发生改变时才会重新求值对于 method
- method 只要发生重新渲染,调用总会执行该函数

### 监听一个对象内部的变化

```js
方法①：对整个obj深层监听
watch:{
 obj:{
  handler(newValue,oldValue){
   console.log('obj changed')
  },
  deep: true,//深度遍历
  immediate: true
//默认第一次绑定的时候不会触发watch监听，值为true时可以在最初绑定的时候执行
 }
}

方法② ：指定key
watch: {
    "dataobj.name": {
      handler(newValue, oldValue) {
        console.log("obj changed");
      }
    }
  }

方法③：computed
computed(){
 ar(){
  return this.obj.name
 }
}
```

### vue路由

- vue-router: vue 的 路由一个插件,它有 router-link、router-view 组件

- active-class: 是vue-router模块的router-link组件的属性,children数组来定义子路由

- vue-router 有哪几种导航钩子

```js
① 全局导航守卫
  前置钩子: `router.beforeEach((to, from, next) => { // do someting });` 跳转前进行判断拦截
  后置钩子（没有 next 参数）`router.afterEach((to, from) => { // do someting });`
② 路由独享守卫
cont router = new  VueRouter({
 routes: [
  {
    path: '/file',
    component: File,
    beforeEnter: (to, from ,next) => {
       // do someting
    }
   }
 ]
});
③ 组件内的导航钩子
组件内的导航钩子主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。他们是直接在路由组件内部直接进行定义的
注：beforeRouteEnter 不能获取组件实例 this，因为当守卫执行前，组件实例被没有被创建出来，我们可以通过给 next 传入一个回调来访问组件实例。在导航被确认时，会执行这个回调，这时就可以访问组件实例了
仅仅是 beforRouteEnter 支持给 next 传递回调，其他两个并不支持，因为剩下两个钩子可以正常获取组件实例 this
// beforeRouteEnter
data(){
 return{
   pro:'产品'
 }
},
beforeRouteEnter:(to,from,next)=>{
  console.log(to)
  next(vm => {
   console.log(vm.pro)
  })
}
```

- 通过 params 和 query 将数据传入下一个跳转的页面

```js
① params 只能用 name 来引入路由，query 既可以用 name 又可以用 path（通常用 path）
② params 类似于 post 方法，参数不会再地址栏中显示,query 类似于 get 请求，页面跳转的时候，可以在地址栏看到请求参数
// params
传参
this.$router.push({
 name:"detail",
 params:{
   name:'xiaoming',
 }
});
接受
this.$route.params.name

// query
传参
this.$router.push({
  path:'/detail',
  query:{
    name:"xiaoming"
  }
 })
接受
this.$route.query.name
```

- 定义 vue-router 的动态路由

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
// 当匹配到一个路由时，参数值会被设置到 this.$route.params
this.$route.params.id 就可以获取当前动态路由参数

// 现在类似 /user/foo 和 /user/bar 都将映射到相同的路由
模式 | 匹配路径 | $route.params
/user/:username | /user/evan | { username: 'evan' }
/user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: '123' }
```

- `this.$route`和`this.$router`的区别：
  - `this.$route`：代表的是当前这个路由里的一些信息，如：`name/path/params/query/fullPath`等
  - `this.$router`：代表`VueRouter`对象。可以使用 `$router.push` 方法跳转路由,用 `$router.to(-1)` 返回上一个历史history

- vue-router的两种模式

```js
- hash模式： URL 中带 # 符号,它的变化会触发 hashchange 这个事件
// 可以监听 hashchange 来实现更新页面部分内容的操作
window.onhashchange = function(event){
  console.log(event.oldURL, event.newURL);
  let hash = location.hash.slice(1);
  document.body.style.color = hash;
}

- history模式： 利用了 History 接口中新增的 pushState() 和 replaceState() 方法,可以分为切换和修改两大部分
history 缺点：
  1：hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如http://www.a12c.com,因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
  2：history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致。如http://www.a12c.com/book/a。如果后端缺少对/book/a 的路由处理，将返回 404 错误

history和hash模式的区别
1. 实现原理
hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用
浏览器提供的接口）来实现前端路由。
2. 对比表格
区别 \ mode hash history
监听事件 hashChange popstate
缺点 # 号不好看 子路由刷新404、ie9及以下不兼容
push操作 window.location.assign window.history.pushState
replace操作 window.location.replace window.history.replaceState
访问操作 window.history.go window.history.go
后退操作 window.history.go(-1) window.history.go(-1)
向前操作 window.history.go(1) window.history.go(1)
3. 关于 popstate 事件监听路由的局限 history对象的 back(), forward() 和 go() 三个等操作会主动
触发 popstate 事件，但是 pushState 和 replaceState 不会触发 popstate 事件，这时我们需要手动
触发页面跳转(渲染)。
4. 关于子路由刷新的解决方式
history 模式子路由刷新会404，因此需要后端配合，将未匹配到的路由默认指向 html 文件
5. 浏览器（环境）兼容处理
history 模式中 pushState 、 replaceState 是 HTML5 的新特性，在 IE9 下会强行降级使用 hash 模式，非浏览器环境转换成 abstract 模式。

// 切换历史状态: 包括 back,forward,go 三个方法，对应浏览器的前进，后退，跳转操作
history.go(-2);//后退两次
history.go(2);//前进两次
history.back(); //后退
hsitory.forward(); //前进

// 修改历史状态: 包括了 pushState,replaceState 两个方法,这两个方法接收三个参数:stateObj,title,url
// 通过 pushstate 把页面的状态保存在 state 对象中，当页面的 url 再变回这个 url 时，可以通过 event.state 取到这个 state 对象，从而可以对页面状态进行还原，这里的页面状态就是页面字体颜色，其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到 state 的里面
history.pushState({color:'red'})
window.onpopstate = function(event){
  console.log(event.state)
  if(event.state && event.state.color === 'red'){
    document.body.style.color = 'red';
  }
}
history.back();
history.forward();
```

- vue-router实现路由懒加载（ 动态加载路由 ）

```js
vue-router路由懒加载
像 vue 这种单页面应用，如果没有路由懒加载，运用 webpack 打包后的文件将会很大，造成进入首页时，需要加载的内容过多，出现较长时间的白屏，运用路由懒加载则可以将页面进行划分，需要的时候才加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。

vue 路由懒加载有以下三种方式：
1. vue 异步组件
这种方法主要是使用了 resolve 的异步机制，用 require 代替了 import 实现按需加载
export default new Router({
  routes: [
    {
      path: '/home',',
      component: (resolve) => require(['@/components/home'], resolve),
    },
    {
      path: '/about',',
      component: (resolve) => require(['@/components/about'], resolve),
    },
  ],
})

2. ES6 的 import()
vue-router 在官网提供了一种方法，可以理解也是为通过 Promise 的 resolve 机制。因为 Promise 函数返回的 Promise 为 resolve 组件本身，而我们又可以使用 import 来导入组件。
export default new Router({
  routes: [
    {
      path: '/home',
      component: () => import('@/components/home'),
    },
    {
      path: '/about',
      component: () => import('@/components/home'),
    },
  ],
})

3. webpack 的 require.ensure()
这种模式可以通过参数中的 webpackChunkName 将 js 分开打包。
export default new Router({
  routes: [
    {
      path: '/home',
      component: (resolve) => require.ensure([], () => resolve(require('@/components/home')), 'home'),
    },
    {
      path: '/about',
      component: (resolve) => require.ensure([], () => resolve(require('@/components/about')), 'about'),
    },
  ],
})
```

- vue-router配置滚动

```js
const router = new VueRouter({
  routes:[...] ,
  scrollBehavior(to,from,position){
      // position参数可自行打印康康，点击浏览器左右箭头会触发
      return{
          // 这里可以返回很多参数，下面简单列就几个，详情自己康康官网
          x:100,
          y:100,
          selector:#app,
          offset:200,
          //等等
      }
  }
})
```

### vue怎么重置data

```js
// Object.assign（）方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
// Object.assign() 对具有相同属性的对象，同名属性，后边的会覆盖前边的
// 可以通过this.$data获取当前状态下的data
// 通过this.$options.data()获取该组件初始状态下的data
Object.assign(this.options.data())  // 可以将当前状态的data重置为初始状态
```

### 强制刷新组件

```js
// v-if
当v-if的值发生变化时，组件都会被重新渲染一遍。因此，利用v-if指令的特性，可以达到强制
<comp v-if="update"></comp>
data() {
  return {
   update: true
  }
},
 methods: {
  reload() {
    // 移除组件
    this.update = false
    // 在组件移除后，重新渲染组件
    // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
    this.$nextTick(() => {
      this.update = true
    })
  }
}

// this.$forceUpdate
<button @click="reload()">刷新当前组件</button>
methods: {
  reload() {
    this.$forceUpdate()
  }
}
```

### 优化首页的加载速度

① 第三方js库按CDN引入（一、cdn引入 二、去掉第三方库引入的import 三、把第三方库的js文件从打包文件里去掉）
② vue-router路由懒加载
③ 压缩图片资源
④ 静态文件本地缓存
⑤ 服务器端SSR渲染

### diff算法

https://www.cnblogs.com/wind-lanyan/p/9061684.html

### 缓存组件及缓存组件更新

```js
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>

// 如果缓存的组件想要清空数据或者执行初始化方法，在加载组件的时候调用activated钩子函数
activated: function () {
    this.data = '';
}
```

### axios解决跨域请求

```js
// 为客户端请求服务端的数据是存在跨域问题的，而服务器和服务器之间可以相互请求数据，是没有跨域的概念（如果服务器没有设置禁止跨域的权限问题），也就是说，我们可以配置一个代理的服务器可以请求另一个服务器中的数据，然后把请求出来的数据返回到我们的代理服务器中，代理服务器再返回数据给我们的客户端，这样我们就可以实现跨域访问数据
proxyTable: {
 '/api': {
      target:'http://api.douban.com/v2', // 你请求的第三方接口
      changeOrigin:true,
      // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
      //这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite:{  // 路径重写，
       '^/api': ''
      // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX
      //这个地址的时候直接写成/api即可。
   }
  }
}
```

---

[🔺顶部](#top) <a id="bottom">⚓</a>
