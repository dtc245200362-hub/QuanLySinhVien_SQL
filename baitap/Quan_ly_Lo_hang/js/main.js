// 1. Danh sách các lô hàng ban đầu
const inputLots = [
  { lotId: "L001", productId: "SP_A", quantity: 50, note: "Nhập kho đợt 1" },
  { lotId: "L002", productId: "SP_A", quantity: 30, note: "Nhập kho đợt 2" },
  { lotId: "L003", productId: "SP_B", quantity: 100, note: "Hàng tồn kho" },
  { lotId: "L004", productId: "SP_A", quantity: 20, note: "Trả hàng" },
  { lotId: "L005", productId: "SP_C", quantity: 45, note: "Mới về" }
];

// 2. Logic gộp lô theo productId
function mergeLotsByProduct(lots) {
  const mergedLotsMap = {};

  lots.forEach(lot => {
    const { productId, quantity, lotId } = lot;

    if (!mergedLotsMap[productId]) {
      mergedLotsMap[productId] = {
        productId: productId,
        totalQuantity: 0,
        originalLotIds: [],
        newLotName: `LOT_${productId}_${Date.now().toString().slice(-5)}`
      };
    }

    mergedLotsMap[productId].totalQuantity += quantity;
    mergedLotsMap[productId].originalLotIds.push(lotId);
  });

  return Object.values(mergedLotsMap);
}

// 3. Hiển thị bảng dữ liệu ban đầu
function renderOriginalLots() {
  const tbody = document.getElementById("original-lots-body");
  tbody.innerHTML = "";

  inputLots.forEach(lot => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${lot.lotId}</strong></td>
      <td>${lot.productId}</td>
      <td>${lot.quantity}</td>
      <td>${lot.note}</td>
    `;
    tbody.appendChild(row);
  });
}

// 4. Hiển thị bảng dữ liệu sau khi gộp
function renderMergedLots(mergedLots) {
  const tbody = document.getElementById("merged-lots-body");
  tbody.innerHTML = "";

  mergedLots.forEach(item => {
    const row = document.createElement("tr");
    const tags = item.originalLotIds
      .map(id => `<span class="badge">${id}</span>`)
      .join(" ");

    row.innerHTML = `
      <td><strong>${item.newLotName}</strong></td>
      <td>${item.productId}</td>
      <td><strong style="color: #2563eb;">${item.totalQuantity}</strong></td>
      <td>${tags}</td>
    `;
    tbody.appendChild(row);
  });
}

// 5. Gán sự kiện khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
  renderOriginalLots();

  const btnMerge = document.getElementById("btn-merge");
  const resultSection = document.getElementById("result-section");

  btnMerge.addEventListener("click", () => {
    const mergedData = mergeLotsByProduct(inputLots);
    renderMergedLots(mergedData);
    resultSection.style.display = "block";
    resultSection.scrollIntoView({ behavior: "smooth" });
  });
});