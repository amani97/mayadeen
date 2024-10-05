<template>
    <div class="relative">
        <img
            src="/assets/daily-rental/calendar.svg"
            alt="calendar"
            class="w-10 position-style"
        />
        <input
            class="position-style calender"
            type="date"
            id="birthday"
            name="birthday"
        />
    </div>
</template>
<style scoped>
.calender {
    opacity: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
}
.position-style {
    position: absolute;
}
</style>
