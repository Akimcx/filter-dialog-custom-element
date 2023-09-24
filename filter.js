export default class FilterRow {
  static first = true;

  constructor() {
    this.row = document.createElement("div");
    this.row.classList.add("form-control");
    this.row.classList.add("del");

    this.row.innerHTML = `<select name="fields" required></select><select name="filterName" required></select><input type="text" name="filterString" required /><div class="deleteRow"><p>*</p></div>`;

    // const delElt = document.createElement("div");
    // delElt.classList.add("deleteRow");
    // delElt.innerHTML = ``;
    // this.row.appendChild(delElt);

    this.filters = {
      string: [
        { name: "est egale", symbol: "=" },
        { name: "contient", symbol: "like %x%" },
        { name: "n'est pas egale", symbol: "!=" },
        { name: "commence par", symbol: "like %x" },
        { name: "finit par", symbol: "like x%" },
      ],
      number: [
        { name: "est egale a", symbol: "=" },
        { name: "est superieur a", symbol: ">" },
        { name: "est inferieur a ", symbol: "<" },
        { name: "n'est pas egale a", symbol: "!=" },
      ],
    };

    this.fields = {
      nom: { name: "Nom", filters: this.filters.string },
      prenom: { name: "Prenom", filters: this.filters.string },
      sexe: { name: "Sexe", filters: this.filters.string },
      age: { name: "Age", filters: this.filters.number },
    };

    if (!FilterRow.first) {
      this.row.innerHTML =
        `<select name="logical"><option value="and">and</option><option value="or">or</option></select>` +
        this.row.innerHTML;
    } else {
      this.row.innerHTML =
        `<label for="filterString">Ou <small>le champ</small></label>` +
        this.row.innerHTML;
    }

    this.populateFields();
    FilterRow.first = false;
  }

  getDel() {
    return this.row.querySelector(".deleteRow");
  }

  getRow() {
    return this.row;
  }

  getSelectedField() {
    const select = this.row.querySelector("select[name='fields']");
    return select.selectedOptions[0].value;
  }

  getFilter() {
    const select = this.row.querySelector("select[name='filterName']");
    return select.selectedOptions[0].value;
  }

  getFilterString() {
    const input = this.row.querySelector("input");
    return `"${input.value}"`;
  }

  getLogical() {
    const select = this.row.querySelector("select[name='logical']");
    return select === null ? "" : select.selectedOptions[0].value;
  }

  populateFields() {
    const fieldElt = this.row.querySelector("select[name='fields']");
    fieldElt.innerHTML = `<option value="">Choisir</option>`;

    Object.keys(this.fields).forEach((field) => {
      const opt = document.createElement("option");
      opt.textContent = this.fields[field].name;
      opt.value = field;

      fieldElt.appendChild(opt);
    });
    // this.row.querySelector();
    fieldElt.addEventListener("input", this.handleOptChange.bind(this));
  }

  handleDelClick(e) {
    console.log(e);
  }

  handleOptChange(e) {
    const p = e.target;
    const filterName = this.row.querySelector("select[name='filterName']");

    const sel = Object.values(p).filter((v) => v.selected === true)[0];
    if (!sel.value) return;
    console.log(sel);
    const input = this.row.querySelector("input");
    if (this.fields[sel.value].filters === this.filters.number) {
      input.setAttribute("type", "number");
    } else {
      input.setAttribute("type", "text");
    }
    filterName.innerHTML = `<option value="">Choisir</option>`;

    this.fields[sel.value].filters.forEach((filter) => {
      const opt = document.createElement("option");
      opt.textContent = filter.name;
      opt.value = filter.symbol;
      filterName.appendChild(opt);
    });
  }
}
