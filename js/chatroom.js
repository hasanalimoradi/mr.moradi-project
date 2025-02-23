document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("massages");
  const messageInput = document.getElementById("text-box");

  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && messageInput.value.trim() !== "") {
      addMessage(messageInput.value, "your-massage");
      messageInput.value = "";
    }
  });

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    messageDiv.textContent = text;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

const users = [
  { id: 1, name: "yek", profilePicture: "../pics/contact-pp.jpg" },
  { id: 2, name: "do", profilePicture: "../pics/contact-pp.jpg" },
  { id: 3, name: "se", profilePicture: "../pics/contact-pp.jpg" },
  { id: 4, name: "chahar", profilePicture: "../pics/contact-pp.jpg" },
  { id: 5, name: "panj", profilePicture: "../pics/contact-pp.jpg" },
  { id: 6, name: "shesh", profilePicture: "../pics/contact-pp.jpg" },
  { id: 7, name: "haft", profilePicture: "../pics/contact-pp.jpg" },
  { id: 8, name: "hasht", profilePicture: "../pics/contact-pp.jpg" },
  { id: 9, name: "noh", profilePicture: "../pics/contact-pp.jpg" },
  { id: 10, name: "dah", profilePicture: "../pics/contact-pp.jpg" }
];

const chats = [
  { userId: 1, message: { user: "hi do", them: "hi" } },
  { userId: 2, message: { user: "hi do", them: "hi" } },
  { userId: 3, message: { user: "hi do", them: "hi" } },
  { userId: 4, message: { user: "hi do", them: "hi" } },
  { userId: 5, message: { user: "hi do", them: "hi" } },
  { userId: 6, message: { user: "hi do", them: "hi" } },
  { userId: 7, message: { user: "hi do", them: "hi" } },
  { userId: 8, message: { user: "hi do", them: "hi" } },
  { userId: 9, message: { user: "hi do", them: "hi" } },
  { userId: 10, message: { user: "hi do", them: "hi" } },
];

function loadUsers() {

  const usersList = document.getElementById("contactList");

  users.forEach(user => {

    const userChats = chats.filter(chat => chat.userId === user.id);

    let lastMessage = "هیچ پیامی وجود ندارد.";
    if (userChats.length > 0) {
        const lastChat = userChats[userChats.length - 1]?.message; 
        if (lastChat && lastChat.them) {
            lastMessage = lastChat.them; 
        } else if (lastChat && lastChat.user) {
            lastMessage = lastChat.user;
        }
    }

    const userDiv = document.createElement("div");
    userDiv.className = "user-div";


    const ppDiv = document.createElement("div");
    ppDiv.className = "contact-pp";

    const img = document.createElement("img");
    img.src = user.profilePicture;
    img.alt = "profile";
    ppDiv.appendChild(img);

    const contactDiv = document.createElement("div");
    contactDiv.className = "contact";

    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = user.name;

    const lastMessageDiv = document.createElement("div");
    lastMessageDiv.className = "text-end";
    lastMessageDiv.textContent = lastMessage;

    contactDiv.appendChild(nameDiv);
    contactDiv.appendChild(lastMessageDiv);

    userDiv.appendChild(ppDiv);
    userDiv.appendChild(contactDiv);


    usersList.appendChild(userDiv);
  });
}


loadUsers();