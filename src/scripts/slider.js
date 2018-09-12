class slider {
    constructor(props) {
        this.slider = props.slider;
        this.items = props.slider.querySelectorAll('.clients_content_item');
        this.dots = document.querySelectorAll('.clients_dots a');
        this.data = props.data;
        this.counter = 0;
    }

    initialize() {
        this.timer();
    }

    timer() {
        this.timerID = setInterval(
            () => this.action({
                side: 'right'
            })
        , 3000
        )
    }

    refresh() {
        clearInterval(this.timerID);
        this.initialize();
    }

    countering(side) {

        if (side === 'right') {

            if (this.counter < this.data.length  / 3 - 1) {
                this.counter++;
            }
            else {
                this.counter = 0;
            }
        }
        else {

            if (this.counter > 0) {
                this.counter--;
            }
            else {
                this.counter = this.data.length  / 3 - 1;
            }
        }
    }

    dotsSwitching() {

        for (let dot of this.dots) {

            if (dot.classList.contains('active')) {
                dot.classList.remove('active');
            }
        }
        setTimeout(
            () =>  this.dots[this.counter].classList.add('active'),
            500
        )
    }

    action(props) {

        if (props.side) {
            this.countering(props.side);
            this.dotsSwitching();
        }
        else if (props.number + 1) {
            this.counter = props.number;
        }
        this.slider.classList.add('opacity');

        setTimeout(() => {

            for (let i = 0; i < this.items.length; i++) {
                this.items[i].querySelector('p').textContent = this.data[this.counter * 3 + i].name;
                this.items[i].querySelector('svg').innerHTML = this.data[this.counter * 3 + i].icon;
            }
            this.slider.classList.remove('opacity');
        }, 500);
    }
}

export default slider;