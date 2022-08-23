const header = document.querySelector('.header');
const man = document.querySelector('.header__button-gender_man');
const woman = document.querySelector('.header__button-gender_woman');
const btnChange = document.querySelectorAll('.header__button-change');

const state = {
    gender: 'woman',
}


const changeMan = () => {

    document.body.classList.add('man');
    document.body.classList.remove('woman');

    man.classList.add('header__button-gender_man-active');
    woman.classList.remove('header__button-gender_woman-active');

    btnChange.forEach(item => {
        item.classList.add('header__button-change-man');
        item.classList.remove('header__button-change-woman');

    });
};

const changeWoman = () => {

    document.body.classList.add('woman');
    document.body.classList.remove('man');

    woman.classList.add('header__button-gender_woman-active');
    man.classList.remove('header__button-gender_man-active');

    btnChange.forEach(item => {
        item.classList.add('header__button-change-woman');
        item.classList.remove('header__button-change-man');

    });
};

const selectCard = (event) => {

    const target = event.target;

    if (target.closest('.header__button-gender_man')) {
        if (state.gender !== 'man') {
            state.gender = 'man';
            changeMan();
        }
    } else if (target.closest('.header__button-gender_woman')) {
        if (state.gender !== 'woman') {
            state.gender = 'woman';
            changeWoman();
        }
    }

};


header.addEventListener('click', selectCard);


