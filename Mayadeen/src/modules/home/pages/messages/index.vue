<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import Message from "../../components/Message.vue";
import Button from "@/components/general-components/Button.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMessages } from "./store";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
const router = useRouter();
const store = useMessages();
const { messages, users: usersArray, activeUser } = storeToRefs(store);
onMounted(() => {
    store.getUserForChat();
});
const { t } = useI18n();
const users = [
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
    {
        id: 0,
        image: "mingcute:user-4-fill",
        text: "username",
    },
];
const messageValue = ref("");
function sendMessage() {
    store.sendMessage({ message: messageValue.value, user_id: 2 });
    messageValue.value = "";
    // messages.push({
    //     message: messageValue.value,
    //     sender: true,
    //     time: "6:30",
    // });
    // messageValue.value = "";
}
const selectUserForChat = (user) => {
    store.getMessages(user.id);
    store.setActiveUser(user);
};
</script>
<template>
    <div class="background-image p-10 pt-5">
        <div class="flex gap-4 items-center mt-0 pt-4">
            <Icon icon="jam:messages-alt-f" width="40" class="text-primary" />
            <h3 class="header-style">{{ t("messages") }}</h3>
        </div>
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="messages-container">
            <article class="chat-users-list w-1/4 rounded-xl">
                <div
                    v-for="user in usersArray"
                    :key="user.id"
                    class="chat-users-list-item"
                    @click="selectUserForChat(user)"
                >
                    <Icon icon="mingcute:user-4-fill" width="30" />
                    <p class="text-xl">{{ t(user.user_name) }}</p>
                </div>
            </article>
            <article class="rounded-xl chat-view rounded-s-none w-3/4">
                <template v-if="activeUser.user_name">
                    <div class="flex gap-4 items-center m-6">
                        <Icon icon="mingcute:user-4-fill" width="40" />
                        <p class="text-xl">{{ activeUser.user_name }}</p>
                    </div>
                    <div class="overflow-auto px-4" style="height: 68%">
                        <!-- Example Message -->
                        <!-- <Message
                        message="السلام عليكم"
                        :sender="false"
                        time="6:30"
                    /> -->
                        <Message
                            v-for="item in messages"
                            :key="item.id"
                            :message="item.message"
                            :sender="item.sender_id != activeUser.id"
                            :time="
                                dayjs(item.created_at).format(
                                    'DD/MM/YYYY , h:mm A'
                                )
                            "
                        />
                    </div>
                    <div
                        class="w-full my-5 flex justify-center message-btn-container"
                    >
                        <div
                            class="flex message-btn w-4/5 justify-between bg-accent rounded-xl"
                        >
                            <input
                                :placeholder="t('sendMessagePlaceholder')"
                                v-model="messageValue"
                                type="text"
                                class="bg-accent rounded-xl text-xl px-10 mt-3"
                            />
                            <button
                                @click="sendMessage"
                                class="bg-primary rounded-xl flex justify-center px-5 py-3"
                            >
                                <Icon icon="fa:send" color="white" width="30" />
                            </button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="h-full w-full flex items-center justify-center text-xl opacity-60"
                    >
                        {{ t("selectUser") }}
                    </div>
                </template>
            </article>
        </div>
    </div>
</template>
<style scoped>
.background-image {
    overflow: hidden;
    height: 90vh;
}
.chat-users-list-item {
    display: flex;
    gap: 15px;
    align-items: center;
    margin: 5px 10px;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease;
}

.chat-users-list-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--primary);
}
.messages-container {
    @apply flex my-10 rounded-xl;
    background-color: white;
    border: 2px solid #707070;
    height: 90%;
}

.chat-users-list {
    border-inline-end: 2px solid #707070;
    background-color: white;
    height: 100%;
    overflow: auto;
}
.chat-view {
    height: 100%;
    background-color: white;
    position: relative;
}
.message-btn {
    inset-block-end: 20px;
}
.message-btn input {
    font-size: 16px;
    height: 30px;
    width: 90%;
}
.message-btn input:focus {
    outline: none;
}
.message-btn button {
    width: 10%;
}
</style>
