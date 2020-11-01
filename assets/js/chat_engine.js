class chatEngine{
    constructor(chatBoxId,userEmail) {
        this.chatBox = chatBoxId;

        this.userEmail = userEmail;
        this.socket = io.connect('https://localhost:5000');
        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        this.socket.on('connect',function() {
            console.log('connection established using sockets')
        });
    }
}