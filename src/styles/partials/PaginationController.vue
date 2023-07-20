<script>
// import axios from 'axios';

export default {
    name: "PaginationController",
    data() {


    },
    components: {
    },
    props:
        ['prev_condition',
            'next_condition']

    ,
    mounted() {
    }

}
</script>

<template>
    <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
            <ul class="pagination pagination-sm bg-transparent my-4">
                <li class=" bg-transparent border_hover" v-if="prev_condition">
                    <button class="bg-transparent border border-0 no_outline " aria-label="Previous" @click="$emit('prev')">
                        <span aria-hidden="true" class="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg> Prev</span>
                    </button>
                </li>

                <li class="bg-transparent border_hover" v-if="next_condition">
                    <button class="bg-transparent border border-0 no_outline " @click="$emit('next')" aria-label="Next">
                        <span aria-hidden="true" class="fs-4">Other projects <svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg></span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="scss"></style>