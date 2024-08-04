const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
	headers: {
		authorization: '1209529c-725d-4138-ae50-5a1f694890e5',
		'Content-Type': 'application/json',
	},
}
const getResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка ${res.status}`)
}
export const getUserDataApi = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(getResponse)
}

export const getInitialsCardsApi = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(getResponse)
}

export const addNewCardApi = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name,
			link,
		}),
	}).then(getResponse)
}

export const editUserDataApi = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name,
			about,
		}),
	}).then(getResponse)
}

export const setLikeApi = (cardId, isLiked) => {
	const method = isLiked ? 'DELETE' : 'PUT'

	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method,
		headers: config.headers,
	}).then(getResponse)
}

export const deleteCardApi = cardId => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(getResponse)
}

export const updateAvatarApi = avatar => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar,
		}),
	}).then(getResponse)
}
