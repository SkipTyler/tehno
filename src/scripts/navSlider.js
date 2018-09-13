const Slider = {
    initialize: () => {
        Slider.timer();
    },

    timer: () => {
        Slider.timerID = setInterval(
            () => Slider.action()
            , 3000
        )
    },

    refresh() {
        clearInterval(Slider.timerID);
        this.initialize();
    },

    action: () => {
        const slides = document.querySelectorAll('.nav-slider_overlay_slide');

        for (let slide of slides) {

            if (slide.classList.contains('active')) {
                slide.classList.remove('active');
            }
            else {
                slide.classList.add('active')
            }
        }
    }
};

export default Slider;