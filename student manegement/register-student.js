const registerForm = document.getElementById("registerForm");

const registerInputs = {
  fullName: document.getElementById("fullName"),
  studentCode: document.getElementById("studentCode"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  major: document.getElementById("major"),
};

function showErrors(prefix, errors = {}) {
  ["fullName", "studentCode", "email", "phone", "major", "gender"].forEach((key) => {
    const el = document.getElementById(`${prefix}${key}Error`);
    if (!el) return;
    el.textContent = errors[key] || "";
  });
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedGender = document.querySelector('input[name="gender"]:checked');

  const student = {
    fullName: registerInputs.fullName.value,
    studentCode: registerInputs.studentCode.value,
    email: registerInputs.email.value,
    phone: registerInputs.phone.value,
    major: registerInputs.major.value,
    gender: selectedGender ? selectedGender.value : "",
  };

  const students = readStudents();
  const result = validateStudent(student, students);

  showErrors("", result.errors);

  if (!result.isValid) return;

  students.push({
    id: createId(),
    ...result.cleaned,
    createdAt: new Date().toISOString(),
  });

  writeStudents(students);
  registerForm.reset();
  window.location.href = "students.html";
});
