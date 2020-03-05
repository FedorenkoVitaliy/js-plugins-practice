$.confirm = (options) => {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            content: options.content,
            width: '400px',
            closable: false,
            footerButtons: [
                {
                    text: 'Отменить',
                    type: 'success',
                    handler() {
                        modal.close();
                        reject();
                    }
                },
                {
                    text: 'Подтвердить',
                    type: 'danger',
                    handler() {
                        modal.close();
                        resolve();
                    }
                }
            ],
            onClose(){
                modal.destroy();
            }
        });

        setTimeout(() => modal.open(), 100);
    });
};