document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("massages");
    const messageInput = document.getElementById("text-box");

    messageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && messageInput.value.trim() !== "") {
            addMessage(messageInput.value, "your-massage"); // کلاس user برای پیام‌های کاربر
            messageInput.value = ""; // پاک کردن فیلد ورودی
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("your-massage", sender); // اضافه کردن کلاس‌ها
        messageDiv.textContent = text;

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // اسکرول خودکار به پایین
    }
});
