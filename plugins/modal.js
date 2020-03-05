Element.prototype.appendAfter = function(element){
    element.parentNode.insertBefore(this, element.nextSibling);
};

function _createModalFooter(buttons = []) {
    const footer = document.createElement ('div');
    if (buttons.length !== 0) {
        footer.classList.add('modal__footer');
        buttons.forEach(btn => {
            const $btn = document.createElement('button');
            $btn.textContent = btn.text;
            $btn.classList.add('btn');
            $btn.classList.add(`btn-${btn.type || 'secondary'}`);
            $btn.onclick= btn.handler || function(){};
            footer.appendChild($btn);
        });
    }
    return footer;
}

function _createModal(options){
    const {
        title = 'Modal Title',
        content = '',
        maxWidth = '600px',
        closable = true,
        footerButtons = []
    } = options;
    const modal = document.createElement ('div');
    modal.classList.add('vmodal');
    const modalClose = closable ?
    `<span class="modal__header-close" data-close="true">
        &times;
    </span>`:
    '';
    const buttons = footerButtons.map(button => `<button>${button.text}</button>`);
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay" data-close="true">
            <div class="modal__window" style="max-width: ${maxWidth}">
                <div class="modal__header">
                    <span class="modal__header-title">
                      ${title}
                    </span>
                    ${modalClose} 
                </div>
                <div class="modal__body" data-content>
                    ${content}
                </div>
            </div>
        </div>
    `);
    const footer = _createModalFooter(footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);
    return modal;
}

$.modal = function (options) {
    const ANIMATION_SPEED = 2000;
    let destroyed = false;
    const $modal = _createModal(options);
    const modal = {
        open() {
            destroyed?
            console.log('Modal is destroyed'):
            $modal.classList.add('open');
        },
        close() {
            $modal.classList.add('hide');
            $modal.classList.remove('open');
            setTimeout(() => {
                $modal.classList.remove('hide');

            }, ANIMATION_SPEED)
        },
    };

    const listener = event => {
        !!event.target.dataset.close&&
        modal.close();
    };

    $modal.addEventListener('click', listener);

    return {
        ...modal,
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    };
};