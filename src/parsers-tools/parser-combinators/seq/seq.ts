import { intoIter } from "../../iter-helpers";
import { Parser, ParserOptions } from "../../types";

/**
 * комбинатор принимает множество парсеров и возвращает новый, который вызывает
 * их последовательно с передачей данных от одного к другому
 */

function seq<T = unknown, R = unknown>(...parsers: Parser[]): Parser<T, R>;
function seq<T = unknown, R = unknown>(opts: ParserOptions, ...parsers: Parser[]): Parser<T, R>;

export function seq<T = unknown, R = unknown>(optsOrParser: ParserOptions | Parser, ...parsers: Parser[]): Parser {
    let opts: ParserOptions = {};

    if (typeof optsOrParser === 'function') {
        parsers.unshift(optsOrParser);

    } else {
        opts = optsOrParser;
    }

    return function* (source, prev) {
        const value: unknown[] = [];

        let iter = intoIter(source),
            data;

        for (const parser of parsers) {
            const parsing = parser(iter, prev);

            while (true) {
                const chunk = parsing.next();

                if (chunk.done) {
                    prev = chunk.value[0];
                    value.push(prev);

                    iter = intoIter(chunk.value[1]);
                    break;

                } else {
                    yield <any>chunk.value;
                }
            }
        }

        if (opts.token) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) || value
            }
        }

        const token = {
            type: 'SEQ',
            value
        }

        return [token, iter];
    }
}
