let selectedTier = 'gruppo'

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

const form = document.getElementById('signup-form')
const confirmation = document.getElementById('signup-confirmation')

if (form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault()
		updateTierLabels()
		form.hidden = true
		if (confirmation) confirmation.hidden = false
	})
}
