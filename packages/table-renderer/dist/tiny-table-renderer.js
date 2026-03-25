const E = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function K(i) {
  return E.charAt(i % E.length);
}
function V(i) {
  const t = [];
  for (; i >= 0; )
    t.push(K(i)), i = parseInt(i / E.length + "", 10) - 1;
  return t.reverse().join("");
}
function N(i) {
  let t = 0;
  for (let e = 0; e < i.length; e++)
    t = 26 * t + i.charCodeAt(e) - 64;
  return t - 1;
}
function D(i) {
  let t = "", e = "";
  for (let s = 0; s < i.length; s += 1)
    i.charAt(s) >= "0" && i.charAt(s) <= "9" ? e += i.charAt(s) : t += i.charAt(s).toUpperCase();
  return [N(t), parseInt(e, 10) - 1];
}
function L(i, t) {
  return `${V(i)}${t + 1}`;
}
function lt(i, t, e) {
  const [s, r] = D(i);
  return L(s + t, r + e);
}
class Q {
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
  ellipse(t, e, s, r, o, n, h, l) {
    return this._ctx.ellipse(
      t,
      e,
      s,
      r,
      o,
      n,
      h,
      l
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
    const { startRow: s, startCol: r, endRow: o, endCol: n } = this, h = this.intersection(t);
    return [
      new y(s, r, h.startRow - 1, n),
      // top
      new y(h.endRow + 1, r, o, n),
      // bottom
      new y(h.startRow, r, h.endRow, h.startCol - 1),
      // left
      new y(h.startRow, h.endCol + 1, h.endRow, n)
      // right
    ].filter((l) => l.rows >= 0 && l.cols >= 0);
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
      let [o, n, h, l] = [t, e, s, r];
      return t > s && (o = s, h = t), e > r && (n = r, l = e), new y(o, n, h, l);
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
function X(i, t) {
  i && i.length > 0 && i.forEach((e) => {
    t(y.with(e));
  });
}
function ht(i, t) {
  if (i && i.length > 0)
    for (let e of i) {
      const s = y.with(e);
      if (t(s)) return s;
    }
  return null;
}
function Y(i, t, e) {
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
function Z(i, t, e, s, r) {
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
function tt(i, t, e, s, r, o, n) {
  let h = 0;
  i === "underline" ? e === "top" ? h = -n : e === "middle" && (h = -n / 2) : i === "strikethrough" && (e === "top" ? h = -n / 2 : e === "bottom" && (h = n / 2));
  let l = 0;
  return t === "center" ? l = o / 2 : t === "right" && (l = o), [s - l, r - h, s - l + o, r - h];
}
function et(i, t, e, s) {
  if (i && t) {
    let r = "";
    return e && (r += "italic "), s && (r += "bold "), `${r} ${t}pt ${i}`;
  }
}
function G(i, t, e, s = !1) {
  let r, o, n, h;
  Array.isArray(e) ? r = o = n = h = e : { top: r, right: o, bottom: n, left: h } = e, i.save().beginPath().translate(t.x, t.y);
  const l = (a, c) => [
    [0 - c, 0, t.width + c, 0],
    [t.width, 0, t.width, t.height],
    [0 - c, t.height, t.width + c, t.height],
    [0, 0, 0, t.height]
  ][a];
  [r, o, n, h].forEach((a, c) => {
    if (a) {
      let d = [], C = 1;
      a[0] === "thick" ? C = 3 : a[0] === "medium" ? C = 2 : a[0] === "dotted" ? d = [1, 1] : a[0] === "dashed" && (d = [2, 2]);
      let u = 0;
      s && (u = C / 2), i.prop({ strokeStyle: a[1], lineWidth: C }).setLineDash(d).line(...l(c, u));
    }
  }), i.restore();
}
function q(i, t, e, s, r, o) {
  let n = "";
  t && (o ? n = o(t) : n = J(t));
  const {
    fontSize: h,
    fontFamily: l,
    bold: a,
    italic: c,
    color: d,
    bgcolor: C,
    align: u,
    valign: R,
    underline: H,
    strikethrough: P,
    rotate: T,
    textwrap: p,
    padding: A
  } = s;
  if (i.save().beginPath().translate(e.x, e.y), i.rect(0, 0, e.width, e.height).clip(), C && i.prop("fillStyle", C).fill(), T && T > 0 && i.rotate(T * (Math.PI / 180)), r !== void 0) {
    if (i.save(), !r(i, e, t, n)) {
      i.restore();
      return;
    }
    i.restore();
  }
  if (n && !/^\s*$/.test(n)) {
    i.save().beginPath().prop({
      textAlign: u,
      textBaseline: R,
      font: et(l, h, c, a),
      fillStyle: d
    });
    const [b, f] = A || [5, 5], w = Y(u, e.width, b), x = n.split(`
`), g = e.width - b * 2, _ = [];
    x.forEach((S) => {
      const O = i.measureTextWidth(S);
      if (p && O > g) {
        let m = { w: 0, len: 0, start: 0 };
        for (let $ = 0; $ < S.length; $ += 1)
          m.w > g && (_.push(S.substr(m.start, m.len)), m = { w: 0, len: 0, start: $ }), m.len += 1, m.w += i.measureTextWidth(S[$]) + 1;
        m.len > 0 && _.push(S.substr(m.start, m.len));
      } else
        _.push(S);
    });
    const W = h / 0.75, j = (_.length - 1) * W, z = [];
    H && z.push("underline"), P && z.push("strikethrough");
    let M = Z(R, e.height, j, W, f);
    _.forEach((S) => {
      const O = i.measureTextWidth(S);
      i.fillText(S, w, M), z.forEach((m) => {
        i.line(
          ...tt(m, u, R, w, M, O, h)
        );
      }), M += W;
    }), i.restore();
  }
  i.restore();
}
function U(i, [t, e, ...s], r) {
  const o = [], n = y.with(t), h = r.filter((l) => l.intersects(n));
  if (n.intersects(i.range) || h.length > 0)
    if (h.length <= 0)
      o.push([n, i.rect(n), e]);
    else
      for (let l of h)
        if (n.within(l))
          n.startRow === l.startRow && n.startCol === l.startCol && e !== "inside" && e !== "horizontal" && e !== "vertical" && o.push([
            l,
            i.rect(l),
            e === "all" ? "outside" : e
          ]);
        else if (e === "outside" || e === "left" || e === "top" || e === "right" || e === "bottom") {
          o.push([n, i.rect(n), e]);
          break;
        } else {
          const a = h.filter((c) => !c.equals(l));
          if (n.difference(l).forEach((c) => {
            if (c.intersects(i.range)) {
              const d = i.rect(c);
              o.push(
                ...U(
                  i,
                  [c.toString(), e, ...s],
                  a
                )
              ), (e === "inside" || e === "horizontal") && (c.startRow < l.startRow && c.endRow < l.startRow ? o.push([c, d, "bottom"]) : c.startRow > l.startRow && c.endRow > l.startRow && o.push([c, d, "top"])), (e === "inside" || e === "vertical") && (c.startCol < l.startCol && c.endCol < l.startCol && o.push([c, d, "right"]), c.startCol > l.startCol && c.endCol > l.startCol && o.push([c, d, "left"]));
            }
          }), e === "all") {
            const c = i.rect(l);
            n.startRow === l.startRow && o.push([l, c, "top"]), n.endRow === l.endRow && o.push([l, c, "bottom"]), n.startCol === l.startCol && o.push([l, c, "left"]), n.endCol === l.endCol && o.push([l, c, "right"]);
          }
          break;
        }
  return o;
}
function F(i, { width: t, color: e }, s) {
  t > 0 && (i.save().beginPath().prop({ lineWidth: t - 0.5, strokeStyle: e }), s(), i.restore());
}
function B(i, t, { x: e, y: s, width: r, height: o }) {
  F(i, t, () => {
    i.translate(e, s).line(r, 0, r, o).line(0, o, r, o);
  });
}
function st(i, t, e, s, r, o, n, h) {
  const l = [o, n];
  r === "outside" || r === "all" ? G(i, s, l, !0) : r === "left" ? G(i, s, { left: l }, h) : r === "top" ? G(i, s, { top: l }, h) : r === "right" ? G(i, s, { right: l }, h) : r === "bottom" && G(
    i,
    s,
    { bottom: l },
    h
  ), (r === "all" || r === "inside" || r === "horizontal" || r === "vertical") && (r !== "horizontal" && e.eachCol((a) => {
    if (a < e.endCol) {
      const c = e.clone();
      c.endCol = c.startCol = a, c.intersects(t.range) && G(
        i,
        t.rect(c),
        { right: l },
        h
      );
    }
  }), r !== "vertical" && e.eachRow((a) => {
    if (a < e.endRow) {
      const c = e.clone();
      c.endRow = c.startRow = a, c.intersects(t.range) && G(
        i,
        t.rect(c),
        { bottom: l },
        h
      );
    }
  }));
}
function rt(i, t, e, s) {
  e && e.length > 0 && e.forEach((r) => {
    const [, , o, n] = r;
    U(t, r, s).forEach(([h, l, a]) => {
      st(i, t, h, l, a, o, n);
    });
  });
}
function k(i, t, e, s) {
  if (!e) return;
  let r, o, n, h = s._headerStyle, l = s._headerGridline, a = s._styles, c, d, C, u;
  const { _rowHeader: R, _colHeader: H } = s;
  if (i === "row-header") {
    if (R.width <= 0) return;
    ({ cell: r, merges: c, cellRenderer: o } = R);
  } else if (i === "col-header") {
    if (H.height <= 0) return;
    ({ cell: r, merges: c, cellRenderer: o } = H);
  } else
    r = s._cell, o = s._cellRenderer, n = s._cellFormatter, h = s._style, l = s._gridline, a = s._styles, c = s._merges, d = s._borders, C = s._row, u = s._col;
  t.save().translate(e.x, e.y).prop("fillStyle", s._bgcolor).rect(0, 0, e.width, e.height).fill().clip();
  const P = (f, w, x) => {
    const g = { ...h };
    if (C) {
      const _ = C(f);
      _ && _.style !== void 0 && Object.assign(g, a[_.style]);
    }
    if (u) {
      const _ = u(w);
      _ && _.style !== void 0 && Object.assign(g, a[_.style]);
    }
    return x instanceof Object && x.style !== void 0 && Object.assign(g, a[x.style]), g;
  }, T = [], p = [], A = /* @__PURE__ */ new Set();
  c && X(c, (f) => {
    if (f.intersects(e.range)) {
      const w = r(f.startRow, f.startCol), x = P(f.startRow, f.startCol, w), g = e.rect(f);
      p.push([
        f.startRow,
        f.startCol,
        w,
        g,
        x
      ]), T.push(f), f.each((_, W) => {
        A.add(`${_}_${W}`);
      });
    }
  });
  const b = (f, w, x, g, _) => {
    i === "body" ? (B(t, l, g), q(
      t,
      x,
      g,
      _,
      o(f, w),
      n(f, w)
    )) : (q(t, x, g, _, o(f, w), void 0), B(t, l, g));
  };
  e.each((f, w, x) => {
    if (!A.has(`${f}_${w}`)) {
      const g = r(f, w);
      b(f, w, g, x, P(f, w, g));
    }
  }), p.forEach((f, w) => b(...f)), rt(t, e, d, T), t.restore();
}
function it(i) {
  const {
    _width: t,
    _height: e,
    _target: s,
    _scale: r,
    _viewport: o,
    _freeze: n,
    _rowHeader: h,
    _colHeader: l
  } = i;
  if (o) {
    const a = new Q(s, r);
    a.size(t, e);
    const [c, d, C, u] = o.areas, [R, H, P, T] = o.headerAreas;
    k("body", a, u, i), k("body", a, c, i), k("col-header", a, R, i), k("body", a, C, i), k("row-header", a, T, i), k("body", a, d, i), k("col-header", a, H, i), k("row-header", a, P, i);
    const [p, A] = n;
    (A > 0 || p > 0) && F(a, i._freezeGridline, () => {
      A > 0 && a.line(0, u.y, t, u.y), p > 0 && a.line(u.x, 0, u.x, e);
    });
    const { x: b, y: f } = d;
    if (b > 0 && f > 0) {
      const { height: w } = l, { width: x } = h, { bgcolor: g } = i._headerStyle;
      g && a.save().prop({ fillStyle: g }).rect(0, 0, x, w).fill().restore(), F(a, i._headerGridline, () => {
        a.line(0, w, x, w).line(x, 0, x, w);
      });
    }
  }
}
class I {
  constructor(t, e, s, r, o, n, h) {
    this.range = t, this.x = e, this.y = s, this.width = r, this.height = o, this.rowHeight = n, this.colWidth = h;
    let l = 0;
    t.eachRow((c) => {
      const d = n(c);
      this.rowMap.set(c, { y: l, height: d }), l += d;
    }), this.height <= 0 && (this.height = l);
    let a = 0;
    t.eachCol((c) => {
      const d = h(c);
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
      this.eachCol((o, n, h) => {
        t(e, o, { x: n, y: s, width: h, height: r });
      });
    });
  }
  rectRow(t, e) {
    const { rowMap: s, range: r } = this;
    let [o, n] = [0, 0];
    t >= r.startRow && (o = s.get(t)?.y || 0);
    for (let l = t; l <= e; l += 1) {
      const a = this.rowHeight(l);
      a > 0 && (l < r.startRow && (o -= a), n += a);
    }
    const { width: h } = this;
    return { x: 0, y: o, width: h, height: n };
  }
  rectCol(t, e) {
    const { colMap: s, range: r } = this;
    let [o, n] = [0, 0];
    t >= r.startCol && (o = s.get(t)?.x || 0);
    for (let l = t; l <= e; l += 1) {
      const a = this.colWidth(l);
      a > 0 && (l < r.startCol && (o -= a), n += a);
    }
    const { height: h } = this;
    return { x: o, y: 0, width: n, height: h };
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
      const h = this.rowHeight(n.row++);
      n.y += h, n.height = h;
    }
    for (n.y -= n.height, n.row--; n.x < t; ) {
      const h = this.colWidth(n.col++);
      n.x += h, n.width = h;
    }
    return n.x -= n.width, n.col--, this.cellAtCache = n, n;
  }
  static create(t, e, s, r, o, n, h, l, a, c) {
    return new I(
      new y(t, e, s, r),
      o,
      n,
      h,
      l,
      a,
      c
    );
  }
}
class ot {
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
    const [e, s] = [t._rowHeader.width, t._colHeader.height], [r, o] = t._freeze, { _startRow: n, _startCol: h, _rows: l, _cols: a, _width: c, _height: d } = t, C = (m) => t.rowHeightAt(m), u = (m) => t.colWidthAt(m), R = I.create(
      n,
      h,
      r - 1,
      o - 1,
      e,
      s,
      0,
      0,
      C,
      u
    ), [H, P] = [
      r + t._scrollRows,
      o + t._scrollCols
    ];
    let T = R.height + s, p = H;
    for (; T < d && p < l; )
      T += C(p), p += 1;
    let A = R.width + e, b = P;
    for (; A < c && b < a; )
      A += u(b), b += 1;
    const f = e + R.width, w = s + R.height;
    let x = c - f, g = d - w;
    b === a && (x -= c - A), p === l && (g -= d - T), b -= 1, p -= 1;
    const _ = I.create(
      H,
      P,
      p,
      b,
      f,
      w,
      x,
      g,
      C,
      u
    ), W = I.create(
      n,
      P,
      r - 1,
      b,
      f,
      s,
      x,
      0,
      C,
      u
    ), j = I.create(
      H,
      h,
      p,
      o - 1,
      e,
      w,
      0,
      g,
      C,
      u
    );
    this.areas = [W, R, j, _];
    const { _rowHeader: z, _colHeader: M } = t, S = () => M.height / M.rows, O = () => z.width / z.cols;
    this.headerAreas = [
      I.create(
        0,
        W.range.startCol,
        M.rows - 1,
        W.range.endCol,
        _.x,
        0,
        _.width,
        0,
        S,
        u
      ),
      I.create(
        0,
        R.range.startCol,
        M.rows - 1,
        R.range.endCol,
        R.x,
        0,
        R.width,
        0,
        S,
        u
      ),
      I.create(
        R.range.startRow,
        0,
        R.range.endRow,
        z.cols - 1,
        0,
        R.y,
        0,
        R.height,
        C,
        O
      ),
      I.create(
        j.range.startRow,
        0,
        j.range.endRow,
        z.cols - 1,
        0,
        _.y,
        0,
        _.height,
        C,
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
    const s = this.areas[1], [r, o, n, h] = this.headerAreas;
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
        ...(n.containsy(e) ? n : h).cellAt(t, e)
      };
    if (e < s.y)
      return {
        placement: "col-header",
        ...(o.containsx(t) ? o : r).cellAt(t, e)
      };
    for (let l of this.areas)
      if (l.contains(t, e))
        return { placement: "body", ...l.cellAt(t, e) };
    return null;
  }
}
function nt(i) {
  return i instanceof Object ? i.value : i;
}
function J(i) {
  const t = nt(i);
  return `${t ?? ""}`;
}
class v {
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
  _cellRenderer = (t, e) => () => !0;
  _cellFormatter = (t, e) => J;
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
    cellRenderer(t, e) {
      return () => !0;
    },
    cell(t, e) {
      return t + 1;
    }
  };
  // column header
  _colHeader = {
    height: 24,
    rows: 1,
    cellRenderer(t, e) {
      return () => !0;
    },
    cell(t, e) {
      return V(e);
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
    return this._viewport = new ot(this), it(this), this;
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
  cellFormatter(t) {
    return this._cellFormatter = t, this;
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
    return new v(t, e, s);
  }
}
try {
  window && (window.tiny ||= {}, window.tiny.table_renderer = v.create);
} catch {
}
export {
  I as Area,
  Q as Canvas,
  y as Range,
  ot as Viewport,
  nt as cellValue,
  J as cellValueString,
  v as default,
  X as eachRanges,
  lt as expr2expr,
  D as expr2xy,
  ht as findRanges,
  V as stringAt,
  L as xy2expr
};
