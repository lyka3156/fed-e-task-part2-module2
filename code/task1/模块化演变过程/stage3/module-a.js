// 3. IIFE(立即执行函数方式)

// module a 项目状态数据和功能函数
~(function () {
    var name = "a";
    function work() {
        console.log(`${name} 上班`);
    }
    window.moduleA = {
        work
    }
})();