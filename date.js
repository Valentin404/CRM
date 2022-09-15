// require(C:\Users\User\AppData)
// canvas printer edefinder
const cateqory = [
    {
        name : "Тип",
        _id : 10
    },
    {
        _id: 11,
        name: 'Дом'
    },
    {
        _id: 13,
        name: 'Работа'
    },
    {
        _id: 12,
        name: 'Доп'
    },

]


const bgInput = {
    error : 'rgba(255, 0, 0, 0.662)',
    defoult : 'rgba(255, 255, 255, 0.442)'
}

const arr_currency = ["Валюта","USD", "EUR", 'UAH']
let newId = 0
const id = () => newId++

const data = [
    {
        _id: id(),
        sum: 1000,
        cateqory: 'Дом',
        valut: 'USD',
        description: 'asd asd asda',
        date: "2022-09-06"
    },
    {
        _id: id(),
        sum: 1000,
        cateqory: 'Дом',
        valut: 'UAH',
        description: 'asd asd asda',
        date: "2022-09-06"
    },
    {
        _id: id(),
        sum: 1000,
        cateqory: 'Дом',
        valut: 'USD',
        description: 'asd asd asda',
        date: "2022-09-06"
    },
    {
        _id: id(),
        sum: -1000,
        cateqory: 'Дом',
        valut: 'USD',
        description: 'asd asd asda',
        date: "2022-09-06"
    },
    {
        _id: id(),
        sum: 2000,
        cateqory: 'Работа',
        valut: 'EUR',
        description: 'asdasd asdasd',
        date: "2022-08-06"
    },
    {
        _id: id(),
        sum: 5000,
        cateqory: 'Доп',
        valut: 'USD',
        description: 'asdasd asdasd',
        date: "2021-08-06"
    },
    // {
    //     _id: id(),
    //     sum: -1000,
    //     cateqory: 'dop',
    //     valut: 'EUR',
    //     description: 'asdasd asdas',
    //     date: "2022-01-03"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
    // {
    //     _id: id(),
    //     sum: 1000,
    //     cateqory: 'dop',
    //     valut: 'USD',
    //     description: 'asdasd dsdas',
    //     date: "2022-08-06"
    // },
   
]

const nameGrafic = ['ВСЕ','ДОХОД','РАСХОД']

const currentFilter = {
    cateqory: cateqory[0].name,
    date: {
        from: null,
        ot: null
    },
    valut: arr_currency[0],
    amount: null,
    limit : 5,
    typeChart : 'all'
}

let newData = {}