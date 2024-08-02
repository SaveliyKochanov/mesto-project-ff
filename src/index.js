import {
	addNewCard,
	editUserData,
	getInitialsCards,
	getUserData,
} from './components/api.js'
import { createCard, deleteCard, setLikeToCard } from './components/card.js'
import { closeModal, openModal } from './components/modal.js'
import { clearValidation, enableValidation } from './components/validation.js'
import './pages/index.css'

const placesContainer = document.querySelector('.places__list')
const editProfileForm = document.querySelector(
	'.popup__form[name="edit-profile"]'
)
const addCardForm = document.querySelector('.popup__form[name="new-place"]')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
const popupInputTypeName = editProfileForm.querySelector(
	'.popup__input_type_name'
)
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
const popupImage = document.querySelector('.popup_type_image')
const popupImageElement = popupImage.querySelector('.popup__image')
const popupCaptionElement = popupImage.querySelector('.popup__caption')

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

profileEditButton.addEventListener('click', () => {
	popupInputTypeName.value = profileTitle.textContent
	popupInputTypeDescription.value = profileDescription.textContent
	clearValidation(editProfileForm, validationConfig)
	openModal(popupTypeEdit)
})

profileAddButton.addEventListener('click', () => {
	addCardForm.reset()
	clearValidation(addCardForm, validationConfig)
	openModal(newCardPopup)
})

closePopupButtons.forEach(button => {
	const popup = button.closest('.popup')
	button.addEventListener('click', () => {
		if (popup) {
			closeModal(popup)
		}
	})
})

function handleEditFormSubmit(evt) {
	evt.preventDefault()

	const nameValue = popupInputTypeName.value
	const jobValue = popupInputTypeDescription.value
	editUserData(nameValue, jobValue)
	profileTitle.textContent = nameValue
	profileDescription.textContent = jobValue
	closeModal(popupTypeEdit)
}

function openImagePopup(imageSrc, caption) {
	popupImageElement.src = imageSrc
	popupImageElement.alt = caption
	popupCaptionElement.textContent = caption

	openModal(popupImage)
}

function addCardSubmit(evt) {
	evt.preventDefault()

	const cardName = cardNameInput.value
	const imageUrl = imageUrlInput.value
	addNewCard(cardName, imageUrl).then(card => {
		const newCard = createCard(
			card._id,
			cardName,
			imageUrl,
			deleteCard,
			card.likes,
			setLikeToCard,
			openImagePopup,
			card.owner._id
		)
		addCard(newCard, true)
		addCardForm.reset()
		closeModal(newCardPopup)
	})
}

function addCard(cardElement, toStart) {
	if (toStart === true) {
		placesContainer.prepend(cardElement)
	} else {
		placesContainer.append(cardElement)
	}
}

Promise.all([getUserData(), getInitialsCards()])
	.then(([userData, initialCards]) => {
		currentUserId = userData._id
		profileTitle.textContent = userData.name
		profileDescription.textContent = userData.about
		profileImage.src = `${userData.avatar}`
		console.log(initialCards)
		initialCards.forEach(card => {
			const newCard = createCard(
				card._id,
				card.name,
				card.link,
				deleteCard,
				card.likes,
				setLikeToCard,
				openImagePopup,
				card.owner._id
				// currentUserId
			)
			addCard(newCard)
		})
	})
	.catch(error => console.log(error))

editProfileForm.addEventListener('submit', handleEditFormSubmit)
addCardForm.addEventListener('submit', addCardSubmit)
enableValidation(validationConfig)
