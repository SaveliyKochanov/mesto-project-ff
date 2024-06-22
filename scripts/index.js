const placesContainer = document.querySelector('.places__list')

function createCard(cardName, cardImageLink) {
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

	return cardElement
}

function deleteCard(cardElement) {
	cardElement.remove()
}

function addCard(cardElement) {
	placesContainer.append(cardElement)
}

initialCards.forEach(card => {
	const newCard = createCard(card.name, card.link)
	addCard(newCard)
})
