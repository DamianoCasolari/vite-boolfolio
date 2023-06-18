<script>
export default {




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

        }
    },
    mounted() {
        this.magicBalls()
    }
}

</script>
<template>
    <div id="container" class="bg-light contacts d-flex flex-wrap align-items-center justify-content-center">
        <div class="ball ball-1"></div>
        <div class="ball ball-2"></div>
        <div class="ball ball-3"></div>
        <div class="ball ball-4"></div>
        <div class="ball ball-5"></div>
        <div class="ball ball-6"></div>
        <div class="ball ball-7"></div>
        <div class="ball ball-8"></div>
        <div class="business_card p-4 p-md-5">
            <h4 class=" text-center"> Contacts</h4>
            <ul class="list-unstyled">
                <li class="w-100"><span class="fw_500">Phone number : </span> <span>3477952189</span></li>
                <li class="w-100"><span class="fw_500">Email : </span> <span>damianocasolari@gmail.com</span> </li>
                <li class="w-100"><span class="fw_500 ">GitHub : </span><a href="https://github.com/DamianoCasolari">
                        <span class=" break_letter">https://github.com/DamianoCasolari</span></a></li>

            </ul>
        </div>
    </div>
</template>




<style lang="scss" scoped></style>