import { ParserError, ParserValue, Test } from "../types";

export function testChar(test: Test, char: string, prev: ParserValue | undefined): boolean {
    switch (typeof test) {
        case 'string': {
            if (test !== char) {
                throw new ParserError('Invalid string', prev);
            }

            break;
        }

        case 'function': {
            if (!test(char)) {
                throw new ParserError('Invalid string', prev);
            }

            break;
        }

        default: {
            if (!test.test(char)) {
                throw new ParserError('Invalid string', prev);
            }
        }
    }

    return true;
}
