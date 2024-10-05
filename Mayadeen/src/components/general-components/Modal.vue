<script setup>
import { useAttrs } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps({
    show: Boolean,
});

const attrs = useAttrs();
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="modal-mask" @click.self="emit('close')">
                <div class="modal-container" v-bind="attrs">
                    <div class="modal-header">
                        <slot name="modal-header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="modal-footer"> </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    @apply text-xl  border-solid border-primary text-secondary pb-1;
    border-bottom-width: 2px;
    font-weight: 600;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.close-modal {
    display: flex;
    color: white;
    position: absolute;
    inset-inline-end: 20px;
    inset-block-start: 20px;
    background-color: rgba(20, 20, 20, 0.897);
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    width: 25px;
    height: 25px;
    padding-bottom: 4px;
}
</style>
