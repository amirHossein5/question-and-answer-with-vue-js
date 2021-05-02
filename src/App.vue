<template>
  <div id="app">
    <Header 
      :questionLen="questions.length" 
      :index="index+1"
      :answered_correct="answered_correct"
      :total_answered="total_answered"
    ></Header>

    <section class="container">
    <section class="d-flex justify-content-center">
      <section class="jumbotron" id="question">
        <Content 
        v-if="content != null" 
        :content="content" 
        :addIndex="addIndex"
        :userAnswer="userAnswer"
        ></Content>
        <hr>
      </section>    
    </section>
    </section>

  </div>
</template>

<script>
import Content from './components/Content.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,Content
  },
  data(){
    return{
      questions:[],
      index: 0,
      content: null,
      total_answered: 0,
      answered_correct: 0
    }
  },
  methods:{
    addIndex(){
      if ((this.index)+1 === this.questions.length) {
        this.index = 0;
        this.content = this.questions[this.index];
        return false;
      }else{
        this.index++;
        this.content = this.questions[this.index];
      }
    },
    userAnswer(is_correct){
      is_correct ? this.answered_correct++ : '';
      this.total_answered++
    }
  },
  mounted(){
    fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple',
    {method:'get'}
    ).then((response)=>{
      return response.json();
    }).then((result)=>{
      this.questions = result.results;
      this.content = this.questions[0];
    })
  }
}
</script>

