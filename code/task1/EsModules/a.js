

export const name = "lisi";
// 等价下面
// const name = "lisi";
// export { name };

const oldage = 20;
export {
    oldage as age   // 重命名
}

const sex = 1;
export default sex; 