<template>
    <nav class="py-3 px-2 bg-success">
        <section class="text-center font-weight-bold">
            <span v-if="questionLen === 0">{{ loading }}</span>
            <span v-if="questionLen != 0">Question {{ index }}/{{ questionLen }}</span>
            <span 
            v-if="questionLen != 0" 
            class="ml-5"
            >total answer: {{ total_answered }} / sum of correct answers: {{ answered_correct }}
            </span>
        </section>
    </nav>
</template>

<script>
export default {
    name:'Header',
    props:{
        index: {type: Number,default: 0},
        questionLen: {type: Number,default: 0},
        total_answered: Number,
        answered_correct: Number,
    },
    data(){
        return{
            loading: 'is loading.'
        }
    },
    watch:{
        questionLen:{
            immediate: true,
            handler(){
                var loading = setInterval(()=>{
                    this.questionLen !== 0 ? clearInterval(loading) : '';
                    if(this.loading.length === 13){
                        this.loading='is loading';
                    }else{
                        this.loading += '.'
                    }
                },700)
            }
        }
    }
}
</script>