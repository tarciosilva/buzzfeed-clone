import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  titles: string = 'title';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answersSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false;
      this.titles = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionMaxIndex];
      this.questionMaxIndex = quiz_questions.questions.length;
      console.log(this.questionMaxIndex);

    }
  }
  playerChoose(choose: string): void {
    this.answersSelected = choose;
    this.answers.push(choose);
    this.nextStep();
  }
  async nextStep(){
    const finalAnswer:string = await this.result(this.answers);
    this.questionIndex++;
    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      this.finished = true;
      this.answersSelected = quiz_questions.results[ finalAnswer as keyof typeof quiz_questions.results ];

    }
  }
  async result(answers:string[]) {
    const result:string = answers.reduce((previous, current, i, arr) => {
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous;
        }else {
          return current;
        }
      }
    )
    return result;
  }
}
