const addressList = [
    "北京",
    "上海",
    "深圳",
    "广州",
    "长沙",
    "杭州",
    "新疆",
    "四川",
    "山西",
    "武汉",
    "无锡",
    "岳阳",
    "贵州",
    "东莞",
    "福建",
    "台湾",
    "佛山",
    "汕头",
    "哈尔滨",
    "陕西",
    "石家庄",
    "河北",
    "云南",
    "西安",
];

const tagsList = [
    "JavaScript Typescript",
    "C# C++",
    "Java MySQL",
    "MongoDB Orcale",
    "Vue3 tsx",
    "NodeJS ES6",
    "express",
];

const getTableData = () => {
    const sourceData = []
    for (let i = 0; i < 50; i++) {
        sourceData.push({
            key: i + 1,
            name: `sangfor@${i + 1}`,
            age: 17 + Math.floor(Math.random() * 20),
            address:
                addressList[Math.floor(Math.random() * addressList.length)],
            tags: tagsList[Math.floor(Math.random() * tagsList.length)],
        });
    }
    return sourceData;
};

const tableData = getTableData();

export const getGridDataApi = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: tableData,
                pageSize: 7,
            })
            // 异常场景
            // reject({
            //     status: 500,
            //     data: [],
            //     pageSize: 7
            // })
        }, 2000);
    })
}