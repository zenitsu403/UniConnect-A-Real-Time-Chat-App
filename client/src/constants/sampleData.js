export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Doe",
        _id: "1",
        groupChat: false,
        members: ["1","2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Boi",
        _id: "2",
        groupChat: false,
        members: ["1","2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Loy",
        _id: "3",
        groupChat: false,
        members: ["3","4"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Guy",
        _id: "4",
        groupChat: false,
        members: ["3","4"],
    },
    
]

export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Doe",
        _id: "1",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Boi",
        _id: "2",
    },

]

export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name:"John Doe",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name:"John Boi",
        },
        _id: "2",
    },
]

export const sampleMessage = [
    {
        attachments: [],
        content: "Hi bhai kaisa hai? ban gya project??",
        _id: "id2",
        sender: {
          _id: "id2",
          name: "Raman 2",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments: [
            {
                public_id: "asdsad 2",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "",
        _id: "id1",
        sender: {
          _id: "id1",
          name: "Raman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments: [],
        content: "badiya bhai ban jaega 1 2 hafto main",
        _id: "id3",
        sender: {
          _id: "id1",
          name: "Raman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
]