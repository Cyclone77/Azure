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

    //工具箱
    var tool = {
        /*
         *  合并两个对象，浅拷贝
         *  @param {Object} obj1
         *  @param {Object} obj2
         */
        extend: function(obj1, obj2) {
            if (!obj2 && this._typeof(obj2) != "object") return;

            for (var key in obj2) {
                if (obj2.hasOwnProperty(key)) {
                    obj1[key] = obj2[key];
                }
            }

            return obj1;
        },
        /*
         *   获取目标数据类型
         *   @param {Object} obj
         */
        _typeof: function(obj) {
            if (obj == null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[class2type.toString.call(obj)] || "object" :
                typeof obj;
        },
        /*
         *   为dom元素添加指定事件
         *   @element {Object} Dom对象
         *   @type {String} 事件名称
         *   @handler {Function} 事件处理函数
         */
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        /*
         *   为dom元素删除指定事件
         *   @element {Object} Dom对象
         *   @type {String} 事件名称
         *   @handler {Function} 事件处理函数
         */
        removerHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }
    };

    //数据类型
    var class2type = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
        class2type["[object " + e + "]"] = e.toLowerCase();
    });

    //初始化加载
    document.ready(function() {
        loadTagData();
        loadEvent();
        var hash = location.hash;
        if (!hash && !hash.substr(1)) {
            var tagfirst = document.getElementsByClassName("tag_item")[0];
            tagStr = tagfirst.getAttribute("i_tag");
            hash = location.hash = tagStr;
        } else {
            showTag(hash.substr(1));
        }
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
                        var json = JSON.parse(data);
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
        var json = Store("session").get("fillchar_tags");
        try {
            var data = JSON.parse(json);
        } catch (e) {
            throw e;
        }
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
        document.getElementById("show-tag").innerHTML = "";
        var content = ""; //<h2>分类：" + tagStr + "</h2><ul class=\"posts\">";
        var count = 0;
        Array.prototype.forEach.call(data, function(item, i) {
            $.each(item.tags, function(j, tag) {
                if (tag == tagStr) {
                    //content += "<li class=\"listing-item\"><time datetime=\"" + item.date + "\">" + item.date + "</time><a href=\"" + item.url + "\">" + item.title + "</a></li>";
                    var htm = [
                        '<li class="listing-item">',
                        '<time class="time">',
                        item.date,
                        '</time>',
                        '<a class="title" href="' + item.url + '">',
                        item.title,
                        '</a>',
                        '</li>'
                    ];
                    content += (htm.join(""));
                    count++;
                }
            });
        });
        if (count > 0) {
            content += "</ul>";
            postNumStr = "<span>（" + count + "篇文章）</span>";
            $('#show-tag').append(content);
            $('#show-tag>h2').append(postNumStr);
        }
    }
})();