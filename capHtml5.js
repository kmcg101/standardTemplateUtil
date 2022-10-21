var cap = cap || {};
cap.html5 = cap.html5 || {};
cap.html5.arguments = cap.html5.arguments || [];
cap.idLoading = 99;
cap.imagesLoading = 0;

cap.injectArguments = function () {
  console.log(" ");
  console.log(" ");
  console.log("**************************");
  console.log("**************************");
  let myArray = document.querySelectorAll("*[cap-id]");
  let myFilterArray = ["Avenir_Heavy_css", "Avenir_Roman_css", "cssReset", "cssE_Common", "css"];
  myArray.forEach(function (currentElement, currentIndex, listObj) {
    myAttr = currentElement.attributes.getNamedItem("cap-id");
    if (myFilterArray.includes(myAttr.value)) {
    } else {
      console.log(myAttr.value);
    }
  });
  console.log("**************************");
  console.log("**************************");
  console.log(" ");
  console.log(" ");

  console.log("number of cap-id = " + $("[cap-id]").length);
  cap.idLoading = $("[cap-id]").length;
  $("[cap-id]").each(function (index) {
    var $ele = $(this);

    var id = $ele.attr("cap-id");
    var target = $ele.attr("cap-target");
    if (target) target = target.toLowerCase();
    arg = cap.html5.arguments[id];
    //console.log("km ****************** " + arg)
    console.log(id);
    console.log(target);
    console.log(arg);
    if (arg) {
      if (target === "href") {
        console.log("href=" + arg);
        $ele.attr("href", arg);
      } else if (target === "src") {
        var tagName = $ele.get(0).tagName;
        if (tagName) tagName = tagName.toLowerCase();
        console.log(tagName);
        if (tagName === "img") {
          cap.imagesLoading++;
          console.log("cap.imagesLoading:" + cap.imagesLoading);
          $ele.on("load", function () {
            cap.imagesLoading--;
            console.log("cap.imagesLoading:" + cap.imagesLoading);
          });
          $ele.on("error", function () {
            cap.imagesLoading--;
            console.log("error: cap.imagesLoading:" + cap.imagesLoading);
          });
          console.log("added load");
        }
        $ele.attr("src", arg);
      } else if (target === "text") {
        $ele.text(arg);
      } else if (target === "html") {
        $ele.html(arg.replace("\r\n", "<br/>").replace("\n", "<br/>").replace("\r", "<br/>"));
      }
    } else {
      console.log("warning argument for id:" + id + " data was undefined");
    }
    --cap.idLoading;
  });
};

cap.extractElements = function () {
  var ret = [];
  $("[cap-id]").each(function (index) {
    var $ele = $(this);
    ret.push({
      id: $ele.attr("cap-id") ? $ele.attr("cap-id") : null,
      target: $ele.attr("cap-target") ? $ele.attr("cap-target") : "html",
      display: $ele.attr("cap-display") ? $ele.attr("cap-display") : null,
      edit: $ele.attr("cap-edit") ? $ele.attr("cap-edit") : "text",
      size: $ele.attr("cap-size") ? $ele.attr("cap-size") : "1",
      source: $ele.attr("cap-source") ? $ele.attr("cap-source") : "content",
      name: $ele.attr("cap-name") ? $ele.attr("cap-name") : null,
      category: $ele.attr("cap-category") ? $ele.attr("cap-category") : null,
    });
  });
  return JSON.stringify(ret);
};

cap.isLoaded = function () {
  console.log("isLoaded check");
  console.log(cap.idLoading < 1);
  console.log(cap.imagesLoading < 1);
  return cap.idLoading < 1 && cap.imagesLoading < 1;
};
