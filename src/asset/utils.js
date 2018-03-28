export const throttle = (fn, delay) => {
    var timer = null
    var previous = 0
    return (event) => {
        if (timer || !this.props.select) {
            return false
        }
        fn.call(this, event)
        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
        }, delay);
    }
}

