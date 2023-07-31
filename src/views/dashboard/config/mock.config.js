export const mockTableData = (num) => {
    let data = [];
    for (let i = 0; i < num; i++) {
        data.push({
            name: `吴彦祖${i}`,
            age: i,
            address: "未知",
        });
    }
    return data;
};
