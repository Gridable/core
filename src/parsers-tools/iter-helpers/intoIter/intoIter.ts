/**
 * функция для зациты от ситуации если есть итератор, но он по какимто причинам не является iterable
 */
export function intoIter<T>(iterable: Iterable<T>): IterableIterator<T> {
    return intoIterableIterator(iterable[Symbol.iterator]());
}

function intoIterableIterator<T>(iter: Iterator<T>): IterableIterator<T> {
    if (typeof iter[Symbol.iterator] === 'function') {
        return <any>iter;
    }

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            return iter.next();
        }
    }
}
