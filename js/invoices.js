// Invoice-specific logic

const clientSelect =  document.getElementById("client-select");

// get client from localStorage
const clients = JSON.parse(localStorage.getItem("clients")) || [];

clients.forEach(client => {
// put client name in dropdown
    clientSelect.innerHTML +=`
    <option value="${client.id}" >
    ${client.name}
    </option>
    `    
});

// Add Invoice for existing client
const invoiceForm = document.getElementById("invoiceForm");
let editInvoiceId = null;

// invoices form save to localStorage
invoiceForm.addEventListener("submit" , function(event){
    // preventDefault  stops the browser’s default behavior.
    event.preventDefault();

    // get inputs id
    const clientId = document.getElementById("client-select").value;

    const serviceTitle = document.getElementById("service-title").value;

    const description = document.getElementById("description").value;

    const amount = document.getElementById("amount").value;

    const date = document.getElementById("date").value;

    //  validation for invoice form
    if(
       clientId === "" ||
       serviceTitle === "" ||
       amount === "" ||
       date === "" ){
        alert("please fill all required fields");

        return;
       }
        // get invoices form  localStorage
       const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        
       // save input values to an object   
       if(editInvoiceId !== null){

         const selectedInvoice =
         invoices.find(invoice => {

         return invoice.id === editInvoiceId;

         });

    selectedInvoice.clientId = Number(clientId);

    selectedInvoice.serviceTitle = serviceTitle;

    selectedInvoice.description = description;

    selectedInvoice.amount = Number(amount);

    selectedInvoice.date = date;

    editInvoiceId = null;

     }
      else{

       const newInvoice = {

        id: Date.now(),

        clientId: Number(clientId),

        serviceTitle: serviceTitle,

        description: description,

        amount: Number(amount),

        date: date,

        status: "Unpaid"

    };

    invoices.push(newInvoice);

}
    //  change the inputs value to string and save it to localstorage
     localStorage.setItem("invoices", JSON.stringify(invoices));
     renderInvoices();
     updateInvoiceStats();
     invoiceForm.reset();
})


// render the invoices form into table

const invoiceList = document.getElementById("invoice-list");
function renderInvoices(){
    // getting invoices and clients from localStorage
    const invoices =JSON.parse(localStorage.getItem("invoices")) || [];
    const clients= JSON.parse(localStorage.getItem("clients")) || [];

    // clear table for avoiding duplicates
    invoiceList.innerHTML = "" ;
    
    // when we don't have any invoices
    if(invoices.length === 0 ){
        invoiceList.innerHTML = `
        <tr>
          <td colspan="6">
             No Invoices found
          </td>
        </tr>
        
        `;
        return;
    }
    
    // loop all invoices

    invoices.forEach(invoice => {
      
        // This find searches matching client
       const client = clients.find(client => {

        return client.id === invoice.clientId;
       }) 

      invoiceList.innerHTML += `
            <tr>

                <td>${client.name}</td>

                 <td>${invoice.serviceTitle}</td>

                 <td>$${invoice.amount}</td>

                 <td>${invoice.date}</td>

                 <td>
                    <button 
                         class="status-btn ${invoice.status === "Paid" ? "paid" : "unpaid"}"
                         data-id="${invoice.id}" >
                          ${invoice.status}
                    </button>
                </td>

                <td class="actions">
                  <button class="edit-btn" data-id="${invoice.id}">Edit</button>
                  <button class="delete-btn" data-id="${invoice.id}" >Delete</button>
                </td>

            </tr>
            `;
       });

}
renderInvoices();
updateInvoiceStats();



// Delete invoices form tabel

invoiceList.addEventListener("click", function(event){

    if (event.target.classList.contains("delete-btn")){

        const invoiceID = Number(event.target.dataset.id);
        
        const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

        const updatedInvoices = invoices.filter(invoice => {
         return invoice.id !== invoiceID;
        });

        localStorage.setItem("invoices" , JSON.stringify(updatedInvoices));
            renderInvoices();
            updateInvoiceStats();
    }

})



// Edit Invoices

invoiceList.addEventListener("click", function(event){

    if(event.target.classList.contains("edit-btn")){

        const invoiceID =
        Number(event.target.dataset.id);

        const invoices =
        JSON.parse(localStorage.getItem("invoices")) || [];

        const selectedInvoice =
        invoices.find(invoice => {

            return invoice.id === invoiceID;

        });

        // fill form
        document.getElementById("client-select").value = selectedInvoice.clientId;

        document.getElementById("service-title").value = selectedInvoice.serviceTitle;

        document.getElementById("description").value = selectedInvoice.description;

        document.getElementById("amount").value = selectedInvoice.amount;

        document.getElementById("date").value = selectedInvoice.date;

        // store editing id
        editInvoiceId = invoiceID;

    }

});


renderInvoices();
updateInvoiceStats();



// for paid / unpaid toggle 

invoiceList.addEventListener("click", function(event){

    if(event.target.classList.contains("status-btn")){

        const invoiceID =
        Number(event.target.dataset.id);

        const invoices =
        JSON.parse(localStorage.getItem("invoices")) || [];

        const selectedInvoice =
        invoices.find(invoice => {

            return invoice.id === invoiceID;

        });

        if(selectedInvoice.status === "Paid"){

            selectedInvoice.status = "Unpaid";

        }
        else{

            selectedInvoice.status = "Paid";

        }

        localStorage.setItem(
            "invoices",
            JSON.stringify(invoices)
        );

        renderInvoices();
        updateInvoiceStats();
        

    }

});




// Invoice status

function updateInvoiceStats(){

      const invoice = JSON.parse(localStorage.getItem("invoices")) || [];

      const totalRevenue = invoice.reduce((total , invoice) => {
       return total + invoice.amount;
      }, 0 );

      const paidInvoices = invoice.filter(invoice => {
        return invoice.status === "Paid";
      }) 
     const unpaidInvoices = invoice.filter(invoice => {
        return invoice.status === "Unpaid";
     })

     document.getElementById("total-revenue").textContent = `$${totalRevenue}`;
     document.getElementById("paid-count").textContent = paidInvoices.length;
     document.getElementById("unpaid-count").textContent = unpaidInvoices.length;


}


     renderInvoices();
     updateInvoiceStats();