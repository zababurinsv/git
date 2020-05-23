document.body.onload = function () {
    setTimeout(function () {
        let preloader = document.body.querySelector('.preloader')
        if (preloader) {
            if (!preloader.classList.contains('done')) {
                preloader.classList.add('done')
            }
        }
    }, 1000)
}
