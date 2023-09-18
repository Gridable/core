enum TokenType {
    Function,
    String,
    Number,
    Ref,
    Delimiter
}

'SUM(1; 2; 3)'
// [3, ';', 2, {value: ';', type: TokenType.Delimiter}, 1, 'SUM']

type Token = {
    value: string;
    type: TokenType;
}

interface Observable<Subscriber> {
    subscribe(s: Subscriber): void;
    unsubscribe(s: Subscriber): void;
}

interface Matrix2d<Value> {
    buffer: Array<Value>;
    get(x: number, y: number): Value;
    set(x: number, y: number, value: Value): void;
}

interface FormulaMetadata {
    formulaString: string;
    name: string;
    example: string;
}

interface CellFormat {

}

interface CellMetadata {
    isFormula: boolean;
    error: null | Error;
    formula: null | FormulaMetadata;
    format: CellFormat;
}

interface CellObject {
    metadata: CellMetadata;
    data: string;
}


interface TableCell extends Observable<TableCell> {
    metadata: CellMetadata;
    data: string;
    subscribers: Array<TableCell>;
    notify(data: string): void;
    update(cellData: CellObject): void;
}

interface EventEmitter {
    on(): void;
    off(): void;
    emit(): void;
}

type TableSheet = Matrix<TableCell>;

interface Table extends EventEmitter {
    data: Array<TableSheet>
    formulaParser: AbstractParser<string, InfixResult>;
    getData(): Array<TableSheet>;
    importData(data: Array<CellObject>): Array<TableSheet>;
}

class Cell {
    subscribers: Array<Cell> = []
    ctx: Table;

    constructor(ctx: Table) {
        this.ctx = ctx;
    }

    update(...data) {
        this.ctx.emit('cell-changed', newData);
        this.subscribers.forEach((cell) => cell.update(newData));
    }

    subscribe(cell: Cell) {
        this.subscribers.push(cell);
    }
}

interface AbstractParser<Value, Result> {
    parse(str: Value): Result;
}

interface AbstractEvaluator<ParserResult, EvalResult> {
    eval(data: ParserResult): EvalResult;
}

type InfixResult = Array<string | number>;
class InfixParser implements AbstractParser<string, InfixResult> {
    parse(str: string): InfixResult {
    }
}

class ASTParser implements AbstractParser<string, ASTResult> {}

class InfixEvaluator implements AbstractEvaluator<InfixResult, string> {

    constructor() {

    }


    eval(data: InfixResult): string {
    }
}
class ASTEvaluator implements AbstractEvaluator<ASTResult, string> {}

interface AbstractFormulaEngine {
    process(formula: string): string;
}

class Table {
    eventEmitter = {
        on() {},
        off() {},
        emit() {}
    };
    formulaParser: AbstractParser<string, InfixResult>;

    constructor() {
        this._initialize();
    }

    private _initialize() {
        this.eventEmitter.on('client:cell-changed', (code, data) => {
            this.cellContentChange(code, data);
        })
    }

    private cellContentChange(code, data) {
        const thisCell = this.getCell(code);
        if (data.isFormula) {
            const tokens = this.formulaParser.parse(data.value);
            tokens.forEach((token) => {
                if (token.type === 'ref') {
                    const cell = this.getCell(token.value);
                    cell.subscribe(thisCell);
                }
            })
        }
    }
}
