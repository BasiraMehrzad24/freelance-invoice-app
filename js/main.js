// Global navigation & UI logic

function updateDashboard(){

    const clients =
    JSON.parse(localStorage.getItem("clients")) || [];

    const invoices =
    JSON.parse(localStorage.getItem("invoices")) || [];

    const totalRevenue =
    invoices.reduce((total, invoice) => {

        return total + invoice.amount;

    }, 0);

    const paidInvoices =
    invoices.filter(invoice => {

        return invoice.status === "Paid";

    });

    const unpaidInvoices =
    invoices.filter(invoice => {

        return invoice.status === "Unpaid";

    });

    document.getElementById("total-clients").textContent =
    clients.length;

    document.getElementById("total-invoices").textContent =
    invoices.length;

    document.getElementById("total-revenue").textContent =
    `$${totalRevenue}`;

    document.getElementById("paid-invoices").textContent =
    paidInvoices.length;

    document.getElementById("unpaid-invoices").textContent =
    unpaidInvoices.length;

}

updateDashboard();
