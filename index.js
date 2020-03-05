const modal = $.modal({
    title: 'Sed Modal',
    content: `
        <h4>Modal is working</h4>
        <p>Molestias nostrum quae reiciendis?</p>
        <p>Lorem ipsum dolor sit amet.</p>
    `,
    maxWidth: '400px',
    closable: true,
    footerButtons: [
        {
            text: 'Ok',
            type: 'primary',
            handler() {
                console.log('Primary btn clicked');
                modal.close();
            }
        },
        {
            text: 'Cancel',
            type: 'secondary',
            handler() {
                console.log('Secondary btn clicked');
                modal.close();
            }
        }
    ]
});

const quins = [
    {
        name: 'Sharon Del Adel',
        img: 'https://live.staticflickr.com/3843/14417849149_7a02c0a9f1_b.jpg',
        description: 'Ша́рон ден А́дель — вокалістка та одна з авторів пісень нідерландського симфо-металічного гурту Within Temptation. Поза музичною кар\'єрою керує компанією «FTX»'
    },
    {
        name: 'Alissa White-Gluz',
        img: 'https://www.metal-archives.com/images/7/6/5/765_artist.jpg?4555',
        description: 'Аліса Вайт-Глаз — канадська вокалістка та автор-виконавець. Найбільше відома у якості фронтледі шведського мелодійного дез-метал-гурту Arch Enemy та колишньої вокалістки та засновниці канадського метал-гурту the Agonist.'
    },
    {
        name: 'Amy Lee',
        img: 'https://i.pinimg.com/originals/e7/b0/5a/e7b05a7aa7e16b9d152d322434e5e370.jpg',
        description: 'Емі Лін Гарцлер — американська співачка і поет-виконавець, солістка і співзасновник рок-гурту «Evanescence». Відоміша як Емі Лі.'
    },
];

const createListItem = ({item:{name, img, description}, className}) => {
    const element = document.createElement('div');
    const listener = event => {
        if(!!event.target.dataset.additionalmodal){
            modal.setContent(`<p>${description}</p>`)
            modal.open();
        }
        if(!!event.target.dataset.removeitem){
            console.log(event.target);
        }
    };
    element.classList.add(className);
    element.insertAdjacentHTML('afterbegin', `
        <div class="card__img">
            <img src=${img} alt="">
        </div>
        <div class="card__body">
            <h4 class="card__title">${name}</h4>
            <a href="#" class="btn btn--primary" data-additionalmodal="additionalModal">
                Дополнительно
            </a>
            <a href="#" class="btn btn--danger" data-removeitem="removeItem">
                Удалить
            </a>
        </div>
    `);
    element.addEventListener('click', listener);
    return element;
};

const createList = ({className, listItems}) => {
    const list = document.createElement('div');
    list.classList.add(className);
    listItems.forEach((item) => {
        list.appendChild(createListItem({
            item,
            className: 'card'
        }));
    });
    return list
};

const cardList = createList({
    className: 'quins',
    listItems: quins
});

cardList.appendAfter(document.querySelector('.page-header'));