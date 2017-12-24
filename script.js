var scratchArea = document.getElementById("scratchArea");
var textRep = '';
var cl = console.log;
let text = "";
var arrText = [];
var ids = [];
var data = [];
var endpoint = "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=15cd0ac3285c47c296635e11c346a978";



function sortTextId() {
    for (let i = 0; i < arrText.length; i++) {
        ids.push(arrText[i].id);
    }
}


function replaceSharp() {
    var textLength = textRep.length;

    for (let i = 0; i < textLength; i++) {
        let el = document.createElement('span');
        let c = `scare-${i}`;
        el.innerText = "#";
        scratchArea.appendChild(el);

        arrText.push({
            id: i,
            class: c,
            text: "#",
            original: textRep[i],
            coord: el.getBoundingClientRect().left
        });

        el.className = `textField ${c}`;


    }
    sortTextId();
}

scratchArea.addEventListener("mouseover", function(event) {
    let currentCoord = event.pageX;
    let el = event.target;

    let field = event.target;
    let fieldClass = field.className;
    let originalText = '';

    for (let i = 0; i < arrText.length; i++) {
        let o = arrText[i];
        let oText = '';
        if (`textField ${o.class}` === fieldClass) {
            oText = o.original;

            field.innerText = oText;
        }
    }
});


function apiConnect() {
    axios.get(endpoint)
        .then(response => {
            data = response.data;
            getNameOfField(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function getNameOfField(data) {
    console.log(data.articles[0].author);
    textRep = data.articles[0].author;

    replaceSharp();

}

apiConnect();

console.table(arrText);