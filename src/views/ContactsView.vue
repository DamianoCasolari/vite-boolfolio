<script>

import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            email: '',
            message: '',
            errors: {},
            loading: false,
            success: false
        }
    },



    methods: {
        magicBalls() {
            const balls = document.querySelectorAll('.ball');

            function moveBalls() {
                balls.forEach(ball => {
                    const size = ball.offsetWidth;
                    const maxX = window.innerWidth - size;
                    const maxY = window.innerHeight - size;

                    const x = Math.random() * maxX;
                    const y = Math.random() * maxY;

                    ball.style.left = `${x}px`;
                    ball.style.top = `${y}px`;
                });

                setTimeout(moveBalls, 3500);
            }


            moveBalls();

        },
        submitForm() {
            this.loading = true;
            const data = {
                name: this.name,
                email: this.email,
                message: this.message,
            }
            this.errors = {}
            axios.post('http://127.0.0.1:8000/api/contacts', data).then(response => {
                console.log(response);
                if (!response.data.success) {
                    this.errors = response.data.errors
                } else {
                    this.name = ''
                    this.email = ''
                    this.message = ''
                    this.success = true

                }
                this.loading = false;

            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.magicBalls()
    }
}

</script>
<template>
    <div class="bg-light contacts d-flex flex-wrap align-items-center justify-content-center">
        <!-- <div class="ball ball-1"></div>
        <div class="ball ball-2"></div>
        <div class="ball ball-3"></div>
        <div class="ball ball-4"></div>
        <div class="ball ball-5"></div>
        <div class="ball ball-6"></div>
        <div class="ball ball-7"></div>
        <div class="ball ball-8"></div>
        <div class="ball ball-9"></div>
        <div class="ball ball-10"></div>
        <div class="ball ball-11"></div> -->
        <!-- CARD CONTACTS  -->
        <div class="context d-flex flex-wrap align-items-center justify-content-center z_index50 ghost">
            <div class=" p-2 container">
                <h4 class=" text-center fw-semibold mb-3" v-if="!success && !loading"> Contact me</h4>

                <form @submit.prevent="submitForm()" action="POST" class="d-flex flex-column justify-content-center"
                    v-if="!success && !loading">
                    <label for="guest_name" class="form-label fw-semibold fs-6">Name</label>
                    <input type="text" name="guest_email" placeholder="Jack Smith" class="form-control input_text"
                        v-model="name" required>
                    <small v-for="error in errors.name" :key="error" class="text-danger">{{ error }}</small>


                    <label for="guest_email" class="form-label fw-semibold fs-6 mt-4">Email</label>
                    <input type="email" name="guest_name" placeholder="jacksmith@example.com"
                        class="form-control input_text" v-model="email" required>
                    <small v-for="error in errors.email" :key="error" class="text-danger">{{ error }}</small>


                    <label for="guest_meassage" class="form-label fw-semibold fs-6 mt-4">Message</label>
                    <textarea name="guest_meassage" id="message" cols="30" rows="5" placeholder="Write your message... "
                        class="form-control input_text" v-model="message" required></textarea>
                    <small v-for="error in errors.message" :key="error" class="text-danger">{{ error }}</small>


                    <div class="d-flex justify-content-center mt-4">
                        <input type="submit" class="px-4 py-2 border border-0 submit_button rounded-4 fs-6" value="Submit"
                            style="width: 150px;">
                    </div>
                </form>
                <div v-if="!success && loading" class="d-flex flex-column  align-items-center justify-content-center ghost">
                    <div>Wait a few seconds</div>
                    <h4>We are sending your request</h4>
                </div>
                <div class="text-center fs-5 fw-semibold ghost" v-if="success && !loading">
                    <h2 class="fw-bold">The message has been sent correctly</h2>
                    <div>You will be contacted as soon as possible, <span class="text-success">thank you</span></div>

                </div>

            </div>
        </div>

        <!-- BACKGROUND ANIMATION -->
        <div class="area">
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div>
            <ul class="circles2">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

    </div>
</template>




<style lang="scss" scoped></style>