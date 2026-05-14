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