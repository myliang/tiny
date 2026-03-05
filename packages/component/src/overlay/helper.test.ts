import { describe, it, assert } from 'vitest';
import { position } from './helper';
describe('overlay-helper', () => {
  describe('position', () => {
    const client = {
      clientWidth: 1000,
      clientHeight: 800,
      scrollLeft: 100,
      scrollTop: 100,
    };
    it('should return [200, 132] when bottomLeft, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'bottomLeft',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200, left);
      assert.equal(100 + 30 + 2, top);
    });
    it('should return [0, 132] when bottomRight, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'bottomRight',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 100 - 300, left);
      assert.equal(100 + 30 + 2, top);
    });
    it('should return [100, 132] when bottom, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'bottom',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 50 - 300 / 2, left);
      assert.equal(100 + 30 + 2, top);
    });
    // top
    it('should return [100, -102] when top, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'top',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 50 - 300 / 2, left);
      assert.equal(100 - 200 - 2, top);
    });
    it('should return [200, -102] when topLeft, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'topLeft',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200, left);
      assert.equal(100 - 200 - 2, top);
    });
    it('should return [0, -102] when topRight, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'topRight',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 100 - 300, left);
      assert.equal(100 - 200 - 2, top);
    });
    // left
    it('should return [-102, 15] when left, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'left',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 - 300 - 2, left);
      assert.equal(100 + 30 / 2 - 200 / 2, top);
    });
    it('should return [-102, -70] when leftTop, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'leftTop',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 - 300 - 2, left);
      assert.equal(100 + 30 - 200, top);
    });
    it('should return [-102, 15] when leftBottom, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'leftBottom',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 - 300 - 2, left);
      assert.equal(100, top);
    });
    // right
    it('should return [302, 15] when right, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'right',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 100 + 2, left);
      assert.equal(100 + 30 / 2 - 200 / 2, top);
    });
    it('should return [302, -70] when rightTop, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'rightTop',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 100 + 2, left);
      assert.equal(100 + 30 - 200, top);
    });
    it('should return [302, 15] when rightBottom, client, { width: 100, height: 30, left: 200, top: 100 }, { width: 300, height: 200 }', () => {
      const [left, top] = position(
        'rightBottom',
        client,
        { width: 100, height: 30, left: 200, top: 100 },
        { width: 300, height: 200 },
        15,
        2
      );
      assert.equal(200 + 100 + 2, left);
      assert.equal(100, top);
    });
  });
});
