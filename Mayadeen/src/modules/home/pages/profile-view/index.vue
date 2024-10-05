<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import Loading from "@/components/general-components/Loading.vue";
import { useProfileStore } from "./store";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast()
const store = useProfileStore();
onMounted(() => {
    store.getProfile();
});
const { userData, loading } = storeToRefs(store);
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const informations = [
    {
        id: 1,
        url: "/assets/profile/Ads.svg",
        text: t("MyAds"),
        path: "/home/my-ad",
    },
    {
        id: 2,
        url: "/assets/profile/help.svg",
        text: t("MyRequests"),
        path: "/home/my-order",
    },
    {
        id: 3,
        url: "/assets/profile/proof.svg",
        text: t("IdentityProof"),
        path: "/home/id-verification",
    },
    {
        id: 4,
        url: "/assets/profile/proof.svg",
        text: t("OfficeProof"),
        path: "/home/office-verification",
    },
    {
        id: 5,
        url: "/assets/profile/price-tag.svg",
        text: t("MySubscriptions"),
        path: "#",
    },
    {
        id: 6,
        url: "/assets/profile/password.svg",
        text: t("ChangeMyPassword"),
        path: "/auth/re-assign-password",
    },
    {
        id: 7,
        url: "/assets/profile/user.svg",
        text: t("ChangeMyName"),
        path: "/auth/re-assign-username",
    },
];
function checkMassage(path) {
    if (localStorage.getItem("trusted") == "true") {
        toast.success(t("yourAccountIsVerified"))

    }
    else {
        router.push(path)
    }
}
var userImage = reactive([
    {
        id: 0,
        file: "",
        url: userData.value.image ? userData.value.image : "/assets/sidebar/profile-user.svg",
    },
]);
function spliceItemFromArray(array) {
    array.splice(1, 1);
    return array;
}
function addUserImage(event) {
    var selectedFile = event.target.files[0];
    const image = {
        id: 1,
        file: selectedFile,
        url: URL.createObjectURL(selectedFile),
    };

    userImage[0] = image;
}
</script>

<template>
    <Loading v-if="loading" />
    <div class="background-image px-16 w-full h-full mx-auto pb-10" :class="loading ? 'page-loading' : ''">
        <div class="first-section pt-10">
            <div class="home w-[full] flex gap-6 text-2xl">
                <img class="mt-1 text-primary max-w-[40px]" src="/assets/profile/home-page.svg" alt="" />
                <h3 class="border-b-2 header-style border-b-primary">
                    {{ t("HomePage") }}
                </h3>
            </div>
            <div class="w-full flex justify-between">
                <div class="invisible"></div>
                <div class="avatare items-center">
                    <div class="addImage">
                        <div class="top-space"></div>
                        <div class="bottom-space">
                            <input type="file" id="myFile" accept="image/png, image/gif, image/jpeg , image/svg ,image/*"
                                @change="addUserImage" name="filename" />
                            <div class="user-icon">
                                <Icon width="50" icon="arcticons:photo-pro" color="white" />
                            </div>
                        </div>
                    </div>
                    <img class="user-image" :src="userImage[0].url" alt="Loading Image" />
                </div>
                <router-link to="#">
                    <div class="update width-[120px] h-[90px]">
                        <Icon class="text-6xl text-primary" icon="mdi:pencil-box" />
                    </div>
                </router-link>
            </div>
            <div>
                <div class="information w-full text-xl mt-20 p-16">
                    <div class="box w-[400px] flex flex-col gap-10">
                        <div class="user-name flex justify-between">
                            <p>{{ t("UserName") }} :</p>
                            <p>{{ userData.user_name }}</p>
                        </div>
                        <div class="phone flex justify-between">
                            <p>{{ t("Phone") }} :</p>
                            <p>{{ userData.phone }}</p>
                        </div>
                        <div class="date flex justify-between">
                            <p>{{ t("SubscriptionDate") }} :</p>
                            <p>{{ userData.created_at }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="second-section w-full">
            <div class="my-information w-[400px] h-auto mx-auto p-4 shadow-xl rounded">
                <div v-for="(item, index) in route.path.split('/')[1] ==
                    'daily-rental'
                    ? spliceItemFromArray(informations)
                    : informations" :key="index" class="flex justify-start gap-10 mb-2 rounded-xl p-4 hoverLink">
                    <a class="flex w-full h-full gap-6"
                        @click="item.id == 3 || item.id == 4 ? checkMassage(item.path) : router.push(item.path)">
                        <div class="icon">
                            <img class="text-primary w-[30px] h-[30px]" :src="item.url" />
                        </div>
                        {{ item.text }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.avatare {
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 100%;
    width: 200px;
    height: 200px;
    transition: all 0.3s;
}

.avatare .addImage {
    border-radius: 100%;
    width: 200px;
    height: 200px;
    position: absolute;
    overflow: hidden;
}

.avatare :hover .top-space {
    background-color: rgba(0, 0, 0, 0.479);
}

.avatare :hover .bottom-space {
    opacity: 1;
    cursor: pointer;
}

.top-space {
    height: 75%;
    transition: all 0.3s;
}

.bottom-space {
    overflow: hidden;
    height: 25%;
    position: relative;
    opacity: 0;
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    z-index: 0;
    cursor: pointer;
}

.bottom-space input {
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100px;
    top: 0px;
    opacity: 0;
    z-index: 10;
}

.bottom-space .user-icon {
    cursor: pointer;
    inset-inline-start: 38%;
    top: 0px;
    z-index: 0;
    position: absolute;
}

.user-image {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    border-radius: 100%;
    color: var(--secondary);
    font-size: 18px;
    font-weight: 600;
}

.hoverLink {
    transition: all 0.3s;
}

.hoverLink:hover {
    cursor: pointer;
    color: var(--primary);
    background-color: #0f0f0f0c;
}

.my-information {
    background-color: #ffffff;
}
</style>
