/**
 * Toast notification component
 */

let toastTimer = null

/**
 * Show a toast notification
 * @param {'success'|'error'|'info'} type
 * @param {string} title
 * @param {string} [subtitle]
 */
export function showToast(type, title, subtitle = '') {
  const el = document.getElementById('toast')
  if (!el) return

  const icons = { success: '✓', error: '✕', info: 'ℹ' }
  document.getElementById('toast-icon').textContent = icons[type] ?? 'ℹ'
  document.getElementById('toast-title').textContent = title
  document.getElementById('toast-sub').textContent = subtitle

  el.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => el.classList.remove('show'), 3500)
}

/**
 * Inject the toast HTML into the document body
 * Call once on app init
 */
export function mountToast() {
  const existing = document.getElementById('toast')
  if (existing) return

  const el = document.createElement('div')
  el.id = 'toast'
  el.className = 'toast'
  el.innerHTML = `
    <span class="toast-icon" id="toast-icon">✓</span>
    <div>
      <div class="toast-title" id="toast-title"></div>
      <div class="toast-sub" id="toast-sub"></div>
    </div>`
  document.body.appendChild(el)
}
