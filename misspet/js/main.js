var locateElements = document.querySelectorAll('.locate');

locateElements.forEach(function(locateElement) {
  var locActElement = locateElement.querySelector('.loc-act');

  locateElement.addEventListener("click", function(event) {
    // 移除其他元素的 active 类
    locateElements.forEach(function(element) {
      element.classList.remove("active");
    });

    // 添加 active 类
    locateElement.classList.add("active");
    event.stopPropagation();
  });

  document.addEventListener("click", function(event) {
    // 检查事件目标是否位于 .locate、.loc-act 元素或 #dragBlock 内
    if (!locateElement.contains(event.target) && !locActElement.contains(event.target) && !document.querySelector('#dragBlock').contains(event.target)) {
      // 移除 active 类
      locateElement.classList.remove("active");
    }
  });
});


//sheet
var dragBlock = document.getElementById('dragBlock');
var overlay = document.querySelector('.overlay');
var navDrag = document.querySelector('.nav-drag');
var startY;
var startHeight;

navDrag.addEventListener('mousedown', startDrag);
navDrag.addEventListener('mouseup', endDrag);
navDrag.addEventListener('mouseleave', endDrag);
navDrag.addEventListener('touchstart', startDrag);
navDrag.addEventListener('touchend', endDrag);

function startDrag(e) {
    e.preventDefault();
    if (e.type === 'mousedown') {
        startY = e.clientY;
    } else if (e.type === 'touchstart') {
        startY = e.touches[0].clientY;
    }
    startHeight = dragBlock.offsetHeight;
    dragBlock.style.cursor = 'grabbing';
    dragBlock.style.transition = 'none';

    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);
}

function endDrag(e) {
    dragBlock.style.cursor = 'grab';
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('touchmove', drag);

    var screenHeight = window.innerHeight;
    var blockHeight = dragBlock.offsetHeight;

    var endY;
    if (e.type === 'mouseup') {
        endY = e.clientY;
    } else if (e.type === 'touchend') {
        endY = e.changedTouches[0].clientY;
    }

    if (endY && endY < startY) {
        dragBlock.style.height = '100vh';
        overlay.style.opacity = 1;
        dragBlock.style.borderRadius = '0';
    } else {
        dragBlock.style.height = '47vh';
        overlay.style.opacity = 0;
        dragBlock.style.borderRadius = '';
    }

    dragBlock.style.transition = 'height 0.3s ease';

    if (blockHeight < 40) {
        overlay.style.opacity = 0;
    }

}

function drag(e) {
    var currentY;
    if (e.type === 'mousemove') {
        currentY = e.clientY;
    } else if (e.type === 'touchmove') {
        currentY = e.touches[0].clientY;
    }
    var deltaY = startY - currentY;
    var newHeight = startHeight + deltaY;
    dragBlock.style.height = Math.max(newHeight, 50) + 'px';

    var overlayOpacity = (newHeight - 30) / (window.innerHeight - 30);
    overlay.style.opacity = overlayOpacity;

    if (newHeight < 40) {
        overlay.style.opacity = 0;
    }
}

function adjustHeight() {
    dragBlock.style.height = '47vh';
    overlay.style.opacity = 0;
    dragBlock.style.borderRadius = '';
}

// 点击 .locate 时将 dragBlock 的高度设置为 47vh
locateElements.forEach(function(locateElement) {
    locateElement.addEventListener("click", function(event) {
        adjustHeight();
    });
});

// 获取整个文档的根元素
var rootElement = document.documentElement;

// 监听根元素的点击事件
rootElement.addEventListener('click', function(event) {
  // 检查点击事件的目标元素是否是 dragBlock 或 dragBlock 的子元素
  var isDragBlockClicked = event.target === dragBlock || dragBlock.contains(event.target);

  // 如果点击事件的目标元素不是 dragBlock 或 dragBlock 的子元素
  if (!isDragBlockClicked) {
    // 将 dragBlock 的高度设置为 0vh
    dragBlock.style.height = '0vh';
    overlay.style.opacity = 0;
    dragBlock.style.borderRadius = '';
  }
});

//按鈕增加active
function toggleButton() {
  var button = document.getElementById("myButton");
  var innerDiv = button.querySelector(".inner-div");

  // 检查按钮是否具有 active 类
  if (button.classList.contains("active")) {
    // 移除 active 类，恢复默认样式
    button.classList.remove("active");
    innerDiv.innerText = "加入收藏";
  } else {
    // 添加 active 类，更改样式
    button.classList.add("active");
    innerDiv.innerText = "已收藏";
  }
}
function loveButton() {
  var button = document.getElementById("loveButton");

  // 检查按钮是否具有 active 类
  if (button.classList.contains("active")) {
    // 移除 active 类，恢复默认样式
    button.classList.remove("active");
  } else {
    // 添加 active 类，更改样式
    button.classList.add("active");
  }
}

var commentTabBtn = document.getElementById("pills-comment-tab");
var helpTabBtn = document.getElementById("pills-help-tab");
var introTabBtn = document.getElementById("pills-intro-tab");
var addComElement = document.querySelector(".add-com");

commentTabBtn.addEventListener("click", function() {
  addComElement.classList.add("active");
});

helpTabBtn.addEventListener("click", function() {
  addComElement.classList.remove("active");
});

introTabBtn.addEventListener("click", function() {
  addComElement.classList.remove("active");
});

//swiper
var mySwiper = new Swiper('.swiper', {
	autoplay: true,//可选选项，自动滑动
  pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
})

//如果你初始化时没有定义Swiper实例，后面也可以通过Swiper的HTML元素来获取该实例
new Swiper('.swiper')
var mySwiper = document.querySelector('.swiper').swiper
mySwiper.slideNext();


