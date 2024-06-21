const placesContainer = document.querySelector('.places__list')

function createCard(cardName, cardImageLink) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)

	cardElement.querySelector('.card__image').setAttribute('src', cardImageLink);
	cardElement.querySelector('.card__image').setAttribute('alt', cardName);
	cardElement.querySelector('.card__title').textContent = cardName

	const deleteButton = cardElement.querySelector('.card__delete-button')
	deleteButton.addEventListener('click', () => {
		cardElement.remove()
	})

	placesContainer.append(cardElement)
}

initialCards.forEach(card => {
	createCard(card.name, card.link)
})
