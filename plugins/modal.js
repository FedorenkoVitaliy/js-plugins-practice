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
            $btn.classList.add(`btn--${btn.type || ''}`);
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
        closable = false,
        footerButtons = []
    } = options;
    const modal = document.createElement ('div');
    const modalClose = closable ?
    `<span class="modal__header-close" data-close="true">
        &times;
    </span>`:
    '';
    const footer = _createModalFooter(footerButtons);
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay" data-close=${closable?'true':''}>
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
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);
    return modal;
}

$.modal = function (options) {
    const ANIMATION_SPEED = 500;
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
                if(typeof options.onClose === 'function'){
                    options.onClose();
                }
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
            if($modal.parentNode){
                $modal.parentNode.removeChild($modal);
                $modal.removeEventListener('click', listener);
                destroyed = true;
            }
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    };
};