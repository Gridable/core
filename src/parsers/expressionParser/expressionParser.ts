import { tag, take } from "../../parsers-tools/parser-factories";
import { or, repeat, seq } from "../../parsers-tools/parser-combinators";
import { number } from "../numberParser";

enum TokenType {
    Function = 'FUNCTION',
    String = 'STRING',
    Number = 'NUMBER',
    Ref = 'REF',
    Delimiter = 'DELIMITER',
    FormulaName = 'FORMULA_NAME',
    Operator = 'OPERATOR',
    BracketOpen = 'BRACKET_OPEN',
    BracketClose = 'BRACKET_CLOSE'
}

const optSpace = take(' ', {min: 0});
const space = tag(' ');

const operator = take(/[\-+*/]/, {max: 1, token: TokenType.Operator});

const bracketOpen = tag('(', { token: TokenType.BracketOpen });
const bracketClose = tag(')', { token: TokenType.BracketClose });

const ref = seq(
    {
        token: TokenType.Ref,
        tokenValue(value) {
            return value.reduce((res, {value}) => res + value, '');
        }
    },
    take(/[A-Z]/, {max: 1}),
    take(/\d/),
    take(';', {min: 0})
);

const testExpStr = '=(8+A1)*4-3/2'

// - научиться парсить числа с плавающей точкой
function geExpressionPars(strLength: number) {
    return seq(
        optSpace,
        tag('='),
        optSpace,
        repeat(
            or( space, ref, bracketOpen, bracketClose, operator, number ),
            {max: strLength - 1}
        )
    );
}

//console.dir([...geExpressionPars(testExpStr.length)(testExpStr)], {depth: null});
