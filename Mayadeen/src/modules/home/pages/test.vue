<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import FormInput from "../../../components/form-components/FormInput.vue";
import { useValidator } from "@/utils/validators";
import "vue-select/dist/vue-select.css";
import { ref } from "vue";
import FormSelect from "../../../components/form-components/FormSelect.vue";
function onSubmit(values) {
    alert(JSON.stringify(values, null, 2));
}

const { isRequired, isEmail, isPassword, isSimilar } = useValidator();
const x = ref(null);
const schema = Yup.object().shape({
    select: isRequired,
    name: isRequired,
    email: isEmail,
    password: isPassword,
    confirm_password: isSimilar("password"),
});
</script>

<template>
    <div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <FormInput
                name="name"
                type="text"
                label="Full Name"
                placeholder="Your Name"
            />
            <FormInput
                name="email"
                type="email"
                label="E-mail"
                placeholder="Your email address"
            />
            <FormInput
                name="password"
                type="password"
                label="Password"
                placeholder="Your password"
            />
            <FormInput
                name="confirm_password"
                type="password"
                label="Confirm Password"
                placeholder="Type it again"
            />
            <FormSelect
                v-model="x"
                :options="['asdsad']"
                label="label"
                name="select"
            />

            <button class="submit-btn" type="submit">Submit</button>
        </Form>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

:root {
    --primary-color: #0071fe;
    --error-color: #f23648;
    --error-bg-color: #fddfe2;
    --success-color: #21a67a;
    --success-bg-color: #e0eee4;
}

html,
body {
    width: 100%;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;

    width: 100%;
    height: 100%;
}

form {
    width: 300px;
    margin: 0px auto;
    padding-bottom: 60px;
}

.submit-btn {
    background: var(--primary-color);
    outline: none;
    border: none;
    color: #fff;
    font-size: 18px;
    padding: 10px 15px;
    display: block;
    width: 100%;
    border-radius: 7px;
    margin-top: 40px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}

.submit-btn.invalid {
    animation: shake 0.5s;
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
}

@keyframes shake {
    0% {
        transform: translate(1px, 1px);
    }
    10% {
        transform: translate(-1px, -2px);
    }
    20% {
        transform: translate(-3px, 0px);
    }
    30% {
        transform: translate(3px, 2px);
    }
    40% {
        transform: translate(1px, -1px);
    }
    50% {
        transform: translate(-1px, 2px);
    }
    60% {
        transform: translate(-3px, 1px);
    }
    70% {
        transform: translate(3px, 1px);
    }
    80% {
        transform: translate(-1px, -1px);
    }
    90% {
        transform: translate(1px, 2px);
    }
    100% {
        transform: translate(1px, -2px);
    }
}

.submit-btn:hover {
    transform: scale(1.1);
}
</style>
