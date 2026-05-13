// Client-specific logic
        //  get data from API and change back to array form 
          const savedClients = JSON.parse(localStorage.getItem("clients"));
          const clientList =document.getElementById("clients-list");
          savedClients.forEach(client =>{
            // set data into html file
            clientList.innerHTML +=`
            <tr>
                 <td>${client.name} </td>
                 <td>${client.email}</td>
                 <td>${client.company} </td>
                 <td>${client.note} </td>
                <td class="actions">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
                </td>
            </tr>
            `

          })