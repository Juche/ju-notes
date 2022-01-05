# HTML

[🔻底部](#bottom)<a id="top">⚓</a>

- [HTML](#html)
  - [HTML 语义化](#html-语义化)
  - [HTML5新内容](#html5新内容)
  - [iframe的优缺点？](#iframe的优缺点)
  - [href 与 src？](#href-与-src)
  - [页面可见性API](#页面可见性api)

---

## HTML 语义化

- 让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析；即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
- 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO;
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解

## HTML5新内容

新的语义标签
  article 独立的内容。
  aside 侧边栏。
  header 头部。
  nav 导航。
  section 文档中的节。
  footer 页脚。
画布(Canvas) API
地理(Geolocation) API
本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
sessionStorage 的数据在浏览器关闭后自动删除
新的技术webworker, websocket, Geolocation
拖拽释放(Drag and drop) API
音频、视频API(audio,video)
表单控件，calendar、date、time、email、url、search

## iframe的优缺点？

优点：
解决加载缓慢的第三方内容如图标和广告等的加载问题
Security sandbox
并行加载脚本

缺点：
iframe会阻塞主页面的Onload事件,即时内容为空，加载也需要时间
索引擎的检索程序无法解读这种页面，不利于SEO
和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载(通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题)

## href 与 src？

href (Hypertext Reference)指定网络资源的位置，从而在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间定义一个链接或者关系。（目的不是为了引用资源，而是为了建立联系，让当前标签能够链接到目标地址。）
src source（缩写），指向外部资源的位置，指向的内容将会应用到文档中当前标签所在位置。
href与src的区别
1、请求资源类型不同：href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。在请求 src 资源时会将其指向的资源下载并应用到文档中，比如 JavaScript 脚本，img 图片；
2、作用结果不同：href 用于在当前文档和引用资源之间确立联系；src 用于替换当前内容；
3、浏览器解析方式不同：当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

## 页面可见性API

通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；

---

[🔺顶部](#top) <a id="bottom">⚓</a>
