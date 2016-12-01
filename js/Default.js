$(function() {
    
})

 function showTag(tagStr) {
     $.getJSON("../post.json", function(data) {
        $('#show-tag').empty(content);
        var content = "<h2>分类：" + tagStr + "</h2><ul class=\"posts\">";
        var count = 0;
        $.each(data,
            function(i, item) {
                $.each(item.tags,
                    function(j, tag) {
                        if (tag == tagStr) {
                            content += "<li class=\"listing-item\"><time datetime=\"" + item.date + "\">" + item.date + "</time><a href=\"" + item.url + "\">" + item.title + "</a></li>";
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
    })
 }