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
        // console.log('trying to stop animation')
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
        createContent();
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
                        // console.log('entramos en la sección', entry.target.id)
                    }
                } else {
                    $(entry.target).removeClass('active');
                    // console.log('salimos de la sección', entry.target.id)

                }
            });
        }
    }

    // create content products
    function createContent() {
        Papa.parse('data/catalogo-web.csv', {
            download: true,
            header: true,
            complete: results => {
                results.data.map(createProduct);
            }
        });
    }

    function createProduct(product) {

        const $product = $(`<div data-reference="${product.reference}" data-type="${product.type}"></div>`)
        $product.appendTo('#productsHolder');
        $product.addClass('product');

        const $title = $(`<h3>${product.name}</h3>`).addClass('product-title');
        const $description = $(`<p>${product.description}</p>`).addClass('product-description');
        const $dimensions = $(`<p>${product.dimensions}</p>`).addClass('product-dimensions');
        const $price = $(`<p>${product.price}</p>`).addClass('product-price');
        const $colors = createColorsProduction(product.colors.split(',')).addClass('product-colors');
        const $gallery = createGalleryProduct(product.images.split(',')).addClass('product-gallery');

        $gallery.appendTo($product);
        $title.appendTo($product);
        $description.appendTo($product);
        $dimensions.appendTo($product);
        $colors.appendTo($product);
        $price.appendTo($product);

    }

    function createColorsProduction(arr) {
        const $colors = $(`<div></div>`)

        arr.map(color => {
            $(`<div></div>`)
            .addClass(`product-color`)
            .addClass(`product-color-${color.toLowerCase().trim()}`)
            .appendTo($colors);
        });

        return $colors;
    }

    function createGalleryProduct(arr) {
        const $gallery = $(`<div></div>`);

        arr.map(path => {
            $(`<img src="${path}" alt="product-image"/>`)
                .addClass('product-gallery-image')
                .appendTo($gallery);
        });

        return $gallery;
    }

});
