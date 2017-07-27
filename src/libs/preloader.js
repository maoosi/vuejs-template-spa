/**
 * Utility class for pre-loading images and returning a promise.
 * Heavily influenced from https://github.com/zzarcon/walter.js/blob/master/dist/walter.js.
 *
 */

export default class Preloader {

    /**
     * Construct Preloader with a collection of images.
     *
     * @param  Array|String images
     * @return Promise
     */
    constructor (images) {
        // Force an images array
        images = typeof images === 'string' ? [images] : images

        // Filter out inline data (sometimes returned by url-loader)
        images = images.filter((img) => !img.startsWith('data'))

        // Collect an array of promises
        let promises = images.map((img) => this.preloadImage(img))

        // Return a single promise for all images
        return this.all(promises)
    }

    /**
     * Preload the given image and return a promise for completion.
     *
     * @return Promise
     */
    preloadImage (url) {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Instantiate image DOM element
            let img = new Image()

            // Resolve promise if image loads
            img.onload = () => resolve(img)

            // Set the src to given URL
            img.src = url

            // Reject promise if image fails to load
            img.onerror = reject
        })
    }

    /**
     * Return a single promise that resolves when entire promise collection has resolved.
     *
     * @param  Array   Collection of image promises from preLoadImage
     * @return Promise
     */
    all (promises) {
        // Collect some things
        let promisesToResolve = promises.length
        let resolvedPromises = 0
        let progressHandler = () => {}

        // Create a single promise
        let promise = new Promise((resolve, reject) => {
            // Instantiate loaded images array
            let images = []

            // Define callback for individual image promise fulfillment
            let onFulfillment = (img) => {
                // Fire the progress callback
                progressHandler(images.length, img)

                // Push loaded image into array
                images.push(img)

                // Increment resolved promises counter
                resolvedPromises++

                // All images complete, resolve this promise
                if (resolvedPromises === promisesToResolve) resolve(images)
            }

            // Loop image promises and attach callbacks
            promises.forEach((promise) => {
                promise.then(onFulfillment).catch(() => {
                    reject(promise)
                })
            })
        })

        // Assign progress handler
        promise.progress = (callback) => {
            progressHandler = callback
        }

        // Return our single promise
        return promise
    }

}
