import { intoIter } from "../intoIter";

export function intoBuffer<T>(iterable: Iterable<T>, buffer: T[]): IterableIterator<T> {
    const iter = intoIter(iterable);

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            const chunk = iter.next();

            if (!chunk.done) {
                buffer.push(chunk.value);
            }

            return chunk;
        }
    }
}
