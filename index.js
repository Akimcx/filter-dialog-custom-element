import FilterDialog from "./filterDialog.js";

customElements.define("filter-dialog", FilterDialog, { extends: "dialog" });

// const rows = [];
// const after = document.getElementById("after");

const filterModal = document.getElementById("filterDialog");
filter.addEventListener("click", (e) => {
  filterModal.showModal();
});

// const confirm = filterModal.querySelector(".confirm");
// const cancel = filterModal.querySelector(".cancel");
// const form = filterModal.querySelector("form");

// // cancel.addEventListener("click", (e) => {
// //   filterModal.close();
// // });

// filterModal.addEventListener("submit", (e) => {
//   if (e.submitter !== confirm) return;
//   e.preventDefault();
//   const f = [];

//   rows.forEach((row) => {
//     f.push(row.getLogical());
//     f.push(row.getSelectedField());
//     f.push(row.getFilter());
//     f.push(row.getFilterString());
//   });

//   const sql = document.querySelector(".sql");
//   sql.textContent = f.join(" ");
// });

// after.addEventListener("click", (e) => {
//   const filterRow = new FilterRow();
//   rows.push(filterRow);
//   form.appendChild(filterRow.getRow());
// });
