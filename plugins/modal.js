function _createModal(options){
    const {
        title = 'Modal Title',
        content = '',
        maxWidth = '600px',
        closable = true
    } = options;
    const modal = document.createElement ('div');
    const modalClose = closable ?
        `<span class="modal__header-close" data-close>
            &times;
        </span>`:
        '';
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay" data-close>
            <div class="modal__window" style="max-width: ${maxWidth}">
                <div class="modal__header">
                    <span class="modal__header-title">
                      ${title}
                    </span>
                    ${modalClose} 
                </div>
                <div class="modal__body">
                    ${content}
                </div>
                <div class="modal__footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
    return modal;
}

/*
Task
* Parameters:
*   title:string +
*   closable: boolean +
*   content: string +
*   width: string('400px') +
*   destroy: void
* overlay and close button
* -------------------
* public method setContent(html: string): void | PUBLIC
* lifecycle hook
*   - onClose(): void
*   - onOpen(): void
*   -beforeClose(): boolean
* -------------------
* animate.css
* */

$.modal = function (options) {
    const ANIMATION_SPEED = 2000;
    const $modal = _createModal(options);

    $modal.addEventListener('click', event => {
        //console.log('Clicked');
        console.log(!!event.target.dataset.close);
    });

    return {
        open() {
            $modal.classList.add('open');
        },
        close() {
            $modal.classList.add('hide');
            $modal.classList.remove('open');
            setTimeout(() => {
                $modal.classList.remove('hide');

            }, ANIMATION_SPEED)
        },
        destroy() {
            console.log('destroy')
        }
    }
};