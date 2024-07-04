// 选择作品集容器和项目项
const portfolioContainer = document.querySelector('.portfolio-container'); // 获取作品集容器
const portfolioItems = document.querySelectorAll('.portfolio-item'); // 获取所有作品集项目

// 当前项目索引
let currentIndex = 0;

// 左箭头点击事件处理
document.querySelector('.left-arrow').addEventListener('click', () => {
    if (currentIndex > 0) { // 确保索引不小于0
        currentIndex--; // 当前索引减1
        updatePortfolio(); // 更新作品集显示
    }
});

// 右箭头点击事件处理
document.querySelector('.right-arrow').addEventListener('click', () => {
    if (currentIndex < portfolioItems.length - 1) { // 确保索引不超过项目项的数量
        currentIndex++; // 当前索引加1
        updatePortfolio(); // 更新作品集显示
    }
});

// 更新作品集显示函数
function updatePortfolio() {
    const offset = -currentIndex * 100; // 计算偏移量，基于当前索引
    portfolioContainer.style.transform = `translateX(${offset}%)`; // 更新容器的平移效果
}

// 选择所有页面部分（首页和其他部分）
const pages = document.querySelectorAll('.home-section, .section'); // 获取所有页面部分

// 当前页索引，初始值为0
let currentPage = 0;

// 定义滚动到下一页的函数
function scrollToNextPage() {
    currentPage = (currentPage + 1) % pages.length; // 计算下一页索引，循环到第一页
    pages[currentPage].scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到下一页
}

// 定义滚动到上一页的函数
function scrollToPrevPage() {
    currentPage = (currentPage - 1 + pages.length) % pages.length; // 计算上一页索引，循环到最后一页
    pages[currentPage].scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到上一页
}

// 监听滚轮事件，处理页面滚动
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) { // 如果滚动方向是向下
        scrollToNextPage(); // 滚动到下一页
    } else { // 如果滚动方向是向上
        scrollToPrevPage(); // 滚动到上一页
    }
    event.preventDefault(); // 阻止默认滚动行为
}, { passive: false }); // 设为非被动模式以便阻止默认行为

// 监听导航链接点击事件，平滑滚动到目标元素
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认点击行为
        const targetId = this.getAttribute('href').substring(1); // 获取目标元素的ID（去掉#号）
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到目标元素
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active')); // 移除所有链接的活动状态
        this.classList.add('active'); // 设置当前链接为活动状态
    });
});

// p5.js - 粒子效果动画代码
let particles = []; // 存储粒子的数组
let fireworks = []; // 存储烟花粒子的数组

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight); // 创建画布并设置大小
    canvas.parent('particle-container'); // 将画布附加到particle-container
    noStroke(); // 取消画笔描边
    // 创建100个普通粒子
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle()); // 创建并添加粒子到数组
    }
}

function draw() {
    background(255, 255, 255, 25); // 设置背景色并增加透明度
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
        this.size = random(3, 8); // 粒子的随机大小
        this.brightness = 255; // 粒子的亮度设为最大值
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
        fill(106, 13, 173, this.lifespan); // 设置粒子颜色为rgb(106, 13, 173)
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

// 窗口大小调整时调整画布大小
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight); // 调整画布大小
}

// 鼠标点击时产生烟花效果
function mousePressed() {
    for (let i = 0; i < 100; i++) {
        fireworks.push(new Particle(mouseX, mouseY, true)); // 创建烟花粒子并添加到fireworks数组中
    }
}
