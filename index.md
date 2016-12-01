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
        {{ post.date | date_to_string }} 
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
</ul>