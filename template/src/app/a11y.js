export const directive = (el, binding, vnode) => {
    // show or hide element for readers
    if (['show', 'hide'].includes(binding.arg)) {
        let hidden = (binding.arg === 'show' && binding.value === false) || (binding.arg === 'hide' && (binding.value === true || binding.value === undefined))
        el.setAttribute('aria-hidden', hidden ? 'true' : 'false')
        el.setAttribute('tabindex', hidden ? '-1' : '0')
    }

    // aria-hidden for readers
    if (['hidden'].includes(binding.arg)) {
        let hidden = (binding.value === true)
        el.setAttribute('aria-hidden', hidden ? 'true' : 'false')
    }

    // expanded or not for readers
    if (['expanded'].includes(binding.arg)) {
        el.setAttribute('aria-expanded', binding.value ? 'true' : 'false')
    }

    // label for readers
    if (['label'].includes(binding.arg)) {
        el.setAttribute('aria-label', binding.value)
    }
}
