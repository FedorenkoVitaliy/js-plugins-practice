const quins = [
    {
        name: 'Sharon Del Adel',
        img: 'https://live.staticflickr.com/3843/14417849149_7a02c0a9f1_b.jpg'
    },
    {
        name: 'Alissa White-Gluz',
        img: 'https://www.metal-archives.com/images/7/6/5/765_artist.jpg?4555'
    },
    {
        name: 'Amy Lee',
        img: 'https://i.pinimg.com/originals/e7/b0/5a/e7b05a7aa7e16b9d152d322434e5e370.jpg'
    },

];

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