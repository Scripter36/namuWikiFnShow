var fns = document.getElementsByClassName("wiki-fn-content");

var nav = document.getElementsByClassName("navbar")[0];
var color = getComputedStyle(nav)["background-color"];

var inner = document.getElementsByClassName("wiki-inner-content")[0];

function getOffset(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

var remains = document.getElementsByClassName("fnshow");
for (var i in remains) {
    if (remains[i] && remains[i].remove) remains[i].remove();
}

for (var i in fns) {
    if (fns[i] == undefined || fns[i].href == undefined) continue;
    var fn = fns[i];
    d(fn);
}

function d(fn) {
    fn.setAttribute("title", "");
    var div = document.createElement("div");
    var content = document.getElementById(fn.href.split("#")[1]).parentElement;
    div.appendChild(content.cloneNode(true));

    var maxWidth = parseFloat(getComputedStyle(inner).width);

    var displaying = false;

    var left = fn.offsetLeft;
    var top = (fn.offsetTop + 12.8);

    div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:0px;top:0px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));

    div.setAttribute("class", "fnshow");

    function onResize() {
        maxWidth = parseFloat(getComputedStyle(inner).width);
        //div.setAttribute("style", "position: absolute;width:" + width + ";left:" + fn.offsetLeft + "px;top:" + (fn.offsetTop + 15) + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));
        div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:0px;top:0px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:block");
        var innerWidth = parseFloat(getComputedStyle(inner).width) + inner.offsetLeft;
        var width = parseFloat(getComputedStyle(div).width);
        if (width > maxWidth) width = maxWidth;
        var offset = $(fn).position();
        if (innerWidth - offset.left < width) {
            var plus = width + offset.left - innerWidth;
            left = (offset.left - plus);
        } else left = offset.left;
        top = (offset.top + 12.8);
        div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:" + left + "px;top:" + top + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));
    }

    window.addEventListener("resize", onResize);

    var timeoutId;

    fn.addEventListener("mouseover", function () {
        clearTimeout(timeoutId);
        displaying = true;
        div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:" + left + "px;top:" + top + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));
    });

    fn.addEventListener("mouseout", function () {
        timeoutId = setTimeout(function(){
            displaying = false;
            div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:" + left + "px;top:" + top + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));
        }, 50);
        
    });

    div.addEventListener("mouseover", function () {
        clearTimeout(timeoutId);
        displaying = true;
        div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:" + left + "px;top:" + top + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));
    });

    div.addEventListener("mouseout", function () {
        timeoutId = setTimeout(function(){
            displaying = false;
            div.setAttribute("style", "position: absolute;max-width:" + maxWidth + "px;left:" + left + "px;top:" + top + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + color + ";display:" + (displaying ? "block" : "none"));
        }, 50);
    });

    inner.appendChild(div);

    setTimeout(onResize, 100);
}

//for (var i in fn) console.log(document.getElementById(fn[i].href.split("#")[1]).parentElement);

//window.addEventListener("resize", function(){div.setAttribute("style", "position: absolute;left:" + f.offsetLeft + "px;top:" + (f.offsetTop + 10) + "px;background:#FFFFFF;border-width:2px;border-style: solid;border-color:" + getComputedStyle(nav)["background-color"]);});

//var nav = document.getElementsByClassName("navbar")[0];

//div.appendChild(document.getElementById(f.href.split("#")[1]).parentElement);

//var div = document.createElement("div");