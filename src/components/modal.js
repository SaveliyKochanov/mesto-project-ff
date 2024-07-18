export { closeModal, openImagePopup, openModal }

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

function openImagePopup(imageSrc, caption) {
	const popupImage = document.querySelector('.popup_type_image')
	const popupImageElement = popupImage.querySelector('.popup__image')
	const popupCaptionElement = popupImage.querySelector('.popup__caption')

	popupImageElement.src = imageSrc
	popupImageElement.alt = caption
	popupCaptionElement.textContent = caption

	openModal(popupImage)
}
