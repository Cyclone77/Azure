---
layout: page
title: jekyll环境安装过程
tags:
    - jekyll
---

*** rubyinstaller-2.3.1.exe *** <br/>
*** DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe ***

> ruby dk.rb init <br />

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step1.png">
</p>

> ruby dk.rb install <br />

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step2.png">
</p>

> 如果这里出现错误，查看D:\DevKit\config.yml  

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/error2.png">
</p>

> gem sources -l

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step3.png">
</p>

> gem install jekyll

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step4.png">
</p>

> gem sources --remove https://rubygems.org/

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step5.png">
</p>

> gem sources -a http://gems.ruby-china.org/

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step6.png">
</p>

>gem install jekyll

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step7.png">
</p>

>jekyll new testBlog

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step8.png">
</p>

> gem install bundler

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step9.png">
</p>

> jekyll serve

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step10.png">
</p>

> jekyll serve

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step11.png">
</p>

> gem install minima

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step12.png">
</p>

> jekyll serve

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step13.png">
</p>

> gem install jekyll-feed

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step14.png">
</p>

> jekyll serve

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step15.png">
</p>

> http://127.0.0.1:4000/ 访问如下

<p align="left">
  <img alt="测试图片" src="{{ site.baseurl }}/images/jekyll-imgs/step16.png">
</p>
