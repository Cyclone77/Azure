document.ready = function(callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadytstatechange', function() {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    } else if (document.lastChild == document.body) {
        callback();
    }
};
(function() {

    var ArticleData = [];

    //初始化加载
    document.ready(function() {
        loadTagData(function() {
            var hash = location.hash;
            if (!hash && !hash.substr(1)) {
                var tagfirst = document.getElementsByClassName("tag_item")[0];
                tagStr = tagfirst.getAttribute("i_tag");
                hash = location.hash = tagStr;
            } else {
                showTag(hash.substr(1));
            }
        });
        loadEvent();
    });

    //hash改变事件
    tool.addHandler(window, "hashchange", function() {
        var hash = location.hash;
        showTag(hash.substr(1));
    });

    //标签加载事件
    function loadEvent() {
        var tags = document.getElementsByClassName("tag_item");
        if (tags && tags.length > 0) {
            for (var i = 0; i < tags.length; i++) {
                tool.addHandler(tags[i], "click", function() {
                    var tag = this.getAttribute("i_tag");
                    location.hash = tag;
                })
            }
        }
    }

    //加载标签下的文章
    function loadTagData(fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../post.json", true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // 姑且认为200-300之间都是成功的请求，304是缓存
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    var data = xhr.responseText;
                    try {
                        var json = ArticleData = JSON.parse(data);
                    } catch (e) {
                        throw e;
                    }
                    Store("session").set("fillchar_tags", data);

                    tool._typeof(fn) == "function" && fn(json);
                }
            }
        };
        xhr.send();
    }

    //选中样式
    function selectTagClass(element) {

    }

    //获取选中标签内容
    function showTag(tagStr) {
        var data = ArticleData;
        if (!data || data.length == 0) {
            loadTagData(function(newData) {
                loadArticle(newData, tagStr);
            });
        } else {
            loadArticle(data, tagStr);
        }
    };

    //构造标签文章内容
    function loadArticle(data, tagStr) {
        //$('#show-tag').empty(content);
        var tagEl = document.getElementById("show-tag");
        tagEl.innerHTML = "";
        var content = '<div class="posts">';
        var count = 0;
        Array.prototype.forEach.call(data, function(item, i) {
            Array.prototype.forEach.call(item.tags, function(tag, j) {
                if (tag == tagStr) {
                    var htm = [
                        '<div class="listing-item">',
                        '<time class="time">',
                        item.date,
                        '</time>',
                        '<a class="title" href="' + item.url + '">',
                        item.title,
                        '</a>',
                        '<p class="subtitle">',
                        item.subtitle,
                        '</p>',
                        '</div>'
                    ];
                    content += (htm.join(""));
                    count++;
                }
            });
        });
        if (count > 0) {
            content += "</div>";
            tagEl.innerHTML = content;
        }
    }
})();