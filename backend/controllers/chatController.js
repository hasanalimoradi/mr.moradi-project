const fs = require('fs');
const path = require('path');

const CHATS_FILE = path.join(__dirname, '../../data/chatsdb');

class ChatController {
    // Get messages for a specific user
    getUserMessages(req, res) {
        try {
            const userId = parseInt(req.params.userId);
            
            if (!fs.existsSync(CHATS_FILE)) {
                console.error('Chats file not found at path:', CHATS_FILE);
                return res.status(404).json({ error: 'Chats file not found' });
            }
            
            const messages = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
            const userChat = messages.find(chat => chat.userId === userId);
            
            if (!userChat) {
                return res.status(404).json({ error: 'User chat not found' });
            }
            
            res.json(userChat);
        } catch (error) {
            console.error('Error reading user messages:', error);
            res.status(500).json({ error: 'Error reading user messages' });
        }
    }

    // Send new message
    sendMessage(req, res) {
        try {
            const { userId, message } = req.body;
            
            if (!fs.existsSync(CHATS_FILE)) {
                console.error('Chats file not found at path:', CHATS_FILE);
                return res.status(404).json({ error: 'Chats file not found' });
            }
            
            const messages = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
            
            let userChat = messages.find(chat => chat.userId === userId);
            
            if (!userChat) {
                userChat = {
                    userId: userId,
                    message: {}
                };
                messages.push(userChat);
            }

            const messageId = Object.keys(userChat.message).length + 1;
            userChat.message[messageId] = {
                sender: "user",
                text: message,
                date: new Date().toISOString()
            };

            fs.writeFileSync(CHATS_FILE, JSON.stringify(messages, null, 2));
            
            res.json({ success: true, message: userChat.message[messageId] });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ error: 'Error sending message' });
        }
    }
}

module.exports = new ChatController();