import { intoIter } from "../intoIter";

export function iterSeq<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
    let cursor = 0,
        iter = intoIter(iterables[cursor]);

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let chunk = iter.next();

            while(chunk.done) {
                cursor++;

                if (iterables[cursor] == null) {
                    return chunk;
                }

                iter = intoIter(iterables[cursor]);
                chunk = iter.next();
            }

            return chunk;
        }
    }
}
