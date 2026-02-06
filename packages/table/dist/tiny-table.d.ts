import { AreaCell } from '@tiny/table-renderer';
import { Border } from '@tiny/table-renderer';
import { Cell } from '@tiny/table-renderer';
import { Col } from '@tiny/table-renderer';
import { ColHeader } from '@tiny/table-renderer';
import { default as default_2 } from '@tiny/table-renderer';
import { Formatter } from '@tiny/table-renderer';
import { Gridline } from '@tiny/table-renderer';
import { Range as Range_2 } from '@tiny/table-renderer';
import { Rect } from '@tiny/table-renderer';
import { Row } from '@tiny/table-renderer';
import { RowHeader } from '@tiny/table-renderer';
import { Style } from '@tiny/table-renderer';
import { ViewportCell } from '@tiny/table-renderer';

declare class Cells {
    _: IndexDataCell[];
    _indexes: Map<any, any>;
    _formulas: number[];
    _formulaParser: FormulaParser;
    _formatter: Formatter;
    constructor();
    formulaParser(v: FormulaParser): this;
    formatter(v: Formatter): this;
    load({ cells }: TableData): void;
    get(row: number, col: number): IndexDataCell | null;
    remove(row: number, col: number): this;
    set(row: number, col: number, cell: DataCell): void;
    private resetIndexes;
    private updateIndex;
    private addFormula;
    private resetFormulas;
}

declare type Changer = (value: DataCell) => void;

declare type CSSAttrs = {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    position?: string;
    [property: string]: any;
};

declare type DataCell = Cell;

declare type DataCellValue = string | number | null | undefined;

declare type DataCol = Col;

declare type DataCols = {
    len: number;
    [key: number]: DataCol;
};

declare type DataRow = Row;

declare type DataRows = {
    len: number;
    [key: number]: DataRow;
};

/**
 * new -> cellIndex -> rect -> target -> hide
 */
declare class Editor {
    _: HElement;
    _target: HElement | null;
    _rect: Rect | null;
    _value: DataCell;
    _visible: boolean;
    _moveChanger: MoveChanger;
    _changer: Changer;
    constructor(cssClass: String);
    get visible(): boolean;
    target(target: HElement): this;
    cellIndex(r: number, c: number): this;
    value(v: DataCell): this;
    changed(): void;
    rect(rect: Rect | null): this;
    show(): this;
    hide(): this;
    moveChanger(value: MoveChanger): this;
    changer(value: Changer): this;
}

declare class EventEmitter {
    _events: Map<any, any>;
    on(type: string, handler: Handler): this;
    off(type: string, handler?: Handler): this;
    emit(type: String, ...args: any): this;
}

declare type FormulaParser = (formula: string) => string | number;

export declare function h(tag: string | HTMLElement, className?: string | string[] | Object): HElement;

declare type Handler = (...args: any) => void;

export declare class HElement {
    _: HTMLElement;
    _data: Map<any, any>;
    constructor(tag: string | Node, className?: string | string[] | Object);
    element(): any;
    data(key: string): any;
    data(key: string, value: any): HElement;
    on(eventName: string, handler: (evt: any) => void): this;
    off(eventName: string, handler: (evt: any) => void): this;
    focus(): this;
    value(): string;
    value(v: string): HElement;
    textContent(v: string): this;
    html(v: string): this;
    addClass(...tokens: string[]): this;
    removeClass(...tokens: string[]): this;
    toggleClass(token: string): this;
    attr(key: string): string;
    attr(key: string, value: string): HElement;
    css(key: string): string;
    css(props: CSSAttrs): HElement;
    css(key: string, value: string): HElement;
    rect(): DOMRect;
    offset(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    computedStyle(): CSSStyleDeclaration;
    show(flag?: boolean): this;
    hide(): this;
    scrollx(): number;
    scrollx(value: number): HElement;
    scrolly(): number;
    scrolly(value: number): HElement;
    after(...nodes: (HElement | Node | string)[]): this;
    before(...nodes: (HElement | Node | string)[]): this;
    append(...nodes: (HElement | Node | string)[]): this;
    remove(...nodes: (HElement | Node)[]): void;
    contains(node: Node): boolean;
    cloneNode(): Node;
    get firstChild(): HElement | null;
}

declare type IndexDataCell = [number, number, DataCell];

declare type MoveChanger = (direction: MoveDirection_2) => void;

export declare type MoveDirection = 'up' | 'down' | 'left' | 'right';

declare type MoveDirection_2 = 'up' | 'down' | 'left' | 'right' | 'none';

declare class Overlayer {
    _areas: HElement[];
    _headerAreas: HElement[];
    _areaRects: Rect[];
    constructor(target: HElement);
    area(index: number): HElement;
    area(index: number, rect: Rect): Overlayer;
    headerArea(index: number): HElement;
    headerArea(index: number, rect: Rect): Overlayer;
    inAreas({ x, y, height, width }: Rect): boolean;
}

declare type Placement = 'all' | 'row-header' | 'col-header' | 'body';

declare class Resizer {
    _: HElement;
    _hover: HElement;
    _line: HElement;
    _type: ResizerType;
    _minValue: number;
    _lineLength: () => number;
    _cell: AreaCell | null;
    _change: (value: number, cell: AreaCell) => void;
    constructor(type: ResizerType, target: HElement, minValue: number, lineLength: () => number, change?: (value: number, cell: AreaCell) => void);
    show(cell: AreaCell): void;
    hide(): void;
}

declare type ResizerType = 'row' | 'col';

declare class Scrollbar {
    _: HElement;
    _content: HElement;
    _value: number;
    _maxValue: number;
    _lastOffset: number;
    _type: 'vertical' | 'horizontal';
    _change: ScrollbarChanger;
    constructor(type: 'vertical' | 'horizontal', target: HElement);
    get value(): number;
    change(value: ScrollbarChanger): this;
    scrollBy(value: number): Scrollbar;
    scrollToStart(): this;
    scrollToEnd(): this;
    scroll(): any;
    scroll(value: number): Scrollbar;
    resize(value: number, contentValue: number): this;
}

declare type ScrollbarChanger = ((direction: '+' | '-', value: number, event: Event) => void) | null;

declare class SelectArea {
    _: HElement;
    _rect: Rect | null;
    _target: HElement | null;
    constructor(classNameSuffix: string, show?: boolean);
    append(child: HElement): this;
    offset(): {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    rect(value: Rect): this;
    target(value: HElement, autoAppend?: boolean): this;
    show(): this;
    clear(): void;
}

declare class Selector {
    _placement: Placement;
    _editable: boolean;
    _ranges: Range_2[];
    _rowHeaderRanges: Range_2[];
    _colHeaderRanges: Range_2[];
    _areas: SelectArea[];
    _focus: [number, number];
    _focusRange: Range_2 | null;
    _focusArea: SelectArea | null;
    _move: [number, number];
    _copyRange: Range_2 | null | undefined;
    _copyAreas: SelectArea[];
    _autofillRange: Range_2 | null;
    _autofillAreas: SelectArea[];
    _autofillTrigger: (evt: any) => void;
    constructor(editable: boolean);
    get currentRange(): Range_2 | undefined;
    placement(value: Placement): this;
    focus(row: number, col: number, range: Range_2): this;
    move(row: number, col: number): this;
    autofillRange(range: Range_2 | null): this;
    autofillTrigger(trigger: (evt: any) => void): this;
    addRange(range: Range_2, clear?: boolean): this;
    updateLastRange(unionRange: (focusRange: Range_2) => Range_2): void;
    addAreaOutline(rect: Rect, target: HElement): void;
    addArea(rect: Rect, target: HElement): this;
    addRowHeaderArea(rect: Rect, target: HElement): this;
    addColHeaderArea(rect: Rect, target: HElement): this;
    addCopyArea(rect: Rect, target: HElement): this;
    addAutofillArea(rect: Rect, target: HElement): this;
    setFocusArea(rect: Rect, target: HElement): this;
    showCopy(): void;
    clearCopy(): void;
    clear(): void;
}

declare class Table {
    _rendererOptions: TableRendererOptions;
    _copyable: boolean;
    _editable: boolean;
    _minRowHeight: number;
    _minColWidth: number;
    _width: () => number;
    _height: () => number;
    _contentRect: Rect;
    _container: HElement;
    _data: TableData;
    _renderer: default_2;
    _cells: Cells;
    _vScrollbar: Scrollbar | null;
    _hScrollbar: Scrollbar | null;
    _rowResizer: Resizer | null;
    _colResizer: Resizer | null;
    _editor: Editor | null;
    _editors: Map<any, any>;
    _selector: Selector | null;
    _overlayer: Overlayer;
    _canvas: HElement;
    _emitter: EventEmitter;
    constructor(element: HTMLElement | string, width: () => number, height: () => number, options?: TableOptions);
    contentRect(): Rect;
    container(): HElement;
    resize(): void;
    freeze(ref: string): this;
    isMerged(): boolean;
    isMerged(ref: string): boolean;
    merge(): Table;
    merge(ref: string): Table;
    unmerge(): Table;
    unmerge(ref: string): Table;
    row(index: number): DataRow;
    row(index: number, value: Partial<DataRow>): Table;
    rowHeight(index: number): number;
    rowHeight(index: number, value: number): Table;
    rowsHeight(min: number, max: number): number;
    isLastRow(index: number): boolean;
    col(index: number): DataCol;
    col(index: number, value: Partial<DataCol>): Table;
    colWidth(index: number): number;
    colWidth(index: number, value: number): Table;
    colsWidth(min: number, max: number): number;
    isLastCol(index: number): boolean;
    formulaParser(v: FormulaParser): this;
    formatter(v: Formatter): this;
    style(index: number, withDefault?: boolean): Partial<Style>;
    addStyle(value: Partial<Style>): number;
    clearStyles(): this;
    addBorder(...value: Border): this;
    clearBorder(value: string): this;
    clearBorders(): this;
    cell(row: number, col: number): DataCell;
    cell(row: number, col: number, value: DataCell): Table;
    cellValue(row: number, col: number): DataCellValue;
    cellValueString(row: number, col: number): string;
    render(): this;
    data(): TableData;
    data(data: Partial<TableData>): Table;
    /**
     * copy data to ...
     * @param to
     * @param autofill
     */
    copy(to: string | Range_2 | Table | null, autofill?: boolean): this;
    /**
     * @param html <table><tr><td style="color: white">test</td></tr></table>
     * @param to A1 or B9
     */
    fill(html: string): Table;
    fill(html: string, to: string): Table;
    fill(arrays: DataCellValue[][]): Table;
    fill(arrays: DataCellValue[][], to: string): Table;
    /**
     * @param from A1:H12
     */
    toHtml(from: string): string;
    toArrays(from: string): DataCellValue[][];
    on(eventName: 'click' | 'contextmenu', handler: (cell: ViewportCell, evt: MouseEvent) => void): this;
    /**
     * @param type keyof cell.type
     * @param editor
     * @returns
     */
    addEditor(type: string, editor: Editor): this;
    static create(element: HTMLElement | string, width: () => number, height: () => number, options?: TableOptions): Table;
}
export default Table;

declare type TableData = {
    rows: DataRows;
    cols: DataCols;
    rowHeight: number;
    colWidth: number;
    scroll: [number, number, number, number];
    style: Style;
    styles: Partial<Style>[];
    borders: Border[];
    merges: string[];
    cells: IndexDataCell[];
    freeze?: string;
};

export declare type TableDataOptions = {
    rows?: number;
    cols?: number;
    rowHeight?: number;
    colWidth?: number;
};

export declare type TableOptions = {
    minRowHeight?: number;
    minColWidth?: number;
    scrollable?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    editable?: boolean;
    copyable?: boolean;
    data?: TableDataOptions;
    renderer?: TableRendererOptions;
};

export declare type TableRendererOptions = {
    style?: Partial<Style>;
    headerStyle?: Partial<Style>;
    rowHeader?: Partial<RowHeader>;
    colHeader?: Partial<ColHeader>;
    gridline?: Partial<Gridline>;
    headerGridline?: Partial<Gridline>;
    freeGridline?: Partial<Gridline>;
};

export { }
