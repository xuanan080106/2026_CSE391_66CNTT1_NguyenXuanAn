const STORAGE_KEY = "students_data_v1";

function readStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function writeStudents(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function normalize(value) {
  return String(value || "").trim();
}

function validateStudent(student, existingStudents, currentId = null) {
  const errors = {};

  const fullName = normalize(student.fullName);
  const studentCode = normalize(student.studentCode).toUpperCase();
  const email = normalize(student.email).toLowerCase();
  const phone = normalize(student.phone);
  const major = normalize(student.major);
  const gender = normalize(student.gender);

  if (!fullName) {
    errors.fullName = "Họ và tên không được để trống.";
  }

  if (!/^SV\d{3,}$/i.test(studentCode)) {
    errors.studentCode = "Mã SV phải đúng định dạng, ví dụ: SV001.";
  }

  if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!/^\d{9,11}$/.test(phone)) {
    errors.phone = "Số điện thoại chỉ gồm số và dài 9-11 ký tự.";
  }

  if (!major) {
    errors.major = "Vui lòng chọn ngành học.";
  }

  if (!gender) {
    errors.gender = "Vui lòng chọn giới tính.";
  }

  const duplicateCode = existingStudents.find(
    (s) => s.studentCode.toUpperCase() === studentCode && s.id !== currentId
  );
  if (duplicateCode) {
    errors.studentCode = "Mã sinh viên đã tồn tại.";
  }

  const duplicateEmail = existingStudents.find(
    (s) => s.email.toLowerCase() === email && s.id !== currentId
  );
  if (duplicateEmail) {
    errors.email = "Email đã được sử dụng.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleaned: { fullName, studentCode, email, phone, major, gender },
  };
}

function mapById(students) {
  return students.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
}
