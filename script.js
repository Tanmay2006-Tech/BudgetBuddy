let savings = 0;
let spend = 0;

const depositCategories = ["Salary", "Savings", "Other"];
const withdrawCategories = ["Food", "Shopping", "Travel", "Rent", "Others"];

const expenses = {
  Food: 0,
  Shopping: 0,
  Travel: 0,
  Rent: 0,
  Others: 0
};

// Update category dropdown based on type
function updateCategories() {
  const type = document.getElementById("type").value;
  const categorySelect = document.getElementById("category");

  categorySelect.innerHTML = "";

  const categories = type === "deposit"
    ? depositCategories
    : withdrawCategories;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Initialize categories on load
updateCategories();

// Chart
const chart = new Chart(document.getElementById("expenseChart"), {
  type: "doughnut",
  data: {
    labels: Object.keys(expenses),
    datasets: [{
      data: Object.values(expenses),
      backgroundColor: [
        "#10b981", "#8b5cf6", "#3b82f6", "#f59e0b", "#ef4444"
      ]
    }]
  },
  options: {
    plugins: {
      legend: { position: "bottom" }
    }
  }
});

// Add transaction (FIXED)
function addTransaction() {
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!amount || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  if (type === "deposit") {
    savings += amount;
  } else {
    spend += amount;
    expenses[category] += amount;
  }

  updateUI();
  document.getElementById("amount").value = "";
}

// Update UI
function updateUI() {
  document.getElementById("savings").innerText = `₹${savings}`;
  document.getElementById("spend").innerText = `₹${spend}`;
  document.getElementById("balance").innerText = `₹${savings - spend}`;

  chart.data.datasets[0].data = Object.values(expenses);
  chart.update();
}
