const fs = require('fs');
const path = require('path');

const CHATS_FILE = path.join(__dirname, '../../data/chatsdb');

class ChatController {
    // Get messages for a user
    getUserMessages(req, res) {
        try {
            // Get user ID from URL
            const userId = req.params.userId;
            
            // Read messages from file
            const messages = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
            
            // Find user's messages
            const userMessages = messages.find(chat => chat.userId === userId);
            
            // Send response
            res.json(userMessages ? userMessages.messages : []);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error getting messages' });
        }
    }

    // Send a message
    sendMessage(req, res) {
        try {
            // Get data from request
            const userId = req.body.userId;
            const message = req.body.message;
            
            // Read messages from file
            const messages = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
            
            // Find user's chat
            let userChat = messages.find(chat => chat.userId === userId);
            
            // Create new chat if not found
            if (!userChat) {
                userChat = { userId, messages: [] };
                messages.push(userChat);
            }
            
            // Add new message
            userChat.messages.push({
                sender: userId,
                text: message,
                date: new Date().toISOString()
            });
            
            // Save to file
            fs.writeFileSync(CHATS_FILE, JSON.stringify(messages, null, 2));
            
            // Send response
            res.json({ success: true });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error sending message' });
        }
    }
}

module.exports = new ChatController();