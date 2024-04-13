# html 经典面试题

## 1.src和href区别

+ href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系。
+ src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。


## 2.meta标签

+  `charset`，用来描述HTML文档的编码类型
+ `keywords`，页面关键词
+ `description`，页面描述
+ `refresh`，页面重定向和刷新
+ `viewport`，适配移动端，可以控制视口的大小和比例

## 3.HTML5有哪些更新

### 语义化标签

````html
<header></header>  头部
<nav></nav>  导航栏
<section></section>  区块（有语义化的div）
<main></main>  主要区域
<article></article>  主要内容
<aside></aside>  侧边栏
<footer></footer>  底部
````

### 媒体标签

(1) audio 音频

````html
<audio src='' controls autoplay loop='true'></audio>
````

属性：

+ controls 控制面板
+ autoplay 自动播放
+ loop=‘true’ 循环播放

(2) video 视频

````html

<video src='' poster='imgs/aa.jpg' controls></video>
````

属性：

+ poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过poster也可以自己指定
+ controls 控制面板
+ width
+ height

(3) source 标签

因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过source来指定视频源。

````html
<video>
 	<source src='aa.flv' type='video/flv'></source>
 	<source src='aa.mp4' type='video/mp4'></source>
</video>
````

### 表单

表单类型:

+ email ：能够验证当前输入的邮箱地址是否合法
+ url ： 验证URL
+ number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max属性可以设置为最大值，min可以设置为最小值，value为默认值。
+ search ： 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
+ range ： 可以提供给一个范围，其中可以设置max和min以及value，其中value属性可以设置为默认值
+ color ： 提供了一个颜色拾取器
+ time ： 时分秒
+ date ： 日期选择年月日
+ datatime ： 时间和日期(目前只有Safari支持)
+ datatime-local ：日期时间控件
+ week ：周控件
+ month：月控件

表单属性:

+ placeholder ：提示信息
+ autofocus ：自动获取焦点
+ autocomplete=“on” 或者 autocomplete=“off” 使用这个属性需要有两个前提：
  + 表单必须提交过
  + 必须有name属性
+ required：要求输入框不能为空，必须有值才能够提交
+ pattern=" " 里面写入想要的正则模式，例如手机号pattern="^(+86)?\d{10}$"
+ multiple：可以选择多个文件或者多个邮箱
+ form=" form表单的ID"

表单事件：

+ oninput 每当input里的输入框内容发生变化都会触发此事件
+ oninvalid 当验证不通过时触发此事件

### 进度条、度量器

+ progress标签：用来表示任务的进度（IE、Safari不支持），max用来表示任务的进度，value表示已完成多少
+ meter属性：用来显示剩余容量或剩余库存（IE、Safari不支持）
  + high/low：规定被视作高/低的范围
  + max/min：规定最大/小值
  + value：规定当前度量值

 设置规则：min < low < high < max

### DOM查询操作

+ document.querySelector()
+ document.querySelectorAll()

它们选择的对象可以是标签，可以是类(需要加点)，可以是ID(需要加#)

### Web存储

HTML5 提供了两种在客户端存储数据的新方法:

+ localStorage - 没有时间限制的数据存储
+ sessionStorage - 用于临时保存同一窗口(或标签页)的数据

### 其他

+ 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放：

  ````html
  <img draggable="true" />
  ````

+ 画布（canvas ）： canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
+ SVG：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准
+ 地理定位：Geolocation（地理定位）用于定位用户的位置

**总结：**

1. 新增语义化标签：nav、header、footer、aside、section、article
2. 音频、视频标签：audio、video
3. 数据存储：localStorage、sessionStorage
4. canvas（画布）、Geolocation（地理定位）、websocket（通信协议）
5. input标签新增属性：placeholder、autocomplete、autofocus、required
6. history API：go、forward、back、pushstate

## 4.img的srcset属性的作⽤？

响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的srcset属性。srcset属性用于设置不同屏幕密度下，img 会自动加载不同的图片。用法如下：

````html
<img src="image-128.png" srcset="image-256.png 2x" />
````

使用上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png

按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有1x,2x,3x,4x四种，如果每一个图片都设置4张图片，加载就会很慢。所以就有了新的srcset标准。代码如下：

````html
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
````

其中srcset指定图片的地址和对应的图片质量。sizes用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片

sizes语法如下：

````html
sizes="[media query] [length], [media query] [length] ... "
````

sizes就是指默认显示128px, 如果视区宽度大于360px, 则显示340px

## 5.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

+ 行内元素有：`a b span img input select strong`
+ 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`

## 6.对 web worker 的理解

[Web Worker 使用教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)

## 7.HTML5的离线储存怎么使用，它的工作原理是什么

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件

**原理：**HTML5的离线存储是基于一个新建的 `.appcache` 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

**使用方法：**

（1）创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：

````html
<html lang="en" manifest="index.manifest">
````

（2）在 `cache.manifest` 文件中编写需要离线存储的资源：

````html
CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
````

+ **CACHE**:表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来
+ **NETWORK**: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高
+ **FALLBACK**: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html

（3）在离线状态时，操作 `window.applicationCache` 进行离线缓存的操作

**如何更新缓存：**

+ (1) 更新 manifest 文件
+ (2) 通过 javascript 操作
+ (3) 清除浏览器缓存

**注意事项：**

(1）浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）

(2）如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存

(3）引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下

(4）FALLBACK 中的资源必须和 manifest 文件同源

(5）当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源

(6）站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问

(7）当 manifest 文件发生改变时，资源请求本身也会触发更新

## 8.浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

+ **在线的情况下**，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储
+ **离线的情况下**，浏览器会直接使用离线存储的资源


## 9.渐进增强与优雅降级

渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进，达到更好的用户体验

优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容

**两者区别:**

+ 优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要
+ 降级（功能衰竭）意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带

## 10.拖拽api

| 事件        | On 型事件处理程序 | 触发时刻                                                     |
| ----------- | ----------------- | ------------------------------------------------------------ |
| `darg`      | `ondrag`          | 当拖拽元素或选中的文本时触发                                 |
| `dragend`   | `ondragend`       | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键)           |
| `dragenter` | `ondragenter`     | 当拖拽元素或选中的文本到一个可释放目标时触发                 |
| `dragleave` | `ondragleave`     | 当拖拽元素或选中的文本离开一个可释放目标时触发               |
| `dragover`  | `ondragover`      | 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次） |
| `dragstart` | `ondragstart`     | 当用户开始拖拽一个元素或选中的文本时触发                     |
| `drop`      | `ondrop`          | 当元素或选中的文本在可释放目标上被释放时触发                 |

**注意：**

当从操作系统向浏览器中拖拽文件时，不会触发 `dragstart` 和`dragend` 事件

## 11.iframe的优缺点

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

### 优点

+ 可以用来加载速度较慢的内容（如广告）。
+ 可以使脚本并行下载。
+ 可以实现跨子域tongxin

### 缺点

+ iframe 会阻塞主页面的 onload 事件。
+ 无法被一些搜索引擎索识别。
+ 会产生很多页面，不容易管理。



## 12.严格模式与混杂模式

+ 严格模式：以浏览器支持的最高标准运行。
+ 混杂模式：页面以宽松向下兼容的方式显示，模拟老式浏览器的行为。

## 13.Canvas 和 SVG 有什么区别

Canvas 和 SVG 都允许您在浏览器中创建图形，但是它们在根本上是不同的。

### Canvas

+ 通过 Javascript 来绘制 2D 图形。
+ 是逐像素进行渲染的。
+ 其位置发生改变，会重新进行绘制。

### SVG

+ 一种使用 XML 描述的 2D 图形的语言。
+ SVG 基于 XML 意味着，SVG DOM 中的每个元素都是可用的，可以为某个元素附加 Javascript 事件处理器。
+ 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

### 比较

**Canvas**

+ 依赖分辨率
+ 不支持事件处理器
+ 弱的文本渲染能力
+ 能够以 .png 或 .jpg 格式保存结果图像
+ 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

**SVG**

+ 不依赖分辨率
+ 支持事件处理器
+ 最适合带有大型渲染区域的应用程序（比如谷歌地图）
+ 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
+ 不适合游戏应用

### Viewport 属性值

+ width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"
+ initial-scale 设置页面的初始缩放值，为一个数字，可以带小数
+ minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数
+ maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数
+ height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用
+ user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。


