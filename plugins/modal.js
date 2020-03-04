function _createModal(){
    const modal = document.createElement ('div');
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay">
            <div class="modal__window">
                <div class="modal__header">
                    <span class="modal__header-title">
                        Modal title
                    </span>
                    <span class="modal__header-close">
                        &times;
                    </span>
                </div>
                <div class="modal__body">
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Molestias nostrum quae reiciendis?</p>
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

$.modal = function (options) {
    const $modal = _createModal(options);

    return {
        open() {
            $modal.classList.add('open');
        },
        close() {
            $modal.classList.remove('open');
        },
        destroy() {}
    }
};