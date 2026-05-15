async function getUser() {
    try{
    const response = await fetch(' https://randomuser.me/api/?results=5&nat=us')
    const data = await response.json();    
    const clients = [];
    data.results.forEach(user => {

        const client = 
            {
         id: Date.now() + Math.random(),
         name: `${user.name.first}`,
         email:`${user.email}`,
         company:"Freelance.Inc",
         note: " "
        }
        clients.push(client);
    });

        localStorage.setItem("clients", JSON.stringify(clients) );
        console.log(clients);

    }
    catch(error){
        console.log('Error:',error.message)
    }
}


if (!localStorage.getItem("clients")){
    getUser();
}
else{

    renderClients();

}




// Zen quotes API
async function getQuote(){

    try{

        const response = await fetch(
        "https://corsproxy.io/?https://zenquotes.io/api/quotes"
        );

        const data = await response.json();

        const randomQuote =
        data[Math.floor(Math.random() * data.length)];

        document.getElementById("quote").textContent =
        randomQuote.q;

        document.getElementById("author").textContent =
        randomQuote.a || "Unknown";

    }
    catch(error){

        console.log(error);

        document.getElementById("quote").textContent =
        "Failed to load quote";

        document.getElementById("author").textContent = "";

    }

}

getQuote();