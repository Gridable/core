import { repeat } from "../repeat";
import { Parser, ParserOptions } from "../../types";

/**
 * принимает парсер и возвращает новый, который в случае выброса исключения исходным считает это штатной ситуацией
 * и не пробрасывает исключение далше
 */

export function opt<T = unknown, R = unknown>(parser: Parser<T, R>, opts?: ParserOptions<T>): Parser<T | T[], R[]> {
    return repeat(parser, {min: 0, max: 1, ...opts});
}
