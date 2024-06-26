// 页面加载时自动播放音频
window.addEventListener('load', function() {
    var audio = document.getElementById('background-audio');
    audio.play().catch(function(error) {
        console.log('Auto-play was prevented:', error); // 如果自动播放被阻止，输出错误信息
    });
});

// 为音频开关按钮添加事件监听器
document.getElementById('audio-toggle').addEventListener('click', function() {
    var audio = document.getElementById('background-audio');
    if (audio.paused) {
        audio.play().catch(function(error) {
            console.log('Play was prevented:', error); // 如果播放被阻止，输出错误信息
        });
    } else {
        audio.pause(); // 暂停音频播放
    }
});

// 为音量控制滑块添加事件监听器
document.getElementById('volume-control').addEventListener('input', function() {
    var audio = document.getElementById('background-audio');
    audio.volume = this.value; // 设置音频音量
});

// 为播放列表添加事件监听器
var playlistItems = document.querySelectorAll('.playlist-item');
playlistItems.forEach(function(item) {
    item.addEventListener('click', function() {
        var audio = document.getElementById('background-audio');
        audio.src = this.getAttribute('data-src'); // 更换音频文件
        audio.play().catch(function(error) {
            console.log('Play was prevented:', error); // 如果播放被阻止，输出错误信息
        });
    });
});
