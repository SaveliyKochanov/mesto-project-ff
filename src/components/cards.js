import { openImagePopup } from './modal'

const placesContainer = document.querySelector('.places__list')

export const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	},
]

export function deleteCard(cardElement) {
	cardElement.remove()
}

export function addCard(cardElement, toStart) {
	if (toStart === true) {
		placesContainer.prepend(cardElement)
	} else {
		placesContainer.append(cardElement)
	}
}

export function setLikeToCard(cardElement) {
	cardElement.classList.toggle('card__like-button_is-active')
}

export function createCard(cardName, cardImageLink, deleteCard, setLikeToCard) {
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
