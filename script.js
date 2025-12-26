let totalSavings = 0;
let totalSpend = 0;

let expenses = {
  Food: 0,
  Travel: 0,
  Shopping: 0,
  Rent: 0,
  Others: 0
};

// CHART
const chart = new Chart(document.getElementById("expenseChart"), {
  type: "pie",
  data: {
    labels: Object.keys(expenses),
    datasets: [{
      data: Object.values(expenses),
      backgroundColor: [
        "#1abc9c", "#3498db", "#9b59b6", "#e67e22", "#e74c3c"
      ]
    }]
  }
});

// ADD TRANSACTION
function addTransaction() {
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (type === "deposit") {
    totalSavings += amount;
  } else {
    totalSpend += amount;
    expenses[category] += amount;
  }

  updateUI();
}

// UPDATE DISPLAY
function updateUI() {
  document.getElementById("savings").innerText = "₹" + totalSavings;
  document.getElementById("spend").innerText = "₹" + totalSpend;
  document.getElementById("balance").innerText = "₹" + (totalSavings - totalSpend);

  chart.data.datasets[0].data = Object.values(expenses);
  chart.update();
}
