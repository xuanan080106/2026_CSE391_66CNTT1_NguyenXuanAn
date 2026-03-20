const studentsBody = document.getElementById("studentsBody");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");
const editForm = document.getElementById("editForm");
const cancelEditBtn = document.getElementById("cancelEdit");

const editInputs = {
  id: document.getElementById("editId"),
  fullName: document.getElementById("editFullName"),
  studentCode: document.getElementById("editStudentCode"),
  email: document.getElementById("editEmail"),
  phone: document.getElementById("editPhone"),
  major: document.getElementById("editMajor"),
};

let students = readStudents();

function getFilteredStudents() {
  const keyword = (searchInput.value || "").trim().toLowerCase();
  if (!keyword) return students;

  return students.filter((s) =>
    [s.fullName, s.studentCode, s.email, s.phone, s.major, s.gender]
      .join(" ")
      .toLowerCase()
      .includes(keyword)
  );
}

function showEditErrors(errors = {}) {
  ["fullName", "studentCode", "email", "phone", "major", "gender"].forEach((key) => {
    const el = document.getElementById(`edit${key.charAt(0).toUpperCase() + key.slice(1)}Error`);
    if (el) el.textContent = errors[key] || "";
  });
}

function renderTable() {
  const filtered = getFilteredStudents();
  studentsBody.innerHTML = "";

  if (!filtered.length) {
    emptyMessage.classList.remove("hidden");
    return;
  }

  emptyMessage.classList.add("hidden");

  filtered.forEach((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.fullName}</td>
      <td>${student.studentCode}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.major}</td>
      <td>${student.gender}</td>
      <td>
        <div class="row-actions">
          <button class="btn btn-warning" data-action="edit" data-id="${student.id}" type="button">Sửa</button>
          <button class="btn btn-danger" data-action="delete" data-id="${student.id}" type="button">Xóa</button>
        </div>
      </td>
    `;
    studentsBody.appendChild(tr);
  });
}

function resetEditForm() {
  editForm.reset();
  editInputs.id.value = "";
  showEditErrors({});
}

function fillEditForm(student) {
  editInputs.id.value = student.id;
  editInputs.fullName.value = student.fullName;
  editInputs.studentCode.value = student.studentCode;
  editInputs.email.value = student.email;
  editInputs.phone.value = student.phone;
  editInputs.major.value = student.major;

  const genders = document.querySelectorAll('input[name="editGender"]');
  genders.forEach((radio) => {
    radio.checked = radio.value === student.gender;
  });

  showEditErrors({});
  editInputs.fullName.focus();
}

studentsBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "delete") {
    const ok = window.confirm("Bạn có chắc muốn xóa sinh viên này?");
    if (!ok) return;

    students = students.filter((s) => s.id !== id);
    writeStudents(students);

    if (editInputs.id.value === id) {
      resetEditForm();
    }

    renderTable();
    return;
  }

  if (action === "edit") {
    const selected = students.find((s) => s.id === id);
    if (!selected) return;
    fillEditForm(selected);
  }
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = editInputs.id.value;
  if (!id) {
    alert("Vui lòng chọn sinh viên cần sửa từ danh sách.");
    return;
  }

  const selectedGender = document.querySelector('input[name="editGender"]:checked');

  const candidate = {
    fullName: editInputs.fullName.value,
    studentCode: editInputs.studentCode.value,
    email: editInputs.email.value,
    phone: editInputs.phone.value,
    major: editInputs.major.value,
    gender: selectedGender ? selectedGender.value : "",
  };

  const result = validateStudent(candidate, students, id);
  showEditErrors(result.errors);

  if (!result.isValid) return;

  students = students.map((s) => (s.id === id ? { ...s, ...result.cleaned } : s));
  writeStudents(students);
  renderTable();
  alert("Cập nhật sinh viên thành công.");
});

cancelEditBtn.addEventListener("click", resetEditForm);
searchInput.addEventListener("input", renderTable);

resetEditForm();
renderTable();
