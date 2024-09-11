import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { server } from "../../components/constants/config"
import { getAdminToken, getTokenFromStorage } from "../../lib/features";


const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/`, }),
    tagTypes: ["Chat","User", "Message"],

    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: 'chat/my',
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `user/search/?name=${name}`,
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                }),
                providesTags: ["User"]
        }),

        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: `user/send-request`,
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["User"]
        }),
        
        getNotifications: builder.query({
            query: () => ({
                url: `user/notifications`,
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        chatDetails: builder.query({
            query: ({chatId, populate=false}) => {

                let url = `chat/${chatId}`;
                if(populate){
                    url += "?populate=true"
                }
                return {
                    url,
                    headers: {
                        "authorization": `Bearer ${getTokenFromStorage()}`
                    },
                    credentials: "include",
                }
            },
            providesTags: ['Chat'],
        }),

        getMessages: builder.query({
            query: ({chatId, page}) => ({
                url: `chat/messages/${chatId}?page=${page}`,
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
            }),
            keepUnusedDataFor: 0
        }),

        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: `user/accept-request`,
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Chat"]
        }),

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: `chat/message`,
                method: "POST",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: data,
            }),
        }),

        myGroups: builder.query({
            query: () => ({
                url: 'chat/my/groups',
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        availableFriends: builder.query({
            query: (chatId) => {

                let url = `user/friends`;
                if(chatId){
                    url += `?chatId=${chatId}`
                }
                return {
                    url,
                    headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                    credentials: "include",
                }
                
            },
            providesTags: ['Chat'],
        }),

        newGroupChat: builder.mutation({
            query: ({name, members}) => ({
                url: `chat/new`,
                method: "POST",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: {name, members},
            }),
            invalidatesTags: ["Chat"]
        }),

        renameGroup: builder.mutation({
            query: ({chatId, name}) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: {name},
            }),
            invalidatesTags: ["Chat"]
        }),
        removeGroupMembers: builder.mutation({
            query: ({chatId, userId}) => ({
                url: `chat/removemember`,
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: {chatId, userId},
            }),
            invalidatesTags: ["Chat"]
        }),
        addGroupMembers: builder.mutation({
            query: ({members, chatId}) => ({
                url: `chat/addmembers`,
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
                body: {members, chatId},
            }),
            invalidatesTags: ["Chat"]
        }),
        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId}`,
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),
        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leave/${chatId}`,
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${getTokenFromStorage()}`
                },
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),

        allAdminChats: builder.query({
            query: () => ({
                url: 'admin/chats',
                headers: {
                    "authorization": `Bearer ${getAdminToken()}`
                },
                credentials: "include",
            }),
            providesTags: ["AllChat"]
        }),
        allAdminMessages: builder.query({
            query: () => ({
                url: 'admin/messages',
                headers: {
                    "authorization": `Bearer ${getAdminToken()}`
                },
                credentials: "include",
            }),
            providesTags: ["AllMessages"]
        }),
        allAdminUsers: builder.query({
            query: () => ({
                url: 'admin/users',
                headers: {
                    "authorization": `Bearer ${getAdminToken()}`
                },
                credentials: "include",
            }),
            providesTags: ["AllUsers"]
        }),
        allAdminDashboardStats: builder.query({
            query: () => ({
                url: 'admin/stats',
                headers: {
                    "authorization": `Bearer ${getAdminToken()}`
                },
                credentials: "include",
            }),
            providesTags: ["Dashboard"]
        }),
    }),

    
})

export default api
export const { useMyChatsQuery, 
    useLazySearchUserQuery, 
    useSendFriendRequestMutation, 
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupChatMutation,
    useRenameGroupMutation,
    useRemoveGroupMembersMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
    useAllAdminChatsQuery,
    useAllAdminMessagesQuery,
    useAllAdminUsersQuery,
    useAllAdminDashboardStatsQuery,
} = api;