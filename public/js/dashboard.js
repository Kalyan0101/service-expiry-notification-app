const total_user = document.getElementById("total_users");
const total_services = document.getElementById("total_services");
const total_orders = document.getElementById("total_orders");
const total_customers = document.getElementById("total_customers");

let currentPage15 = 1;
const limit15 = 4;
let totalEntry15 = [];

const loadExpiringServices15 = async () => {
  const res = await fetch(`/customer/getcustomer/expiry/15`);
  totalEntry15 = await res.json();
  renderTable15();
  renderPagination15();
};

function renderTable15(page = 1, search = "") {
  currentPage15 = page;
  let filteredData = totalEntry15;
  if (search) {
    filteredData = totalEntry15.filter((item) => {
      return (
        (item.customer_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.service_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  const start = (page - 1) * limit15;
  const end = start + limit15;

  const pageData = filteredData.slice(start, end);
  const tbody = document.getElementById("15_expiryTableBody");
  tbody.innerHTML = "";
  if (pageData.length > 0) {
    pageData.forEach((item) => {
      tbody.innerHTML += `<tr>
        <td class="py-2 px-2">${item.order_id}</td>
        <td >${item.customer_name}</td>
        <td>${item.email}</td>
        <td>${item.service_name}</td>
        <td>${item.price}</td>
        <td>${item.expiryDate}</td>
      </tr>`;
    });
  } else {
    tbody.innerHTML = `<tr><td colspan='5' class="text-center py-4>NO Expiring Service Found</td></tr>`;
  }

  const info = document.getElementById("paginationINfo");
  const totalEntryCount = filteredData.length;
  const startEntry = totalEntryCount === 0 ? 0 : start + 1;
  const endEntry = Math.min(end, totalEntryCount);
  info.textContent = `Showing ${startEntry} to ${endEntry} of ${totalEntryCount} entries`;

  const totalPages = Math.ceil(totalEntryCount / limit15);
  document.getElementById("nextPage15").disabled = currentPage15 >= totalPages;
  document.getElementById("prevPage15").disabled = currentPage15 <= 1;
}

function renderPagination15(search = "") {
  let filteredData = totalEntry15;
  if (search) {
    filteredData = totalEntry15.filter(
      (item) =>
        (item.customer_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.service_name || "").toLowerCase().includes(search.toLowerCase())
    );
  }
  const totalEntryCount = filteredData.length;
  const totalPages = Math.ceil(totalEntryCount / limit15);
  const pagination = document.getElementById("pagination15");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<button class="py-1 px-2 rounded ${
      i === currentPage15 ? "bg-blue-500 text-white" : "bg-gray-200"
    }" onclick="changePage15(${i})">${i}</button>`;
  }
}

window.changePage15 = function (page) {
  const search = document.getElementById("search15").value;
  renderTable15(page, search);
  renderPagination15(search);
};

document.getElementById("search15").addEventListener("input", function () {
  const search = this.value;
  renderTable15(currentPage15, search);
  renderPagination15(search);
});

document.getElementById("nextPage15").addEventListener("click", function () {
  const search = document.getElementById("search15").value;
  let filteredData = totalEntry15;
  if (search) {
    filteredData = totalEntry15.filter((item) => {
      return (
        (item.customer_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.service_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  const totalPages = Math.ceil(filteredData.length / limit15);
  if (currentPage15 < totalPages) {
    changePage15(currentPage15 + 1);
  }
});

document.getElementById("prevPage15").addEventListener("click", function () {
  if (currentPage15 > 1) {
    changePage15(currentPage15 - 1);
  }
});

document.addEventListener("DOMContentLoaded", loadExpiringServices15);

let allData30 = [];
let currentPage30 = 1;
const limit30 = 4;
const loadExpiringServices30 = async () => {
  const res = await fetch(`/customer/getcustomer/expiry/30`);
  allData30 = await res.json();
  renderTable30();
  renderPagination30();
};

function renderTable30(page = 1, search = "") {
  currentPage30 = page;
  let filteredData = allData30;
  if (search) {
    filteredData = allData30.filter((item) => {
      return (
        (item.customer_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.service_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  const start = (page - 1) * limit30;
  const end = start + limit30;

  const pageData = filteredData.slice(start, end);
  const tbody = document.getElementById("30_expiryTableBody");
  tbody.innerHTML = "";
  if (pageData.length > 0) {
    pageData.forEach((item) => {
      tbody.innerHTML += `<tr>
            <td class="py-2 px-2">${item.order_id}</td>
            <td>${item.customer_name}</td>
            <td>${item.email}</td>
            <td>${item.service_name}</td>
            <td>${item.price}</td>
            <td>${item.expiryDate}</td>
            
        </tr>`;
    });
  } else {
    tbody.innerHTML = `<tr><td colspan='5' class="text-center py-4>NO Expiring Service Found</td></tr>`;
  }

  const info = document.getElementById("paginationINfo30");
  const totalEntryCount = filteredData.length;
  const startEntry = totalEntryCount === 0 ? 0 : start + 1;
  const endEntry = Math.min(end, totalEntryCount);
  info.textContent = `Showing ${startEntry} to ${endEntry} of ${totalEntryCount} entries`;

  const totalPages = Math.ceil(totalEntryCount / limit30);
  document.getElementById("nextPage30").disabled = currentPage30 >= totalPages;
  document.getElementById("prevPage30").disabled = currentPage30 <= 1;
}

function renderPagination30(search = "") {
  let filteredData = allData30;
  if (search) {
    filteredData = allData30.filter(
      (item) =>
        (item.customer_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.service_name || "").toLowerCase().includes(search.toLowerCase())
    );
  }
  const totalEntryCount = filteredData.length;
  const totalPages = Math.ceil(totalEntryCount / limit30);
  const pagination = document.getElementById("pagination30");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<button class="py-1 px-2 rounded ${
      i === currentPage30 ? "bg-blue-500 text-white" : "bg-gray-200"
    }" onclick="changePage30(${i})">${i}</button>`;
  }
}
window.changePage30 = function (page) {
  const search = document.getElementById("search30").value;
  renderTable30(page, search);
  renderPagination30(search);
};

document.getElementById("search30").addEventListener("input", function () {
  const search = this.value;
  renderTable30(currentPage30, search);
  renderPagination30(search);
});
document.getElementById("nextPage30").addEventListener("click", function () {
  const search = document.getElementById("search30").value;
  let filteredData = allData30;
  if (search) {
    filteredData = allData30.filter((item) => {
      return (
        (item.customer_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.service_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  const totalPages = Math.ceil(filteredData.length / limit30);
  if (currentPage30 < totalPages) {
    changePage30(currentPage30 + 1);
  }
});

document.getElementById("prevPage30").addEventListener("click", function () {
  if (currentPage30 > 1) {
    changePage30(currentPage30 - 1);
  }
});

document.addEventListener("DOMContentLoaded", loadExpiringServices30);

(() => {
  fetch(`/dashboard_stats`)
    .then((res) => res.json())
    .then((data) => {
      total_customers.innerText = data.customer;
      total_orders.innerText = data.order;
      total_services.innerText = data.service;
      total_user.innerText = data.user;
    });
})();

function formatTimeAgo(dateString) {
  const pastDate = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - pastDate.getTime(); // difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average days in a month
  const years = Math.floor(days / 365.25); // Average days in a year

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
}

const recentActivity = async () => {
  try {
    await fetch(`/recent_activity`)
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("newUser").innerHTML = res.recentuser.name;
        document.getElementById("recentOrder").innerHTML = res.recentOrder.id;
        const orderPurchaseDateFormatted = formatTimeAgo(
          res.recentOrder.purchase_date
        );
        const userCreatedAtFormatted = formatTimeAgo(res.recentuser.createdAt);
        document.getElementById("recentuserId").innerHTML =
          userCreatedAtFormatted;
        document.getElementById("orderDateId").innerHTML =
          orderPurchaseDateFormatted;
      });
  } catch (error) {
    console.log(error);

    document.getElementById("newUser").innerHTML = "NA";
    document.getElementById("recentOrder").innerHTML = "NA";
  }
};
recentActivity();
// google chart
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["corechart"] });

const drawChart = async () => {
  try {
    const response = await fetch(`/service_frequency`);
    const res = await response.json();

    const chartData = [["Service", "Count"]];
    res.forEach((item) => {
      const name = item["Service.name"] || `Service ${item.service_id}`;
      chartData.push([name, item.count]);
    });

    const visual = google.visualization.arrayToDataTable(chartData);

    const options = {
      pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(
      document.getElementById("donutchart")
    );
    chart.draw(visual, options);
  } catch (error) {
    console.log("fail to draw the chart:", error);
  }
};

google.charts.setOnLoadCallback(drawChart);
