const statusEl = document.getElementById('status');
const btnHello = document.getElementById('btnHello');

btnHello.addEventListener("click", function() {
    statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng Javascript.";
});  
const btnRed = document.getElementById('btnRed');

btnRed.addEventListener("click", function() {
    document.body.style.backgroundColor = "lightblue";
});
const nameInput = document.getElementById('nameInput');
const greetingEl = document.getElementById('greeting');

nameInput.addEventListener("input", function (){
    const value = nameInput.value;
    greeting.textContent = "Xin chào, " + value + "!";
}); 