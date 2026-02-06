export declare type Align = 'left' | 'right' | 'center';

export declare class Area {
    readonly range: Range_2;
    readonly x: number;
    readonly y: number;
    width: number;
    height: number;
    readonly rowHeight: (index: number) => number;
    readonly colWidth: (index: number) => number;
    rowMap: Map<number, {
        y: number;
        height: number;
    }>;
    colMap: Map<number, {
        x: number;
        width: number;
    }>;
    constructor(range: Range_2, x: number, y: number, width: number, height: number, rowHeight: (index: number) => number, colWidth: (index: number) => number);
    /**
     * check whether or not x contained in area
     * @param {int} x offset on x-axis
     */
    containsx(x: number): boolean;
    /**
     * check whether or not y contained in area
     * @param {int} y offset on y-axis
     */
    containsy(y: number): boolean;
    contains(x: number, y: number): boolean;
    eachRow(cb: (index: number, y: number, height: number) => void): void;
    eachCol(cb: (index: number, x: number, width: number) => void): void;
    each(cb: (row: number, col: number, rect: Rect) => void): void;
    rectRow(startRow: number, endRow: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    rectCol(startCol: number, endCol: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    rect(r: Range_2): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    cellAtCache: AreaCell | null;
    cellAt(x: number, y: number): AreaCell;
    static create(startRow: number, startCol: number, endRow: number, endCol: number, x: number, y: number, width: number, height: number, rowHeight: (index: number) => number, colWidth: (index: number) => number): Area;
}

export declare type AreaCell = {
    row: number;
    col: number;
} & Rect;

export declare type Border = [string, BorderType, BorderLineStyle, string];

export declare type BorderLine = {
    left?: [BorderLineStyle, string];
    top?: [BorderLineStyle, string];
    right?: [BorderLineStyle, string];
    bottom?: [BorderLineStyle, string];
};

export declare type BorderLineStyle = 'thin' | 'medium' | 'thick' | 'dashed' | 'dotted';

export declare type BorderType = 'all' | 'inside' | 'horizontal' | 'vertical' | 'outside' | 'left' | 'top' | 'right' | 'bottom';

export declare class Canvas {
    readonly target: HTMLCanvasElement;
    _target: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;
    _scale: number;
    constructor(target: HTMLCanvasElement, scale: number);
    size(width: number, height: number): this;
    prop(values: Partial<Properties>): Canvas;
    prop(key: keyof Properties): any;
    prop(key: keyof Properties, value: any): Canvas;
    measureTextWidth(text: string): number;
    line(x1: number, y1: number, x2: number, y2: number): this;
    clearRect(x: number, y: number, width: number, height: number): this;
    fillRect(x: number, y: number, width: number, height: number): this;
    strokeRect(x: number, y: number, width: number, height: number): this;
    fillText(text: string, x: number, y: number, maxWidth?: number): this;
    strokeText(text: string, x: number, y: number, maxWidth?: number): this;
    measureText(text: string): TextMetrics;
    getLineDash(): number[];
    setLineDash(segments: number[]): this;
    createLinearGradient(x0: number, y0: number, x: number, y: number): CanvasGradient;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    createPattern(image: CanvasImageSource, repetition: string): CanvasPattern | null;
    beginPath(): this;
    closePath(): this;
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): this;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): this;
    rect(x: number, y: number, width: number, height: number): this;
    roundRect(x: number, y: number, width: number, height: number, radius: number): this;
    fill(fillRule?: CanvasFillRule): this;
    stroke(): this;
    clip(fillRule?: CanvasFillRule): this;
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInStroke(x: number, y: number): boolean;
    getTransform(): DOMMatrix;
    rotate(angle: number): this;
    scale(x: number, y: number): this;
    translate(x: number, y: number): this;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): this;
    drawImage(image: CanvasImageSource, dx: number, dy: number): this;
    createImageData(width: number, height: number): ImageData;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    putImageData(imageData: ImageData, dx: number, dy: number): this;
    save(): this;
    restore(): this;
}

export declare type Cell = {
    value?: string | number;
    type?: string;
    style?: number;
    format?: string;
    formula?: string;
    [property: string]: any;
} | string | number | null | undefined;

export declare type CellGetter = (rowIndex: number, colIndex: number) => Cell;

export declare type CellRenderer = (canvas: Canvas, rect: Rect, cell: Cell, text: string) => boolean;

export declare type Col = {
    width: number;
    hide?: boolean;
    autoFit?: boolean;
    style?: number;
};

export declare type ColGetter = (index: number) => Col | undefined;

export declare type ColHeader = {
    height: number;
    rows: number;
    cell: CellGetter;
    cellRenderer?: CellRenderer;
    merges?: string[];
};

export declare type ColWidthGetter = (index: number) => number;

declare type CompositingProperties = {
    globalAlpha: number;
    globalCompositeOperation: string;
};

export declare function eachRanges(refs: string[], cb: (range: Range_2) => void): void;

export declare function expr2expr(expr: string, xn: number, yn: number): string;

export declare function expr2xy(expr: string): [number, number];

declare type FillStrokeProperties = {
    fillStyle: string;
    strokeStyle: string;
};

export declare function findRanges(refs: string[], filter: (it: Range_2) => boolean): Range_2 | null;

export declare type Formatter = (value: string, format?: string) => string;

export declare type Gridline = {
    width: number;
    color: string;
    style?: GridlineStyle;
};

export declare type GridlineStyle = 'solid' | 'dashed' | 'dotted';

declare type LineProperties = {
    lineWidth: number;
    lineCap: 'butt' | 'round' | 'square';
    lineJoin: 'round' | 'bevel' | 'miter';
    miterLimit: number;
    lineDashOffset: number;
};

declare type Properties = LineProperties & TextProperties & FillStrokeProperties & ShadowProperties & CompositingProperties;

/**
 * the range spendColfied by a start position and an end position,
 * the smallest range must contain at least one cell.
 * Range is not a merged cell, but it can be merged as a single cell
 * @author myliang
 */
declare class Range_2 {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    /**
     * @param startRow index of row of the start position
     * @param startCol index of col of the start position
     * @param endRow index of row of the end position
     * @param endCol index of col of the end position
     */
    constructor(startRow: number, startCol: number, endRow: number, endCol: number);
    get start(): [number, number];
    get end(): [number, number];
    get rows(): number;
    get cols(): number;
    get multiple(): boolean;
    /**
     * check whether or not the row-index contained in the row of range
     * @param {int} index
     * @returns {boolean}
     */
    containsRow(index: number): boolean;
    /**
     * check whether or not the index contained in the col of range
     * @param {int} index
     * @returns {boolean}
     */
    containsCol(index: number): boolean;
    /**
     * check whether or not the range contains a cell position(row, col)
     * @param {int} row row-index
     * @param {int} col col-index
     * @returns {boolean}
     */
    contains(row: number, col: number): boolean;
    /**
     * check whether or not the range within the other range
     * @param {Range} other
     * @returns {boolean}
     */
    within(other: Range_2): boolean;
    position(other: Range_2): "left" | "right" | "up" | "down" | "none";
    intersectsRow(startRow: number, endRow: number): boolean;
    intersectsCol(startCol: number, endCol: number): boolean;
    /**
     * check whether or not the range intersects the other range
     * @param {Range} other
     * @returns {boolean}
     */
    intersects({ startRow, startCol, endRow, endCol }: Range_2): boolean;
    /**
     * the self intersection the other resulting in the new range
     * @param {Range} other
     * @returns {Range} the new range
     */
    intersection(other: Range_2): Range_2;
    /**
     * the self union the other resulting in the new range
     * @param {Range} other
     * @returns {Range} the new range
     */
    union(other: Range_2): Range_2;
    difference(other: Range_2): Range_2[];
    touches(other: Range_2): boolean;
    /**
     * @param {Function} cb (row) => {}
     * @returns this
     */
    eachRow(cb: (index: number) => void): Range_2;
    eachRow(cb: (index: number) => void, max: number): Range_2;
    /**
     * @param {Function} cb (col) => {}
     * @returns this
     */
    eachCol(cb: (index: number) => void): Range_2;
    eachCol(cb: (index: number) => void, max: number): Range_2;
    /**
     * @param {Function} cb (rowIndex, colIndex) => {}
     * @returns this
     */
    each(cb: (rowIndex: number, colIndex: number) => void): Range_2;
    clone(): Range_2;
    toString(): string;
    equals(other: Range_2): boolean;
    static create(row: number, col: number): Range_2;
    static create(row: number, col: number, row1: number, col1: number): Range_2;
    static with(ref: string): Range_2;
}
export { Range_2 as Range }

export declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export declare type Row = {
    height: number;
    hide?: boolean;
    autoFit?: boolean;
    style?: number;
};

export declare type RowGetter = (index: number) => Row | undefined;

export declare type RowHeader = {
    width: number;
    cols: number;
    cell: CellGetter;
    cellRenderer?: CellRenderer;
    merges?: string[];
};

export declare type RowHeightGetter = (index: number) => number;

declare type ShadowProperties = {
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
};

export declare function stringAt(index: number): string;

export declare type Style = {
    bgcolor?: string;
    color: string;
    align: Align;
    valign: VerticalAlign;
    textwrap: boolean;
    underline: boolean;
    strikethrough: boolean;
    bold: boolean;
    italic: boolean;
    fontSize: number;
    fontFamily: string;
    rotate?: number;
    padding?: [number, number];
};

/**
 * ----------------------------------------------------------------
 * |            | column header                                   |
 * ----------------------------------------------------------------
 * |            |                                                 |
 * | row header |              body                               |
 * |            |                                                 |
 * ----------------------------------------------------------------
 * row { height, hide, autoFit }
 * col { width, hide, autoFit }
 * cell {
 *   value,
 *   style: {
 *     border, fontSize, fontName,
 *     bold, italic, color, bgcolor,
 *     align, valign, underline, strike,
 *     rotate, textwrap, padding,
 *   },
 *   type: text | button | link | checkbox | radio | list | progress | image | imageButton | date
 * }
 */
declare class TableRenderer {
    _target: HTMLCanvasElement;
    _bgcolor: string;
    _width: number;
    _height: number;
    _scale: number;
    _rows: number;
    _cols: number;
    _rowHeight: number;
    _colWidth: number;
    _startRow: number;
    _startCol: number;
    _scrollRows: number;
    _scrollCols: number;
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    _row: RowGetter;
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    _col: ColGetter;
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    _cell: CellGetter;
    _cellRenderer: CellRenderer;
    _formatter: Formatter;
    _merges: string[];
    _borders: Border[];
    _styles: Partial<Style>[];
    _gridline: Gridline;
    _style: Style;
    _rowHeader: RowHeader;
    _colHeader: ColHeader;
    _headerGridline: Gridline;
    _headerStyle: Style;
    _freeze: [number, number];
    _freezeGridline: Gridline;
    _viewport: Viewport | null;
    constructor(container: string | HTMLCanvasElement, width: number, height: number);
    render(): this;
    bgcolor(value: string): this;
    width(value: number): this;
    height(value: number): this;
    scale(value: number): this;
    rows(value: number): this;
    cols(value: number): this;
    rowHeight(value: number): this;
    colWidth(value: number): this;
    startRow(value: number): this;
    startCol(value: number): this;
    scrollRows(value: number): this;
    scrollCols(value: number): this;
    row(value: RowGetter): this;
    col(value: ColGetter): this;
    cell(value: (rowIndex: number, colIndex: number) => Cell): this;
    cellRenderer(value: CellRenderer): this;
    formatter(value: Formatter): this;
    merges(value: string[]): this;
    styles(value: Partial<Style>[]): this;
    borders(value: Border[]): this;
    gridline(value?: Partial<Gridline>): this;
    style(value?: Partial<Style>): this;
    rowHeader(value?: Partial<RowHeader>): this;
    colHeader(value?: Partial<ColHeader>): this;
    headerGridline(value?: Partial<Gridline>): this;
    headerStyle(value?: Partial<Style>): this;
    freeze(ref?: string): this;
    freezeGridline(value?: Partial<Gridline>): this;
    rowHeightAt(index: number): number;
    colWidthAt(index: number): number;
    get viewport(): Viewport | null;
    static create(container: string | HTMLCanvasElement, width: number, height: number): TableRenderer;
}
export default TableRenderer;

export declare type TextLineType = 'underline' | 'strikethrough';

declare type TextProperties = {
    font: string;
    textAlign: 'start' | 'end' | 'left' | 'right' | 'center';
    textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
    direction: 'ltr' | 'rtl' | 'inherit';
};

export declare type VerticalAlign = 'top' | 'bottom' | 'middle';

export declare class Viewport {
    /**
     * [area1, area2, area3, area4]
     * -----------------------
     * |  area-2   |   area-1
     * |-----------|----------
     * |  area-3   |   area-4
     * -----------------------
     */
    areas: Area[];
    /**
     * [area1, area21, area23, area3]
     *             |   area-21   | area-1
     * ------------|-----------------------
     *   area-23   |   body
     * ------------|
     *   area-3    |
     */
    headerAreas: Area[];
    _render: TableRenderer;
    constructor(render: TableRenderer);
    inAreas(row: number, col: number): boolean;
    cellAt(x: number, y: number): ViewportCell | null;
}

export declare type ViewportCell = {
    placement: 'all' | 'row-header' | 'col-header' | 'body';
} & AreaCell;

export declare function xy2expr(x: number, y: number): string;

export { }
