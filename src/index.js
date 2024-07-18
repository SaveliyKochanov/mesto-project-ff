import {
	addCard,
	createCard,
	deleteCard,
	initialCards,
	setLikeToCard,
} from './components/cards.js'
import { closeModal, openModal } from './components/modal.js'
import './pages/index.css'

const editProfileform = document.querySelector(
	'.popup__form[name="edit-profile"]'
)
const addCardForm = document.querySelector('.popup__form[name="new-place"]')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const popupInputTypeName = document.querySelector('.popup__input_type_name')
const popupInputTypeDescription = document.querySelector(
	'.popup__input_type_description'
)
const profileAddButton = document.querySelector('.profile__add-button')
const newCardPopup = document.querySelector('.popup_type_new-card')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const imageUrlInput = document.querySelector('.popup__input_type_url')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const closePopupButtons = document.querySelectorAll('.popup__close')

profileEditButton.addEventListener('click', () => {
	popupInputTypeName.value = profileTitle.textContent
	popupInputTypeDescription.value = profileDescription.textContent
	openModal(popupTypeEdit)
})

profileAddButton.addEventListener('click', () => {
	openModal(newCardPopup)
})

closePopupButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup')
		if (popup) {
			closeModal(popup)
		}
	})
})

function handleFormSubmit(evt) {
	evt.preventDefault()

	const nameValue = popupInputTypeName.value
	const jobValue = popupInputTypeDescription.value

	profileTitle.textContent = nameValue
	profileDescription.textContent = jobValue
	closeModal(evt.target.closest('.popup'))
}

function addCardSubmit(evt) {
	evt.preventDefault()

	const cardName = cardNameInput.value
	const imageUrl = imageUrlInput.value
	const newCard = createCard(cardName, imageUrl, deleteCard, setLikeToCard)

	addCard(newCard, true)
	addCardForm.reset()
	closeModal(evt.target.closest('.popup'))
}

initialCards.forEach(card => {
	const newCard = createCard(card.name, card.link, deleteCard, setLikeToCard)
	addCard(newCard)
})

editProfileform.addEventListener('submit', handleFormSubmit)
addCardForm.addEventListener('submit', addCardSubmit)
