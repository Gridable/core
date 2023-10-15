import { intoBuffer, intoIter, iterSeq } from "../../iter-helpers";
import { Parser, ParserError, ParserOptions, ParserState, ParserToken } from "../../types";

/**
 * принимает множество парсеров и возвращает новый, который вызывает последующие парсеры,
 * только если предидущий выбросил исключение
 */

export function or(optsOrParser: ParserOptions | Parser, ...parsers: Parser[]): Parser {
    let opts: ParserOptions = {};

    if (typeof optsOrParser === 'function') {
        parsers.unshift(optsOrParser);
    } else {
        opts = optsOrParser;
    }

    return function* (source, prev) {
        const yields: ParserToken[] = [];

        let value,
            done = false,
            iter: Iterable<any> = intoIter(source);

        outer: for (const parser of parsers) {
            const buffer = [],
                parsing = parser(intoBuffer(iter, buffer), prev);

            while (true) {
                try {
                    const chunk = parsing.next();

                    if (chunk.done) {
                        done = true;
                        value = chunk.value[0];
                        iter = intoIter(chunk.value[1]);
                        break outer;

                    } else {
                        if (chunk.value === ParserState.EXPECT_NEW_INPUT) {
                            yield chunk.value;
                        } else {
                            yields.push(<any>chunk.value);
                        }
                    }

                } catch (err) {
                    iter = buffer.length > 0 ? iterSeq(buffer, iter) : iter;
                    yields.splice(0, yields.length);
                    break;
                }
            }
        }

        if (!done) {
            throw new ParserError('Invalid data', prev);
        }

        yield* yields;

        if (opts.token) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) ?? value
            }
        }

        const token = {
            type: 'OR',
            value
        }

        return [token, iter];
    }
}
