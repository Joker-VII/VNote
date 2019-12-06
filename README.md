![logo](./pictures/logo.png)

VNote
=========================
一个简单的chrome文本编辑扩展，随时记录你的想法。
本项目由Vue + ElementUI + webpack + CKeditor5（quill / tingymce）等开发的。目前是采用[CKeditor-Vue](https://github.com/ckeditor/ckeditor5-vue)，主要功能为加粗，倾斜，下划线，删除线，块引用，背景颜色，字体颜色，无序列表，有序列表，水平线。
这是一个测试富文本编辑器的项目，为[VChat](https://github.com/Joker-VII/VChat)选择合适的输入编辑，主要测试的是CKeditor5，quill，tinymce，所以如果你喜欢其他的编辑器，可以git clone 项目，加入你所喜爱的编辑器，或者加入你所需要的插件。

Preview
=========================

![Gif](./pictures/preview.gif)

Installation
=========================
因为Chrome只允许使用网上应用店中发布的扩展程序，所以暂时没有crx包，可以下载[zip](https://github.com/Joker-VII/VNote/files/3930813/VNote.zip)包，解压后再加载。以下是步骤：
1. 在chrome地址栏输入chrome://extensions
2. 打开右上角的**开发者模式**
![开发者模式](./pictures/mode.jpg)
3. 接着点击左上角的**加载已解压的扩展程序**
![加载已解压的扩展程序](./pictures/load.jpg)
4. 选择VNote文件夹路径
5. 加载

也可以git clone 项目，开发自己喜欢的笔记本扩展。
1. 加载依赖：npm install
2. 开发环境：npm run dev
3. 生产环境：npm run prop
4. 打包：npm run build
5. 压缩：npm run zip

Discussing
=========================
[submit issue](https://github.com/Joker-VII/VNote/issues/new)

License
=========================
[MIT](./LICENSE)