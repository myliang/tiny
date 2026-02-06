const E = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function J(i) {
  return E.charAt(i % E.length);
}
function U(i) {
  const t = [];
  for (; i >= 0; )
    t.push(J(i)), i = parseInt(i / E.length + "", 10) - 1;
  return t.reverse().join("");
}
function K(i) {
  let t = 0;
  for (let e = 0; e < i.length; e++)
    t = 26 * t + i.charCodeAt(e) - 64;
  return t - 1;
}
function D(i) {
  let t = "", e = "";
  for (let s = 0; s < i.length; s += 1)
    i.charAt(s) >= "0" && i.charAt(s) <= "9" ? e += i.charAt(s) : t += i.charAt(s).toUpperCase();
  return [K(t), parseInt(e, 10) - 1];
}
function L(i, t) {
  return `${U(i)}${t + 1}`;
}
function ot(i, t, e) {
  const [s, r] = D(i);
  return L(s + t, r + e);
}
class N {
  constructor(t, e) {
    this.target = t;
    const s = t.getContext("2d");
    if (!s) throw new Error("getContext(2d) is null");
    this._ctx = s, this._scale = e, this._target = t;
  }
  _target;
  _ctx;
  _scale;
  size(t, e) {
    const { _target: s, _scale: r } = this;
    s.style.width = `${t}px`, s.style.height = `${e}px`;
    const o = window.devicePixelRatio;
    return s.width = Math.floor(t * o), s.height = Math.floor(e * o), this._ctx.scale(o * r, o * r), this;
  }
  prop(t, e) {
    return e ? (this._ctx[t] = e, this) : typeof t == "string" ? this._ctx[t] : (Object.entries(t).forEach(([s, r]) => {
      r != null && (this._ctx[s] = r);
    }), this);
  }
  measureTextWidth(t) {
    return this.measureText(t).width;
  }
  // draw line
  line(t, e, s, r) {
    return this.moveTo(t, e).lineTo(s, r).stroke(), this;
  }
  // Drawing rectangles
  clearRect(t, e, s, r) {
    return this._ctx.clearRect(t, e, s, r), this;
  }
  fillRect(t, e, s, r) {
    return this._ctx.fillRect(t, e, s, r), this;
  }
  strokeRect(t, e, s, r) {
    return this._ctx.strokeRect(t, e, s, r), this;
  }
  // Drawing text
  fillText(t, e, s, r) {
    return this._ctx.fillText(t, e, s, r), this;
  }
  strokeText(t, e, s, r) {
    return this._ctx.strokeText(t, e, s, r), this;
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
  createLinearGradient(t, e, s, r) {
    return this._ctx.createLinearGradient(t, e, s, r);
  }
  createRadialGradient(t, e, s, r, o, n) {
    return this._ctx.createRadialGradient(t, e, s, r, o, n);
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
  bezierCurveTo(t, e, s, r, o, n) {
    return this._ctx.bezierCurveTo(t, e, s, r, o, n), this;
  }
  quadraticCurveTo(t, e, s, r) {
    return this._ctx.quadraticCurveTo(t, e, s, r), this;
  }
  arc(t, e, s, r, o, n) {
    return this._ctx.arc(t, e, s, r, o, n), this;
  }
  arcTo(t, e, s, r, o) {
    return this._ctx.arcTo(t, e, s, r, o), this;
  }
  ellipse(t, e, s, r, o, n, l, h) {
    return this._ctx.ellipse(
      t,
      e,
      s,
      r,
      o,
      n,
      l,
      h
    ), this;
  }
  rect(t, e, s, r) {
    return this._ctx.rect(t, e, s, r), this;
  }
  roundRect(t, e, s, r, o) {
    return this.beginPath().moveTo(t + o, e).arcTo(t + s, e, t + s, e + r, o).arcTo(t + s, e + r, t, e + r, o).arcTo(t, e + r, t, e, o).arcTo(t, e, t + s, e, o).closePath(), this;
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
  isPointInPath(t, e, s) {
    return this._ctx.isPointInPath(t, e, s);
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
  setTransform(t, e, s, r, o, n) {
    return this._ctx.setTransform(t, e, s, r, o, n), this;
  }
  // Drawing images
  drawImage(t, e, s) {
    return this._ctx.drawImage(t, e, s), this;
  }
  // Pixel manipulation
  createImageData(t, e) {
    return this._ctx.createImageData(t, e);
  }
  getImageData(t, e, s, r) {
    return this._ctx.getImageData(t, e, s, r);
  }
  putImageData(t, e, s) {
    return this._ctx.putImageData(t, e, s), this;
  }
  // The canvas state
  save() {
    return this._ctx.save(), this;
  }
  restore() {
    return this._ctx.restore(), this;
  }
}
class y {
  /**
   * @param startRow index of row of the start position
   * @param startCol index of col of the start position
   * @param endRow index of row of the end position
   * @param endCol index of col of the end position
   */
  constructor(t, e, s, r) {
    this.startRow = t, this.startCol = e, this.endRow = s, this.endCol = r;
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
  intersects({ startRow: t, startCol: e, endRow: s, endCol: r }) {
    return this.intersectsCol(e, r) && this.intersectsRow(t, s);
  }
  /**
   * the self intersection the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  intersection(t) {
    return new y(
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
    return new y(
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
    const { startRow: s, startCol: r, endRow: o, endCol: n } = this, l = this.intersection(t);
    return [
      new y(s, r, l.startRow - 1, n),
      // top
      new y(l.endRow + 1, r, o, n),
      // bottom
      new y(l.startRow, r, l.endRow, l.startCol - 1),
      // left
      new y(l.startRow, l.endCol + 1, l.endRow, n)
      // right
    ].filter((h) => h.rows >= 0 && h.cols >= 0);
  }
  touches(t) {
    return t.startRow === this.startRow && t.endRow === this.endRow && (t.endCol + 1 === this.startCol || this.endCol + 1 === t.startCol) || t.startCol === this.startCol && t.endCol === this.endCol && (t.endRow + 1 === this.startRow || this.endRow + 1 === this.startCol);
  }
  eachRow(t, e) {
    let { endRow: s } = this;
    e && s > e && (s = e);
    for (let r = this.startRow; r <= s; r += 1)
      t(r);
    return this;
  }
  eachCol(t, e) {
    let { endCol: s } = this;
    e && s > e && (s = e);
    for (let r = this.startCol; r <= s; r += 1)
      t(r);
    return this;
  }
  /**
   * @param {Function} cb (rowIndex, colIndex) => {}
   * @returns this
   */
  each(t) {
    return this.eachRow((e) => {
      this.eachCol((s) => t(e, s));
    }), this;
  }
  clone() {
    return new y(this.startRow, this.startCol, this.endRow, this.endCol);
  }
  toString() {
    let t = L(this.startCol, this.startRow);
    return this.multiple && (t += `:${L(this.endCol, this.endRow)}`), t;
  }
  equals(t) {
    return this.startRow === t.startRow && this.startCol === t.startCol && this.endRow === t.endRow && this.endCol === t.endCol;
  }
  static create(t, e, s, r) {
    if (s !== void 0 && r !== void 0) {
      let [o, n, l, h] = [t, e, s, r];
      return t > s && (o = s, l = t), e > r && (n = r, h = e), new y(o, n, l, h);
    }
    return new y(t, e, t, e);
  }
  static with(t) {
    const e = t.split(":"), [s, r] = D(e[0]);
    if (e.length === 1)
      return this.create(r, s);
    const [o, n] = D(e[1]);
    return this.create(r, s, n, o);
  }
}
function Q(i, t) {
  i && i.length > 0 && i.forEach((e) => {
    t(y.with(e));
  });
}
function nt(i, t) {
  if (i && i.length > 0)
    for (let e of i) {
      const s = y.with(e);
      if (t(s)) return s;
    }
  return null;
}
function X(i, t, e) {
  switch (i) {
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
function Y(i, t, e, s, r) {
  switch (i) {
    case "top":
      return r;
    case "middle":
      let o = t / 2 - e / 2;
      const n = s / 2 + r;
      return o < n ? n : o;
    case "bottom":
      return t - r - e;
    default:
      return 0;
  }
}
function Z(i, t, e, s, r, o, n) {
  let l = 0;
  i === "underline" ? e === "top" ? l = -n : e === "middle" && (l = -n / 2) : i === "strikethrough" && (e === "top" ? l = -n / 2 : e === "bottom" && (l = n / 2));
  let h = 0;
  return t === "center" ? h = o / 2 : t === "right" && (h = o), [s - h, r - l, s - h + o, r - l];
}
function tt(i, t, e, s) {
  if (i && t) {
    let r = "";
    return e && (r += "italic "), s && (r += "bold "), `${r} ${t}pt ${i}`;
  }
}
function G(i, t, e, s = !1) {
  let r, o, n, l;
  Array.isArray(e) ? r = o = n = l = e : { top: r, right: o, bottom: n, left: l } = e, i.save().beginPath().translate(t.x, t.y);
  const h = (c, a) => [
    [0 - a, 0, t.width + a, 0],
    [t.width, 0, t.width, t.height],
    [0 - a, t.height, t.width + a, t.height],
    [0, 0, 0, t.height]
  ][c];
  [r, o, n, l].forEach((c, a) => {
    if (c) {
      let w = [], _ = 1;
      c[0] === "thick" ? _ = 3 : c[0] === "medium" ? _ = 2 : c[0] === "dotted" ? w = [1, 1] : c[0] === "dashed" && (w = [2, 2]);
      let u = 0;
      s && (u = _ / 2), i.prop({ strokeStyle: c[1], lineWidth: _ }).setLineDash(w).line(...h(a, u));
    }
  }), i.restore();
}
function v(i, t, e, s, r, o) {
  let n = "";
  t && (typeof t == "string" || typeof t == "number" ? n = o(`${t}`) : n = o((t.value || "") + "", t.format));
  const {
    fontSize: l,
    fontFamily: h,
    bold: c,
    italic: a,
    color: w,
    bgcolor: _,
    align: u,
    valign: g,
    underline: H,
    strikethrough: P,
    rotate: T,
    textwrap: p,
    padding: A
  } = s;
  if (i.save().beginPath().translate(e.x, e.y), i.rect(0, 0, e.width, e.height).clip(), _ && i.prop("fillStyle", _).fill(), T && T > 0 && i.rotate(T * (Math.PI / 180)), r !== void 0) {
    if (i.save(), !r(i, e, t, n)) {
      i.restore();
      return;
    }
    i.restore();
  }
  if (n && !/^\s*$/.test(n)) {
    i.save().beginPath().prop({
      textAlign: u,
      textBaseline: g,
      font: tt(h, l, a, c),
      fillStyle: w
    });
    const [m, f] = A || [5, 5], d = X(u, e.width, m), C = n.split(`
`), x = e.width - m * 2, R = [];
    C.forEach((S) => {
      const O = i.measureTextWidth(S);
      if (p && O > x) {
        let b = { w: 0, len: 0, start: 0 };
        for (let j = 0; j < S.length; j += 1)
          b.w > x && (R.push(S.substr(b.start, b.len)), b = { w: 0, len: 0, start: j }), b.len += 1, b.w += i.measureTextWidth(S[j]) + 1;
        b.len > 0 && R.push(S.substr(b.start, b.len));
      } else
        R.push(S);
    });
    const z = l / 0.75, $ = (R.length - 1) * z, I = [];
    H && I.push("underline"), P && I.push("strikethrough");
    let M = Y(g, e.height, $, z, f);
    R.forEach((S) => {
      const O = i.measureTextWidth(S);
      i.fillText(S, d, M), I.forEach((b) => {
        i.line(
          ...Z(b, u, g, d, M, O, l)
        );
      }), M += z;
    }), i.restore();
  }
  i.restore();
}
function V(i, [t, e, ...s], r) {
  const o = [], n = y.with(t), l = r.filter((h) => h.intersects(n));
  if (n.intersects(i.range) || l.length > 0)
    if (l.length <= 0)
      o.push([n, i.rect(n), e]);
    else
      for (let h of l)
        if (n.within(h))
          n.startRow === h.startRow && n.startCol === h.startCol && e !== "inside" && e !== "horizontal" && e !== "vertical" && o.push([
            h,
            i.rect(h),
            e === "all" ? "outside" : e
          ]);
        else if (e === "outside" || e === "left" || e === "top" || e === "right" || e === "bottom") {
          o.push([n, i.rect(n), e]);
          break;
        } else {
          const c = l.filter((a) => !a.equals(h));
          if (n.difference(h).forEach((a) => {
            if (a.intersects(i.range)) {
              const w = i.rect(a);
              o.push(
                ...V(
                  i,
                  [a.toString(), e, ...s],
                  c
                )
              ), (e === "inside" || e === "horizontal") && (a.startRow < h.startRow && a.endRow < h.startRow ? o.push([a, w, "bottom"]) : a.startRow > h.startRow && a.endRow > h.startRow && o.push([a, w, "top"])), (e === "inside" || e === "vertical") && (a.startCol < h.startCol && a.endCol < h.startCol && o.push([a, w, "right"]), a.startCol > h.startCol && a.endCol > h.startCol && o.push([a, w, "left"]));
            }
          }), e === "all") {
            const a = i.rect(h);
            n.startRow === h.startRow && o.push([h, a, "top"]), n.endRow === h.endRow && o.push([h, a, "bottom"]), n.startCol === h.startCol && o.push([h, a, "left"]), n.endCol === h.endCol && o.push([h, a, "right"]);
          }
          break;
        }
  return o;
}
function q(i, { width: t, color: e }, s) {
  t > 0 && (i.save().beginPath().prop({ lineWidth: t - 0.5, strokeStyle: e }), s(), i.restore());
}
function F(i, t, { x: e, y: s, width: r, height: o }) {
  q(i, t, () => {
    i.translate(e, s).line(r, 0, r, o).line(0, o, r, o);
  });
}
function et(i, t, e, s, r, o, n, l) {
  const h = [o, n];
  r === "outside" || r === "all" ? G(i, s, h, !0) : r === "left" ? G(i, s, { left: h }, l) : r === "top" ? G(i, s, { top: h }, l) : r === "right" ? G(i, s, { right: h }, l) : r === "bottom" && G(
    i,
    s,
    { bottom: h },
    l
  ), (r === "all" || r === "inside" || r === "horizontal" || r === "vertical") && (r !== "horizontal" && e.eachCol((c) => {
    if (c < e.endCol) {
      const a = e.clone();
      a.endCol = a.startCol = c, a.intersects(t.range) && G(
        i,
        t.rect(a),
        { right: h },
        l
      );
    }
  }), r !== "vertical" && e.eachRow((c) => {
    if (c < e.endRow) {
      const a = e.clone();
      a.endRow = a.startRow = c, a.intersects(t.range) && G(
        i,
        t.rect(a),
        { bottom: h },
        l
      );
    }
  }));
}
function st(i, t, e, s) {
  e && e.length > 0 && e.forEach((r) => {
    const [, , o, n] = r;
    V(t, r, s).forEach(([l, h, c]) => {
      et(i, t, l, h, c, o, n);
    });
  });
}
function k(i, t, e, s) {
  if (!e) return;
  let r, o, n = (f) => f, l = s._headerStyle, h = s._headerGridline, c = s._styles, a, w, _, u;
  const { _rowHeader: g, _colHeader: H } = s;
  if (i === "row-header") {
    if (g.width <= 0) return;
    ({ cell: r, merges: a, cellRenderer: o } = g);
  } else if (i === "col-header") {
    if (H.height <= 0) return;
    ({ cell: r, merges: a, cellRenderer: o } = H);
  } else
    r = s._cell, o = s._cellRenderer, n = s._formatter, l = s._style, h = s._gridline, c = s._styles, a = s._merges, w = s._borders, _ = s._row, u = s._col;
  t.save().translate(e.x, e.y).prop("fillStyle", s._bgcolor).rect(0, 0, e.width, e.height).fill().clip();
  const P = (f, d, C) => {
    const x = { ...l };
    if (_) {
      const R = _(f);
      R && R.style !== void 0 && Object.assign(x, c[R.style]);
    }
    if (u) {
      const R = u(d);
      R && R.style !== void 0 && Object.assign(x, c[R.style]);
    }
    return C instanceof Object && C.style !== void 0 && Object.assign(x, c[C.style]), x;
  }, T = [], p = [], A = /* @__PURE__ */ new Set();
  a && Q(a, (f) => {
    if (f.intersects(e.range)) {
      const d = r(f.startRow, f.startCol), C = P(f.startRow, f.startCol, d), x = e.rect(f);
      p.push([d, x, C]), T.push(f), f.each((R, z) => {
        A.add(`${R}_${z}`);
      });
    }
  });
  const m = (f, d, C) => {
    i === "body" ? (F(t, h, d), v(t, f, d, C, o, n)) : (v(t, f, d, C, o, n), F(t, h, d));
  };
  e.each((f, d, C) => {
    if (!A.has(`${f}_${d}`)) {
      const x = r(f, d);
      m(x, C, P(f, d, x));
    }
  }), p.forEach((f) => m(...f)), st(t, e, w, T), t.restore();
}
function rt(i) {
  const {
    _width: t,
    _height: e,
    _target: s,
    _scale: r,
    _viewport: o,
    _freeze: n,
    _rowHeader: l,
    _colHeader: h
  } = i;
  if (o) {
    const c = new N(s, r);
    c.size(t, e);
    const [a, w, _, u] = o.areas, [g, H, P, T] = o.headerAreas;
    k("body", c, u, i), k("body", c, a, i), k("col-header", c, g, i), k("body", c, _, i), k("row-header", c, T, i), k("body", c, w, i), k("col-header", c, H, i), k("row-header", c, P, i);
    const [p, A] = n;
    (A > 0 || p > 0) && q(c, i._freezeGridline, () => {
      A > 0 && c.line(0, u.y, t, u.y), p > 0 && c.line(u.x, 0, u.x, e);
    });
    const { x: m, y: f } = w;
    if (m > 0 && f > 0) {
      const { height: d } = h, { width: C } = l, { bgcolor: x } = i._headerStyle;
      x && c.save().prop({ fillStyle: x }).rect(0, 0, C, d).fill().restore(), q(c, i._headerGridline, () => {
        c.line(0, d, C, d).line(C, 0, C, d);
      });
    }
  }
}
class W {
  constructor(t, e, s, r, o, n, l) {
    this.range = t, this.x = e, this.y = s, this.width = r, this.height = o, this.rowHeight = n, this.colWidth = l;
    let h = 0;
    t.eachRow((a) => {
      const w = n(a);
      this.rowMap.set(a, { y: h, height: w }), h += w;
    }), this.height <= 0 && (this.height = h);
    let c = 0;
    t.eachCol((a) => {
      const w = l(a);
      this.colMap.set(a, { x: c, width: w }), c += w;
    }), this.width <= 0 && (this.width = c);
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
      const { y: s, height: r } = this.rowMap.get(e) || { y: 0, height: 0 };
      r > 0 && t(e, s, r);
    });
  }
  eachCol(t) {
    this.range.eachCol((e) => {
      const { x: s, width: r } = this.colMap.get(e) || { x: 0, width: 0 };
      r > 0 && t(e, s, r);
    });
  }
  each(t) {
    this.eachRow((e, s, r) => {
      this.eachCol((o, n, l) => {
        t(e, o, { x: n, y: s, width: l, height: r });
      });
    });
  }
  rectRow(t, e) {
    const { rowMap: s, range: r } = this;
    let [o, n] = [0, 0];
    t >= r.startRow && (o = s.get(t)?.y || 0);
    for (let h = t; h <= e; h += 1) {
      const c = this.rowHeight(h);
      c > 0 && (h < r.startRow && (o -= c), n += c);
    }
    const { width: l } = this;
    return { x: 0, y: o, width: l, height: n };
  }
  rectCol(t, e) {
    const { colMap: s, range: r } = this;
    let [o, n] = [0, 0];
    t >= r.startCol && (o = s.get(t)?.x || 0);
    for (let h = t; h <= e; h += 1) {
      const c = this.colWidth(h);
      c > 0 && (h < r.startCol && (o -= c), n += c);
    }
    const { height: l } = this;
    return { x: o, y: 0, width: n, height: l };
  }
  rect(t) {
    let { y: e, height: s } = this.rectRow(t.startRow, t.endRow), { x: r, width: o } = this.rectCol(t.startCol, t.endCol);
    return { x: r, y: e, width: o, height: s };
  }
  cellAtCache = null;
  cellAt(t, e) {
    const { cellAtCache: s } = this;
    if (s != null && t > s.x && t <= s.x + s.width && e > s.y && e <= s.y + s.height)
      return s;
    const { startRow: r, startCol: o } = this.range, n = {
      row: r,
      col: o,
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
  static create(t, e, s, r, o, n, l, h, c, a) {
    return new W(
      new y(t, e, s, r),
      o,
      n,
      l,
      h,
      c,
      a
    );
  }
}
class it {
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
    const [e, s] = [t._rowHeader.width, t._colHeader.height], [r, o] = t._freeze, { _startRow: n, _startCol: l, _rows: h, _cols: c, _width: a, _height: w } = t, _ = (b) => t.rowHeightAt(b), u = (b) => t.colWidthAt(b), g = W.create(
      n,
      l,
      r - 1,
      o - 1,
      e,
      s,
      0,
      0,
      _,
      u
    ), [H, P] = [
      r + t._scrollRows,
      o + t._scrollCols
    ];
    let T = g.height + s, p = H;
    for (; T < w && p < h; )
      T += _(p), p += 1;
    let A = g.width + e, m = P;
    for (; A < a && m < c; )
      A += u(m), m += 1;
    const f = e + g.width, d = s + g.height;
    let C = a - f, x = w - d;
    m === c && (C -= a - A), p === h && (x -= w - T), m -= 1, p -= 1;
    const R = W.create(
      H,
      P,
      p,
      m,
      f,
      d,
      C,
      x,
      _,
      u
    ), z = W.create(
      n,
      P,
      r - 1,
      m,
      f,
      s,
      C,
      0,
      _,
      u
    ), $ = W.create(
      H,
      l,
      p,
      o - 1,
      e,
      d,
      0,
      x,
      _,
      u
    );
    this.areas = [z, g, $, R];
    const { _rowHeader: I, _colHeader: M } = t, S = () => M.height / M.rows, O = () => I.width / I.cols;
    this.headerAreas = [
      W.create(
        0,
        z.range.startCol,
        M.rows - 1,
        z.range.endCol,
        R.x,
        0,
        R.width,
        0,
        S,
        u
      ),
      W.create(
        0,
        g.range.startCol,
        M.rows - 1,
        g.range.endCol,
        g.x,
        0,
        g.width,
        0,
        S,
        u
      ),
      W.create(
        g.range.startRow,
        0,
        g.range.endRow,
        I.cols - 1,
        0,
        g.y,
        0,
        g.height,
        _,
        O
      ),
      W.create(
        $.range.startRow,
        0,
        $.range.endRow,
        I.cols - 1,
        0,
        R.y,
        0,
        R.height,
        _,
        O
      )
    ];
  }
  inAreas(t, e) {
    for (let s of this.areas)
      if (s.range.contains(t, e))
        return !0;
    return !1;
  }
  cellAt(t, e) {
    const s = this.areas[1], [r, o, n, l] = this.headerAreas;
    if (t < s.x && e < s.y)
      return {
        placement: "all",
        row: 0,
        col: 0,
        x: 0,
        y: 0,
        width: s.x,
        height: s.y
      };
    if (t < s.x)
      return {
        placement: "row-header",
        ...(n.containsy(e) ? n : l).cellAt(t, e)
      };
    if (e < s.y)
      return {
        placement: "col-header",
        ...(o.containsx(t) ? o : r).cellAt(t, e)
      };
    for (let h of this.areas)
      if (h.contains(t, e))
        return { placement: "body", ...h.cellAt(t, e) };
    return null;
  }
}
class B {
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
      return U(e);
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
  constructor(t, e, s) {
    const r = typeof t == "string" ? document.querySelector(t) : t;
    if (!r) throw new Error("target error");
    this._target = r, this._width = e, this._height = s;
  }
  render() {
    return this._viewport = new it(this), rt(this), this;
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
    return t && (this._freeze = D(t).reverse()), this;
  }
  freezeGridline(t) {
    return t && Object.assign(this._freezeGridline, t), this;
  }
  // get methods ---- start ------
  rowHeightAt(t) {
    const { _row: e } = this;
    if (e) {
      const s = e(t);
      if (s) return s.hide === !0 ? 0 : s.height;
    }
    return this._rowHeight;
  }
  colWidthAt(t) {
    const { _col: e } = this;
    if (e) {
      const s = e(t);
      if (s) return s.hide === !0 ? 0 : s.width;
    }
    return this._colWidth;
  }
  get viewport() {
    return this._viewport;
  }
  // get methods ---- end -------
  static create(t, e, s) {
    return new B(t, e, s);
  }
}
try {
  window && (window.tiny ||= {}, window.tiny.table_renderer = B.create);
} catch {
}
export {
  W as Area,
  N as Canvas,
  y as Range,
  it as Viewport,
  B as default,
  Q as eachRanges,
  ot as expr2expr,
  D as expr2xy,
  nt as findRanges,
  U as stringAt,
  L as xy2expr
};
