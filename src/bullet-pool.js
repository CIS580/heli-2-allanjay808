module.exports = exports = BulletPool;

function BulletPool(maxSize) {
  this.pool = new Float32Array(4 * maxSize);

  this.end = 0;
  this.max = maxSize;

  this.free = [];
  // for (var i = 0; i < maxSize; i++) {
  //   this.free.push(i);
  // }
}

BulletPool.prototype.add(position, velocity) {
  if (this.end < this.max) {
    this.pool[4 * this.end] = position.x;
    this.pool[4 * this.end + 1] = position.y;
    this.pool[4 * this.end + 2] = velocity.x;
    this.pool[4 * this.end + 3] = velocity.y;
    this.end++;
  }

}

BulletPool.prototype.update = function(elapsedTime, callback) {
  for (var i = 0; i < this.end; i++) {

    this.pool[4 * i] += this.pool[4 * i + 2];
    this.pool[4 * i + 1] = += this.pool[4 * i + 3];

    if (callback({
      x: this.pool[4 * i],
      y: this.ppol[4 * i + 1]
    })) {
      this.pool[4 * i] = this.pool[4 * (this.end - 1)];
      this.pool[4 * i] = this.pool[4 * (this.end - 1) + 1];
      this.pool[4 * i] = this.pool[4 * (this.end - 1) + 2];
      this.pool[4 * i] = this.pool[4 * (this.end - 1) + 3];
      this.end--;
      i--;
    }
  }

}

BulletPool.prototype.render = function(elapsedTime, ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "black";
  for (var i = 0; i < this.end; i++) {
    ctx.moveTo(this.pool[4 * i], this.pool[4 * i + 1]);
    ctx.arc(this.pool[4 * i], this.pool(4 * i + 1), 2, 0, 2 * Math.PI);
  }
  ctx.fill();
  ctx.restore();
}
