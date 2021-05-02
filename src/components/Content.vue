<template>
    <section id="content">
        <p>Question:</p>

            <p >{{ content.question }}</p>
            <div class="list-group">
                <div v-for="(answer,i) in answers" :key="i" @click="clickedAnswer(i)" class="list-group-item" :class="classFunc(i)">{{ answer }}</div>
            </div>

            <div class="mt-3">
                <button
                class="btn btn-primary mr-1" 
                @click="submitAnswer"
                :disabled="cIndex === null || questionAnswered"
                >Submit</button>
                <button class="btn btn-primary" @click="addIndex">Next</button>
            </div>

    </section>
</template>

<script>
export default {
    name:'Content',
    props:{
        content:{
            type: Object
        },
        addIndex: Function,
        userAnswer: Function,
    },
    data(){
        return{
            cIndex: null,
            answers:null,
            correctAnswer:null,
            questionAnswered: false,
        }
    },
    watch: {
        content:{
            immediate: true,
            handler(){
                this.cIndex = null;
                this.correctAnswer = null;
                this.questionAnswered = false;
                //answers
                var correct_answer = [this.content.correct_answer]; 
                var incorrect_answers = this.content.incorrect_answers; 
                var answers = this.shuffleArray(incorrect_answers.concat(correct_answer));
                this.answers = answers
            }
        }
    },
    methods:{
        clickedAnswer(i){
            if (!this.questionAnswered) {
                this.cIndex = i;
            }
        },
        shuffleArray(array) {
            let curId = array.length;
            // There remain elements to shuffle
            while (0 !== curId) {
                // Pick a remaining element
                let randId = Math.floor(Math.random() * curId);
                curId -= 1;
                // Swap it with the current element.
                let tmp = array[curId];
                array[curId] = array[randId];
                array[randId] = tmp;
            }
            return array;
        },
        submitAnswer(){
            var is_correct = null;
            this.correctAnswer = this.answers.indexOf(this.content.correct_answer);
            this.cIndex === this.correctAnswer ? is_correct = true : is_correct = false;
            this.userAnswer(is_correct);
            this.questionAnswered = true;
        },
        classFunc(i){
            if (!this.questionAnswered && this.cIndex === i) {
                return 'selected';
            }else if (this.questionAnswered && i === this.correctAnswer) {
                return 'correct';
            }else if (this.questionAnswered && i === this.cIndex && i !== this.correctAnswer) {
                return 'inCorrect';
            }
        }
    }
}
</script>

<style scoped>
    .selected{
        background: #9bc8ff;
    }
    .correct{
        background: #2bff75;
    }
    .inCorrect{
        background: #ef7777;
    }
</style>