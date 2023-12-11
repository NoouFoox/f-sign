export default class SignClass {
  canvas = null;
  ctx = null;
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  scale = 2;
  isWrite = false;
  constructor(el) {
    this.canvas = typeof el === "string" ? document.querySelector(el) : el;
    this.scale = Math.max(devicePixelRatio || 1, 2);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.addEventListener("mousemove", this.__move.bind(this));
    this.canvas.addEventListener("mousedown", this.__down.bind(this));
    this.canvas.addEventListener("mouseup", this.__up.bind(this));
    this.canvas.addEventListener("touchmove", this.__move.bind(this));
    this.canvas.addEventListener("touchstart", this.__down.bind(this));
    this.canvas.addEventListener("touchend", this.__up.bind(this));
  }

  __getXy(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (e.touches?.length) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    return [x, y];
  }

  __down(e) {
    e.preventDefault();
    this.isWrite = true;
    const [x, y] = this.__getXy(e);
    this.isDrawing = true;
    [this.lastX, this.lastY] = [x, y];
  }

  __up() {
    this.isDrawing = false;
  }

  __move(e) {
    e.preventDefault();
    const [x, y] = this.__getXy(e);
    if (this.isDrawing) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      [this.lastX, this.lastY] = [x, y];
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.isWrite = false;
  }

  exportImg() {
    if (!this.isWrite) {
      return null;
    }
    return this.canvas.toDataURL("image/png");
  }
  destroyed() {
    this.canvas.removeListener("mousemove", this.__move.bind(this));
    this.canvas.removeListener("mousedown", this.__down.bind(this));
    this.canvas.removeListener("mouseup", this.__up.bind(this));
    this.canvas.removeListener("touchmove", this.__move.bind(this));
    this.canvas.removeListener("touchstart", this.__down.bind(this));
    this.canvas.removeListener("touchend", this.__up.bind(this));
    this.canvas = null;
  }
}
