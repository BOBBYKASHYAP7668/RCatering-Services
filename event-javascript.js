let currentPage = 1;
const totalPages = 20;
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalDisplay = document.getElementById('total');
const eventDate = document.getElementById('eventDate').value;

// Page navigation
function showPage(num) {
  document.querySelectorAll('.menu-page').forEach((page, index) => {
    page.classList.toggle('active', index + 1 === num);
  });
  document.getElementById('prevBtn').style.display = num === 1 ? 'none' : 'inline-block';
  document.getElementById('nextBtn').style.display = num === totalPages ? 'none' : 'inline-block';
}
function nextPage() { if (currentPage < totalPages) { currentPage++; showPage(currentPage); } }
function prevPage() { if (currentPage > 1) { currentPage--; showPage(currentPage); } }
showPage(currentPage);

// Print menu with customer details, date, selected items, total
function printMenu() {
  const name = document.getElementById('custName').value.trim();
  const number = document.getElementById('custNumber').value.trim();
  const eventDate = document.getElementById('eventDate').value;
  const date = new Date().toLocaleDateString();

  if (!name || !number || !eventDate) {
    alert("Please fill in Customer Name and Number!");
    return;
  }

  const selectedItems = Array.from(checkboxes).filter(box => box.checked);
  if (selectedItems.length === 0) {
    alert("Please select at least one item!");
    return;
  }

  // Mark selected items
  selectedItems.forEach(box => box.closest('.menu-item').classList.add('selected'));

  // Create printable window
  const printWindow = window.open('', '', 'width=800,height=600');
  let itemsHTML = '';

  document.querySelectorAll('.menu-page').forEach(page => {
    const sectionName = page.getAttribute('data-section');
    const items = Array.from(page.querySelectorAll('.menu-item.selected')).map(item => {
      const itemName = item.querySelector('label').textContent.trim();
      const price = item.querySelector('input[type="checkbox"]').value;
      return `<li>${itemName} </li>`;
    });
    if (items.length > 0) {
      itemsHTML += `<h3>${sectionName}</h3><ul>${items.join('')}</ul>`;
    }
  });

  const totalText = totalDisplay.textContent;
  printWindow.document.write(`
    <html>
    <head>
      <title>Ranjeet Catering Services - Bill</title>
      <style>
        body { font-family: "Poppins", sans-serif; padding: 20px; color: #4b1c00; }
        h1, h2, h3 { margin: 5px 0; }
        h1 { text-align: center; color: #a00000; }
        ul { list-style: none; padding-left:20px; }
        li { margin: 5px 0; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .header img { width: 100px; }
        .customer-details { margin-bottom: 20px; }
        .total { font-weight: bold; font-size:1.2rem; margin-top: 15px; text-align:center; }
        .thanks { text-align: center; margin-top: 30px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="img/logo3.png" alt="Logo">
        <div style="text-align:right;">
          <h1>Ranjeet Catering Services</h1>
          <p>Contact: 9720726704 | Address: Karhal, Mainpuri</p>
          <p>Booking Date: ${date}</p>
        </div>
      </div>
      <div class="customer-details">
        <h2>Customer Details</h2>
     <div style="margin-left:20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${number}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
     </div>
      </div>
      <div class="menu-items">
        <h2 style="text-align: center;">Selected Items</h2>
            ${itemsHTML}
      </div>
      <div class="total">${totalText} (One Person)</div>
      <div class="thanks">
        Thank You for choosing <strong>Ranjeet Catering Services</strong>!
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}
