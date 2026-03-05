console.log("Hello from Javascript");   
let name = "Xuan An";
let yearOfBirth = 2006;
let currentYear = 2026;
let age = currentYear - yearOfBirth;
console.log("Xin chào, mình là " + name + ", năm nay mình  " + age + " tuổi.");
let srcore = 7.5
if (srcore >= 8) {
    console.log("Giỏi");
}
else if (srcore >= 6.5) {
    console.log("Khá");
}
else if (srcore >= 5) {
    console.log("Trung bình");
}
else {
    console.log("Yếu");
}
function tinhDiemTrungBinh(m1, m2, m3) {
    let avg = (m1 + m2 + m3) / 3;
    return avg;
}
tinhDiemTrungBinh(7, 8, 9);
function xepLoai(avg) {
    if (avg >= 8) {
        return "Giỏi";
    }
    else if (avg >= 6.5) {
        return "Khá";
    }
    else if (avg >= 5) {
        return "Trung bình";
    }
    else {
        return "Yếu";
    }
}       
let avg = tinhDiemTrungBinh(8 ,7 , 9);
let xepLoaiResult = xepLoai(avg);
console.log("Điểm TB:", avg, " - Xếp loại:", xepLoaiResult);

