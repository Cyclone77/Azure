---
layout: default
---

<div class="core">
    <div class="form-item search">
        <input type="search" name="search" id="search" placeholder="Search"> 
        <button type="button" class="icon-search menu"><i class="find"></i></button>
    </div>
</div>
<div class="tags">
    <!-- 标签云 -->
    <div id="tag_cloud">
        {% for tag in site.tags %}
            <a href="javascript:;" onclick="showTag('{{ tag[0] }}')" title="{{ tag[0] }}" rel="{{ tag[1].size }}">
            {{ tag[0] }}
            </a>
        {% endfor %}
    </div>

    <div id="show-tag">
        <div style="text-align:center">
            <img src="/images/loading.gif"/>&nbsp;&nbsp;loading...
        </div>
    </div>
</div>
<script type="text/javascript">
    var href = window.location.href;
    var pos = href.indexOf('?tag=');
    var paraStr = href.substring(pos + 5);
    if (pos > 0) {
        showTag(decodeURI(paraStr));
    } else {
        showTag("");
    }
</script>

<h2>{{ page.title }}</h2>
<p>最新文章</p>
<ul>
    {% for post in site.posts %}
    <li>
        {{ post.date | date: "%Y-%m-%d"  }} 
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        <span>{{ paginator.total_pages }}</span>
    </li>
    {% endfor %}
</ul>

<div class="pageBar">
{% for post in paginator.posts %}
<div class="post-preview">
    <a class="postTitle" href="{{ post.url | prepend: site.baseurl }}">
        <h2 class="post-title">
            {{ post.title }}
        </h2>
    </a>
    {% if post.subtitle %}
    <h5 class="post-subtitle">
        ——   {{ post.subtitle }}
    </h5>
    {% endif %}
    <div class="post-content-preview">
        {{ post.content | strip_html | truncate:200 }}
    </div>
    
    <a href="{{ post.url | prepend: site.baseurl }}" class="btn btn-default">阅读全文</a>

    <p class="post-meta">
        <i class="glyphicon glyphicon-calendar"></i>
        Posted by {% if post.author %}{{ post.author }}{% else %}{{ site.title }}{% endif %} on {{ post.date | date: "%B %-d, %Y" }}
    </p>
</div>
<hr>
{% endfor %}

<!-- Pager -->
{% if paginator.total_pages > 1 %}
<ul class="pager">
    {% if paginator.previous_page %}
    <li class="previous">
        <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}" class="pagingShow">上一页</a>
    </li>
    {% endif %}
    {% if paginator.next_page %}
    <li class="next">
        <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}" class="pagingShow">下一页</a>
    </li>
    {% endif %}
</ul>
{% endif %}
</div>