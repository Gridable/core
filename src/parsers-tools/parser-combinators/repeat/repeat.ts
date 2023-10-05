import { intoBuffer, intoIter, iterSeq } from "../../iter-helpers";
import { Parser, ParserOptions } from "../../types";

/**
 * принимает парсер и возвращает новый, который зацикливает исходный заданное количество раз (квантификатор)
 */

interface RepeatOptions<T = unknown> extends ParserOptions<T>{
    min?: number;
    max?: number;
}

export function repeat<T = unknown, R = unknown>(parser: Parser<T, R>, opts: RepeatOptions<T> = {}): Parser<T | T[], R[]> {
    return function* (source, prev) {
        const {min = 1, max = Infinity} = opts;

        const value: unknown[] = [];

        let iter = intoIter(source),
            count = 0;

        outer: while (true) {
            const buffer: string[] = [],
                parsing = parser(intoBuffer(iter, buffer), prev);

            while (true) {
                if (count >= max) {
                    break outer;
                }

                try {
                    const chunk = parsing.next();

                    if (chunk.done) {
                        prev = chunk.value[0];
                        iter = iterSeq(chunk.value[1]);
                        value.push(prev);
                        count++;

                        break;

                    } else {
                        yield <any>chunk.value;
                    }
                } catch (err) {
                    if (count < min) {
                        throw err;
                    }

                    iter = buffer.length > 0 ? iterSeq(buffer, iter) : iter;
                    break outer;
                }
            }
        }

        if (opts.token && count > 0) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) || value
            }
        }

        const token = {
            type: 'REPEAT',
            value
        }

        return [token, iter];
    }
}
