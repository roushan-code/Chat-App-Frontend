
export const sampleChats = [{
    _id: "1",
    name: "John Doe",
    avatar: ["https://randomuser.me/api/portraits"],
    groupChat: false,
    sameSender: false,
    members: ["1", "2"]
},
{
    _id: "2",
    name: "John Wick",
    avatar: ["https://randomuser.me/api/portraits"],
    groupChat: false,
    sameSender: false,
    members: ["1", "2"]
},

]

export const sampleUsers = [
    {
        _id: "1",
        name: "John Doe",
        avatar: ["https://randomuser.me/api/portraits"],
    },
    {
        _id: "2",
        name: "John Wick",
        avatar: ["https://randomuser.me/api/portraits"],
    },
   
]

export const sampleNotification = [{
    sender: {
        name: "John Doe",
        avatar: ["https://randomuser.me/api/portraits"],
    },
    _id: "1"
},
{
    sender: {
        name: "John Wick",
        avatar: ["https://randomuser.me/api/portraits"],
    },
    _id: "2"
}

]

export const sampleMessages = [
    {
        attachments: [
            {
                public_id: "asdsad",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "L*uda ka Message hai", 
        _id: "sfnsdjkfsdfkjsbnd",
        sender: {
            _id: "user._id",
            name: "Chaman",
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
        content: "L*uda ka 2 Message hai", 
        _id: "slfjsdfisdsdfsfsd",
        sender: {
            _id: "slfjsdfi",
            name: "Chaman 2",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
]

export const dashboardData = {
    users: [{
        _id: "1",
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits",
        username: "Johan_doe",
        friends: 30,
        groups: 6
    },
    {
        _id: "2",
        name: "John Wick",
        avatar: "https://randomuser.me/api/portraits",
        username: "Johan_wick",
        friends: 30,
        groups: 6
    },
],
chats: [
    {
        name: "first one",
    avatar: ["https://randomuser.me/api/portraits"],
    totalMembers: 2,
    members: [{id: '1', avatar: "https://randomuser.me/api/portraits"}, {id: '1', avatar: "https://randomuser.me/api/portraits"}],
    tatalMessages: 25,
    creator: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits",
    },
    _id: "1",
    groupChat: false, 
    },
    {
        name: "second one",
    avatar: ["https://randomuser.me/api/portraits"],
    totalMembers: 2,
    members: [{id: '1', avatar: "https://randomuser.me/api/portraits"}, {id: '1', avatar: "https://randomuser.me/api/portraits"}],
    tatalMessages: 20,
    creator: {
        name: "John Doooo",
        avatar: "https://randomuser.me/api/portraits",
    },
    _id: "2",
    groupChat: false, 
    },
],
messages:[
    {
        attachments: [
            {
                public_id: "asdsad",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "L*uda ka Message hai", 
        _id: "sfnsdjkfsdfkjsbnd",
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Chaman",
        },
        groupChat: false,
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
        content: "L*uda ka 2 Message hai", 
        _id: "slfjsdfisdsdfsfsd",
        sender: {
            name: "Chaman 2",
            avatar: "https://www.w3schools.com/howto/img_avatar.png"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
        groupChat: true
    },
]
};
