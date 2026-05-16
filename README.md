# freelance-invoice-app


# ClientFlow

A professional freelance client and invoice management dashboard built with HTML, CSS, and JavaScript.
The application helps freelancers manage clients, track invoices, monitor revenue, and organize business data in one responsive dashboard.


# Project Description

FreelanceCore is a browser-based CRM and invoicing system designed for freelancers and small business owners.
The application allows users to:

* Manage client information
* Create and track invoices
* Monitor paid and unpaid invoices
* View revenue analytics
* Display motivational quotes using an external API

All data is stored using localStorage, allowing information to persist between page refreshes without requiring a backend database.


# Features

## Clients Module

* Add new clients
* Edit client information
* Delete clients
* Fetch initial clients from Random User API
* Form validation for required fields
* Dynamic table rendering

## Invoices Module

* Create invoices linked to clients
* Edit invoices
* Delete invoices
* Toggle invoice status between Paid and Unpaid
* Calculate total revenue using reduce()
* Count paid and unpaid invoices using filter()

## Dashboard

* Total clients counter
* Total invoices counter
* Revenue analytics
* Paid vs unpaid statistics
* Motivational quote card using ZenQuotes API

## UI & UX

* Responsive design
* Professional dashboard layout
* Interactive buttons and hover effects
* Styled tables and forms
* Mobile-friendly interface


# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* LocalStorage API
* Fetch API
* Random User API
* ZenQuotes API


# APIs Used

## Random User API

Used to generate initial sample clients.

https://randomuser.me/

## ZenQuotes API

Used to display motivational quotes on the dashboard.

https://zenquotes.io/


# Screenshots

## Dashboard
![Dashboard](images/dashboard.png)


## Clients Page

![Clients](images/clients.png)

## Invoices Page

![Invoices](images/invoices.png)



# GitHub Repository

https://github.com/BasiraMehrzad24/freelance-invoice-app.git

# Live Demo
https://basiramehrzad24.github.io/freelance-invoice-app/

# Reflection

This project helped me improve my understanding of:

* CRUD operations using JavaScript
* DOM manipulation
* Working with APIs using fetch and async/await
* LocalStorage data persistence
* Array methods like filter(), and reduce()
* Responsive UI design
* Organizing modular JavaScript code

One of the biggest challenges was managing dynamic rendering and synchronizing localStorage with the UI after edit and delete operations. Another challenge was handling API errors and solving CORS issues with the quotes API.

My favorite feature is the invoices dashboard because it combines real-time statistics, invoice tracking, and interactive status management in a clean UI.



# Author

Developed by: Basira Mehrzad
