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
