export { closeModal, openModal }

function openModal(popup) {
	if (!popup.classList.contains('popup_is-opened')) {
		popup.classList.add('popup_is-opened')
		document.addEventListener('keydown', closeModalEsc)
		popup.addEventListener('click', closeModalByOverlay)
	}
}

function closeModal(popup) {
	if (popup) {
		popup.classList.remove('popup_is-opened')
		document.removeEventListener('keydown', closeModalEsc)
		popup.removeEventListener('click', closeModalByOverlay)
	}
}

function closeModalEsc(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		if (openedPopup) {
			closeModal(openedPopup)
		}
	}
}

function closeModalByOverlay(evt) {
	if (evt.target === evt.currentTarget) {
		closeModal(evt.currentTarget)
	}
}
