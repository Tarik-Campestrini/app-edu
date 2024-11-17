let input_fields = document.querySelectorAll('input');
for (let i = 0; i < input_fields.length; i++) {
  let field = input_fields[i];
  field.addEventListener('input', function (e) {
    if (e.target.value != "") {
      e.target.parentNode.classList.add('has-content');
    } else if (e.target.value == "") {
      e.target.parentNode.classList.remove('has-content');
    }
  });
}
// Initialization for ES Users
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

initMDB({ Dropdown, Collapse });  