export { clearValidation, enableValidation }
const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	validationConfig
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(validationConfig.inputErrorClass) //это инпут
	errorElement.textContent = errorMessage //это спан
	errorElement.classList.add(validationConfig.errorClass)
}

const hideInputError = (formElement, inputElement, validationConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(validationConfig.inputErrorClass)
	errorElement.classList.remove(validationConfig.errorClass)
	errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		)
	} else {
		hideInputError(formElement, inputElement, validationConfig)
	}
}

const setEventListeners = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
	toggleButtonState(inputList, buttonElement, validationConfig)
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', function() {
			checkInputValidity(formElement, inputElement, validationConfig)
			toggleButtonState(inputList, buttonElement, validationConfig)
		})
	})
}

const enableValidation = validationConfig => {
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	)
	formList.forEach(formElement => {
		formElement.addEventListener('submit', function(evt) {
			evt.preventDefault()
		})
		setEventListeners(formElement, validationConfig)
	})
}

const hasInvalidInput = (inputList, validationConfig) => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true
		buttonElement.classList.add(validationConfig.inactiveButtonClass)
	} else {
		buttonElement.disabled = false
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
	}
}

const clearValidation = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement, validationConfig)
	})
	toggleButtonState(inputList, buttonElement, validationConfig)
}
