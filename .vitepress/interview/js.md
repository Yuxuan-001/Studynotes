# js 经典面试题

## 1.JavaScript有哪些数据类型，它们的区别？

JavaScript共有八种数据类型，分别是 Number、String、Boolean、Null、undefined、object、Symbol 、BigInt 

其中 Symbol 和 BigInt 是ES6 中新增的数据类型：

+ Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题
+ BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围

数据可以分为原始数据类型和引用数据类型：

+ 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
+ 堆：引用数据类型（对象、数组和函数）

两种类型的区别在于**存储位置的不同：**

+ 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储
+ 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体

## 2.数据类型检测的方式有哪些

### typeof

```javascript
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object    
console.log(typeof {});              // object
console.log(typeof null);            // object
console.log(typeof function(){});    // function
console.log(typeof undefined);       // undefined
```

其中数组、对象、null都会被判断为object

### instanceof

```javascript
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 
 
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

`instanceof`可以正确判断对象的类型，**其内部运行机制是**判断在其原型链中能否找到该类型的原型。但是其**只能正确判断引用数据类型，而不能判断基本数据类型**

### Object.prototype.toString.call()

````javascript
 console.log(Object.prototype.toString.call("123"))           -------->[object String]
 console.log(Object.prototype.toString.call(123))             -------->[object Number]
 console.log(Object.prototype.toString.call(true))            -------->[object Boolean]
 console.log(Object.prototype.toString.call([1, 2, 3]))       -------->[object Array]
 console.log(Object.prototype.toString.call(null))            -------->[object Null]
 console.log(Object.prototype.toString.call(undefined))       -------->[object Undefined]
 console.log(Object.prototype.toString.call({name: 'Hello'})) -------->[object Object]
 console.log(Object.prototype.toString.call(function () {}))  -------->[object Function]
 console.log(Object.prototype.toString.call(new Date()))      -------->[object Date]
 console.log(Object.prototype.toString.call(/\d/))            -------->[object RegExp]
 console.log(Object.prototype.toString.call(Symbol()))        -------->[object Symbol]
````

`Object.prototype.toString.call()` 使用 Object 对象的原型方法 toString 来判断数据类型

### constructor

````html
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
````

`constructor`有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：

````javascript
function Fn(){};
 
Fn.prototype = new Array();
 
var f = new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
````

## 3.判断数组的方式有哪些

### Object.prototype.toString.call()

````js
Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
````

### Array.isArray()

````javascript
Array.isArrray(obj);
````

### instanceof

````javascript
obj instanceof Array
````

### Array.prototype.isPrototypeOf

````javascript
Array.prototype.isPrototypeOf(obj)
````

## 4.null和undefined区别

null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。当声明的变量还未被初始化时，变量的默认值为undefined

undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

+ 变量被声明了，但没有赋值时，就等于undefined
+ 调用函数时，应该提供的参数没有提供，该参数等于undefined
+ 对象没有赋值的属性，该属性的值为undefined
+ 函数没有返回值时，默认返回undefined

null 表示"尚未存"在的对象，即该处不应该有值。典型用法是：

+ 作为函数的参数，表示该函数的参数不是对象
+ 作为对象原型链的终点

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false

## 5.typeof null 的结果是什么，为什么？

**typeof null 的结果是Object**

在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的 **类型标签(1-3 bits)** 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：

````javascript
000: object   - 当前存储的数据指向一个对象。
  1: int      - 当前存储的数据是一个 31 位的有符号整数。
010: double   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。
````

如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度

有两种特殊数据类型:

+ undefined的值是 (-2)30(一个超出整数范围的数字)
+ null 的值是机器码 NULL 指针(null 指针的值全是 0)

那也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object

## 6.为什么0.1+0.2 ! == 0.3，如何让其相等  

````javascript
let n1 = 0.1, n2 = 0.2
console.log(n1 + n2)  // 0.30000000000000004
````

计算机是通过二进制的方式存储数据的，所以计算机计算0.1+0.2的时候，实际上是计算的两个数的二进制的和。0.1的二进制是`0.0001100110011001100...`（1100循环），0.2的二进制是：`0.00110011001100...`（1100循环），这两个数的二进制都是无限循环的数

JavaScript是如何处理无限循环的二进制小数呢？

一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number，它的实现遵循IEEE 754标准，使用64位固定长度来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留52位，再加上前面的1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0舍1入”的原则

根据这个原则，0.1和0.2的二进制数相加，再转化为十进制数就是：`0.30000000000000004`

解决方法：

+ 将其先转换成整数，再相加之后转回小数

````javascript
let x=(0.1*10+0.2*10)/10;
 console.log(x===0.3)
````

+ 使用number对象的`toFixed()`方法

````javascript
// toFixed()方法将number类型转换成了字符串类型，需要使用parseFloat将其转回number类型
// toFixed()遵循银行家舍入规则：四舍六入五取偶(四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一)
let x=parseFloat((0.1+0.2).toFixed(1));
console.log(x===0.3);
````

+ 使用 es6 新增的`Number.EPSILON `方法

````javascript
function numberepsilon(arg1,arg2){                   
  return Math.abs(arg1 - arg2) < Number.EPSILON;        
}        

console.log(numberepsilon(0.1 + 0.2, 0.3)); // true
````

## 7.typeof NaN 的结果是什么？

NaN 指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”

````javascript
typeof NaN; // "number"
````

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN !== NaN 为 true

## 8.isNaN 和 Number.isNaN 函数的区别？

+ `isNaN`是通过Number方法把参数转换成数字类型，如若转换成功，则返回false，反之返回true，它只是判断参数是否能转成数字，不能用来判断是否严格等于NaN。如果要判断某个值是否严格等于NaN不能用这个方法
+ `Number.isNaN`会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确

## 9.转为字符串类型的几种方法

### toString()用法

````javascript
var num = 5;
    num = num.toString();
    console.log(num, typeof(num));    // 输出字符串 5 string
````

### String()方法

````javascript
var s = '10';
    s = String(s);
    console.log(s, typeof(s));// 输出10 String
````

toString()和string()最大的区别是**有些值无法通过toString()转化**，如：**undefined和null等。**

````javascript
var s = null;
    // s = s.toString()  报错
    s = String(s);                  // 运行正常           
    console.log(s, typeof(s));// 输出10 String
````

### 拼接字符串

````javascript
var a = 10, b = true, c = undefined, d = null, e = '你好';
 console.log(a + '');        // 输出字符串 10
 console.log(b + '');        // 输出字符串 true
 console.log(c + '');        // 输出字符串 undefined
 console.log(d + '');        // 输出字符串 null
 console.log(a + '10');      // 输出字符串 1010
 console.log(e + a);         // 输出字符串 你好10
````

## 10.转为数值类型的方法

### Number()

````javascript
let num1 = Number("3.14")    // 返回 3.14
let num2 = Number(true)      // 返回 1
let num3 = Number(" ")       // 返回 0
let num4 = Number("")        // 返回 0
let num5 = Number("99 88")   // 返回 NaN
````

### parseInt()

````javascript
let int1 = parseInt("123"); // 123
let int2 = parseInt("123.45"); // 123
let int3 = parseInt("abc"); // NaN
````

### parseFloat()

````javascript
let float1 = parseFloat("123.45"); // 123.45
let float2 = parseFloat("abc"); // NaN
````

### 一元加号运算符

````javascript
let num6 = +"123"; // 123
let num7 = +"123.45"; // 123.45
let num8 = +"abc"; // NaN
````

## 11.转为布尔值的方法

### 隐式转换

这种转换通常发生在条件语句（如`if`）和逻辑运算符（如`&&`、`||`）中

转换规则:`false 0 "" null unfined NaN`会被转换为 false ,其他的值都会转换为 true

### Boolean()

````javascript
let bool = Boolean(0);        // false
let boo2 = Boolean(null);     // false
let boo3 = Boolean(undefined); // false
let boo4 = Boolean(NaN);      // false
let boo5 = Boolean("")		  // false
let boo6= Boolean(1);        // true
let boo7= Boolean("hello");  // true
let boo8= Boolean([]);       // true（空数组也被转换为true）
let boo9= Boolean({});       // true（空对象也被转换为true）
````

## 12. || 和 && 操作符的返回值？

### `||`（逻辑或）运算符

+ 如果任一操作数为`true`（或可转换为`true`的值），则`||`运算符返回第一个为`true`的操作数的值
+ 如果两个操作数都为`false`（或可转换为`false`的值），则`||`运算符返回第二个操作数的值

````javascript
let result1 = true || false;  // result1 为 true
let result2 = false || true;  // result2 为 true
let result3 = false || false; // result3 为 false
let result4 = "hello" || "world"; // result4 为 "hello"
let result5 = 0 || "zero"; // result5 为 "zero"，因为0是falsy值
````

### `&&`（逻辑与）运算符

+ 如果两个操作数都为`true`（或可转换为`true`的值），则`&&`运算符返回第二个操作数的值
+ 如果任一操作数为`false`（或可转换为`false`的值），则`&&`运算符返回第一个为`false`的操作数的值

````javascript
let result1 = true && false;  // result1 为 false
let result2 = false && true;  // result2 为 false
let result3 = true && true;   // result3 为 true
let result4 = "hello" && "world"; // result4 为 "world"
let result5 = "hello" && 0; // result5 为 0，因为0是falsy值，但逻辑上"hello"是真值
````

在`||`运算中，如果第一个操作数为`true`，则无论第二个操作数是什么，整个表达式的结果都将是`true`，因此不会评估第二个操作数。同样，在`&&`运算中，如果第一个操作数为`false`，则无论第二个操作数是什么，整个表达式的结果都将是`false`，因此不会评估第二个操作数

## 13. == 和 === 的区别

+ == :相等运算符,判断的是值是否相等,相等返回 true,不等返回 false
  + 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
  + 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
  + 两个都为引用类型，则比较它们是否指向同一个对象
  + null 和 undefined 相等
  + 存在 NaN 则返回 false
+ ===: 严格运算符,判断的是值和类型是否相等,相等返回 true,不等返回 false
  + `undefined` 和 `null` 与自身严格相等

## 14.深拷贝与浅拷贝

### 浅拷贝

浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

即浅拷贝是`拷贝一层`，深层次的引用类型则共享内存地址

#### Object.assign

````javascript
var obj = {
  age: 18,
  nature: ['smart', 'good'],
  names: {
    name1: 'fx',
    name2: 'xka',
  },
  love: function () {
    console.log('fx is a great girl')
  },
}
var newObj = Object.assign({}, fxObj)
````

#### 数组的slice()

````javascript
const fxArr = ['One', 'Two', 'Three']
const fxArrs = fxArr.slice(0)
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
````

#### 数组的concat()

````javascript
const fxArr = ['One', 'Two', 'Three']
const fxArrs = fxArr.concat()
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
````

#### 拓展运算符

````javascript
const fxArr = ['One', 'Two', 'Three']
const fxArrs = [...fxArr]
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
````

### 深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

#### _.cloneDeep()

````javascript
const _ = require('lodash')
const obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
}
const obj2 = _.cloneDeep(obj1)
console.log(obj1.b.f === obj2.b.f) // false
````

####  jQuery.extend()

````javascript
const $ = require('jquery')
const obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
}
const obj2 = $.extend(true, {}, obj1)
console.log(obj1.b.f === obj2.b.f) // false
````

#### JSON.stringify()  JSON.parse()

````javascript
const obj2 = JSON.parse(JSON.stringify(obj1))
````

但是这种方式存在弊端，会忽略`undefined`、`symbol`和`函数`

#### 递归实现

````javascript
function deepClone(target) {
    // WeakMap作为记录对象Hash表（用于防止循环引用）
    const map = new WeakMap()

    // 判断是否为object类型的辅助函数，减少重复代码
    function isObject(target) {
        return (typeof target === 'object' && target ) || typeof target === 'function'
    }

    function clone(data) {

        // 基础类型直接返回值
        if (!isObject(data)) {
            return data
        }

        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }

        // 处理函数对象
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }

        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
            return exist
        }

        // 处理Map对象
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }

        // 处理Set对象
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }

        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = Object.create(Object.getPrototypeOf(data), allDesc)

        // 新对象加入到map中，进行记录
        map.set(data, result)

        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}



// 测试
const clonedObj = deepClone(obj)
clonedObj === obj  // false，返回的是一个新对象
clonedObj.arr === obj.arr  // false，说明拷贝的不是引用
clonedObj.func === obj.func  // false，说明function也复制了一份
clonedObj.proto  // proto，可以取到原型的属性

````

## 15.如何判断一个对象是空对象

### JSON.stringify(data) === "{}"

````javascript
    let data = {};
    let data1 = {
        name: "大帅哥",
        age: "18"
    }
   console.log(JSON.stringify(data) === '{}') // true
   console.log(JSON.stringify(data1) === '{}') // false
````

### Object.keys(data).length

````javascript
    let data = {};
    let data1 = {
        name: "大帅哥",
        age: "18"
    }
   console.log(Object.keys(data).length)// 0
   console.log(Object.keys(data).length===='{}')// true
   console.log(Object.keys(data1).length===='{}')// false

````

### for..in..

````javascript
    let data = {};
    let data1 = {
        name: "大帅哥",
        age: "18"
    }
    let _fn = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true
    }
    console.log(_fn(data)) //true

    console.log(_fn(data1)) //false

````

## 16.let、const、var的区别

### 作用域

+ `var `声明的变量拥有函数作用域或全局作用域。如果在函数内部声明，其作用域为整个函数体；如果在函数外部声明，则为全局作用域，且会在全局对象（如浏览器中的 window）上创建属性
+ `let`和`const`声明的变量具有块级作用域，这意味着变量在其所在的代码块（由 `{}` 括起来的部分）内有效，而不是整个函数或全局作用域

### 变量提升

+ `var`存在变量提升，即变量可以在声明之前调用，值为`undefined`
+ `let`和`const`不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

### 暂时性死区

+ `var`不存在暂时性死区
+ `let`和`const`存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

### 重复声明

+ `var`允许重复声明变量
+ `let`和`const`在同一作用域不允许重复声明变量

### 修改声明的变量

+ `var`和`let`可以

+ `const`声明时必须初始化（必须赋值），并且一旦赋值后，所指向的内存地址不得更改（对于基本类型数据，其值不能改变；对于引用类型数据，其引用不能更改，但对象内部的属性可以更改）

**使用**

能用`const`的情况尽量使用`const`，其他情况下大多数使用`let`，避免使用`var`

## 17.箭头函数

+ 写法更加简洁，可以根据具体情况省略 小括号，return 等。这一点在高阶函数的使用中特别方便。例如,数组的map, forEach等
+ 箭头函数内部没有自己的 this ,它的this就是外层作用域的 this ，它不能通过call,apply,bind来修改
+ 箭头函数内部没有arguments对象。但是，es6配套提供了剩余参数，可以用来替代argument
+ 不能当前构造器来使用