import { createCard, deleteCard, setLikeToCard } from './components/card.js'
import { initialCards } from './components/cards.js'
import { closeModal, openModal } from './components/modal.js'
import './pages/index.css'

const placesContainer = document.querySelector('.places__list')
const editProfileForm = document.querySelector(
	'.popup__form[name="edit-profile"]'
)
const addCardForm = document.querySelector('.popup__form[name="new-place"]')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
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

profileEditButton.addEventListener('click', () => {
	popupInputTypeName.value = profileTitle.textContent
	popupInputTypeDescription.value = profileDescription.textContent
	openModal(popupTypeEdit)
})

profileAddButton.addEventListener('click', () => {
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
	const newCard = createCard(
		cardName,
		imageUrl,
		deleteCard,
		setLikeToCard,
		openImagePopup
	)

	addCard(newCard, true)
	addCardForm.reset()
	closeModal(newCardPopup)
}

function addCard(cardElement, toStart) {
	if (toStart === true) {
		placesContainer.prepend(cardElement)
	} else {
		placesContainer.append(cardElement)
	}
}

initialCards.forEach(card => {
	const newCard = createCard(
		card.name,
		card.link,
		deleteCard,
		setLikeToCard,
		openImagePopup
	)
	addCard(newCard)
})

editProfileForm.addEventListener('submit', handleEditFormSubmit)
addCardForm.addEventListener('submit', addCardSubmit)
