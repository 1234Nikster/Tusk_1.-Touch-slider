const slider = document.querySelector('.slider')
const slide = document.querySelectorAll('.slider_slide')
const ribbon = document.querySelector('.slider_ribbon')

let step = 0
let saveCounterNumberSlide = 0
let saveCounterOfSlide
let posX1
let posX2
let posInitialX
let posFinal
let limitOnLeaf

slider.addEventListener('touchstart', function moveStart(event) {
    posInitialX = event.targetTouches[0].clientX;
    posX1 = posInitialX
    ribbon.style.transition = '0s';
    saveCounterOfSlide = slider.offsetWidth * saveCounterNumberSlide
    slider.addEventListener('touchmove', function moveOn(event) {

        posX1 = event.targetTouches[0].clientX;
        posX2 = (posX1 - posInitialX) - saveCounterOfSlide
        ribbon.style.transform = `translate(${posX2}px)`;
    })
    slider.addEventListener('touchend', function moveEnd() {

        posFinal = posInitialX - posX1
        limitOnLeaf = slider.offsetWidth / 3
        if (Math.abs(posFinal) >= limitOnLeaf) {
            if (posInitialX > posX1) { // ограничитель конца
                ribbon.style.transition = '0.5s';
                saveCounterNumberSlide++
                step += 100
                if (step >= (slide.length - 1) * 100) {
                    step = (slide.length - 1) * 100
                }
                if (saveCounterNumberSlide >= slide.length - 1) {
                    saveCounterNumberSlide = slide.length - 1
                }
                ribbon.style.transform = `translate(-${step}%)` // ограничитель конца
            } else if (posInitialX < posX1) { // ограничитель начала
                ribbon.style.transition = '0.5s';
                step -= 100
                if (step < 0) {
                    step = 0
                }
                ribbon.style.transform = `translate(-${step}%)`
                saveCounterNumberSlide--
                if (saveCounterNumberSlide <= 0) {
                    saveCounterNumberSlide = 0
                }
            } // ограничитель начала
        } else {
            ribbon.style.transition = '0.5s';
            ribbon.style.transform = `translate(-${step}%)`
        }
        slider.removeEventListener('touchend', moveEnd);
    })
})