const Y = "tiny-table";
function ct(s) {
  const t = document.createDocumentFragment();
  return s.forEach((e) => {
    let r;
    e instanceof Q ? r = e._ : typeof e == "string" ? r = document.createTextNode(e) : r = e, t.appendChild(r);
  }), t;
}
class Q {
  _;
  _data = /* @__PURE__ */ new Map();
  constructor(t, e) {
    if (this._ = t instanceof Node ? t : document.createElement(t), e)
      if (typeof e == "string")
        this._.className = e;
      else if (Array.isArray(e))
        this._.className = e.join(" ");
      else
        for (let [r, o] of Object.entries(e))
          o && this._.classList.add(r);
  }
  element() {
    return this._;
  }
  data(t, e) {
    return e ? (this._data.set(t, e), this) : this._data.get(t);
  }
  on(t, e) {
    const [r, ...o] = t.split(".");
    return this._.addEventListener(r, e), this;
  }
  off(t, e) {
    return this._.removeEventListener(t, e), this;
  }
  focus() {
    return this._.focus(), this;
  }
  value(t) {
    return t !== void 0 ? (this._.value = t, this) : this._.value;
  }
  textContent(t) {
    return this._.textContent = t, this;
  }
  html(t) {
    return this._.innerHTML = t, this;
  }
  addClass(...t) {
    return this._.classList.add(...t), this;
  }
  removeClass(...t) {
    return this._.classList.remove(...t), this;
  }
  toggleClass(t) {
    const { classList: e } = this._;
    return e.contains(t) ? e.remove(t) : e.add(t), this;
  }
  attr(t, e) {
    return e ? (this._.setAttribute(t, e), this) : this._.getAttribute(t);
  }
  css(t, e) {
    const { style: r } = this._;
    return e ? (r.setProperty(t, e), this) : typeof t == "string" ? r.getPropertyValue(t) : (Object.keys(t).forEach((o) => {
      let i = t[o];
      typeof i == "number" && (i = `${i}px`), r.setProperty(o, i);
    }), this);
  }
  rect() {
    return this._.getBoundingClientRect();
  }
  offset() {
    const { _: t } = this;
    return {
      x: t.offsetLeft,
      y: t.offsetTop,
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  }
  computedStyle() {
    return window.getComputedStyle(this._);
  }
  show(t = !0) {
    return this.css("display", t ? "block" : "none"), this;
  }
  hide() {
    return this.css("display", "none"), this;
  }
  scrollx(t) {
    const { _: e } = this;
    return t !== void 0 ? (e.scrollLeft = t, this) : e.scrollLeft;
  }
  scrolly(t) {
    const { _: e } = this;
    return t !== void 0 ? (e.scrollTop = t, this) : e.scrollTop;
  }
  after(...t) {
    return this._.after(ct(t)), this;
  }
  before(...t) {
    return this._.before(ct(t)), this;
  }
  append(...t) {
    return this._.append(ct(t)), this;
  }
  remove(...t) {
    t.forEach((e) => {
      this._.removeChild(e instanceof Q ? e._ : e);
    });
  }
  contains(t) {
    return this._.contains(t);
  }
  cloneNode() {
    return this._.cloneNode(!0);
  }
  get firstChild() {
    const t = this._.firstChild;
    return t ? new Q(t) : null;
  }
}
function O(s, t) {
  return new Q(s, t);
}
function j() {
  return O("div", `${Y}-overlayer-area`);
}
class Ft {
  _areas;
  _headerAreas;
  _areaRects = [];
  constructor(t) {
    this._areas = [j(), j(), j(), j()], this._headerAreas = [
      j(),
      j(),
      j(),
      j()
    ], t.append(...this._areas, ...this._headerAreas);
  }
  area(t, e) {
    if (e) {
      this._areaRects[t] = e;
      const { x: r, y: o, height: i, width: n } = e;
      return this._areas[t].css({ left: r, top: o, width: n, height: i }), this;
    }
    return this._areas[t];
  }
  headerArea(t, e) {
    if (e) {
      const { x: r, y: o, height: i, width: n } = e;
      this._headerAreas[t].css({ left: r, top: o, width: n, height: i });
    }
    return this._headerAreas[t];
  }
  inAreas({ x: t, y: e, height: r, width: o }) {
    const i = t + o, n = e + r;
    for (let l of this._areaRects)
      if (t >= 0 && i <= l.width && e >= 0 && n <= l.height)
        return !0;
    return !1;
  }
}
const ut = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Kt(s) {
  return ut.charAt(s % ut.length);
}
function Wt(s) {
  const t = [];
  for (; s >= 0; )
    t.push(Kt(s)), s = parseInt(s / ut.length + "", 10) - 1;
  return t.reverse().join("");
}
function Gt(s) {
  let t = 0;
  for (let e = 0; e < s.length; e++)
    t = 26 * t + s.charCodeAt(e) - 64;
  return t - 1;
}
function q(s) {
  let t = "", e = "";
  for (let r = 0; r < s.length; r += 1)
    s.charAt(r) >= "0" && s.charAt(r) <= "9" ? e += s.charAt(r) : t += s.charAt(r).toUpperCase();
  return [Gt(t), parseInt(e, 10) - 1];
}
function tt(s, t) {
  return `${Wt(s)}${t + 1}`;
}
function gt(s, t, e) {
  const [r, o] = q(s);
  return tt(r + t, o + e);
}
class qt {
  constructor(t, e) {
    this.target = t;
    const r = t.getContext("2d");
    if (!r) throw new Error("getContext(2d) is null");
    this._ctx = r, this._scale = e, this._target = t;
  }
  _target;
  _ctx;
  _scale;
  size(t, e) {
    const { _target: r, _scale: o } = this;
    r.style.width = `${t}px`, r.style.height = `${e}px`;
    const i = window.devicePixelRatio;
    return r.width = Math.floor(t * i), r.height = Math.floor(e * i), this._ctx.scale(i * o, i * o), this;
  }
  prop(t, e) {
    return e ? (this._ctx[t] = e, this) : typeof t == "string" ? this._ctx[t] : (Object.entries(t).forEach(([r, o]) => {
      o != null && (this._ctx[r] = o);
    }), this);
  }
  measureTextWidth(t) {
    return this.measureText(t).width;
  }
  // draw line
  line(t, e, r, o) {
    return this.moveTo(t, e).lineTo(r, o).stroke(), this;
  }
  // Drawing rectangles
  clearRect(t, e, r, o) {
    return this._ctx.clearRect(t, e, r, o), this;
  }
  fillRect(t, e, r, o) {
    return this._ctx.fillRect(t, e, r, o), this;
  }
  strokeRect(t, e, r, o) {
    return this._ctx.strokeRect(t, e, r, o), this;
  }
  // Drawing text
  fillText(t, e, r, o) {
    return this._ctx.fillText(t, e, r, o), this;
  }
  strokeText(t, e, r, o) {
    return this._ctx.strokeText(t, e, r, o), this;
  }
  measureText(t) {
    return this._ctx.measureText(t);
  }
  // Line styles
  getLineDash() {
    return this._ctx.getLineDash();
  }
  setLineDash(t) {
    return this._ctx.setLineDash(t), this;
  }
  // Gradients and patterns
  createLinearGradient(t, e, r, o) {
    return this._ctx.createLinearGradient(t, e, r, o);
  }
  createRadialGradient(t, e, r, o, i, n) {
    return this._ctx.createRadialGradient(t, e, r, o, i, n);
  }
  createPattern(t, e) {
    return this._ctx.createPattern(t, e);
  }
  // Paths
  beginPath() {
    return this._ctx.beginPath(), this;
  }
  closePath() {
    return this._ctx.closePath(), this;
  }
  moveTo(t, e) {
    return this._ctx.moveTo(t, e), this;
  }
  lineTo(t, e) {
    return this._ctx.lineTo(t, e), this;
  }
  bezierCurveTo(t, e, r, o, i, n) {
    return this._ctx.bezierCurveTo(t, e, r, o, i, n), this;
  }
  quadraticCurveTo(t, e, r, o) {
    return this._ctx.quadraticCurveTo(t, e, r, o), this;
  }
  arc(t, e, r, o, i, n) {
    return this._ctx.arc(t, e, r, o, i, n), this;
  }
  arcTo(t, e, r, o, i) {
    return this._ctx.arcTo(t, e, r, o, i), this;
  }
  ellipse(t, e, r, o, i, n, l, h) {
    return this._ctx.ellipse(
      t,
      e,
      r,
      o,
      i,
      n,
      l,
      h
    ), this;
  }
  rect(t, e, r, o) {
    return this._ctx.rect(t, e, r, o), this;
  }
  roundRect(t, e, r, o, i) {
    return this.beginPath().moveTo(t + i, e).arcTo(t + r, e, t + r, e + o, i).arcTo(t + r, e + o, t, e + o, i).arcTo(t, e + o, t, e, i).arcTo(t, e, t + r, e, i).closePath(), this;
  }
  // Drawing paths
  fill(t) {
    return this._ctx.fill(t), this;
  }
  stroke() {
    return this._ctx.stroke(), this;
  }
  clip(t) {
    return this._ctx.clip(t), this;
  }
  isPointInPath(t, e, r) {
    return this._ctx.isPointInPath(t, e, r);
  }
  isPointInStroke(t, e) {
    return this._ctx.isPointInStroke(t, e);
  }
  // Transformations
  getTransform() {
    return this._ctx.getTransform();
  }
  rotate(t) {
    return this._ctx.rotate(t), this;
  }
  scale(t, e) {
    return this._ctx.scale(t, e), this;
  }
  translate(t, e) {
    return this._ctx.translate(t, e), this;
  }
  setTransform(t, e, r, o, i, n) {
    return this._ctx.setTransform(t, e, r, o, i, n), this;
  }
  // Drawing images
  drawImage(t, e, r) {
    return this._ctx.drawImage(t, e, r), this;
  }
  // Pixel manipulation
  createImageData(t, e) {
    return this._ctx.createImageData(t, e);
  }
  getImageData(t, e, r, o) {
    return this._ctx.getImageData(t, e, r, o);
  }
  putImageData(t, e, r) {
    return this._ctx.putImageData(t, e, r), this;
  }
  // The canvas state
  save() {
    return this._ctx.save(), this;
  }
  restore() {
    return this._ctx.restore(), this;
  }
}
class x {
  /**
   * @param startRow index of row of the start position
   * @param startCol index of col of the start position
   * @param endRow index of row of the end position
   * @param endCol index of col of the end position
   */
  constructor(t, e, r, o) {
    this.startRow = t, this.startCol = e, this.endRow = r, this.endCol = o;
  }
  get start() {
    return [this.startRow, this.startCol];
  }
  get end() {
    return [this.endRow, this.endCol];
  }
  // count of rows contained in this range
  get rows() {
    return this.endRow - this.startRow;
  }
  // count of cols contained in this range
  get cols() {
    return this.endCol - this.startCol;
  }
  get multiple() {
    return this.cols > 0 || this.rows > 0;
  }
  /**
   * check whether or not the row-index contained in the row of range
   * @param {int} index
   * @returns {boolean}
   */
  containsRow(t) {
    return this.startRow <= t && t <= this.endRow;
  }
  /**
   * check whether or not the index contained in the col of range
   * @param {int} index
   * @returns {boolean}
   */
  containsCol(t) {
    return this.startCol <= t && t <= this.endCol;
  }
  /**
   * check whether or not the range contains a cell position(row, col)
   * @param {int} row row-index
   * @param {int} col col-index
   * @returns {boolean}
   */
  contains(t, e) {
    return this.containsRow(t) && this.containsCol(e);
  }
  /**
   * check whether or not the range within the other range
   * @param {Range} other
   * @returns {boolean}
   */
  within(t) {
    return this.startRow >= t.startRow && this.startCol >= t.startCol && this.endRow <= t.endRow && this.endCol <= t.endCol;
  }
  position(t) {
    if (this.startRow <= t.startRow && this.endRow >= t.endRow) {
      if (t.startCol > this.endCol) return "right";
      if (t.endCol < this.startCol) return "left";
    } else if (this.startCol <= t.startCol && this.endCol >= t.endCol) {
      if (t.startRow > this.endRow) return "down";
      if (t.endRow < this.startRow) return "up";
    }
    return "none";
  }
  intersectsRow(t, e) {
    return this.startRow <= e && t <= this.endRow;
  }
  intersectsCol(t, e) {
    return this.startCol <= e && t <= this.endCol;
  }
  /**
   * check whether or not the range intersects the other range
   * @param {Range} other
   * @returns {boolean}
   */
  intersects({ startRow: t, startCol: e, endRow: r, endCol: o }) {
    return this.intersectsCol(e, o) && this.intersectsRow(t, r);
  }
  /**
   * the self intersection the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  intersection(t) {
    return new x(
      t.startRow < this.startRow ? this.startRow : t.startRow,
      t.startCol < this.startCol ? this.startCol : t.startCol,
      t.endRow > this.endRow ? this.endRow : t.endRow,
      t.endCol > this.endCol ? this.endCol : t.endCol
    );
  }
  /**
   * the self union the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  union(t) {
    return new x(
      t.startRow < this.startRow ? t.startRow : this.startRow,
      t.startCol < this.startCol ? t.startCol : this.startCol,
      t.endRow > this.endRow ? t.endRow : this.endRow,
      t.endCol > this.endCol ? t.endCol : this.endCol
    );
  }
  // Returns Array<CellRange> that represents that part of this that does not intersect with other
  // difference
  difference(t) {
    const e = [];
    if (!this.intersects(t)) return e;
    const { startRow: r, startCol: o, endRow: i, endCol: n } = this, l = this.intersection(t);
    return [
      new x(r, o, l.startRow - 1, n),
      // top
      new x(l.endRow + 1, o, i, n),
      // bottom
      new x(l.startRow, o, l.endRow, l.startCol - 1),
      // left
      new x(l.startRow, l.endCol + 1, l.endRow, n)
      // right
    ].filter((h) => h.rows >= 0 && h.cols >= 0);
  }
  touches(t) {
    return t.startRow === this.startRow && t.endRow === this.endRow && (t.endCol + 1 === this.startCol || this.endCol + 1 === t.startCol) || t.startCol === this.startCol && t.endCol === this.endCol && (t.endRow + 1 === this.startRow || this.endRow + 1 === this.startCol);
  }
  eachRow(t, e) {
    let { endRow: r } = this;
    e && r > e && (r = e);
    for (let o = this.startRow; o <= r; o += 1)
      t(o);
    return this;
  }
  eachCol(t, e) {
    let { endCol: r } = this;
    e && r > e && (r = e);
    for (let o = this.startCol; o <= r; o += 1)
      t(o);
    return this;
  }
  /**
   * @param {Function} cb (rowIndex, colIndex) => {}
   * @returns this
   */
  each(t) {
    return this.eachRow((e) => {
      this.eachCol((r) => t(e, r));
    }), this;
  }
  clone() {
    return new x(this.startRow, this.startCol, this.endRow, this.endCol);
  }
  toString() {
    let t = tt(this.startCol, this.startRow);
    return this.multiple && (t += `:${tt(this.endCol, this.endRow)}`), t;
  }
  equals(t) {
    return this.startRow === t.startRow && this.startCol === t.startCol && this.endRow === t.endRow && this.endCol === t.endCol;
  }
  static create(t, e, r, o) {
    if (r !== void 0 && o !== void 0) {
      let [i, n, l, h] = [t, e, r, o];
      return t > r && (i = r, l = t), e > o && (n = o, h = e), new x(i, n, l, h);
    }
    return new x(t, e, t, e);
  }
  static with(t) {
    const e = t.split(":"), [r, o] = q(e[0]);
    if (e.length === 1)
      return this.create(o, r);
    const [i, n] = q(e[1]);
    return this.create(o, r, n, i);
  }
}
function Xt(s, t) {
  s && s.length > 0 && s.forEach((e) => {
    t(x.with(e));
  });
}
function Yt(s, t, e) {
  switch (s) {
    case "left":
      return e;
    case "center":
      return t / 2;
    case "right":
      return t - e;
    default:
      return 0;
  }
}
function Nt(s, t, e, r, o) {
  switch (s) {
    case "top":
      return o;
    case "middle":
      let i = t / 2 - e / 2;
      const n = r / 2 + o;
      return i < n ? n : i;
    case "bottom":
      return t - o - e;
    default:
      return 0;
  }
}
function Qt(s, t, e, r, o, i, n) {
  let l = 0;
  s === "underline" ? e === "top" ? l = -n : e === "middle" && (l = -n / 2) : s === "strikethrough" && (e === "top" ? l = -n / 2 : e === "bottom" && (l = n / 2));
  let h = 0;
  return t === "center" ? h = i / 2 : t === "right" && (h = i), [r - h, o - l, r - h + i, o - l];
}
function Ut(s, t, e, r) {
  if (s && t) {
    let o = "";
    return e && (o += "italic "), r && (o += "bold "), `${o} ${t}pt ${s}`;
  }
}
function B(s, t, e, r = !1) {
  let o, i, n, l;
  Array.isArray(e) ? o = i = n = l = e : { top: o, right: i, bottom: n, left: l } = e, s.save().beginPath().translate(t.x, t.y);
  const h = (a, c) => [
    [0 - c, 0, t.width + c, 0],
    [t.width, 0, t.width, t.height],
    [0 - c, t.height, t.width + c, t.height],
    [0, 0, 0, t.height]
  ][a];
  [o, i, n, l].forEach((a, c) => {
    if (a) {
      let d = [], u = 1;
      a[0] === "thick" ? u = 3 : a[0] === "medium" ? u = 2 : a[0] === "dotted" ? d = [1, 1] : a[0] === "dashed" && (d = [2, 2]);
      let w = 0;
      r && (w = u / 2), s.prop({ strokeStyle: a[1], lineWidth: u }).setLineDash(d).line(...h(c, w));
    }
  }), s.restore();
}
function pt(s, t, e, r, o, i) {
  let n = "";
  t && (typeof t == "string" || typeof t == "number" ? n = i(`${t}`) : n = i((t.value || "") + "", t.format));
  const {
    fontSize: l,
    fontFamily: h,
    bold: a,
    italic: c,
    color: d,
    bgcolor: u,
    align: w,
    valign: f,
    underline: _,
    strikethrough: C,
    rotate: R,
    textwrap: p,
    padding: A
  } = r;
  if (s.save().beginPath().translate(e.x, e.y), s.rect(0, 0, e.width, e.height).clip(), u && s.prop("fillStyle", u).fill(), R && R > 0 && s.rotate(R * (Math.PI / 180)), o !== void 0) {
    if (s.save(), !o(s, e, t, n)) {
      s.restore();
      return;
    }
    s.restore();
  }
  if (n && !/^\s*$/.test(n)) {
    s.save().beginPath().prop({
      textAlign: w,
      textBaseline: f,
      font: Ut(h, l, c, a),
      fillStyle: d
    });
    const [m, y] = A || [5, 5], v = Yt(w, e.width, m), H = n.split(`
`), b = e.width - m * 2, S = [];
    H.forEach((g) => {
      const k = s.measureTextWidth(g);
      if (p && k > b) {
        let $ = { w: 0, len: 0, start: 0 };
        for (let F = 0; F < g.length; F += 1)
          $.w > b && (S.push(g.substr($.start, $.len)), $ = { w: 0, len: 0, start: F }), $.len += 1, $.w += s.measureTextWidth(g[F]) + 1;
        $.len > 0 && S.push(g.substr($.start, $.len));
      } else
        S.push(g);
    });
    const W = l / 0.75, E = (S.length - 1) * W, I = [];
    _ && I.push("underline"), C && I.push("strikethrough");
    let z = Nt(f, e.height, E, W, y);
    S.forEach((g) => {
      const k = s.measureTextWidth(g);
      s.fillText(g, v, z), I.forEach(($) => {
        s.line(
          ...Qt($, w, f, v, z, k, l)
        );
      }), z += W;
    }), s.restore();
  }
  s.restore();
}
function zt(s, [t, e, ...r], o) {
  const i = [], n = x.with(t), l = o.filter((h) => h.intersects(n));
  if (n.intersects(s.range) || l.length > 0)
    if (l.length <= 0)
      i.push([n, s.rect(n), e]);
    else
      for (let h of l)
        if (n.within(h))
          n.startRow === h.startRow && n.startCol === h.startCol && e !== "inside" && e !== "horizontal" && e !== "vertical" && i.push([
            h,
            s.rect(h),
            e === "all" ? "outside" : e
          ]);
        else if (e === "outside" || e === "left" || e === "top" || e === "right" || e === "bottom") {
          i.push([n, s.rect(n), e]);
          break;
        } else {
          const a = l.filter((c) => !c.equals(h));
          if (n.difference(h).forEach((c) => {
            if (c.intersects(s.range)) {
              const d = s.rect(c);
              i.push(
                ...zt(
                  s,
                  [c.toString(), e, ...r],
                  a
                )
              ), (e === "inside" || e === "horizontal") && (c.startRow < h.startRow && c.endRow < h.startRow ? i.push([c, d, "bottom"]) : c.startRow > h.startRow && c.endRow > h.startRow && i.push([c, d, "top"])), (e === "inside" || e === "vertical") && (c.startCol < h.startCol && c.endCol < h.startCol && i.push([c, d, "right"]), c.startCol > h.startCol && c.endCol > h.startCol && i.push([c, d, "left"]));
            }
          }), e === "all") {
            const c = s.rect(h);
            n.startRow === h.startRow && i.push([h, c, "top"]), n.endRow === h.endRow && i.push([h, c, "bottom"]), n.startCol === h.startCol && i.push([h, c, "left"]), n.endCol === h.endCol && i.push([h, c, "right"]);
          }
          break;
        }
  return i;
}
function dt(s, { width: t, color: e }, r) {
  t > 0 && (s.save().beginPath().prop({ lineWidth: t - 0.5, strokeStyle: e }), r(), s.restore());
}
function Rt(s, t, { x: e, y: r, width: o, height: i }) {
  dt(s, t, () => {
    s.translate(e, r).line(o, 0, o, i).line(0, i, o, i);
  });
}
function Zt(s, t, e, r, o, i, n, l) {
  const h = [i, n];
  o === "outside" || o === "all" ? B(s, r, h, !0) : o === "left" ? B(s, r, { left: h }, l) : o === "top" ? B(s, r, { top: h }, l) : o === "right" ? B(s, r, { right: h }, l) : o === "bottom" && B(
    s,
    r,
    { bottom: h },
    l
  ), (o === "all" || o === "inside" || o === "horizontal" || o === "vertical") && (o !== "horizontal" && e.eachCol((a) => {
    if (a < e.endCol) {
      const c = e.clone();
      c.endCol = c.startCol = a, c.intersects(t.range) && B(
        s,
        t.rect(c),
        { right: h },
        l
      );
    }
  }), o !== "vertical" && e.eachRow((a) => {
    if (a < e.endRow) {
      const c = e.clone();
      c.endRow = c.startRow = a, c.intersects(t.range) && B(
        s,
        t.rect(c),
        { bottom: h },
        l
      );
    }
  }));
}
function Jt(s, t, e, r) {
  e && e.length > 0 && e.forEach((o) => {
    const [, , i, n] = o;
    zt(t, o, r).forEach(([l, h, a]) => {
      Zt(s, t, l, h, a, i, n);
    });
  });
}
function L(s, t, e, r) {
  if (!e) return;
  let o, i, n = (y) => y, l = r._headerStyle, h = r._headerGridline, a = r._styles, c, d, u, w;
  const { _rowHeader: f, _colHeader: _ } = r;
  if (s === "row-header") {
    if (f.width <= 0) return;
    ({ cell: o, merges: c, cellRenderer: i } = f);
  } else if (s === "col-header") {
    if (_.height <= 0) return;
    ({ cell: o, merges: c, cellRenderer: i } = _);
  } else
    o = r._cell, i = r._cellRenderer, n = r._formatter, l = r._style, h = r._gridline, a = r._styles, c = r._merges, d = r._borders, u = r._row, w = r._col;
  t.save().translate(e.x, e.y).prop("fillStyle", r._bgcolor).rect(0, 0, e.width, e.height).fill().clip();
  const C = (y, v, H) => {
    const b = { ...l };
    if (u) {
      const S = u(y);
      S && S.style !== void 0 && Object.assign(b, a[S.style]);
    }
    if (w) {
      const S = w(v);
      S && S.style !== void 0 && Object.assign(b, a[S.style]);
    }
    return H instanceof Object && H.style !== void 0 && Object.assign(b, a[H.style]), b;
  }, R = [], p = [], A = /* @__PURE__ */ new Set();
  c && Xt(c, (y) => {
    if (y.intersects(e.range)) {
      const v = o(y.startRow, y.startCol), H = C(y.startRow, y.startCol, v), b = e.rect(y);
      p.push([v, b, H]), R.push(y), y.each((S, W) => {
        A.add(`${S}_${W}`);
      });
    }
  });
  const m = (y, v, H) => {
    s === "body" ? (Rt(t, h, v), pt(t, y, v, H, i, n)) : (pt(t, y, v, H, i, n), Rt(t, h, v));
  };
  e.each((y, v, H) => {
    if (!A.has(`${y}_${v}`)) {
      const b = o(y, v);
      m(b, H, C(y, v, b));
    }
  }), p.forEach((y) => m(...y)), Jt(t, e, d, R), t.restore();
}
function te(s) {
  const {
    _width: t,
    _height: e,
    _target: r,
    _scale: o,
    _viewport: i,
    _freeze: n,
    _rowHeader: l,
    _colHeader: h
  } = s;
  if (i) {
    const a = new qt(r, o);
    a.size(t, e);
    const [c, d, u, w] = i.areas, [f, _, C, R] = i.headerAreas;
    L("body", a, w, s), L("body", a, c, s), L("col-header", a, f, s), L("body", a, u, s), L("row-header", a, R, s), L("body", a, d, s), L("col-header", a, _, s), L("row-header", a, C, s);
    const [p, A] = n;
    (A > 0 || p > 0) && dt(a, s._freezeGridline, () => {
      A > 0 && a.line(0, w.y, t, w.y), p > 0 && a.line(w.x, 0, w.x, e);
    });
    const { x: m, y } = d;
    if (m > 0 && y > 0) {
      const { height: v } = h, { width: H } = l, { bgcolor: b } = s._headerStyle;
      b && a.save().prop({ fillStyle: b }).rect(0, 0, H, v).fill().restore(), dt(a, s._headerGridline, () => {
        a.line(0, v, H, v).line(H, 0, H, v);
      });
    }
  }
}
class P {
  constructor(t, e, r, o, i, n, l) {
    this.range = t, this.x = e, this.y = r, this.width = o, this.height = i, this.rowHeight = n, this.colWidth = l;
    let h = 0;
    t.eachRow((c) => {
      const d = n(c);
      this.rowMap.set(c, { y: h, height: d }), h += d;
    }), this.height <= 0 && (this.height = h);
    let a = 0;
    t.eachCol((c) => {
      const d = l(c);
      this.colMap.set(c, { x: a, width: d }), a += d;
    }), this.width <= 0 && (this.width = a);
  }
  // { rowIndex: { y, height }}
  rowMap = /* @__PURE__ */ new Map();
  // { colIndex: { x, width }}
  colMap = /* @__PURE__ */ new Map();
  /**
   * check whether or not x contained in area
   * @param {int} x offset on x-axis
   */
  containsx(t) {
    return t >= this.x && t < this.x + this.width;
  }
  /**
   * check whether or not y contained in area
   * @param {int} y offset on y-axis
   */
  containsy(t) {
    return t >= this.y && t < this.y + this.height;
  }
  contains(t, e) {
    return this.containsx(t) && this.containsy(e);
  }
  eachRow(t) {
    this.range.eachRow((e) => {
      const { y: r, height: o } = this.rowMap.get(e) || { y: 0, height: 0 };
      o > 0 && t(e, r, o);
    });
  }
  eachCol(t) {
    this.range.eachCol((e) => {
      const { x: r, width: o } = this.colMap.get(e) || { x: 0, width: 0 };
      o > 0 && t(e, r, o);
    });
  }
  each(t) {
    this.eachRow((e, r, o) => {
      this.eachCol((i, n, l) => {
        t(e, i, { x: n, y: r, width: l, height: o });
      });
    });
  }
  rectRow(t, e) {
    const { rowMap: r, range: o } = this;
    let [i, n] = [0, 0];
    t >= o.startRow && (i = r.get(t)?.y || 0);
    for (let h = t; h <= e; h += 1) {
      const a = this.rowHeight(h);
      a > 0 && (h < o.startRow && (i -= a), n += a);
    }
    const { width: l } = this;
    return { x: 0, y: i, width: l, height: n };
  }
  rectCol(t, e) {
    const { colMap: r, range: o } = this;
    let [i, n] = [0, 0];
    t >= o.startCol && (i = r.get(t)?.x || 0);
    for (let h = t; h <= e; h += 1) {
      const a = this.colWidth(h);
      a > 0 && (h < o.startCol && (i -= a), n += a);
    }
    const { height: l } = this;
    return { x: i, y: 0, width: n, height: l };
  }
  rect(t) {
    let { y: e, height: r } = this.rectRow(t.startRow, t.endRow), { x: o, width: i } = this.rectCol(t.startCol, t.endCol);
    return { x: o, y: e, width: i, height: r };
  }
  cellAtCache = null;
  cellAt(t, e) {
    const { cellAtCache: r } = this;
    if (r != null && t > r.x && t <= r.x + r.width && e > r.y && e <= r.y + r.height)
      return r;
    const { startRow: o, startCol: i } = this.range, n = {
      row: o,
      col: i,
      x: this.x,
      y: this.y,
      width: 0,
      height: 0
    };
    for (; n.y < e; ) {
      const l = this.rowHeight(n.row++);
      n.y += l, n.height = l;
    }
    for (n.y -= n.height, n.row--; n.x < t; ) {
      const l = this.colWidth(n.col++);
      n.x += l, n.width = l;
    }
    return n.x -= n.width, n.col--, this.cellAtCache = n, n;
  }
  static create(t, e, r, o, i, n, l, h, a, c) {
    return new P(
      new x(t, e, r, o),
      i,
      n,
      l,
      h,
      a,
      c
    );
  }
}
class ee {
  /**
   * [area1, area2, area3, area4]
   * -----------------------
   * |  area-2   |   area-1
   * |-----------|----------
   * |  area-3   |   area-4
   * -----------------------
   */
  areas;
  /**
   * [area1, area21, area23, area3]
   *             |   area-21   | area-1
   * ------------|-----------------------
   *   area-23   |   body
   * ------------|
   *   area-3    |
   */
  headerAreas;
  _render;
  constructor(t) {
    this._render = t;
    const [e, r] = [t._rowHeader.width, t._colHeader.height], [o, i] = t._freeze, { _startRow: n, _startCol: l, _rows: h, _cols: a, _width: c, _height: d } = t, u = ($) => t.rowHeightAt($), w = ($) => t.colWidthAt($), f = P.create(
      n,
      l,
      o - 1,
      i - 1,
      e,
      r,
      0,
      0,
      u,
      w
    ), [_, C] = [
      o + t._scrollRows,
      i + t._scrollCols
    ];
    let R = f.height + r, p = _;
    for (; R < d && p < h; )
      R += u(p), p += 1;
    let A = f.width + e, m = C;
    for (; A < c && m < a; )
      A += w(m), m += 1;
    const y = e + f.width, v = r + f.height;
    let H = c - y, b = d - v;
    m === a && (H -= c - A), p === h && (b -= d - R), m -= 1, p -= 1;
    const S = P.create(
      _,
      C,
      p,
      m,
      y,
      v,
      H,
      b,
      u,
      w
    ), W = P.create(
      n,
      C,
      o - 1,
      m,
      y,
      r,
      H,
      0,
      u,
      w
    ), E = P.create(
      _,
      l,
      p,
      i - 1,
      e,
      v,
      0,
      b,
      u,
      w
    );
    this.areas = [W, f, E, S];
    const { _rowHeader: I, _colHeader: z } = t, g = () => z.height / z.rows, k = () => I.width / I.cols;
    this.headerAreas = [
      P.create(
        0,
        W.range.startCol,
        z.rows - 1,
        W.range.endCol,
        S.x,
        0,
        S.width,
        0,
        g,
        w
      ),
      P.create(
        0,
        f.range.startCol,
        z.rows - 1,
        f.range.endCol,
        f.x,
        0,
        f.width,
        0,
        g,
        w
      ),
      P.create(
        f.range.startRow,
        0,
        f.range.endRow,
        I.cols - 1,
        0,
        f.y,
        0,
        f.height,
        u,
        k
      ),
      P.create(
        E.range.startRow,
        0,
        E.range.endRow,
        I.cols - 1,
        0,
        S.y,
        0,
        S.height,
        u,
        k
      )
    ];
  }
  inAreas(t, e) {
    for (let r of this.areas)
      if (r.range.contains(t, e))
        return !0;
    return !1;
  }
  cellAt(t, e) {
    const r = this.areas[1], [o, i, n, l] = this.headerAreas;
    if (t < r.x && e < r.y)
      return {
        placement: "all",
        row: 0,
        col: 0,
        x: 0,
        y: 0,
        width: r.x,
        height: r.y
      };
    if (t < r.x)
      return {
        placement: "row-header",
        ...(n.containsy(e) ? n : l).cellAt(t, e)
      };
    if (e < r.y)
      return {
        placement: "col-header",
        ...(i.containsx(t) ? i : o).cellAt(t, e)
      };
    for (let h of this.areas)
      if (h.contains(t, e))
        return { placement: "body", ...h.cellAt(t, e) };
    return null;
  }
}
class at {
  _target;
  _bgcolor = "#ffffff";
  // table width
  _width = 0;
  // table height
  _height = 0;
  _scale = 1;
  // the count of rows
  _rows = 100;
  // the count of cols;
  _cols = 26;
  // the row height (px)
  _rowHeight = 22;
  // the column width (px)
  _colWidth = 100;
  // row of the start position in table
  _startRow = 0;
  // col of the start position in table
  _startCol = 0;
  // count of rows scrolled
  _scrollRows = 0;
  // count of cols scrolled
  _scrollCols = 0;
  /**
   * get row given rowIndex
   * @param {int} rowIndex
   * @returns Row | undefined
   */
  _row = () => {
  };
  /**
   * get col given colIndex
   * @param {int} coIndex
   * @returns Row | undefined
   */
  _col = () => {
  };
  /**
   * get cell given rowIndex, colIndex
   * @param {int} rowIndex
   * @param {int} colIndex
   * @returns Cell | string
   */
  _cell = () => {
  };
  _cellRenderer = () => !0;
  _formatter = (t) => t;
  _merges = [];
  _borders = [];
  _styles = [];
  _gridline = {
    width: 1,
    color: "#e6e6e6"
  };
  _style = {
    align: "left",
    valign: "middle",
    textwrap: !1,
    underline: !1,
    strikethrough: !1,
    color: "#0a0a0a",
    bold: !1,
    italic: !1,
    rotate: 0,
    fontSize: 10,
    fontFamily: "Source Sans Pro"
  };
  // row header
  _rowHeader = {
    width: 60,
    cols: 1,
    cell(t, e) {
      return t + 1;
    }
  };
  // column header
  _colHeader = {
    height: 24,
    rows: 1,
    cell(t, e) {
      return Wt(e);
    }
  };
  _headerGridline = {
    width: 1,
    color: "#e6e6e6"
  };
  _headerStyle = {
    bgcolor: "#f4f5f8cc",
    align: "center",
    valign: "middle",
    textwrap: !0,
    underline: !1,
    strikethrough: !1,
    color: "#585757",
    bold: !1,
    italic: !1,
    rotate: 0,
    fontSize: 10,
    fontFamily: "Source Sans Pro"
  };
  // freezed [row, col]
  _freeze = [0, 0];
  _freezeGridline = {
    width: 2,
    color: "#d8d8d8"
  };
  // it can be used after rendering
  _viewport = null;
  constructor(t, e, r) {
    const o = typeof t == "string" ? document.querySelector(t) : t;
    if (!o) throw new Error("target error");
    this._target = o, this._width = e, this._height = r;
  }
  render() {
    return this._viewport = new ee(this), te(this), this;
  }
  bgcolor(t) {
    return this._bgcolor = t, this;
  }
  width(t) {
    return this._width = t, this;
  }
  height(t) {
    return this._height = t, this;
  }
  scale(t) {
    return this._scale = t, this;
  }
  rows(t) {
    return this._rows = t, this;
  }
  cols(t) {
    return this._cols = t, this;
  }
  rowHeight(t) {
    return this._rowHeight = t, this;
  }
  colWidth(t) {
    return this._colWidth = t, this;
  }
  startRow(t) {
    return this._startRow = t, this;
  }
  startCol(t) {
    return this._startCol = t, this;
  }
  scrollRows(t) {
    return this._scrollRows = t, this;
  }
  scrollCols(t) {
    return this._scrollCols = t, this;
  }
  row(t) {
    return this._row = t, this;
  }
  col(t) {
    return this._col = t, this;
  }
  cell(t) {
    return this._cell = t, this;
  }
  cellRenderer(t) {
    return this._cellRenderer = t, this;
  }
  formatter(t) {
    return this._formatter = t, this;
  }
  merges(t) {
    return this._merges = t, this;
  }
  styles(t) {
    return this._styles = t, this;
  }
  borders(t) {
    return this._borders = t, this;
  }
  gridline(t) {
    return t && Object.assign(this._gridline, t), this;
  }
  style(t) {
    return t && Object.assign(this._style, t), this;
  }
  rowHeader(t) {
    return t && Object.assign(this._rowHeader, t), this;
  }
  colHeader(t) {
    return t && Object.assign(this._colHeader, t), this;
  }
  headerGridline(t) {
    return t && Object.assign(this._headerGridline, t), this;
  }
  headerStyle(t) {
    return t && Object.assign(this._headerStyle, t), this;
  }
  freeze(t) {
    return t && (this._freeze = q(t).reverse()), this;
  }
  freezeGridline(t) {
    return t && Object.assign(this._freezeGridline, t), this;
  }
  // get methods ---- start ------
  rowHeightAt(t) {
    const { _row: e } = this;
    if (e) {
      const r = e(t);
      if (r) return r.hide === !0 ? 0 : r.height;
    }
    return this._rowHeight;
  }
  colWidthAt(t) {
    const { _col: e } = this;
    if (e) {
      const r = e(t);
      if (r) return r.hide === !0 ? 0 : r.width;
    }
    return this._colWidth;
  }
  get viewport() {
    return this._viewport;
  }
  // get methods ---- end -------
  static create(t, e, r) {
    return new at(t, e, r);
  }
}
try {
  window && (window.tiny ||= {}, window.tiny.table_renderer = at.create);
} catch {
}
class re {
  _ = [];
  _indexes = /* @__PURE__ */ new Map();
  _formulas = [];
  _formulaParser = (t) => t;
  _formatter = (t) => t;
  constructor() {
  }
  formulaParser(t) {
    return this._formulaParser = t, this;
  }
  formatter(t) {
    return this._formatter = t, this;
  }
  load({ cells: t }) {
    t && (this._ = t, this.resetIndexes());
  }
  get(t, e) {
    const { _indexes: r } = this;
    if (r.has(t)) {
      const o = r.get(t).get(e);
      return o !== void 0 ? this._[o] : null;
    }
    return null;
  }
  remove(t, e) {
    const { _indexes: r } = this;
    if (r.has(t)) {
      const o = r.get(t), i = o.get(e);
      i !== void 0 && (this._.splice(i, 1), o.delete(e));
    }
    return this;
  }
  set(t, e, r) {
    let o = this.get(t, e);
    if (o === null) {
      if (r != null) {
        const i = this._.push([t, e, r]) - 1;
        this.updateIndex(t, e, i), this.addFormula(r, i);
      }
    } else {
      const i = o[2], n = U(i), l = U(r);
      l === "" ? (i instanceof Object && Object.keys(i).length > 1 ? delete i.value : this.remove(t, e), this.resetFormulas()) : (i instanceof Object ? Object.assign(i, r instanceof Object ? r : { value: r }) : o[2] = r, l !== n && this.resetFormulas());
    }
  }
  resetIndexes() {
    const { _: t } = this;
    for (let e = 0; e < t.length; e += 1) {
      const [r, o, i] = t[e];
      this.updateIndex(r, o, e), this.addFormula(i, e);
    }
  }
  updateIndex(t, e, r) {
    const { _indexes: o } = this;
    o.has(t) || o.set(t, /* @__PURE__ */ new Map()), o.get(t).set(e, r);
  }
  addFormula(t, e) {
    t instanceof Object && t.formula && (t.value = this._formulaParser(t.formula), this._formulas.push(e));
  }
  resetFormulas() {
    this._formulas.forEach((t) => {
      const [, , e] = this._[t];
      e instanceof Object && e.formula && (e.value = this._formulaParser(e.formula));
    });
  }
}
function Ot(s) {
  return s instanceof Object ? s.value : s;
}
function U(s) {
  const t = Ot(s);
  return `${t ?? ""}`;
}
function It(s, t, e, r, o) {
  const { scroll: i } = s, n = r === "row" ? 0 : 1, l = r === "row" ? 3 : 2;
  let h = i[l], a = !1, c = i[n], d = 0;
  const { freeze: u } = s;
  if (u && (d = q(u)[r === "row" ? 1 : 0]), e > 0)
    if (t === "+")
      for (let w = c; !(h >= e); w += 1) {
        const f = o(d + w);
        h += f, s.scroll[n] = w + 1, a = !0;
      }
    else
      for (let w = c; !(h <= e); w -= 1) {
        const f = o(d + w - 1);
        if (h -= f, s.scroll[n] = w - 1, a = !0, f > 0) break;
      }
  else
    s.scroll[n] = 0, h = 0, a = !0;
  return i[l] = h, a;
}
function se(s, t, e) {
  return t && e !== void 0 ? It(s, t, e, "col", (r) => K(s, r).width) : s.scroll[2];
}
function oe(s, t, e) {
  return t && e !== void 0 ? It(s, t, e, "row", (r) => G(s, r).height) : s.scroll[3];
}
function yt({ merges: s }, t) {
  if (s) {
    const e = x.with(t);
    for (let r = 0; r < s.length; r += 1)
      if (x.with(s[r]).equals(e))
        return !0;
  }
  return !1;
}
function Ct(s, t) {
  const e = x.with(t);
  if (!e.multiple) return;
  s.merges ||= [];
  const { merges: r } = s;
  r.length <= 0 || r.forEach((o, i) => {
    x.with(o).within(e) && r.splice(i, 1);
  }), r.push(t);
}
function mt({ merges: s }, t) {
  if (s) {
    for (let e = 0; e < s.length; e += 1)
      if (s[e] === t) {
        s.splice(e, 1);
        return;
      }
  }
}
function kt({ merges: s }, t) {
  if (s)
    for (let e = 0; e < s.length; e += 1) {
      const r = x.with(s[e]);
      r.intersects(t) && (t = r.union(t));
    }
  return t;
}
function Mt(s, t, e) {
  let r = 0;
  for (let o = s; o < t; o += 1) r += e(o);
  return r;
}
function wt(s, t) {
  const e = Object.keys(s);
  if (e.length !== Object.keys(t).length) return !1;
  for (let r = 0; r < e.length; r += 1) {
    const o = e[r], i = s[o], n = t[o];
    if (n === void 0) return !1;
    if (typeof i == "string" || typeof i == "number" || typeof i == "boolean") {
      if (i !== n) return !1;
    } else if (Array.isArray(i)) {
      if (i.length !== n.length) return !1;
      for (let l = 0; l < i.length; l += 1)
        if (!wt(i[l], n[l])) return !1;
    } else if (typeof i != "function" && !Array.isArray(i) && i instanceof Object && !wt(i, n))
      return !1;
  }
  return !0;
}
function ie(s) {
  return s <= 0.75 ? 1 : s <= 1.5 ? 2 : s <= 2.25 ? 3 : s <= 3 ? 4 : s <= 3.75 ? 5 : s <= 4.5 ? 6 : 96 / 72 * s;
}
function Pt(s, t) {
  if (s.styles || (s.styles = []), t)
    for (let e = 0; e < s.styles.length; e += 1) {
      const r = s.styles[e];
      if (wt(r, t))
        return e;
    }
  return s.styles.push(t) - 1;
}
function ne(s, t, e = !0) {
  const r = s.styles[t];
  return e ? Object.assign({}, s.style, s.styles[t] || {}) : r;
}
function le(s) {
  s.styles.length = 0;
}
function he(s, t) {
  s.borders || (s.borders = []);
  const e = x.with(t[0]), { borders: r } = s;
  for (let o = 0; o < r.length; o += 1) {
    const [i, ...n] = r[o], l = x.with(i);
    if (l.intersects(e)) {
      l.within(e) || (r.push(t), l.difference(e).forEach((h) => {
        r.push([h.toString(), ...n]);
      })), r.splice(o, 1);
      return;
    } else if (n.every((h, a) => h === t[a + 1]) && l.touches(e)) {
      r[o][0] = l.union(e).toString();
      return;
    }
  }
  r.push(t);
}
function ae(s, t) {
  const { borders: e } = s;
  if (e) {
    const r = [], o = x.with(t);
    for (let i = 0; i < e.length; i += 1) {
      const [n, ...l] = e[i], h = x.with(n);
      h.intersects(o) && (h.within(o) || h.difference(o).forEach((a) => {
        r.push([a.toString(), ...l]);
      }), e.splice(i, 1), i -= 1);
    }
    e.push(...r);
  }
}
function ce(s) {
  s.borders.length = 0;
}
function K(s, t, e) {
  const r = s.cols[t] || { width: s.colWidth };
  return e ? s.cols[t] = Object.assign(r, e) : r;
}
function et(s, t, e) {
  if (e) {
    const { cols: r } = s;
    r[t] ? r[t].width = e : r[t] = { width: e };
  } else {
    const r = K(s, t);
    return r.hide ? 0 : r.width;
  }
}
function jt(s, t, e) {
  const { cols: r } = s;
  if (arguments.length === 1) {
    let o = r.len * s.colWidth;
    for (let i in r)
      if (i !== "len") {
        const n = et(s, parseInt(i, 10));
        n > 0 && (o += n, o -= s.colWidth);
      }
    return o;
  }
  return Mt(
    t !== void 0 ? t : 0,
    e !== void 0 ? e : r.len,
    (o) => et(s, o)
  );
}
function fe(s, t) {
  return s.cols.len - 1 === t;
}
function rt(s, t, e) {
  for (; ; )
    if (K(s, t).hide) t += e;
    else return t;
}
function G(s, t, e) {
  const r = s.rows[t] || { height: s.rowHeight };
  return e ? s.rows[t] = Object.assign(r, e) : r;
}
function st(s, t, e) {
  if (e) {
    const { rows: r } = s;
    r[t] ? r[t].height = e : r[t] = { height: e };
  } else {
    const r = G(s, t);
    return r.hide ? 0 : r.height;
  }
}
function Lt(s, t, e) {
  const { rows: r } = s;
  if (arguments.length === 1) {
    let o = r.len * s.rowHeight;
    for (let i in r)
      if (i !== "len") {
        const n = st(s, parseInt(i, 10));
        n > 0 && (o += n, o -= s.rowHeight);
      }
    return o;
  }
  return Mt(
    t !== void 0 ? t : 0,
    e !== void 0 ? e : r.len,
    (o) => st(s, o)
  );
}
function ue(s, t) {
  return s.rows.len - 1 === t;
}
function ot(s, t, e) {
  for (; ; )
    if (G(s, t).hide) t += e;
    else return t;
}
function de(s, t, e = !1) {
  if (!s || !t) return;
  const r = s.range.position(t.range);
  if (r === "none") return;
  const { rows: o, cols: i } = s.range;
  t.range.each((n, l) => {
    let h = s.range.startRow, a = s.range.startCol, c, d, u = [n - t.range.startRow, l - t.range.startCol];
    ["up", "left"].includes(r) && (u = [t.range.endRow - n, t.range.endCol - l]), r === "down" || r === "up" ? o <= 0 && e && (c = r, d = u[0] + 1, r === "up" && (d = 0 - d)) : i <= 0 && e && (c = r, d = u[1] + 1, r === "left" && (d = 0 - d));
    let w = u[1] % (i + 1), f = u[0] % (o + 1);
    ["up", "left"].includes(r) ? (h = s.range.endRow - f, a = s.range.endCol - w) : (h += f, a += w), we(h, a, n, l, s, t, c, d);
  });
}
function we(s, t, e, r, o, i, n, l) {
  let h = o.cells.get(s, t);
  if (h !== null && h[2] !== void 0 && h[2] !== null) {
    let a = h[2];
    if (a instanceof Object) {
      if (a = Object.assign({}, a), a.style !== void 0 && o.cells !== i.cells) {
        const c = Object.assign({}, o.data.styles[a.style]);
        a.style = Pt(i.data, c);
      }
      n !== void 0 && l !== void 0 && (a.formula ? a.formula = a.formula.replace(
        /[a-zA-Z]{1,3}\d+/g,
        (c) => ["left", "top"].includes(n) ? gt(c, l, 0) : gt(c, 0, l)
      ) : a.value && (a.value = bt(a.value, l)));
    } else
      l !== void 0 && (a = bt(a, l));
    i.cells.set(e, r, a);
  } else
    i.cells.remove(s, t);
}
function bt(s, t) {
  return typeof s == "string" ? s.replace(/([0-9]+$)|(([0-9]+)[^0-9]+$)/g, (e) => e.replace(/[0-9]+/, (r) => `${parseInt(r) + t}`)) : s + t;
}
function _e() {
  return {
    rows: {
      len: 100
    },
    cols: {
      len: 26
    },
    rowHeight: 25,
    colWidth: 100,
    scroll: [0, 0, 0, 0],
    style: {
      color: "#333",
      align: "left",
      valign: "middle",
      textwrap: !1,
      bold: !1,
      italic: !1,
      fontFamily: "Roboto",
      fontSize: 10,
      underline: !1,
      strikethrough: !1
    },
    styles: [],
    borders: [],
    merges: [],
    cells: []
  };
}
function it(s, t, e) {
  s.addEventListener(t, e);
}
function nt(s, t, e) {
  s.removeEventListener(t, e);
}
function ge(s, t, e) {
  const r = (o) => {
    e(o), nt(s, "mousemove", t), nt(s, "mouseup", r);
  };
  it(s, "mousemove", t), it(s, "mouseup", r);
}
class pe {
  _events = /* @__PURE__ */ new Map();
  on(t, e) {
    const { _events: r } = this;
    return r.has(t) || r.set(t, []), r.get(t).push(e), this;
  }
  off(t, e) {
    const { _events: r } = this;
    if (r.has(t)) {
      const o = r.get(t);
      if (e) {
        const i = o.findIndex((n) => n === e);
        i !== -1 && o.splice(i, 1);
      } else
        o.length = 0;
    }
    return this;
  }
  emit(t, ...e) {
    const { _events: r } = this;
    return r.has(t) && r.get(t).forEach((o) => o(...e)), this;
  }
}
class xt {
  _;
  _hover;
  _line;
  _type;
  _minValue;
  _lineLength;
  _cell = null;
  _change;
  constructor(t, e, r, o, i = () => {
  }) {
    this._type = t, this._minValue = r, this._lineLength = o, this._change = i, this._ = O("div", `${Y}-resizer ${t}`).append(
      this._hover = O("div", "hover").on("mousedown", (n) => {
        n.stopPropagation(), Re(this, n);
      }),
      this._line = O("div", "line")
    ), e.append(this._);
  }
  show(t) {
    this._cell = t;
    const { _type: e } = this, { x: r, y: o, width: i, height: n } = t;
    this._.css("left", `${e === "row" ? r : r + i - 5}px`).css("top", `${e === "row" ? o + n - 5 : o}px`).show();
    const l = e === "row" ? "width" : "height";
    this._hover.css(l, `${t[l]}px`), this._line.css(l, `${this._lineLength()}px`);
  }
  hide() {
    this._.hide();
  }
}
function Re(s, t) {
  const { _type: e, _cell: r, _minValue: o, _: i, _line: n, _change: l } = s;
  let h = 0;
  n.show();
  const a = (d) => {
    t !== null && d.buttons === 1 && r && (e === "row" ? (h += d.movementY, h + r.height >= o ? i.css("top", `${r.y + r.height + h}px`) : h = o - r.height) : (h += d.movementX, h + r.width >= o ? i.css("left", `${r.x + r.width + h}px`) : h = o - r.width));
  }, c = () => {
    nt(window, "mousemove", a), nt(window, "mouseup", c), n.hide(), i.hide(), r && h != 0 && l(h, r);
  };
  it(window, "mousemove", a), it(window, "mouseup", c);
}
class V {
  _;
  _rect = null;
  _target = null;
  constructor(t, e = !1) {
    this._ = O("div", `${Y}-${t}`), e && this.show();
  }
  append(t) {
    return this._.append(t), this;
  }
  offset() {
    if (this._rect && this._target) {
      const t = this._target.offset(), { x: e, y: r, width: o, height: i } = this._rect;
      return { x: e + t.x, y: r + t.y, width: o, height: i };
    }
    return null;
  }
  rect(t) {
    return this._rect = t, this._.css({
      left: t.x,
      top: t.y,
      width: t.width,
      height: t.height
    }), this;
  }
  target(t, e = !0) {
    return e && t.append(this._), this._target = t, this;
  }
  show() {
    return this._.show(), this;
  }
  clear() {
    const { _target: t, _: e } = this;
    t && (t.remove(e), this._target = null);
  }
}
class ye {
  _placement = "body";
  _editable = !1;
  _ranges = [];
  _rowHeaderRanges = [];
  _colHeaderRanges = [];
  _areas = [];
  _focus = [0, 0];
  // _focusBodyRange: Range | null = null;
  _focusRange = null;
  _focusArea = null;
  // for move
  _move = [0, 0];
  _copyRange = null;
  _copyAreas = [];
  _autofillRange = null;
  _autofillAreas = [];
  _autofillTrigger = (t) => {
  };
  constructor(t) {
    this._editable = t;
  }
  get currentRange() {
    return this._ranges.at(-1);
  }
  placement(t) {
    return this._placement = t, this;
  }
  focus(t, e, r) {
    return this._focus = [t, e], this._focusRange = r, this._move = [t, e], this;
  }
  move(t, e) {
    return this._move = [t, e], this;
  }
  autofillRange(t) {
    return this._autofillRange = t, this;
  }
  autofillTrigger(t) {
    return this._autofillTrigger = t, this;
  }
  addRange(t, e = !0) {
    return e && (this._ranges.length = 0, this.clear()), this._ranges.push(t), At(this), this;
  }
  updateLastRange(t) {
    const { _focusRange: e } = this;
    e && (this._ranges.splice(-1, 1, t(e)), At(this));
  }
  addAreaOutline(t, e) {
    const r = new V("selector", !0).rect(ft(t, 2)).target(e);
    this._placement === "body" && r.append(
      O("div", "corner").attr("draggable", "false").on("mousedown", this._autofillTrigger)
    ), this._areas.push(r);
  }
  addArea(t, e) {
    return this._areas.push(
      new V("selector-area", !0).rect(t).target(e)
    ), this;
  }
  addRowHeaderArea(t, e) {
    return this._areas.push(
      new V("selector-area row-header", !0).rect(t).target(e)
    ), this;
  }
  addColHeaderArea(t, e) {
    return this._areas.push(
      new V("selector-area col-header", !0).rect(t).target(e)
    ), this;
  }
  addCopyArea(t, e) {
    return this._copyAreas.push(
      new V("selector-copy", !0).rect(ft(t, 2)).target(e)
    ), this;
  }
  addAutofillArea(t, e) {
    return this._autofillAreas.push(
      new V("selector-autofill", !0).rect(ft(t, 2)).target(e)
    ), this;
  }
  setFocusArea(t, e) {
    return this._focusArea = new V("", !0).rect(t).target(e, !1), this;
  }
  showCopy() {
    this._copyRange = this.currentRange;
  }
  clearCopy() {
    this._copyRange = null, this._copyAreas.forEach((t) => {
      t.clear();
    }), this._copyAreas.length = 0;
  }
  clear() {
    [this._areas, this._autofillAreas, this._copyAreas].forEach((t) => {
      t.forEach((e) => e.clear()), t.length = 0;
    });
  }
}
function vt(s, t, e) {
  s.sort(t);
  let r = s[0];
  const o = [];
  s.length === 1 && o.push(r);
  for (let i = 1; i < s.length; i += 1) {
    const n = s[i];
    e(r, n) ? r = r.union(n) : (o.push(r), r = n);
  }
  return s.length > 1 && o.push(r), o;
}
function At(s) {
  const t = [], e = [];
  for (let r of s._ranges)
    if (r) {
      const { startRow: o, startCol: i, endRow: n, endCol: l } = r;
      (o >= 0 || n >= 0) && t.push(x.create(o, 0, n, 0)), (i >= 0 || l >= 0) && e.push(x.create(0, i, 0, l));
    }
  s._rowHeaderRanges = vt(
    t,
    (r, o) => r.startRow - o.startRow,
    (r, o) => r.intersectsRow(o.startRow, o.endRow)
  ), s._colHeaderRanges = vt(
    e,
    (r, o) => r.startCol - o.startCol,
    (r, o) => r.intersectsCol(o.startCol, o.endCol)
  );
}
function ft(s, t) {
  return {
    x: s.x - t / 2,
    y: s.y - t / 2,
    width: s.width - t,
    height: s.height - t
  };
}
const Ce = { vertical: "height", horizontal: "width" };
class Ht {
  _;
  _content;
  _value = 0;
  _maxValue = 0;
  _lastOffset = 0;
  _type;
  _change = null;
  constructor(t, e) {
    this._type = t, this._content = O("div", "content"), this._ = O("div", `${Y}-scrollbar ${t}`).append(this._content).on("scroll", (r) => {
      r.stopPropagation();
      const { scrollTop: o, scrollLeft: i } = r.target;
      if (this._change) {
        const n = t === "vertical" ? o : i, l = n > this._value ? "+" : "-";
        this._change(l, n, r), this._value = n;
      }
    }), e.append(this._);
  }
  get value() {
    return this._value;
  }
  change(t) {
    return this._change = t, this;
  }
  scrollBy(t) {
    return t && this.scroll(this._value + t), this;
  }
  scrollToStart() {
    return this.scroll(0), this;
  }
  scrollToEnd() {
    return this.scroll(this._maxValue), this;
  }
  scroll(t) {
    const { _: e, _type: r, _maxValue: o } = this;
    return t !== void 0 ? (t < 0 ? t = 0 : t > o && (t = o), r === "vertical" ? e.scrolly(t) : e.scrollx(t), this) : r === "vertical" ? e.scrolly() : e.scrollx();
  }
  // update this size
  resize(t, e) {
    if (e > t - 1) {
      const r = Ce[this._type];
      this._content.css(r, `${e}px`), this._.css(r, `${t}px`).show(), this._maxValue = e - t;
    } else
      this._.hide();
    return this;
  }
}
function me(s, t) {
  let e = "text";
  t instanceof Object && t.type && (e = t.type);
  const { _editors: r } = s, o = r.get(e);
  return o !== void 0 && (o.changer((i) => {
    i !== null && T.setCellValue(s, i);
  }), o.moveChanger((i) => {
    const { _selector: n } = s;
    i !== "none" && n && (T.move(s, !0, i, 1), s._canvas.focus());
  })), o;
}
function be(s) {
  const { _editor: t, _selector: e, _renderer: r } = s;
  if (t && e) {
    const { _focusArea: o, _focus: i } = e;
    if (t.visible && o) {
      const { _rect: n, _target: l } = o, { viewport: h } = r;
      n && l && h && h.inAreas(...i) ? t.rect(n).target(l).show() : t.rect({ x: -100, y: -100, width: 0, height: 0 }).hide();
    }
  }
}
function xe(s) {
  const { _selector: t } = s;
  if (t) {
    const { _focusRange: e, _focusArea: r } = t;
    if (e && r) {
      const { _rect: o, _target: i } = r, { startRow: n, startCol: l } = e, h = s.cell(n, l), a = me(s, h);
      a != null && (s._editor = a, a && o && i && (h && a.value(h), a.cellIndex(n, l).rect(o).target(i).show()));
    }
  }
}
const lt = {
  move: be,
  reset: xe
};
function ve(s) {
  s._vScrollbar = new Ht("vertical", s._container).change(
    (t, e) => {
      oe(s._data, t, e) && (s.render(), T.reset(s), lt.move(s));
    }
  ), s._hScrollbar = new Ht("horizontal", s._container).change(
    (t, e) => {
      se(s._data, t, e) && (s.render(), T.reset(s), lt.move(s));
    }
  );
}
function Ae(s) {
  const { x: t, y: e, height: r, width: o } = s._contentRect;
  s._vScrollbar && s._vScrollbar.resize(s._height(), r + e), s._hScrollbar && s._hScrollbar.resize(s._width(), o + t);
}
function He(s, t, e) {
  if (!t) return;
  const { _selector: r, _vScrollbar: o, _hScrollbar: i, _data: n } = s, { viewport: l } = s._renderer;
  if (l && r) {
    const [, h, , a] = l.areas, c = a.range, d = h.range;
    if (o) {
      const u = (w, f, _) => {
        const C = s.rowsHeight(f, _ + 1);
        let R = 0;
        for (let p = w; R < C; p += 1)
          R += s.rowHeight(p);
        return R;
      };
      e ? t.endRow === e.endRow ? t.startRow < e.startRow ? t.startRow > d.endRow && t.startRow < c.startRow && o.scrollBy(
        -s.rowsHeight(t.startRow, c.startRow)
      ) : t.startRow > e.startRow && t.startRow >= c.endRow && o.scrollBy(
        u(c.startRow, c.endRow, t.startRow)
      ) : t.startRow === e.startRow && (t.endRow > e.endRow ? t.endRow >= c.endRow && o.scrollBy(
        u(c.startRow, c.endRow, t.endRow)
      ) : t.endRow < e.endRow && t.endRow < c.startRow && o.scrollBy(
        -s.rowsHeight(t.endRow, c.startRow)
      )) : t.endRow === n.rows.len - 1 ? o.scrollToEnd() : t.startRow === 0 ? o.scrollToStart() : t.endRow >= c.endRow ? o.scrollBy(
        u(c.startRow, c.endRow, t.endRow)
      ) : t.startRow > d.endRow && t.startRow < c.startRow && o.scrollBy(-s.rowsHeight(t.startRow, c.startRow));
    }
    if (i) {
      const u = (w, f, _) => {
        const C = s.colsWidth(f, _ + 1);
        let R = 0;
        for (let p = w; R < C; p += 1)
          R += s.colWidth(p);
        return R;
      };
      e ? t.endCol === e.endCol ? t.startCol < e.startCol ? t.startCol > d.endCol && t.startCol < c.startCol && i.scrollBy(
        -s.colsWidth(t.startCol, c.startCol)
      ) : t.startCol > e.startCol && t.startCol >= c.endCol && i.scrollBy(
        u(c.startCol, c.endCol, t.startCol)
      ) : t.startCol === e.startCol && (t.endCol > e.endCol ? t.endCol >= c.endCol && i.scrollBy(
        u(c.startCol, c.endCol, t.endCol)
      ) : t.endCol < e.endCol && t.endCol < c.startCol && i.scrollBy(-s.colsWidth(t.endCol, c.startCol))) : t.endCol === n.cols.len - 1 ? i.scrollToEnd() : t.startCol === 0 ? i.scrollToStart() : t.endCol >= c.endCol ? i.scrollBy(
        u(c.startCol, c.endCol, t.endCol)
      ) : t.startCol > d.endCol && t.startCol < c.startCol && i.scrollBy(-s.colsWidth(t.startCol, c.startCol));
    }
  }
}
const X = {
  init: ve,
  resize: Ae,
  autoMove: He
};
function Se(s) {
  s._selector = new ye(!!s._editable).autofillTrigger((t) => {
    const { _selector: e } = s;
    e && Dt(
      s,
      (r, o) => {
        const { currentRange: i } = e;
        if (i) {
          const n = i.clone();
          if (n.contains(r, o))
            e.autofillRange(null);
          else {
            const l = [
              n.startRow - r,
              r - n.endRow,
              n.startCol - o,
              o - n.endCol
            ], h = l.indexOf(Math.max.apply(null, l));
            h === 1 ? (n.startRow = n.endRow + 1, n.endRow = r) : h === 0 ? (n.endRow = n.startRow - 1, n.startRow = r) : h === 3 ? (n.startCol = n.endCol + 1, n.endCol = o) : h === 2 && (n.endCol = n.startCol - 1, n.startCol = o), e.autofillRange(n);
          }
        }
      },
      (r) => r._autofillRange,
      (r) => {
        s.copy(r._autofillRange, !0).render(), e.autofillRange(null), D(s);
      }
    );
  });
}
function $e(s, t) {
  const { _selector: e } = s;
  if (e) {
    e.clearCopy();
    const { _ranges: r } = e;
    r.forEach((o) => {
      o && o.each((i, n) => {
        s.cell(i, n, t);
      });
    }), s.render();
  }
}
function Bt(s, t, e, r) {
  const { _selector: o, _data: i } = s, n = x.create(t, e), l = kt(i, n);
  o && o.focus(t, e, l).addRange(o._placement === "body" ? l : n, r);
}
function Vt(s, t, e) {
  const { _selector: r, _data: o } = s;
  r && r.move(t, e).updateLastRange((i) => kt(o, i.union(x.create(t, e))));
}
function D(s) {
  const { _selector: t, _overlayer: e } = s, { _rowHeader: r, _colHeader: o, viewport: i } = s._renderer;
  if (t && i) {
    const { _placement: n } = t;
    t.clear();
    const l = r.width, h = o.height, a = (u, w) => {
      const f = u.clone();
      return (n === "all" || n === "row-header") && (f.endCol = w.endCol, u.startCol < w.startCol && (f.startCol = w.startCol)), (n === "all" || n === "col-header") && (f.endRow = w.endRow, u.startRow < w.startRow && (f.startRow = w.startRow)), f;
    }, c = ({ range: u }, w) => n === "body" ? u.intersects(w) : n === "col-header" ? u.intersectsCol(w.startCol, w.endCol) : n === "row-header" ? u.intersectsRow(w.startRow, w.endRow) : !0, d = (u, w, f) => {
      let _ = u.rect(w);
      return n === "col-header" ? (_ = u.rectCol(w.startCol, w.endCol), _.height += 2, (f === 2 || f === 3) && (_.y -= 2)) : n === "row-header" && (_ = u.rectRow(w.startRow, w.endRow), _.width += 2, (f === 0 || f === 3) && (_.x -= 2)), _;
    };
    i.areas.forEach((u, w) => {
      const f = e._areas[w], { _ranges: _, _focusRange: C, _copyRange: R, _autofillRange: p } = t;
      _.forEach((A, m) => {
        let y = c(u, A), v = d(u, A, w);
        if (y)
          if (m === _.length - 1) {
            if ((n !== "all" || u.range.intersects(A)) && t.addAreaOutline(v, f), C) {
              u.range.intersects(C) && t.setFocusArea(u.rect(C), f);
              const H = a(A, u.range), b = H.difference(C);
              b.length > 0 ? b.forEach((S) => {
                y = c(u, S), y && t.addArea(u.rect(S), f);
              }) : (n !== "body" || !A.equals(C)) && t.addArea(d(u, H, w), f);
            }
          } else
            t.addArea(v, f);
      }), R && u.range.intersects(R) && t.addCopyArea(u.rect(R), f), p && u.range.intersects(p) && t.addAutofillArea(u.rect(p), f);
    }), i.headerAreas.forEach((u, w) => {
      const f = e._headerAreas[w], { width: _, height: C } = u;
      w <= 1 ? n === "row-header" || n === "all" ? t.addColHeaderArea({ x: 0, y: 0, width: _, height: h }, f) : t._colHeaderRanges.forEach((R) => {
        u.range.intersectsCol(R.startCol, R.endCol) && t.addColHeaderArea(
          u.rectCol(R.startCol, R.endCol),
          f
        );
      }) : n === "col-header" || n === "all" ? t.addRowHeaderArea({ x: 0, y: 0, width: l, height: C }, f) : t._rowHeaderRanges.forEach((R) => {
        u.range.intersectsRow(R.startRow, R.endRow) && t.addRowHeaderArea(
          u.rectRow(R.startRow, R.endRow),
          f
        );
      });
    });
  }
}
function Te(s, t) {
  const { _selector: e, _data: r } = s;
  if (e) {
    const o = e._autofillRange;
    if (o)
      return t === "up" ? o.startRow = ot(r, o.startRow - 1, -1) : t === "down" ? o.endRow = ot(r, o.endRow + 1, 1) : t === "left" ? o.startCol = rt(r, o.startCol - 1, -1) : t === "right" && (o.endCol = rt(r, o.endCol + 1, 1)), X.autoMove(s, o), D(s), !0;
  }
  return !1;
}
function _t(s, t, e, r) {
  if (Te(s, e)) return;
  const { _selector: o, _data: i } = s, { viewport: n } = s._renderer;
  if (o && n) {
    const { _focusRange: l } = o;
    if (l) {
      let { startRow: h, startCol: a, endRow: c, endCol: d } = l;
      const { rows: u, cols: w } = i;
      let [f, _] = o._move;
      t || (h = c = f, a = d = _);
      const C = o.currentRange?.clone();
      r ? e === "up" ? f = ot(i, h - r, -1) : e === "down" ? f = ot(i, c + r, 1) : e === "left" ? _ = rt(i, a - r, -1) : e === "right" && (_ = rt(i, d + r, 1)) : e === "up" ? f = 0 : e === "down" ? f = u.len - 1 : e === "left" ? _ = 0 : e === "right" && (_ = w.len - 1), f >= 0 && f <= u.len - 1 && _ >= 0 && _ <= w.len - 1 && (t ? Bt(s, f, _, !0) : (Vt(s, f, _), o._move = [f, _])), o.placement("body"), X.autoMove(
        s,
        o.currentRange,
        t ? void 0 : C
      ), D(s);
    }
  }
}
function Dt(s, t, e, r = (o) => {
}) {
  const { _selector: o, _renderer: i } = s;
  if (!o) return;
  const { _placement: n } = o, l = { row: 0, col: 0 };
  if (n !== "all") {
    const { left: h, top: a } = s._canvas.rect();
    let c = [0, 0], d = null;
    const u = () => {
      d !== null && (clearInterval(d), d = null);
    };
    ge(window, (f) => {
      let [_, C] = [0, 0];
      f.x > 0 && (_ = f.x - h), f.y > 0 && (C = f.y - a), n === "row-header" && (_ = 1), n === "col-header" && (C = 1);
      const R = o.currentRange?.clone(), { target: p } = f;
      if (p.tagName === "CANVAS") {
        const A = i.viewport?.cellAt(_, C);
        if (A) {
          let { row: m, col: y } = A;
          (m != l.row || y !== l.col) && (t(m, y), n === "body" && X.autoMove(s, e(o), R), D(s), l.row = m, l.col = y);
        }
        u();
      } else if (d === null) {
        const A = f.x - c[0], m = f.y - c[1];
        A >= 0 && m >= 0 && (d = setInterval(() => {
          const y = e(o);
          if (y) {
            const { endRow: v, endCol: H } = y;
            A > m ? (_t(s, !1, "right", 1), s.isLastRow(v) && u()) : (_t(s, !1, "down", 1), s.isLastCol(H) && u());
          }
        }, 120));
      }
      c = [f.x, f.y];
    }, () => {
      u(), r(o);
    });
  }
}
function Ee(s) {
  s._selector && (s._selector.showCopy(), D(s));
}
function We(s) {
  s._selector && (s._selector.clearCopy(), D(s));
}
const T = {
  init: Se,
  setCellValue: $e,
  addRange: Bt,
  unionRange: Vt,
  reset: D,
  move: _t,
  bindMousemove: Dt,
  showCopy: Ee,
  clearCopy: We
};
function ze(s) {
  s._rowResizer = new xt(
    "row",
    s._container,
    s._minRowHeight,
    () => s._width(),
    (t, { row: e, height: r }) => {
      s.rowHeight(e, r + t).render(), T.reset(s), s._canvas.focus();
    }
  ), s._colResizer = new xt(
    "col",
    s._container,
    s._minColWidth,
    () => s._height(),
    (t, { col: e, width: r }) => {
      s.colWidth(e, r + t).render(), T.reset(s), s._canvas.focus();
    }
  );
}
const Oe = {
  init: ze
};
function Ie(s) {
  s._canvas.on("mousedown", (t) => ke(s, t)).on("mousemove", (t) => Me(s, t)).on("keydown", (t) => Le(s, t)).on("wheel", (t) => Pe(s, t)).on("contextmenu", (t) => je(s, t)).on("dblclick", (t) => {
    t.preventDefault(), lt.reset(s);
  });
}
function ke(s, t) {
  const { _selector: e, _renderer: r, _editor: o, _emitter: i } = s, { viewport: n } = r;
  if (o && o.changed(), e && n) {
    const { offsetX: l, offsetY: h, ctrlKey: a, metaKey: c, shiftKey: d } = t, u = n.cellAt(l, h);
    if (u) {
      i.emit("click", u, t);
      const { placement: w, row: f, col: _ } = u;
      d ? T.unionRange(s, f, _) : (e.placement(w), T.addRange(s, f, _, !(c || a)), w === "body" && X.autoMove(s, e.currentRange)), T.reset(s), T.bindMousemove(
        s,
        (C, R) => {
          T.unionRange(s, C, R);
        },
        (C) => C.currentRange
      );
    }
  }
}
function Me(s, t) {
  const { _rowResizer: e, _colResizer: r, _renderer: o } = s, { viewport: i } = o, { buttons: n, offsetX: l, offsetY: h } = t;
  if (i && n === 0) {
    const { _rowHeader: a, _colHeader: c } = s._renderer;
    if (e && a.width > 0)
      if (l < a.width && h > c.height) {
        const d = i.cellAt(l, h);
        d && e.show(d);
      } else
        e.hide();
    if (r && c.height > 0)
      if (h < c.height && l > a.width) {
        const d = i.cellAt(l, h);
        d && r.show(d);
      } else
        r.hide();
  }
}
function Pe(s, t) {
  t.preventDefault();
  const { deltaX: e, deltaY: r } = t, { _hScrollbar: o, _vScrollbar: i } = s;
  Math.abs(e) > Math.abs(r) ? o && o.scrollBy(e) : i && i.scrollBy(r);
}
function je(s, t) {
  t.preventDefault();
  const { _renderer: e, _editor: r, _emitter: o } = s, { viewport: i } = e;
  if (r && r.changed(), i) {
    const { offsetX: n, offsetY: l } = t, h = i.cellAt(n, l);
    o.emit("contextmenu", h, t);
  }
}
function Le(s, t) {
  const { ctrlKey: e, shiftKey: r, metaKey: o, altKey: i, code: n } = t;
  let l = null;
  if (n === "Enter" && !e && !o && !i)
    r ? l = "up" : l = "down";
  else if (n === "Tab" && !e && !o && !i)
    r ? l = "left" : l = "right";
  else if (n.startsWith("Arrow"))
    l = n.substring(5).toLowerCase();
  else if (!e && !o && !i && (n.startsWith("Key") || n.startsWith("Digit") || [
    "Minus",
    "Equal",
    "Space",
    "BracketLeft",
    "BracketRight",
    "Backslash",
    "Semicolon",
    "Quote",
    "Comma",
    "Period",
    "Slash"
  ].includes(n)))
    lt.reset(s), t.preventDefault();
  else if (n === "KeyC" && (e || o)) {
    const { _selector: h } = s;
    if (s._copyable && h) {
      const a = {}, c = h.currentRange;
      c && (T.showCopy(s), ["text/plain", "text/html"].forEach((d) => {
        const u = c.toString(), w = d === "text/html" ? s.toHtml(u) : Be(s, u);
        a[d] = new Blob([w], { type: d });
      }), navigator.clipboard.write([new ClipboardItem(a)]).then(
        () => console.log("clipboard has writed success"),
        (d) => console.log("clipboard has wirted failure: ", d)
      ));
    }
  } else n === "KeyV" && (e || o) ? s._editable && navigator.clipboard.read().then((h) => {
    if (h.length > 0) {
      const a = h[0];
      let c = r;
      c || (c = !St(a, "text/html", (d) => {
        s.fill(d).render();
      })), c && St(a, "text/plain", (d) => {
        s.fill(Ve(d)).render();
      });
    }
  }) : n === "Escape" && T.clearCopy(s);
  l && (T.move(
    s,
    !(n.startsWith("Arrow") && r),
    l,
    o || e ? void 0 : 1
  ), t.preventDefault());
}
function Be(s, t) {
  const e = x.with(t);
  let r = "";
  return e.eachRow((o) => {
    e.eachCol((i) => {
      let n = s.cellValueString(o, i);
      n.includes(`
`) && (n = `"${n}"`), r += `${n}	`;
    }), r += `
`;
  }), r;
}
function Ve(s) {
  const t = [];
  let [e, r] = [0, 0], o = "", i = 0;
  const n = () => {
    t[e] ||= [], t[e][r] = o, o = "";
  };
  for (let l of s) {
    if (l === "	") {
      n(), r += 1, i = 0;
      continue;
    }
    if (l === `
` && i !== 1) {
      n(), e += 1, r = 0;
      continue;
    }
    l !== '"' ? l !== "\r" && (o += l) : i += 1;
  }
  return r > 0 && n(), t.length <= 0 && t.push([s]), t;
}
function St(s, t, e = (r) => {
}) {
  return s.types.includes(t) ? (s.getType(t).then((r) => {
    r.text().then((o) => {
      e(o);
    });
  }), !0) : !1;
}
function De(s, t) {
  let e = '<table xmlns="http://www.w3.org/1999/xhtml" style="border-spacing: 0; border-collapse: collapse;">';
  const r = x.with(t), o = s._data.merges.map((l) => x.with(l)).filter((l) => l.intersects(r)), i = (l, h) => l === "dashed" || l === "dotted" ? `1px ${l} ${h}` : `${l === "thick" ? 3 : l === "medium" ? 2 : 1}px solid ${h}`, n = /* @__PURE__ */ new Map();
  for (let l of s._data.borders) {
    const [h, a, c, d] = l, u = x.with(h);
    if (u.intersects(r)) {
      const { startRow: w, startCol: f, endRow: _, endCol: C } = u;
      u.each((R, p) => {
        const A = i(c, d);
        let m = [];
        a === "all" && m.push("border"), (a === "outside" || a === "left") && p === f && m.push("border-left"), (a === "outside" || a === "right") && p === C && m.push("border-right"), (a === "outside" || a === "top") && R === w && m.push("border-top"), (a === "outside" || a === "bottom") && R === _ && m.push("border-bottom"), (a === "inside" || a === "vertical") && p >= f && p < C && m.push("border-right"), (a === "inside" || a === "horizontal") && R >= w && R < _ && m.push("border-bottom"), m.length > 0 && n.set(
          `${R}_${p}`,
          m.map((y) => `${y}:${A};`).join("")
        );
      });
    }
  }
  return e += "<colgroup>", r.eachCol((l) => {
    e += `<col width="${s.colWidth(l)}"/>`;
  }), e += "</colgroup>", e += "<tbody>", r.eachRow((l) => {
    e += `<tr style="height: ${s.rowHeight(l)}px;">`, r.eachCol((h) => {
      const a = s.cell(l, h), c = x.create(l, h);
      let d = !1, [u, w] = [1, 1];
      for (let f of o) {
        if (f.startRow === l && f.startCol === h) {
          u = f.rows + 1, w = f.cols + 1;
          break;
        }
        if (f.intersects(c)) {
          d = !0;
          break;
        }
      }
      if (!d) {
        e += "<td", u > 1 && (e += ` rowspan="${u}"`), w > 1 && (e += ` colspan="${w}"`);
        let f = "";
        const _ = `${l}_${h}`;
        n.has(_) && (f += n.get(_)), a && a instanceof Object && a.style !== void 0 && (f += Ke(s.style(a.style, !0))), f !== "" && (e += ` style="${f}"`), e += `>${s.cellValueString(l, h)}</td>`;
      }
    }), e += "</tr>";
  }), e + "</tbody></table>";
}
function Fe(s, t, [e, r]) {
  const o = [0, 0];
  if (t && t.includes("</table>")) {
    const { _data: i } = s, n = i.style, l = document.createElement("template");
    l.innerHTML = t;
    const h = [], a = l.content.querySelectorAll("tr");
    o[0] = e + a.length - 1;
    const c = [];
    if (a.forEach((d, u) => {
      const w = d.querySelectorAll("td");
      u === 0 && (o[1] = r + w.length - 1);
      let f = null;
      const _ = [];
      for (let R = 0; R < w.length; R += 1) {
        const p = w[R];
        let [A, m] = [u + e, R + r];
        h.length > 0 && h.forEach((g) => {
          g.containsRow(A) && g.startCol <= m && (m += g.cols, g.startRow !== A && (m += 1));
        });
        const y = tt(m, A);
        let [v, H] = [1, 1];
        if ($t(p, "rowspan", (g) => v = parseInt(g)), $t(p, "colspan", (g) => H = parseInt(g)), v > 1 || H > 1) {
          const g = x.create(A, m, A + v - 1, m + H - 1);
          s.merge(g.toString()), h.push(g);
        }
        u === 0 && (o[1] += H - 1);
        const b = {};
        M(
          p,
          "background-color",
          "",
          (g) => b.bgcolor = g
        ), M(
          p,
          "color",
          n.color,
          (g) => b.color = g
        ), M(
          p,
          "text-align",
          n.align,
          (g) => b.align = g
        ), M(
          p,
          "vertical-align",
          n.valign,
          (g) => b.valign = g
        ), J(
          p,
          "white-space",
          "normal",
          (g) => b.textwrap = !0
        ), J(
          p,
          "text-decoration",
          "underline",
          (g) => b.underline = !0
        ), J(
          p,
          "text-decoration",
          "line-through",
          (g) => b.strikethrough = !0
        ), J(
          p,
          "font-style",
          "italic",
          (g) => b.italic = !0
        ), M(p, "font-weight", "normal", (g) => {
          (g === "bold" || parseInt(g) >= 700) && (b.bold = !0);
        }), M(
          p,
          "font-family",
          n.fontFamily,
          (g) => b.fontFamily = g
        ), M(
          p,
          "font-size",
          n.fontSize,
          (g) => b.fontSize = parseInt(g)
        );
        const S = (g) => {
          const [k, $, ...F] = g.split(" ").map((N) => N.trim());
          let Z = "thin";
          if ($ === "solid") {
            let N = parseInt(k);
            k.includes("pt") && (N = ie(parseInt(k))), N === 2 ? Z = "medium" : N === 3 && (Z = "thick");
          } else
            Z = $;
          return [Z, F.join("")];
        };
        let W = [], E = null;
        M(
          p,
          "border-width",
          "",
          (g) => W.push(g)
        ), M(
          p,
          "border-style",
          "",
          (g) => W.push(g)
        ), M(
          p,
          "border-color",
          "",
          (g) => W.push(g)
        ), W.length >= 3 ? E = [y, "all", ...S(W.join(" "))] : M(
          p,
          "border",
          "none",
          (g) => E = [y, "all", ...S(g)]
        ) || ["top", "right", "bottom", "left"].forEach((g) => {
          M(
            p,
            `border-${g}`,
            "none",
            (k) => E = [y, g, ...S(k)]
          );
        }), f === null ? E !== null && (f = E) : E !== null && E[1] === f[1] && E[2] === f[2] && E[3] === f[3] ? f[0] = `${f[0].split(":")[0]}:${y}` : (_.push(f), f = E);
        const I = p.innerHTML.replace(/<br(\/){0,1}>/gi, `
`).replace(/(<([^>]+)>|)/gi, "").replace("&nbsp;", " "), z = {};
        Object.keys(b).length > 0 && (z.style = s.addStyle(b)), I !== null && !/^\s*$/.test(I) && (z.value = I), Object.keys(z).length > 0 && s.cell(A, m, z);
      }
      f != null && _.push(f);
      const C = c.at(-1);
      if (C && C.length > 0)
        if (C.length === 1 && _.length === 1 && C[0][1] === "all" && C[0][1] === _[0][1] && C[0][2] === _[0][2] && C[0][3] === _[0][3]) {
          const R = x.with(C[0][0]);
          R.endRow += 1, C[0][0] = R.toString();
        } else
          c.push(_);
      else
        c.push(_);
    }), c.length > 0)
      for (let d of c)
        d.forEach((u) => s.addBorder(...u));
  }
  return o;
}
function $t(s, t, e) {
  if (s.hasAttribute(t)) {
    const r = s.getAttribute(t);
    r != null && e(r);
  }
}
function M(s, t, e, r) {
  const o = s.style.getPropertyValue(t), i = o !== null && o !== "" && o !== e;
  return i && r(o), i;
}
function J(s, t, e, r) {
  const o = s.style.getPropertyValue(t);
  o === e && r(o);
}
function Ke(s) {
  let t = "";
  return s.bgcolor && (t += `background-color: ${s.bgcolor};`), s.color && (t += `color: ${s.color};`), s.align && (t += `text-align: ${s.align};`), s.valign && (t += `vertical-align: ${s.valign};`), s.textwrap === !0 && (t += "white-space: normal;"), s.underline === !0 && (t += "text-decoration: underline;"), s.strikethrough === !0 && (t += "text-decoration: line-through;"), s.bold === !0 && (t += "font-weight: bold;"), s.italic === !0 && (t += "font-style: italic;"), s.fontFamily && (t += `font-family: ${s.fontFamily};`), s.fontSize && (t += `font-size: ${s.fontSize}pt;`), t;
}
class Ge {
  _;
  _target = null;
  _rect = null;
  _value;
  _visible = !1;
  _moveChanger = () => {
  };
  _changer = () => {
  };
  constructor(t) {
    this._ = O("div", t);
  }
  get visible() {
    return this._visible;
  }
  target(t) {
    return t.append(this._), this._target = t, this;
  }
  cellIndex(t, e) {
    return this;
  }
  value(t) {
    return this._value = t, this;
  }
  changed() {
    this._changer(this._value), this.hide();
  }
  rect(t) {
    if (t) {
      this._visible = !0, this._rect = t;
      const { x: e, y: r, width: o, height: i } = t;
      this._.css({
        left: e - 2 / 2,
        top: r - 2 / 2,
        width: o - 2,
        height: i - 2
      }).show();
    }
    return this;
  }
  show() {
    return this._.show(), this;
  }
  hide() {
    return this._visible = !1, this.value(""), this._.hide(), this;
  }
  moveChanger(t) {
    return this._moveChanger = t, this;
  }
  changer(t) {
    return this._changer = t, this;
  }
}
class qe extends Ge {
  _text = O("textarea", "");
  _textMeasure = O("div", "measure");
  _editing = !1;
  constructor() {
    super(`${Y}-editor`), this._.append(this._text, this._textMeasure), this._text.on("keydown", (t) => {
      Xe(this, t);
    }).on("input", ({ target: t }) => {
      const { value: e } = t;
      this._editing = !0, this._value = e, this._changer(e), Tt(this);
    });
  }
  value(t) {
    return super.value(t), this._text.value(U(t) || ""), Tt(this), this;
  }
  rect(t) {
    return super.rect(t), t && setTimeout(() => {
      const { _value: e } = this;
      let r = 0;
      e !== null && (r = U(e).length);
      const o = this._text.element();
      o.focus(), o.setSelectionRange(r, r);
    }, 0), this;
  }
  hide() {
    return super.hide(), this._editing = !1, this;
  }
}
function Tt(s) {
  const { _: t, _value: e, _rect: r, _textMeasure: o, _target: i } = s;
  if (typeof e != "string") return;
  let n = e.replace(`
`, "<br/>");
  if (e.endsWith(`
`) && (n += "T"), o.html(n), r && i) {
    const l = parseInt(
      o.computedStyle().getPropertyValue("padding")
    ), h = i.offset(), a = h.width - r.x - 2, c = h.height - r.y - 2;
    t.css("max-width", `${a}px`), o.css("max-width", `${a - l * 2}px`);
    const { width: d, height: u } = o.rect(), w = r.width - 2;
    d > w && t.css({ width: d }), u > r.height && u <= c ? t.css({ height: u }) : u < r.height && t.css({ height: r.height - 2 });
  }
}
function Xe(s, t) {
  const { code: e, shiftKey: r, metaKey: o, altKey: i, ctrlKey: n, target: l } = t, h = (a) => {
    s._moveChanger(a), s.hide();
  };
  e === "Enter" ? (n || o || i ? (l.value += `
`, s.value(l.value)) : h(r ? "up" : "down"), t.preventDefault()) : e === "Tab" && !n && !o && !i && (h(r ? "left" : "right"), t.preventDefault());
}
class ht {
  // renderer options
  _rendererOptions = {};
  _copyable = !1;
  _editable = !1;
  _minRowHeight = 25;
  _minColWidth = 60;
  _width;
  _height;
  // cache for rect of content
  _contentRect = { x: 0, y: 0, width: 0, height: 0 };
  _container;
  _data;
  _renderer;
  _cells = new re();
  // scrollbar
  _vScrollbar = null;
  _hScrollbar = null;
  // resizer
  _rowResizer = null;
  _colResizer = null;
  // editor ? extends Editor
  _editor = null;
  _editors = /* @__PURE__ */ new Map();
  _selector = null;
  _overlayer;
  _canvas;
  // event emitter
  _emitter = new pe();
  constructor(t, e, r, o) {
    this._width = e, this._height = r;
    const i = typeof t == "string" ? document.querySelector(t) : t;
    if (i === null) throw new Error("first argument error");
    if (this._container = O(i, `${Y}-container`).css({
      height: r(),
      width: e()
    }), this._data = _e(), o) {
      const { minColWidth: l, minRowHeight: h, renderer: a, data: c } = o;
      if (l && (this._minColWidth = l), h && (this._minRowHeight = h), a && (this._rendererOptions = a), c) {
        const { cols: d, rows: u, rowHeight: w, colWidth: f } = c, { _data: _ } = this;
        d && (_.cols.len = d), u && (_.rows.len = u), w && (_.rowHeight = w), f && (_.colWidth = f);
      }
    }
    const n = document.createElement("canvas");
    this._canvas = O(n).attr("tabIndex", "1"), this._container.append(n), this._renderer = new at(n, e(), r()), this._overlayer = new Ft(this._container), Et(this), o?.selectable && T.init(this), o?.scrollable && X.init(this), o?.resizable && Oe.init(this), o?.editable && (this._editable = !0), this._copyable = o?.copyable || !1, this._editors.set("text", new qe()), Ie(this);
  }
  contentRect() {
    return this._contentRect;
  }
  container() {
    return this._container;
  }
  resize() {
    this._container.css({ height: this._height(), width: this._width() }), this._renderer.width(this._width()), this._renderer.height(this._height()), this.render();
  }
  freeze(t) {
    return this._data.freeze = t, this;
  }
  isMerged(t) {
    if (t) return yt(this._data, t);
    {
      const { _selector: e } = this;
      if (e)
        return e._ranges.every(
          (r) => yt(this._data, r.toString())
        );
    }
    return !1;
  }
  merge(t) {
    if (t) Ct(this._data, t);
    else {
      const { _selector: e } = this;
      e && e._ranges.forEach((r) => Ct(this._data, r.toString()));
    }
    return this;
  }
  unmerge(t) {
    if (t) mt(this._data, t);
    else {
      const { _selector: e } = this;
      e && e._ranges.forEach((r) => mt(this._data, r.toString()));
    }
    return this;
  }
  row(t, e) {
    return e ? (e.height && this.rowHeight(t, e.height), G(this._data, t, e), this) : G(this._data, t);
  }
  rowHeight(t, e) {
    const r = st(this._data, t);
    return e ? (r !== e && (st(this._data, t, e), this._contentRect.height += e - r), this) : r;
  }
  rowsHeight(t, e) {
    return Lt(this._data, t, e);
  }
  isLastRow(t) {
    return ue(this._data, t);
  }
  col(t, e) {
    return e ? (e.width && this.colWidth(t, e.width), K(this._data, t, e), this) : K(this._data, t);
  }
  colWidth(t, e) {
    const r = et(this._data, t);
    return e ? (r !== e && (et(this._data, t, e), this._contentRect.width += e - r), this) : r;
  }
  colsWidth(t, e) {
    return jt(this._data, t, e);
  }
  isLastCol(t) {
    return fe(this._data, t);
  }
  formulaParser(t) {
    return this._cells.formulaParser(t), this;
  }
  formatter(t) {
    return this._cells.formatter(t), this;
  }
  style(t, e = !0) {
    return ne(this._data, t, e);
  }
  addStyle(t) {
    return Pt(this._data, t);
  }
  clearStyles() {
    return le(this._data), this;
  }
  addBorder(...t) {
    return he(this._data, t), this;
  }
  clearBorder(t) {
    return ae(this._data, t), this;
  }
  clearBorders() {
    return ce(this._data), this;
  }
  cell(t, e, r) {
    const { _cells: o } = this;
    if (r)
      return o.set(t, e, r), this;
    const i = o.get(t, e);
    return i != null ? i[2] : i;
  }
  cellValue(t, e) {
    return Ot(this.cell(t, e));
  }
  cellValueString(t, e) {
    return U(this.cell(t, e));
  }
  render() {
    const { _data: t, _renderer: e, _overlayer: r } = this;
    for (let i in this._rendererOptions) {
      const n = this._rendererOptions[i];
      n && e[i](n);
    }
    e.scrollRows(t.scroll[0]).scrollCols(t.scroll[1]).merges(t.merges).freeze(t.freeze).styles(t.styles).borders(t.borders).rows(t.rows.len).cols(t.cols.len).row((i) => G(t, i)).col((i) => K(t, i)).cell((i, n) => this.cell(i, n)).formatter(this._cells._formatter).render();
    const { viewport: o } = e;
    return o && (o.areas.forEach((i, n) => {
      r.area(n, i);
    }), o.headerAreas.forEach((i, n) => {
      r.headerArea(n, i);
    }), X.resize(this)), this;
  }
  data(t) {
    return t ? (Object.assign(this._data, t), this._cells.load(this._data), Et(this), this) : this._data;
  }
  /**
   * copy data to ...
   * @param to
   * @param autofill
   */
  copy(t, e = !1) {
    if (!t) return this;
    const r = (i, n) => ({
      range: typeof i == "string" ? x.with(i) : i,
      cells: n._cells,
      data: n._data
    }), o = (i) => {
      const { _selector: n } = i;
      if (!n) return null;
      const l = n.currentRange;
      return l === void 0 ? null : r(l, i);
    };
    return de(
      o(this),
      t instanceof ht ? o(t) : r(t, this),
      e
    ), this;
  }
  fill(t, e) {
    const { _selector: r } = this;
    let [o, i] = [0, 0];
    if (e)
      [i, o] = q(e);
    else {
      if (!r) return this;
      [o, i] = r._focus;
    }
    let [n, l] = [0, 0];
    if (Array.isArray(t)) {
      for (let h = 0; h < t.length; h += 1) {
        const a = t[h];
        l = i + a.length - 1;
        for (let c = 0; c < a.length; c += 1)
          this.cell(o + h, i + c, a[c]);
      }
      n = o + t.length - 1;
    } else typeof t == "string" && ([n, l] = Fe(this, t, [o, i]));
    return (n > 0 || l > 0) && (T.unionRange(this, n, l), T.reset(this)), this;
  }
  /**
   * @param from A1:H12
   */
  toHtml(t) {
    return De(this, t);
  }
  toArrays(t) {
    const e = x.with(t), r = [];
    return e.eachRow((o) => {
      const i = [];
      e.eachCol((n) => {
        i.push(this.cellValue(o, n));
      }), r.push(i);
    }), r;
  }
  on(t, e) {
    return this._emitter.on(t, e), this;
  }
  /**
   * @param type keyof cell.type
   * @param editor
   * @returns
   */
  addEditor(t, e) {
    return this._editors.set(t, e), this;
  }
  static create(t, e, r, o) {
    return new ht(t, e, r, o);
  }
}
function Et(s) {
  s._contentRect = {
    x: s._renderer._rowHeader.width,
    y: s._renderer._colHeader.height,
    width: jt(s._data),
    height: Lt(s._data)
  };
}
window && (window.tiny ||= {}, window.tiny.table = ht.create);
export {
  Q as HElement,
  ht as default,
  O as h
};
