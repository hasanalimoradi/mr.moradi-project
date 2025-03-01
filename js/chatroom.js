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
  { userId: 1, message: { 1: { sender: "user", text: "hi yek" }, 2: { sender: "yek", text: "hi" }, } },
  { userId: 2, message: { 1: { sender: "user", text: "hi do" }, 2: { sender: "do", text: "hi" }, 3: { sender: "user", text: "whats up" } } },
  { userId: 3, message: { 1: { sender: "user", text: "hi se" }, 2: { sender: "se", text: "hi" }, } },
  { userId: 4, message: { 1: { sender: "user", text: "hi chahar" }, 2: { sender: "chahar", text: "hi" }, 3: { sender: "user", text: "whats up" } } },
  { userId: 5, message: { 1: { sender: "user", text: "hi panj" }, 2: { sender: "panj", text: "hi" }, } },
  { userId: 6, message: { 1: { sender: "user", text: "hi shesh" }, 2: { sender: "shesh", text: "hi" }, 3: { sender: "user", text: "whats up" } } },
  { userId: 7, message: { 1: { sender: "user", text: "hi haft" }, 2: { sender: "haft", text: "hi" }, } },
  { userId: 8, message: { 1: { sender: "user", text: "hi hasht" }, 2: { sender: "hasht", text: "hi" }, 3: { sender: "user", text: "whats up" } } },
  { userId: 9, message: { 1: { sender: "user", text: "hi noh" }, 2: { sender: "noh", text: "hi" }, } },
  { userId: 10, message: { 1: { sender: "user", text: "hi dah" }, 2: { sender: "dah", text: "hi" }, 3: { sender: "user", text: "whats up" } } },
];

function loadUsers() {
  const usersList = document.getElementById("contactList");

  users.forEach(user => {
    const userChat = chats.find(chat => chat.userId === user.id);
    let lastMessage = "هیچ پیامی وجود ندارد.";
    const messageKeys = Object.keys(userChat.message);
    const lastKey = Math.max(...messageKeys.map(Number));
    const lastMessageObj = userChat.message[lastKey];

    lastMessage = lastMessageObj.text;

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

    userDiv.addEventListener("click", () => selectUser(user));
  });
}

function selectUser(user) {
  const profileChat = document.getElementById("profileChat");
  const ppDiv = profileChat.querySelector(".pp img");
  ppDiv.src = user.profilePicture;
  ppDiv.alt = user.name;
  const nameProfileDiv = profileChat.querySelector(".name-profile");
  nameProfileDiv.textContent = user.name;


  const chatBox = document.getElementById("massages")
  chatBox.innerHTML = "";
  const userChat = chats.find(chat => chat.userId === user.id);
  let messagesUser = Object.values(userChat.message)
  messagesUser.forEach(message => {
    console.log(message)
    
    if (message.sender == "user") {
      const text = message.text
      const messageBox = document.createElement("div");
      messageBox.className = "your-massage";
      messageBox.textContent = text;
      chatBox.appendChild(messageBox)
    }
    else {
      const text = message.text
      const messageBox = document.createElement("div");
      messageBox.className = "they-massage";
      messageBox.textContent = text;
      chatBox.appendChild(messageBox)
    }

  })
}

loadUsers();