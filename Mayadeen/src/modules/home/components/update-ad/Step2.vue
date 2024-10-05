<script setup>
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import Swiper from "@/components/general-components/Swiper.vue";
import { computed, reactive, ref, onMounted } from "vue";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import { useAdInfoStore } from "../../pages/ad-info/store";
import { storeToRefs } from "pinia";
import watermark from "watermarkjs";
//start
const MAX_WIDTH = 640;
const MAX_HEIGHT = 480;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.9;
var showImage = computed(() => {
    if (images.length == 0) {
        var temp = ref([]);
        for (let i = 0; i < data.value.real_estate_images.length; i++) {
            temp.value.push({ url: data.value.real_estate_images[i].image });
        }
        return temp.value;
    } else return images;
});
function compressedFile(ev) {
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
                        console.log("after");
                        displayInfo(imageFile);
                        images.push({ url: URL.createObjectURL(img) });
                        if (!updateData.value.images) {
                            updateData.value.images = [];
                        }
                        updateData.value.images.push(imageFile);
                        imagesFiles.push({ file: imageFile });
                    });
            },
            MIME_TYPE,
            QUALITY
        );
    };
}

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

// Utility functions for demo purpose

function displayInfo(file) {
    console.log(readableBytes(file.size));
}

function readableBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
//end
onMounted(() => {});
const store = useAdInfoStore();
const { data, flag, updateData } = storeToRefs(store);
const { t } = useI18n();
const emit = defineEmits(["checkedPolicy"]);
let imagesFiles = reactive([]);
let images = reactive([]);
var checked = ref(false);

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
function saveFiles() {
    let file = document.getElementById("myFile");
    for (let i = 0; i <= file.files.length - 1; i++) {
        console.log("before");

        displayInfo(file.files[i]);

        if (i <= 14 - imagesFiles.length) {
            compressedFile(file.files[i]);
        } else break;
    }
}
function deleteImage(val) {
    imagesFiles.splice(val, 1);
    images.splice(val, 1);
}
function previousSlide(val) {
    if (images[0] == images[val]) {
    } else {
        var temp = images[val];
        images[val] = images[val - 1];
        images[val - 1] = temp;
        imagesFiles[val] = imagesFiles[val - 1];
        imagesFiles[val - 1] = temp;
    }
}
function nextSlide(val) {
    if (images[images.length - 1] == images[val]) {
    } else {
        var temp = images[val];
        images[val] = images[val + 1];
        images[val + 1] = temp;
        imagesFiles[val] = imagesFiles[val + 1];
        imagesFiles[val + 1] = temp;
    }
}
</script>
<template>
    <div class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <h2 class="flex justify-center text-secondary my-16 font-semibold">
            {{ t("addImage") }}
        </h2>
        <div class="flex justify-between font font-semibold text-secondary">
            <p>{{ t("addImagesToAd") }}</p>
            <p
                class="underline transition-all ease-in-out"
                :class="imagesFiles.length >= 15 ? 'text-error' : ''"
            >
                {{ t("TheMaximumNumberOfImagesIs15Images") }}
            </p>
        </div>
        <div class="flex w-full justify-center">
            <div
                class="w-42 bg-accent relative py-10 xs:px-20 sm:px-24 lg:px-32 rounded-xl shadow-lg my-10"
            >
                <input
                    :disabled="imagesFiles.length >= 15"
                    type="file"
                    id="myFile"
                    accept="image/png, image/gif, image/jpeg , image/svg ,image/*"
                    @change="saveFiles()"
                    multiple
                />
                <Icon
                    icon="streamline:image-accessories-lenses-photos-camera-shutter-picture-photography-pictures-photo-lens"
                    width="50"
                    class="transition-all ease-in-out"
                    :class="imagesFiles.length >= 15 ? 'text-error' : ''"
                />
            </div>
        </div>
        <img src="/assets/home/add.svg" alt="" />
        <div class="w-full h-full">
            <Swiper
                :isMainImage="true"
                :images="showImage"
                @deleteImage="deleteImage($event)"
                @nextSlide="(e) => nextSlide(e)"
                @previousSlide="(e) => previousSlide(e)"
            />
        </div>
        <FormCheckbox
            class=""
            @change="emit('checkedPolicy', checked)"
            v-model="checked"
            inputClasses=""
            labelClasses="  text-secondary"
            :label="t('confirmPolicyMessage')"
        />
    </div>
</template>
<style scoped>
#myFile {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    position: absolute;
    inset-block-start: 0px;
    inset-inline-start: 0px;
    opacity: 0;
}

@media (max-width: 480px) {
}
</style>
