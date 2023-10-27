import { ParsedExp, TokenType } from "./types";

export class Calculator {

    constructor() {
    }

    calc(parsedExpression: ParsedExp) {

        const reqCalc = (token: ParsedExp) => {
            switch (token.type) {
                case TokenType.PROGRAM: {
                    if (token.children) break;
                    return reqCalc(token.children[0]);
                }
                case TokenType.NUMBER: {
                    return token.value;
                }
                case TokenType.CELL: {
                    if (!token.value) break;
                    return this.getCellValue(token.value);
                }
                case TokenType.EXP: {
                    if (!token.value) break;
                    return this.calcUseEval(
                        token.value,
                        token.children?.map((token) => reqCalc(token)),
                    );
                }
                case TokenType.FORMULA: {
                    if (!token.value) break;
                    return this.getExecutor(token.value)(
                        token.children?.map((token) => reqCalc(token)),
                    );
                }
            }
        }

        return reqCalc(parsedExpression);
    }

    private calcUseEval(operator: string, operands: string[]): string {// переписать на reduce
        const expStr = operands.join(operator);
        return eval(expStr).toString();
    }

    private getCellValue(cellId: string): string {
        return cellValuesTest[cellId];
    }

    private getExecutor(formulaName: string): Function {
        return formulasTest[formulaName];
    }
}

const cellValuesTest = {
    'A1': '11',
    'A2': '20',
    'B1': '3',
    'B2': '4',
    'C1': '5',
    'C2': '6',
};

const formulasTest = {
    'SUM': sumExecutor,
    'MUL': multiplyExecutor,
}

function sumExecutor(numbers: string[]): number {
    return numbers.reduce((acc, curr) => acc + Number(curr), 0);
}

function multiplyExecutor(numbers: string[]): number {
    return numbers.reduce((acc, curr) => acc * Number(curr), 1);
}
