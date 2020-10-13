let questions = [
    {
        question: [
            "тип 1 - простой, ответ строкой",
            "абзац 2",
            "И так далее_______",
            "сколько угодно"
        ],
        imageSrc: "",
        table: false,
        typeOfAnswer: "text",
        answer: "ответ",
        countHelpers: 0,
    },
    {
        question: [
            "тип 2 - горизонтальная таблица",
            "абзац 2",
            "И так далее_______",
            "сколько угодно"
        ],
        imageSrc: "",
        table: false,
        typeOfAnswer: "table-horizontal",
        answer: "1231",
        columns: 4,
        countHelpers: 0,
    },
    {
        question: [
            "тип 3 - как первый",
            "абзац 2",
            "И так далее_______",
            "сколько угодно",
            "только с советником"
        ],
        imageSrc: "",
        table: false,
        typeOfAnswer: "text",
        answer: "ответ",
        countHelpers: 1,
        helpers: [
            "совет 1",
        ],
    },
    {
        question: [
            "тип 4 ",
            "абзац 2",
            "И так далее_______",
            "сколько угодно",
            "два советника",
        ],
        imageSrc: "",
        table: true,
        tableLeft: [
            "тип 4",
            "абзац 2",
            "И так далее_______",
            "сколько угодно"
        ],
        tableRight: [
            "тип 4",
            "абзац 2",
            "И так далее_______",
            "сколько угодно"
        ],
        typeOfAnswer: "table-vertical",
        answer: "1234",
        nameOfLeftColumn: "События",
        nameOfRightColumn: "Факты",
        rows: 4,
        countHelpers: 2,
        helpers: [
            "совет 1",
            "совет 2",
        ],
    },
    {
        question: [
            "тип 5 - как первый только с картинкой",
            "абзац 2",
            "И так далее_______",
            "текст тексттекст текст текст текст текст текст текст тексттекст тексттекст тексттекст текст текст текст текст тексттекст тексттекст тексттекст тексттексттекст тексттекст тексттекст м текст",
            "большой текст был"
        ],
        imageSrc: "img/2.png",
        table: false,
        typeOfAnswer: "text",
        answer: "ответ",
        countHelpers: 0,
    },
    {
        question: [
            "тип 6",
            "абзац 2",
            "И так далее_______",
            "текст тексттекст текст текст текст текст текст текст тексттекст тексттекст тексттекст текст текст текст текст тексттекст тексттекст тексттекст тексттексттекст тексттекст тексттекст м текст",
            "большой текст был"
        ],
        imageSrc: "",
        table: false,
        typeOfAnswer: "textarea",
        answer: "",
        countHelpers: 0,
    },
];