var h = Object.defineProperty;
var o = (n, t, s) => t in n ? h(n, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[t] = s;
var i = (n, t, s) => (o(n, typeof t != "symbol" ? t + "" : t, s), s);
class r {
  constructor(t) {
    i(this, "canvas", null);
    i(this, "ctx", null);
    i(this, "isDrawing", !1);
    i(this, "lastX", 0);
    i(this, "lastY", 0);
    i(this, "scale", 2);
    i(this, "isWrite", !1);
    this.canvas = typeof t == "string" ? document.querySelector(t) : t, this.scale = Math.max(devicePixelRatio || 1, 2), this.ctx = this.canvas.getContext("2d"), this.canvas.addEventListener("mousemove", this.__move.bind(this)), this.canvas.addEventListener("mousedown", this.__down.bind(this)), this.canvas.addEventListener("mouseup", this.__up.bind(this)), this.canvas.addEventListener("touchmove", this.__move.bind(this)), this.canvas.addEventListener("touchstart", this.__down.bind(this)), this.canvas.addEventListener("touchend", this.__up.bind(this));
  }
  __getXy(t) {
    var a;
    let s = t.offsetX, e = t.offsetY;
    return (a = t.touches) != null && a.length && (s = t.touches[0].clientX, e = t.touches[0].clientY), [s, e];
  }
  __down(t) {
    t.preventDefault(), this.isWrite = !0;
    const [s, e] = this.__getXy(t);
    this.isDrawing = !0, [this.lastX, this.lastY] = [s, e];
  }
  __up() {
    this.isDrawing = !1;
  }
  __move(t) {
    t.preventDefault();
    const [s, e] = this.__getXy(t);
    this.isDrawing && (this.ctx.beginPath(), this.ctx.moveTo(this.lastX, this.lastY), this.ctx.lineTo(s, e), this.ctx.stroke(), [this.lastX, this.lastY] = [s, e]);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.isWrite = !1;
  }
  exportImg() {
    return this.isWrite ? this.canvas.toDataURL("image/png") : null;
  }
  destroyed() {
    this.canvas.removeListener("mousemove", this.__move.bind(this)), this.canvas.removeListener("mousedown", this.__down.bind(this)), this.canvas.removeListener("mouseup", this.__up.bind(this)), this.canvas.removeListener("touchmove", this.__move.bind(this)), this.canvas.removeListener("touchstart", this.__down.bind(this)), this.canvas.removeListener("touchend", this.__up.bind(this)), this.canvas = null;
  }
}
export {
  r as default
};
