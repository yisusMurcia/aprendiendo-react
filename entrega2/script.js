const selectOptionEl = document.getElementById("author");
const quoteDiv = document.getElementById("quote-div");

const saveQuotes= async()=>{
    try{await fetch('https://dummyjson.com/quotes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json()})
            .then(data=>{
                sessionStorage.setItem("quotes", JSON.stringify(data.quotes))})

    }catch{
        console.log('Error fetching quotes');
    }
}

const getQuotes = ()=>{
    let quotesStorage = sessionStorage.getItem("quotes");
    if (!quotesStorage){
        saveQuotes();
        setTimeout(quotesStorage = sessionStorage.getItem("quotes"), 2000)
    }
    return JSON.parse(quotesStorage);
}

const setAuthors = (quotesStorage)=>{
    for(obj of quotesStorage){
        const authorOption = document.createElement("option");
        authorOption.value = obj.id;
        authorOption.textContent = obj.author;
        selectOptionEl.appendChild(authorOption);
    }
}

const getQuote = (id, quotes)=>{
    let quoteFound = false;
    for(let quote of quotes){
        if(quote.id == id){
            quoteFound = true;
            quoteDiv.innerHTML= `<hr>
            <p class ="quote">Frase : ${quote.quote} <br> Autor: ${quote.author}<p>`;
        }
    }

    if(!quoteFound){
        quoteDiv.innerText = "Algo salio mal";
    }
}

setAuthors(getQuotes());

selectOptionEl.addEventListener("change", ()=>{
    const selectedId = selectOptionEl.value;
    getQuote(selectedId, getQuotes());
})