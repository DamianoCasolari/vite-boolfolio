// Show an section with Scroll

export function appearWithScroll(element) {
    window.addEventListener('scroll', function () {
        var halfViewportHeight = window.innerHeight / 10 * 8.5;
        var div2Position = element.getBoundingClientRect().top;
        if (div2Position < halfViewportHeight) {

            element.style.opacity = "1";
        } else {

            element.style.opacity = "0";
        }
    })
};

export function arrowAppearWithScroll(element, arrow) {
    window.addEventListener('scroll', function () {
        var halfViewportHeight = window.innerHeight / 2;
        var div2Position = element.getBoundingClientRect().top;
        if (div2Position < halfViewportHeight) {

            arrow.style.opacity = "1";
            arrow.style.right = "0";
        } else {

            arrow.style.opacity = "0";
            arrow.style.right = "-100px";
        }
    })
};


