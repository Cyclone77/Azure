---
layout: default
---

{% include nav.html %}
<ul class="tags">
    {% for tag in site.tags %}
    <li class="item">
        <a class="js-nav-btn" href="javascript:;" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{ tag[0] }}</a>
    </li>
    {% endfor %}
</ul>

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