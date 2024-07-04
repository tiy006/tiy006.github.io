// particles.js - 粒子效果和烟花效果
let particles = []; // 存储普通粒子的数组
let fireworks = []; // 存储烟花粒子的数组

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight); // 创建画布
    canvas.parent('particle-container'); // 将画布附加到 particle-container 元素
    noStroke(); // 不使用描边
    // 创建100个普通粒子
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle()); // 添加普通粒子到数组中
    }
}

function draw() {
    background(255); // 白色背景，每帧清除之前的画面

    // 更新并显示每个普通粒子
    for (let particle of particles) {
        particle.update(); // 更新粒子位置
        particle.show(); // 显示粒子
    }

    // 更新并显示每个烟花粒子
    for (let i = fireworks.length - 1; i >= 0; i--) {
        let firework = fireworks[i];
        firework.update(); // 更新烟花粒子位置
        firework.show(); // 显示烟花粒子
        if (firework.finished()) {
            fireworks.splice(i, 1); // 移除已完成的烟花粒子
        }
    }
}

class Particle {
    constructor(x, y, firework = false) {
        if (x !== undefined && y !== undefined) {
            this.pos = createVector(x, y); // 如果提供了x和y，使用它们作为初始位置
        } else {
            this.pos = createVector(random(width), random(height)); // 否则生成随机初始位置
        }
        this.firework = firework; // 是否为烟花粒子
        this.lifespan = 255; // 粒子寿命
        if (firework) {
            this.vel = p5.Vector.random2D().mult(random(2, 10)); // 随机速度
        } else {
            this.vel = createVector(random(-1, 1), random(-1, 1)); // 普通粒子的随机速度
        }
        this.size = random(2, 5); // 粒子的随机大小
        this.brightness = color(106, 13, 173); // 紫色粒子
    }

    update() {
        this.pos.add(this.vel); // 更新位置
        this.edges(); // 处理边界碰撞
        if (this.firework) {
            this.lifespan -= 4; // 如果是烟花粒子，减少寿命
        }
    }

    show() {
        noStroke();
        fill(red(this.brightness), green(this.brightness), blue(this.brightness), this.lifespan); // 设置填充颜色
        ellipse(this.pos.x, this.pos.y, this.size); // 画出粒子
    }

    edges() {
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1; // 水平反弹
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1; // 垂直反弹
        }
    }

    finished() {
        return this.lifespan < 0; // 判断是否已完成
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight); // 调整画布大小
}

// 鼠标点击时产生烟花效果
function mousePressed() {
    for (let i = 0; i < 100; i++) {
        fireworks.push(new Particle(mouseX, mouseY, true)); // 创建烟花粒子并添加到fireworks数组中
    }
}


