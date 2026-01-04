let savings = 0;
let spend = 0;

const expenses = {
  Food: 0,
  Travel: 0,
  Shopping: 0,
  Rent: 0,
  Others: 0
};

// Smooth number update
function updateNumber(id, value) {
  document.getElementById(id).innerText = `₹${value}`;
}

// Chart
const chart = new Chart(expenseChart, {
  type: "doughnut",
  data: {
    labels: Object.keys(expenses),
    datasets: [{
      data: Object.values(expenses),
      backgroundColor: [
        "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"
      ]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

function addTransaction() {
  const amount = Number(amountInput.value);
  const type = type.value;
  const category = category.value;

  if (!amount || amount <= 0) return alert("Enter valid amount");

  if (type === "deposit") {
    savings += amount;
  } else {
    spend += amount;
    expenses[category] += amount;
  }

  updateUI();
}

function updateUI() {
  updateNumber("savings", savings);
  updateNumber("spend", spend);
  updateNumber("balance", savings - spend);

  chart.data.datasets[0].data = Object.values(expenses);
  chart.update();
}
