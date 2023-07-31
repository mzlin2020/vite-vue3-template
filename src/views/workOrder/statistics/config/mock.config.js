import { mockDataServer } from "@/utils/toolsFn";

export const mockData = (count, delay) => {
    let res = [];
    for (let i = 0; i < count; i++) {
        res.push({
            key: i,
            name: `胡彦斌${i}`,
            age: i,
            address: `西湖区湖底公园${i}号`,
        });
    }
    return mockDataServer(res, delay);
};
