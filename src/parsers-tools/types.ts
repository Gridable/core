export type Test = string | RegExp | ((char: string) => boolean);

export enum ParserState {
    EXPECT_NEW_INPUT = 'EXPECT_NEW_INPUT'
}

export interface ParserToken<T = unknown> {
    type: string;
    value?: T;
}

export interface ParserValue<T = unknown> extends ParserToken {}

export type ParserResult<T = unknown> = [ParserValue, Iterable<string>];

export type Parser<T = unknown, R = unknown> = (iterable: Iterable<string>, prev?: ParserValue) =>
    Generator<ParserState | ParserToken<T>, ParserResult<R>, Iterable<string | undefined>>

export interface ParserOptions<T = unknown> {
    token?: string;
    tokenValue?(unknown): T;
}

export class ParserError extends Error {
    prev: ParserValue | undefined;

    constructor(message: string, prev: ParserValue | undefined) {
        super(message);
        this.prev = prev;
    }

}
