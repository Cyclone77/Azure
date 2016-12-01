---
layout: default
---

<div class="core"></div>
<div class="tags">
   <!-- 标签云 -->
    <div id='tag_cloud' class="tags newsItem">
        {% for tag in site.tags %}
        <a href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{ tag[0] }}</a>
        {% endfor %}
    </div>
</div>
<h2>{{ page.title }}</h2>
<p>最新文章</p>
<ul>
    {% for post in site.posts %}
    <li>
        {{ post.date | date_to_string }} 
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
</ul>