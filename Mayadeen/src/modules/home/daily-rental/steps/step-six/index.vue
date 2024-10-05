<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { reactive, ref } from "vue";
import Swiper from "@/components/general-components/Swiper.vue";
import dailyRentalButtonVue from "../../components/dailyRentalButton.vue";
import watermark from "watermarkjs";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const dailyRentalStore = useDailyRentalStore();
const { requestData, loading } = storeToRefs(dailyRentalStore);
const { t } = useI18n();
const router = useRouter();
const MAX_WIDTH = 640;
const MAX_HEIGHT = 480;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.9;
let selectedFile = ref(null);
let mainImage = ref("");
let addedImg = ref(false);
var estateImage = reactive([]);
var estateFile = reactive([]);

function saveFiles(event) {
    let file = event.target.files[0];
    estateFile.push({ file: file });
    estateImage.push({ url: URL.createObjectURL(file) });
}
var resizeFunction = function (target) {
    var context = target.getContext("2d");
    const image = new Image();
    image.src = "/assets/vue.svg";
    context.save();
    context.globalAlpha = 0.3;

    context.drawImage(
        image,
        context.canvas.width / 3,
        context.canvas.height / 3,
        context.canvas.width / 3,
        context.canvas.height / 3
    );
    context.restore(); // put the context back where you found it
    return target;
};
function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}
function compressedFile(ev, isMain) {
    const file = ev; // get the file
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
    };
    img.onload = function () {
        URL.revokeObjectURL(this.src);
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
            (blob) => {
                // Handle the compressed image. es. upload or save in local state

                watermark([new File([blob], "test"), "/assets/vue.svg"])
                    .blob(resizeFunction)
                    .then((img) => {
                        var imageFile = new File([img], "image");
                        if (isMain) {
                            addedImg.value = true;
                            mainImage.value = { url: URL.createObjectURL(img) };
                            requestData.value.image = imageFile;
                            selectedFile.value = { file: imageFile };
                        } else {
                            estateImage.push({ url: URL.createObjectURL(img) });
                            requestData.value.images.push(imageFile);
                            estateFile.push({ file: imageFile });
                        }
                    });
            },
            MIME_TYPE,
            QUALITY
        );
    };
}

function saveArrayOfFile(isMain) {
    let file = document.getElementById(isMain ? "mainFile" : "myFile");
    if (isMain) {
        compressedFile(file.files[0], isMain);
    } else
        for (let i = 0; i <= file.files.length - 1; i++) {
            if (i <= 14 - estateImage.length) {
                compressedFile(file.files[i], isMain);
            } else break;
        }
}
function deleteImage(event) {
    estateFile.splice(event, 1);
    estateImage.splice(event, 1);
}
function previousSlide(val) {
    if (estateImage[0] == estateImage[val]) {
    } else {
        var temp = estateImage[val];
        estateImage[val] = estateImage[val - 1];
        estateImage[val - 1] = temp;
        estateFile[val] = estateFile[val - 1];
        estateFile[val - 1] = temp;
    }
}
function nextSlide(val) {
    if (estateImage[estateImage.length - 1] == estateImage[val]) {
    } else {
        var temp = estateImage[val];
        estateImage[val] = estateImage[val + 1];
        estateImage[val + 1] = temp;
        estateFile[val] = estateFile[val + 1];
        estateFile[val + 1] = temp;
    }
}
</script>

<template>
    <div class="pb-10 px-10 background-image overflow-hidden">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="">
            <AddAd />
        </div>
        <div
            class="steps text-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
        >
            <div
                class="xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
            >
                {{ t("Basic estate information") }}
            </div>
            <NummerOfStep :numberOfStep="7"></NummerOfStep>
        </div>
        <div
            class="name-estate grid grid-cols-2 items-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
        >
            <div>{{ t("Main display image") }}</div>
        </div>

        <div class="w-full">
            <!-- addMainImage -->
            <div
                class="main-img mx-auto bg-accent relative rounded-xl shadow-lg"
            >
                <div v-show="!addedImg" class="py-28">
                    <Icon
                        class="mx-auto"
                        width="70px"
                        icon="ic:outline-add-box"
                    />
                </div>
                <div v-show="addedImg" class="img relative">
                    <img
                        class="rounded-xl shadow-lg"
                        :src="mainImage.url"
                        alt=""
                    />
                    <h2
                        class="overlay rounded-xl shadow-lg py-28 absolute top-0 left-0 text-xl"
                    >
                        {{ t("Edit the main image") }}
                    </h2>
                </div>
                <input
                    type="file"
                    id="mainFile"
                    accept="image/png, image/gif, image/jpeg , image/svg ,image/*"
                    @change="saveArrayOfFile(true)"
                    name="filename"
                />
            </div>
            <!-- estateImage -->

            <h2
                class="name-estate my-10 grid grid-cols-3 items-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
            >
                {{ t("Pictures of the property") }}
            </h2>

            <div class="estate-images">
                <div
                    class="add-estate-img relative w-full md:w-1/2 lg:w-1/4 xl:1/4"
                >
                    <div
                        class="py-10 bg-accent text-center rounded-xl shadow-lg"
                    >
                        <Icon
                            class="mx-auto"
                            width="70px"
                            icon="ic:outline-add-box"
                        />
                    </div>
                    <input
                        type="file"
                        id="myFile"
                        accept="image/png, image/gif, image/jpeg , image/svg ,image/*"
                        @change="(e) => saveArrayOfFile(false)"
                        name="filename"
                        multiple
                    />
                </div>
                <div class="xs:mb-5 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-44">
                    <Swiper
                        v-show="estateImage.length > 0"
                        :images="estateImage"
                        @deleteImage="
                            (e) => {
                                deleteImage(e);
                            }
                        "
                        @nextSlide="(e) => nextSlide(e)"
                        @previousSlide="(e) => previousSlide(e)"
                    />
                </div>
            </div>
            <dailyRentalButtonVue
                @next-clicked="router.push({ name: 'step7' })"
                next="next"
            ></dailyRentalButtonVue>
        </div>
    </div>
</template>
<style>
#myFile,
#mainFile {
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    inset-block-start: 0px;
    inset-inline-start: 0px;
    opacity: 0;
    z-index: 100;
    background-color: red;
}

.main-img {
    max-width: 600px;
    max-height: 300px;
    object-fit: contain;
}

.img img {
    width: 600px;
    height: 300px;
    object-fit: cover;
}

.overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.526);
    color: #fff;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    text-align: center;
    padding-top: 140px;
}

.main-img:hover .overlay {
    opacity: 1;
    z-index: 10;
    cursor: pointer;
}
</style>
