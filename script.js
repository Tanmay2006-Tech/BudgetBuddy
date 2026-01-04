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

/* CATEGORY SWITCH */
function updateCategories() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category");

  category.innerHTML = "";
  const list = type === "deposit" ? depositCategories : withdrawCategories;

  list.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    category.appendChild(opt);
  });
}
updateCategories();

/* CHART */
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
    plugins: { legend: { position: "bottom" } }
  }
});

/* ADD TRANSACTION */
function addTransaction() {
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (type === "deposit") {
    savings += amount;
  } else {
    spend += amount;
    expenses[category] += amount;
  }

  document.getElementById("amount").value = "";
  updateUI();
}

/* UI UPDATE */
function updateUI() {
  document.getElementById("savings").innerText = `₹${savings}`;
  document.getElementById("spend").innerText = `₹${spend}`;
  document.getElementById("balance").innerText = `₹${savings - spend}`;

  chart.data.datasets[0].data = Object.values(expenses);
  chart.update();

  generateInsights();
}

/* AI INSIGHTS */
function generateInsights() {
  const list = document.getElementById("aiInsights");
  list.innerHTML = "";

  const total = spend || 1;

  for (let cat in expenses) {
    const percent = Math.round((expenses[cat] / total) * 100);
    if (percent > 40) {
      addInsight(`High spending on ${cat} (${percent}%). Consider reducing it.`, "ai-warn");
    }
  }

  if (spend > savings) {
    addInsight("Expenses exceed savings. Try cutting non-essential costs.", "ai-warn");
  }

  const projected = Math.max(0, savings - spend) * 30;
  addInsight(`Projected monthly savings: ₹${projected}`, "ai-info");
}

function addInsight(text, type) {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = type;
  document.getElementById("aiInsights").appendChild(li);
}
