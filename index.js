const queens = [
    {
        id: '1',
        name: 'Sharon Del Adel',
        img: 'https://live.staticflickr.com/3843/14417849149_7a02c0a9f1_b.jpg',
        description: 'Ша́рон ден А́дель — вокалістка та одна з авторів пісень нідерландського симфо-металічного гурту Within Temptation. Поза музичною кар\'єрою керує компанією «FTX»'
    },
    {
        id: '2',
        name: 'Alissa White-Gluz',
        img: 'https://www.metal-archives.com/images/7/6/5/765_artist.jpg?4555',
        description: 'Аліса Вайт-Глаз — канадська вокалістка та автор-виконавець. Найбільше відома у якості фронтледі шведського мелодійного дез-метал-гурту Arch Enemy та колишньої вокалістки та засновниці канадського метал-гурту the Agonist.'
    },
    {
        id: '3',
        name: 'Amy Lee',
        img: 'https://i.pinimg.com/originals/e7/b0/5a/e7b05a7aa7e16b9d152d322434e5e370.jpg',
        description: 'Емі Лін Гарцлер — американська співачка і поет-виконавець, солістка і співзасновник рок-гурту «Evanescence». Відоміша як Емі Лі.'
    },
];

const toHTML = ({id, name, img}) => `
    <div class="card">
        <div class="card__img">
            <img src=${img} alt={name}>
        </div>
        <div class="card__body">
            <h4 class="card__title">${name}</h4>
            <a href="#" class="btn btn--primary" data-btn="additional" data-id=${id}>
                Дополнительно
            </a>
            <a href="#" class="btn btn--danger" data-btn="remove">
                Удалить
            </a>
        </div>
    </div>
`;

const render = () => {
    const html = queens.map(toHTML).join('');
    document.querySelector('#queens').innerHTML = html;
};
render();

const singerDetailsModal = $.modal({
    title: 'Singer Description',
    maxWidth: '400px',
    closable: true,
    footerButtons: [
        {
            text: 'Закрыть',
            type: 'danger',
            handler() {
                singerDetailsModal.close();
            }
        }
    ]
});
const confirmModal = $.modal({
    title: 'You are shore?',
    maxWidth: '400px',
    closable: true,
    footerButtons: [
        {
            text: 'Отменить',
            type: 'success',
            handler() {
                confirmModal.close();
            }
        },
        {
            text: 'Закрыть',
            type: 'danger',
            handler() {
                confirmModal.close();
            }
        }
    ]
});

const listener = event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    if(btnType==='additional'){
        const id = event.target.dataset.id;
        const queen = queens.find(q => q.id===id);
        singerDetailsModal.setContent(`
            <h4>${queen.name}</h4>
            <p>${queen.description}</p>
        `);
        singerDetailsModal.open();
    }
    if(btnType==='remove'){
        confirmModal.setContent(`<p>Вы действительно хотите удалить данную карточку?</p>`)
        confirmModal.open();
    }
};

document.addEventListener('click', listener);