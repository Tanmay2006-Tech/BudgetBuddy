const expenseData = {
  Food: 1200,
  Travel: 600,
  Shopping: 800,
  Rent: 400,
  Others: 200
};

// PIE CHART
new Chart(document.getElementById("expenseChart"), {
  type: "pie",
  data: {
    labels: Object.keys(expenseData),
    datasets: [{
      data: Object.values(expenseData),
      backgroundColor: [
        "#1abc9c",
        "#3498db",
        "#9b59b6",
        "#e67e22",
        "#e74c3c"
      ]
    }]
  }
});
