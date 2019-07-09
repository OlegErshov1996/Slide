let main = document.querySelector('.main');
let verticalSlider = document.querySelector('.slider__type_y');
let toggleBar = document.querySelector('.rangeslider__bar_inner');
let numerationItems = Array.from(document.querySelectorAll('.numeration__item'));
let hint = document.querySelector('.hint-layer');
let source = document.querySelector('.source');
let sourceTimeout; 
let pageNumY = 1; 
let isSwiping = false; 
let isToggling = false; 
let clickY; 

function swipeDown() {
    if (pageNumY > 2) { return };
    if (pageNumY === 2) hint.classList.add('hidden');
    verticalSlider.classList.remove(`slider__pos_y${pageNumY}`);
    numerationItems[pageNumY - 1].classList.remove('numeration__item__active');
    pageNumY += 1;
    verticalSlider.classList.add(`slider__pos_y${pageNumY}`);
    numerationItems[pageNumY - 1].classList.add('numeration__item__active');
}

function swipeUp() {
    if (pageNumY < 2) { return };
    numerationItems[pageNumY - 1].classList.remove('numeration__item__active');
    verticalSlider.classList.remove(`slider__pos_y${pageNumY}`);
    pageNumY -= 1;
    numerationItems[pageNumY - 1].classList.add('numeration__item__active');
    verticalSlider.classList.add(`slider__pos_y${pageNumY}`);
    if (pageNumY === 2) hint.classList.remove('hidden');
}

function showSource() {
    source.classList.remove('hidden');
    clearTimeout(sourceTimeout);
    setTimeout(() => {
        source.querySelector('.source__background')
            .classList.add('source__background__visible');
        source.querySelector('.source__content').
            classList.add('source__content__visible');
    }, 0)
    pageNumY += 1;
}

function hideSource() {
    pageNumY -= 1;
    source.querySelector('.source__background')
        .classList.remove('source__background__visible');
    source.querySelector('.source__content')
        .classList.remove('source__content__visible');
    sourceTimeout = setTimeout(() => {
        source.classList.add('hidden');
    }, 500)
}

function handleSwipe(event) {
    event.preventDefault();
    let yMovement;
    if (!isSwiping) return;
    yMovement = clickY - event.pageY;
    if (yMovement < -100) {
        isSwiping = false;
        if (pageNumY === 4) hideSource();
        else swipeUp();
    }
    else if (yMovement > 100) {
        isSwiping = false;
        if (pageNumY === 3) showSource();
        else swipeDown();
    }
}

function stopListening() {
    isSwiping = false;
    if (isToggling) fixToggle();
    main.removeEventListener('mousemove', handleSwipe);
    main.removeEventListener('mousemove', handleToggle);
}

main.addEventListener('mousedown', (event) => {
    if (isToggling) {
        isSwiping = false;
        main.addEventListener('mousemove', handleToggle);
    }
    else {
        isSwiping = true;
        clickY = event.pageY;
        main.addEventListener('mousemove', handleSwipe);
    }
})