document.addEventListener("DOMContentLoaded", function () {
  const messageInput = document.getElementById("text-box");
  const messageForm = document.getElementById("messageForm");

  messageForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    if (messageInput.value.trim() !== "" && currentUserId) {
      try {
        const response = await fetch('http://localhost:3000/api/chat/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ 
            userId: currentUserId,
            message: messageInput.value.trim() 
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data);
        
        // Display new message
        const chatBox = document.getElementById("massages");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("your-massage");
        messageDiv.textContent = messageInput.value.trim();
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        messageInput.value = "";
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again.');
      }
    }
  });

  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      messageForm.dispatchEvent(new Event("submit"));
    }
  });
});

const users = [
  { id: 1, name: "one", profilePicture: "../pics/contact-pp.jpg" },
  { id: 2, name: "two", profilePicture: "../pics/contact-pp.jpg" },
  { id: 3, name: "three", profilePicture: "../pics/contact-pp.jpg" },
  { id: 4, name: "four", profilePicture: "../pics/contact-pp.jpg" },
  { id: 5, name: "five", profilePicture: "../pics/contact-pp.jpg" },
  { id: 6, name: "six", profilePicture: "../pics/contact-pp.jpg" },
  { id: 7, name: "seven", profilePicture: "../pics/contact-pp.jpg" },
  { id: 8, name: "eight", profilePicture: "../pics/contact-pp.jpg" },
  { id: 9, name: "nine", profilePicture: "../pics/contact-pp.jpg" },
  { id: 10, name: "ten", profilePicture: "../pics/contact-pp.jpg" }
];

let currentUserId = null;

function loadUsers() {
  const usersList = document.getElementById("contactList");

  users.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-div";
    userDiv.setAttribute('data-user-id', user.id);

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
    lastMessageDiv.textContent = "Loading...";

    contactDiv.appendChild(nameDiv);
    contactDiv.appendChild(lastMessageDiv);
    userDiv.appendChild(ppDiv);
    userDiv.appendChild(contactDiv);
    usersList.appendChild(userDiv);

    userDiv.addEventListener("click", () => selectUser(user));
  });

  // Auto select first user
  if (users.length > 0) {
    selectUser(users[0]);
  }
}

async function selectUser(user) {
  currentUserId = user.id;
  const profileChat = document.getElementById("profileChat");
  const ppDiv = profileChat.querySelector(".pp img");
  ppDiv.src = user.profilePicture;
  ppDiv.alt = user.name;
  const nameProfileDiv = profileChat.querySelector(".name-profile");
  nameProfileDiv.textContent = user.name;

  try {
    const response = await fetch(`http://localhost:3000/api/chat/messages/${user.id}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const userChat = await response.json();
    const chatBox = document.getElementById("massages");
    chatBox.innerHTML = "";

    // Display messages
    if (userChat.message) {
      Object.values(userChat.message).forEach(message => {
        const messageBox = document.createElement("div");
        messageBox.className = message.sender === "user" ? "your-massage" : "they-massage";
        messageBox.textContent = message.text;
        chatBox.appendChild(messageBox);
      });
    }

    chatBox.scrollTop = chatBox.scrollHeight;

    // Update last message in user list
    const lastMessage = userChat.message ? Object.values(userChat.message).pop() : null;
    if (lastMessage) {
      const userDiv = document.querySelector(`[data-user-id="${user.id}"]`);
      if (userDiv) {
        const lastMessageDiv = userDiv.querySelector(".text-end");
        lastMessageDiv.textContent = lastMessage.text;
      }
    }
  } catch (error) {
    console.error('Error getting user messages:', error);
    alert('Error getting messages. Please try again.');
  }
}

loadUsers();