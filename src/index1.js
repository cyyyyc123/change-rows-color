// 1.使用ES6导入语法，导入jQuery
import $ from 'jquery'

// 导入样式（在webpack中，一切皆模块，都可以通过ES6导入语法进行导入和使用）
// 如果某个模块中，使用from接收到的成员为undefined，则没必要进行接收
import '@/css/index.css'
import '@/css/index.less'

// 导入src/js/test/info.js
import '@/js/test/info.js'

// 1.导入图片，得到图片文件
import logo from '@/images/logo.jpg'
console.log(logo)
// 2.给img标签的src动态赋值
$('.box').attr('src', logo)

// 2.定义jQuery的入口函数
$(function () {
    // 3.实现奇偶行变色
    // 奇数行为红色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'pink')
    // 0是偶数
    // 1是奇数
})

// 1.定义了名为info的装饰器函数
function info(target) {
    // 2.为目标添加静态属性 info
    target.info = 'Person info.'
}

// 3.定义一个普通的类，为Person类应用info装饰器
@info
class Person { }

// 4.打印Person的静态属性info
console.log(Person.info)
