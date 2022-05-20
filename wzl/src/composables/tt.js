const data = []
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Name_${i + 1}`,
        age: 17 + i,
        address: `BeiJing_NO.${i + 1}`,
    })
}

const A = []

const columns = [
    { key: 'name', title: "Name" },
    { key: 'address', title: "Address" },
]

data.forEach(d => {
    const l = [];
    columns.forEach(c => {
        l.push(d[c.key]);
    })
    A.push(l)
})

console.log(A);