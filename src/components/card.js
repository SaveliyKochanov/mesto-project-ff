import { openImagePopup } from './modal'

export function deleteCard(cardElement) {
	cardElement.remove()
}

export function setLikeToCard(cardElement) {
	cardElement.classList.toggle('card__like-button_is-active')
}

export function createCard(
	cardName,
	cardImageLink,
	deleteCard,
	setLikeToCard,
	openImagePopup
) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardElementImage = cardElement.querySelector('.card__image')

	cardElementImage.setAttribute('src', cardImageLink)
	cardElementImage.setAttribute('alt', cardName)
	cardElement.querySelector('.card__title').textContent = cardName

	const deleteButton = cardElement.querySelector('.card__delete-button')
	deleteButton.addEventListener('click', () => {
		deleteCard(cardElement)
	})

	cardElementImage.addEventListener('click', () => {
		openImagePopup(cardImageLink, cardName)
	})

	const likeButton = cardElement.querySelector('.card__like-button')
	likeButton.addEventListener('click', () => {
		setLikeToCard(likeButton)
	})

	return cardElement
}
