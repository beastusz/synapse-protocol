/**
 * Modal system
 */

/**
 * Open a modal overlay by ID
 * @param {string} id
 */
export function openModal(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.classList.add('open')
}

/**
 * Close a modal overlay by ID
 * @param {string} id
 */
export function closeModal(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.classList.remove('open')
}

/**
 * Attach click-outside-to-close behaviour to all overlays
 * Call once on app init
 */
export function initModals() {
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id)
    })
  })
}
