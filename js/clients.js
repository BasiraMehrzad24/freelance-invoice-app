// Client-specific logic
        //  get data from API and change back to array form 
        const clientList =document.getElementById("clients-list");
        // Which client is currently being edited
        let editClientId = null;

        function renderClients(){
        const savedClients = JSON.parse(localStorage.getItem("clients")) || [];
          // get html table id
          // clears everything inside the table body before adding rows again.
          clientList.innerHTML = "";
           
          if(savedClients.length === 0 ){
            clientList.innerHTML = `
            <tr>
                <td colspan="5" > No clients found </td>
            </tr>
            
            `;
            return;
          }

          savedClients.forEach(client =>{
            // set data into html file
            clientList.innerHTML +=`
            <tr>
                 <td>${client.name} </td>
                 <td>${client.email}</td>
                 <td>${client.company} </td>
                 <td>${client.note} </td>
                <td class="actions">
                  <button class="edit-btn" data-id="${client.id}">Edit</button>
                  <button class="delete-btn" data-id="${client.id}" >Delete</button>
                </td>
            </tr>
            `

          })
        }
  


          // Adding new client to table
          const addNewClient = document.getElementById("addNewClient");
          addNewClient.addEventListener("submit" , function(event){
                // preventDefault() stops page refresh
               event.preventDefault(); 
               console.log("form submitted");
               const name = document.getElementById("name").value;
               const email = document.getElementById("email").value;
               const company = document.getElementById("company").value;
               const note = document.getElementById("note").value;
             
              //  Validation form name and email

              const nameError = document.getElementById("name-error");

              const emailError = document.getElementById("email-error");

              const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

              nameError.textContent = "";

              emailError.textContent = "";

              let isValid = true;

              if(name === ""){

                 nameError.textContent = "Name is required";

                isValid = false;
              }

               if(!email.match(emailPattern)){
               emailError.textContent = "Enter valid email";
               }

             if(!isValid){

                return;
              }

               const clients = JSON.parse(localStorage.getItem("clients")) || [];
              // || [] Because first time localStorage may be empty.

               if(editClientId !== null){
                const selectedClient = clients.find(client => {

                  return client.id === editClientId;
                });
                selectedClient.name=name;
                selectedClient.email=email;
                selectedClient.company=company;
                selectedClient.note=note;
                editClientId= null;
               }
               else{

               const newClient = {
                id: Date.now(),
                name: name,
                email:email,
                company:company,
                note:note
               }
               //  Push Into Array
               clients.push(newClient);

               }

              //  save again to localstorage
               localStorage.setItem("clients",JSON.stringify(clients));
              //  This updates the table instantly.
               renderClients();
               addNewClient.reset();

          });



          // Delete user

          clientList.addEventListener('click', function(event){


             if(event.target.classList.contains("delete-btn")){
              console.log("Delete clicked");

              const clientId = Number(event.target.dataset.id);

              console.log(clientId);

              const clients = JSON.parse(localStorage.getItem("clients"));

              // filter() removes selected one
              const updatedClients = clients.filter(client => {
                return client.id !== clientId;
              });

              localStorage.setItem("clients" , JSON.stringify(updatedClients));
              renderClients();
             }

 
          });


          // Edit Clients
          clientList.addEventListener("click", function(event){
            if(event.target.classList.contains("edit-btn")){

              const clientId = Number(event.target.dataset.id);

              const clients = JSON.parse(localStorage.getItem("clients")) || [];
                
              //find() It searches array and returns ONE matching object.
              const selectedClient = clients.find(client => {

               return client.id === clientId;

              });
              document.getElementById("name").value =selectedClient.name;
              document.getElementById("email").value = selectedClient.email;
              document.getElementById("company").value = selectedClient.company;
              document.getElementById("note").value = selectedClient.note;
              editClientId = clientId;
            }


          })