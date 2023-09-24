class FilterRow {
  static first = true;

  constructor() {
    this.row = document.createElement("div");
    this.row.classList.add("form-control");
    this.row.classList.add("deletable");

    // this.row.innerHTML = `<select name="fields" required></select><select name="filterName" required></select><input type="text" name="filterString" required /><div class="deleteRow"><p>*</p></div>`;
    if (FilterRow.first) {
      this.row.innerHTML = `<label for="filterString">Ou <small>le champ</small></label>`;
    } else {
      this.row.innerHTML = `<select name="logical"><option value="and">and</option><option value="or">or</option></select>`;
    }
    FilterRow.first = false;
    this.row.innerHTML += `<select name="fields" required></select><select name="filterName" required></select><input type="text" name="filterString" required /><button type="button" class="deleteRow">*</button>`;

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

    this.populateFields();
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

export default class FilterDialog extends HTMLDialogElement {
  static first = true;

  constructor() {
    super();
    // Create a shadow root
    // this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

    this.addRowBtn = document.createElement("button");
    this.addRowBtn.textContent = `+`;
    this.addRowBtn.id = "addRow";
    this.addRowBtn.classList.add("addRow");
    this.addRowBtn.addEventListener("click", this.handleAddRow.bind(this));

    this.form = document.createElement("form");
    this.form.classList.add("filterDialog__form");
    this.form.id = "filterDialog__form";

    // Create some CSS to apply to the shadow DOM
    const style = document.createElement("style");
    style.textContent = `
.after {
  --size: 30px;
  color: #ffffff;
  background-color: #272361;
  display: flex;
  cursor: pointer;
  border-radius: 1000px;
  width: var(--size);
  height: var(--size);
  justify-content: center;
  align-items: center;
  user-select: none;
}

.form-control {
  display: grid;
  padding: 0.3em;
  gap: 0.3em;
  align-items: center;
  grid-template-columns: repeat(4, 125px);
  position: relative;
}

.form-control * {
  grid-row: 1;
}

.form-control select,
.form-control input {
  border: 1px solid;
  background: none;
  padding: 0.3em;
  border-radius: 3px;
  border: 1px solid lightgray;
  /* outline-offset: 1px; */
}

.form-control + .form-control {
  margin-top: 0.3em;
}

.form-control.del .after {
    --size: 15px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.1em;
  cursor: pointer;
  opacity: 0;
}

.form-control.del:hover .after {
  opacity: 1;
  background-color: lightcoral;
}
    `;

    // attach the created elements to the shadow DOM
    this.append(style, this.form, this.addRowBtn);
  }

  handleAddRow() {
    const filterRow = new FilterRow();
    this.rows.push(filterRow);
    this.querySelector("form").appendChild(filterRow.getRow());
  }

  connectedCallback() {
    this.rows = [];
    const filterRow = new FilterRow();
    this.rows.push(filterRow);
    this.form.appendChild(filterRow.getRow());
    const deleteBtn = filterRow.getDel();
    deleteBtn.addEventListener("click", (e) => {
      console.log(this.rows.length);
      // if (this.rows.length === 1) {
      //   this.wrapper.removeChild(this.form);
      //   this.close();
      //   FilterDialog.first = true;
      // } else {
      //   const row = this.rows.at(-1);
      //   this.form.removeChild(row.getRow());
      // }
    });
  }

  attributeChangedCallback() {
    console.log("attribute changed");
  }
}
