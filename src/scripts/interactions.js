let selectedTier = null

const tierButtons = document.querySelectorAll('[data-tier]')
const selectedTierLabel = document.getElementById('selected-tier-label')
const confirmationTierLabel = document.getElementById('confirmation-tier-label')

function updateTierLabels() {
	const button = document.querySelector(`[data-tier="${selectedTier}"]`)
	const label = button?.dataset.label
	if (!label) return
	if (selectedTierLabel) selectedTierLabel.textContent = label
	if (confirmationTierLabel) confirmationTierLabel.textContent = label
}

tierButtons.forEach((button) => {
	button.addEventListener('click', () => {
		selectedTier = button.dataset.tier
		tierButtons.forEach((b) => {
			const isSelected = b === button
			b.classList.toggle('is-selected', isSelected)
			b.setAttribute('aria-pressed', String(isSelected))
		})
		updateTierLabels()
	})
})

const GOOGLE_FORM_URL =
	'https://docs.google.com/forms/d/e/1FAIpQLSfYgIb8FAjIY7HE80E199N12MEwaKyRa2meLCU-84V7Y1oweQ/formResponse'

const PLAN_VALUES = {
	prova: 'Prova (2 pz) — 4,99€',
	gruppo: 'Gruppo (6 pz) — 9,99€',
	festa: 'Festa (12 pz) — 16,99€',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Lightweight bot deterrents: a hidden "website" field real visitors never see or fill
// (bots that auto-fill every field do), and a minimum time between the form appearing and
// being submitted (bots tend to submit near-instantly). Neither is sent to Google Forms —
// tripping either one just fakes the success state instead of actually submitting, so
// scripted retries stop without the submission ever going through.
const MIN_SUBMIT_MS = 1500
const formLoadedAt = Date.now()

const form = document.getElementById('signup-form')
const confirmation = document.getElementById('signup-confirmation')
const emailInput = document.getElementById('signup-email')
const consentCheckbox = document.getElementById('signup-consent')
const honeypotInput = document.getElementById('signup-website')
const errorMessage = document.getElementById('signup-error')

function showError(key) {
	if (!errorMessage) return
	errorMessage.textContent = errorMessage.dataset[key] ?? ''
	errorMessage.hidden = false
}

function clearError() {
	if (!errorMessage) return
	errorMessage.hidden = true
}

emailInput?.addEventListener('input', clearError)
consentCheckbox?.addEventListener('change', clearError)
tierButtons.forEach((button) => button.addEventListener('click', clearError))

if (form) {
	form.addEventListener('submit', async (event) => {
		event.preventDefault()

		const email = emailInput?.value.trim() ?? ''
		if (!EMAIL_RE.test(email)) {
			showError('errorEmail')
			emailInput?.focus()
			return
		}
		if (!selectedTier) {
			showError('errorTier')
			return
		}
		if (!consentCheckbox?.checked) {
			showError('errorConsent')
			consentCheckbox?.focus()
			return
		}

		clearError()

		const looksLikeBot = Boolean(honeypotInput?.value) || Date.now() - formLoadedAt < MIN_SUBMIT_MS
		if (looksLikeBot) {
			updateTierLabels()
			form.hidden = true
			if (confirmation) confirmation.hidden = false
			return
		}

		updateTierLabels()

		const body = new URLSearchParams({
			'entry.178072810': email,
			'entry.1621740816': consentCheckbox.checked ? 'Acconsento' : '',
			'entry.1476714416': PLAN_VALUES[selectedTier] ?? '',
		})

		try {
			await fetch(GOOGLE_FORM_URL, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body,
			})
			form.hidden = true
			if (confirmation) confirmation.hidden = false
		} catch (err) {
			console.error('CIUFF signup submission failed', err)
		}
	})
}
