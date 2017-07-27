/* eslint-disable padded-blocks */
export default class IOSFix {

    constructor (options = {}) {
        this.options = {
            target: options.target || document,
            doubleTapZoom: options.doubleTapZoom || true,
            overscroll: options.overscroll || true,
            overscrollExcl: options.overscrollExcl || []
        }

        this.target = typeof this.options.target === 'string'
            ? document.querySelector(this.options.target)
            : this.options.target

        this.eventsList = []
        this.eventsAttached = false
        this.fixed = false
        this.doubleTouchStartTimestamp = 0

        return this
    }

    fix () {
        if (!this.fixed) {
            if (this.options.doubleTapZoom) {
                this._disableDoubleTapZoom()
            }

            if (this.options.overscroll) {
                this._disableOverscroll()
            }

            this._addEvents()
            this.fixed = true
        }

        return this
    }

    unfix () {
        if (this.fixed) {
            this._removeEvents()
            this.eventsList = []
            this.fixed = false
        }

        return this
    }

    _addEvents () {
        if (!this.eventsAttached) {
            for (let i = 0; i < this.eventsList.length; i++) {
                let _e = this.eventsList[i]
                _e.targetElem.addEventListener(_e.eventType, _e.func, _e.opts || false)
            }

            this.eventsAttached = true
        }
    }

    _removeEvents () {
        if (this.eventsAttached) {
            for (let i = 0; i < this.eventsList.length; i++) {
                let _e = this.eventsList[i]
                _e.targetElem.removeEventListener(_e.eventType, _e.func, _e.opts || false)
            }

            this.eventsAttached = false
        }
    }

    _disableOverscroll () {
        let exclude = this.options.overscrollExcl
        this.scrolling = false

        this.eventsList.push({
            targetElem: this.target,
            eventType: 'touchmove',
            func: (e) => {
                e.preventDefault()
            },
            opts: { capture: true, passive: false }
        })

        for (let i = 0; i < exclude.length; i++) {
            let scrollable = this.target.querySelectorAll(exclude[i])

            for (let j = 0; j < scrollable.length; j++) {

                this.eventsList.push({
                    targetElem: scrollable[j],
                    eventType: 'touchstart',
                    func: (e) => {
                        if (!this.scrolling) {
                            this.scrolling = true

                            if (e.currentTarget.scrollTop === 0) {
                                e.currentTarget.scrollTop = 1
                            } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
                                e.currentTarget.scrollTop -= 1
                            }

                            this.scrolling = false
                        }
                    }
                })

                this.eventsList.push({
                    targetElem: scrollable[j],
                    eventType: 'touchmove',
                    func: (e) => {
                        e.stopPropagation()
                    }
                })

            }
        }
    }

    _disableDoubleTapZoom () {
        this.eventsList.push({
            targetElem: this.target,
            eventType: 'touchstart',
            func: (e) => {
                let now = +(new Date())
                if (now < this.doubleTouchStartTimestamp + 500) {
                    e.preventDefault()
                }
                this.doubleTouchStartTimestamp = now
            },
            opts: { capture: true, passive: false }
        })
    }

}
