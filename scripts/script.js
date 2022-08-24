const header = document.querySelector('.header');
const man = document.querySelector('.header__button-gender_man');
const woman = document.querySelector('.header__button-gender_woman');
const btnChange = document.querySelectorAll('.header__button-change');
const cardWrapper = document.querySelector('.card__wrapper');

const state = {
    gender: 'woman',
    photo: {},
    text: {},
    randomNumPhoto: 0,
    randomNumText: 0,
}

const getData = () => {
    return fetch('../db/db.json')
    .then(res => res.json())
};

const randomState = (photo, text) => {
    if (photo && text) {
        getRandomInt('photo', 0, state.photo.length -1);
        getRandomInt('text', 0, state.text.length - 1);
    }

    photo && !text ? getRandomInt('photo', 0, state.photo.length -1) : '';
    !photo && text ? getRandomInt('text', 0, state.text.length - 1) : '';

    painCardContent();
}

const getDataCard = (male) => {
    const data = getData().then(data => {
        if(state.gender === 'man') {
            state.photo = data.photo[male]
            state.text = data.text[male]
            randomState('photo', 'text')
        } else if(state.gender === 'woman'){
            state.photo = data.photo[male]
            state.text = data.text[male]
            randomState('photo', 'text')
        }
    });
}

const getRandomInt = (name, min, max) => {
    const numRand = Math.round(Math.random() * (max - min)) + min;
    if (name === 'photo') {
        numRand !== state.randomNumPhoto ? state.randomNumPhoto = numRand : getRandomInt(name, min, max);
    } else if (name === 'text') {
        numRand !== state.randomNumText ? state.randomNumText= numRand : getRandomInt(name, min, max);
    }
    
}


const painCardContent = () => {
    cardWrapper.innerHTML = '';
    cardWrapper.insertAdjacentHTML('beforeend', `
        <img class="card__image" src="../img/${state.photo[state.randomNumPhoto]}" alt="Фон открытки">
        <p class="card__image-text">
            ${state.text[state.randomNumText]}
        </p>
    `);
}

const paintCardContentImage = (photo) => {
    randomState(photo, null);
}

const paintCardContentText = (text) => {
    randomState(null, text);
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
            getDataCard(state.gender);
        }
    } else if (target.closest('.header__button-gender_woman')) {
        if (state.gender !== 'woman') {
            state.gender = 'woman';
            changeWoman();
            getDataCard(state.gender);
        }
    } else if (target.classList.contains('header__button-change_text')) {
        paintCardContentText('text');
    } else if (target.classList.contains('header__button-change_image')) {
        paintCardContentImage('photo');
    }

};


header.addEventListener('click', selectCard);
getDataCard(state.gender);


