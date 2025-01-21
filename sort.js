// 声明一些用于排序和跟踪状态的变量
let interval;
let arr;
let startTime;
let iterations = 0;
let isSorting = false;

// 随机打乱数组的函数
// Fisher-Yates 算法实现随机化
function randomizeArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // 生成一个随机索引
        const j = Math.floor(Math.random() * (i + 1));
        // 交换 arr[i] 和 arr[j] 的位置
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// 检查数组是否已按升序排序
function isSorted(arr) {
    // 遍历数组，如果发现前一个元素大于后一个元素，返回 false
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// 开始排序的函数
function startSort() {
    // 如果已经在排序过程中，清除先前的定时器，停止排序
    if (isSorting) {
        clearInterval(interval);
        document.getElementById("output").innerText = "排序已停止，重新开始...";
    }

    // 获取用户输入的数组大小
    const numCount = parseInt(document.getElementById("numCount").value);
    
    // 获取用户设置的排序间隔时间（默认为10毫秒）
    const intervalTime = parseInt(document.getElementById("intervalTime").value) || 10;
    
    // 初始化数组，填充从1到numCount的数字
    arr = [];
    for (let i = 1; i <= numCount; i++) {
        arr.push(i);
    }

    // 重置迭代次数和开始时间
    iterations = 0;
    startTime = new Date();
    isSorting = true;
    document.getElementById("output").innerText = "正在排序...";

    // 设置定时器每隔设定的毫秒数执行一次排序过程
    interval = setInterval(function () {
        // 随机打乱数组
        randomizeArray(arr);
        iterations++;
        
        // 更新页面上的数组显示
        document.getElementById("arrayContainer").innerText = arr.join(', ');

        // 更新性能数据，显示当前的迭代次数
        document.getElementById("performance").innerText = `迭代次数: ${iterations}`;

        // 如果数组已经排序，停止定时器并显示排序结果
        if (isSorted(arr)) {
            let endTime = new Date();
            let elapsedTime = (endTime - startTime) / 1000;  // 计算耗时（秒）
            clearInterval(interval);  // 停止排序过程
            isSorting = false;  // 标记排序结束
            document.getElementById("output").innerText = `排序完成，耗时 ${elapsedTime.toFixed(2)} 秒，迭代次数: ${iterations}`;
        }
    }, intervalTime); // 使用用户设
  置的间隔时间
}

// 不会真有十个数字计算十分钟的神人吧
