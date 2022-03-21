$(document).ready(() => {

    // variables
    const $mainNav = $('body>header>nav');
    const $sections = $('section');

    // init
    init();

    // events
    $mainNav.on('click', () => $mainNav.toggleClass('active'))
    $mainNav.find('a').on('click', onMainNavLinkClicked);

    $('.go-top').on('click', () => {

    });

    $(window).on('click touchstart', () => {
        console.log('trying to stop animation')
        $('html, body').stop(true)
    });

    // handlers
    function onMainNavLinkClicked(e) {
        // e.preventDefault();
        e.stopPropagation();
        scrollTo(this.href);
        $mainNav.toggleClass('active');
    }

    // functions
    function init() {
        scrollTo(window.location.href);
        createObserver();
    }

    function scrollTo(href) {
        if (!href) {
            return;
        }

        const url = new URL(href)
        const $element = $(url.hash);

        if (!$element.length) {
            return
        }

        bodyScrollAnimation($element.offset().top - $('body>header').outerHeight(true))

    }

    function bodyScrollAnimation(scrollTop) {
        $('html, body').animate({
            scrollTop: scrollTop || 0
        }, 1000);
    }

    function createObserver() {

        var observer;

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: [0.3, 0.7]
        };

        observer = new IntersectionObserver(handleIntersect, options);
        $sections.each((idx, element) => observer.observe(element));

        function handleIntersect(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const $target = $(entry.target)
                    if (!$target.hasClass('active')) {
                        $(entry.target).addClass('active');
                        console.log('entramos en la sección', entry.target.id)
                    }
                } else {
                    $(entry.target).removeClass('active');
                    console.log('salimos de la sección', entry.target.id)

                }
            });
        }
    }



});
