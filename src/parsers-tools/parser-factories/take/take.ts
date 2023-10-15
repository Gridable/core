import { intoIter, iterSeq } from "../../iter-helpers";
import { testChar } from "../helpers";
import { Parser, ParserError, ParserOptions, ParserState, Test } from "../../types";

/**
 * фабрика создает парсер, который парсит данные под заданное регулярное выражение
 */

interface TakeOptions extends ParserOptions<string> {
    min?: number;
    max?: number;
}

export function take(test: Test, opts: TakeOptions = {}): Parser<string, string> {
    return function* (source, prev) {
        const {min = 1, max = Infinity, token} = opts;

        let iter = intoIter(source),
            count = 0,
            value = '';

        const buffer = [];

        while(true) {
            if (count >= max) {
                break;
            }

            let chunk = iter.next(),
                char = chunk.value;

            if (chunk.done) {
                if (count >= min) {
                    break;
                }

                const data = yield ParserState.EXPECT_NEW_INPUT;

                if (data == null) {
                    throw new ParserError('Invalid string', prev);
                }

                iter = intoIter(data);
                chunk = iter.next();
                char = chunk.value;
            }

            try {
                if (testChar(test, char, prev)) {
                    count++
                }
            } catch (err) {
                if (count < min) {
                    throw err;
                }

                buffer.push(char);
                break;
            }

            value += char;
        }

        if (token && count > 0) {
            yield {
                type: token,
                value: opts.tokenValue?.(value) ?? value
            }
        }

        const defToken = {
            type: 'TAKE',
            value
        }

        return [defToken, buffer.length > 0 ? iterSeq(buffer, iter) : iter];
    }
}
