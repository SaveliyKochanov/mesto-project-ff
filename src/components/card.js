import { deleteCardApi, setLikeApi } from './api'

export function deleteCard(cardElement, cardId) {
	deleteCardApi(cardId)
		.then(() => {
			cardElement.remove()
		})
		.catch(err => {
			console.log(`Ошибка при удалении карточки: ${err}`)
		})
}

export function setLikeToCard(likeButton, cardId, likesCount) {
	const isLiked = likeButton.classList.contains('card__like-button_is-active')

	setLikeApi(cardId, isLiked)
		.then(updatedCard => {
			likeButton.classList.toggle('card__like-button_is-active')
			likesCount.textContent = updatedCard.likes.length
		})
		.catch(err => console.log(err))
}

export function createCard(cardId, cardName, cardImageLink, deleteCard, likes, setLikeToCard, openImagePopup, ownerId, userId) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardElementImage = cardElement.querySelector('.card__image')
	const likesCount = cardElement.querySelector('.card__like-count')

	cardElementImage.setAttribute('src', cardImageLink)
	cardElementImage.setAttribute('alt', cardName)
	cardElement.querySelector('.card__title').textContent = cardName
	likesCount.textContent = likes.length

	const deleteButton = cardElement.querySelector('.card__delete-button')

	cardElementImage.addEventListener('click', () => {
		openImagePopup(cardImageLink, cardName)
	})

	const likeButton = cardElement.querySelector('.card__like-button')
	likeButton.addEventListener('click', () => {
		setLikeToCard(likeButton, cardId, likesCount)
	})

	const userHasLiked = likes.some(like => like._id === userId)
	if (userHasLiked) {
		likeButton.classList.add('card__like-button_is-active')
	}

	if (ownerId !== userId) {
		console.log('Removing delete button')
		deleteButton.remove()
	} else {
		deleteButton.addEventListener('click', () => {
			deleteCard(cardElement, cardId)
		})
	}

	return cardElement
}
