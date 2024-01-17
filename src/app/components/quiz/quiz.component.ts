import { Component, OnInit } from '@angular/core';
import quiz_questions_db from '../../../assets/data/quiz_questions_mock_db.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  title: string = 'Título Genérico';
  finished: boolean = false;
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';

  constructor() {}

  ngOnInit(): void {
    if (quiz_questions_db) {
      this.finished = false;
      this.title = quiz_questions_db.title;

      this.questions = quiz_questions_db.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quiz_questions_db.results[
          finalAnswer as keyof typeof quiz_questions_db.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, current, i, arr) => {
      if (
        arr.filter((item) => item === prev).length >
        arr.filter((item) => item === current).length
      ) {
        return prev;
      } else {
        return current;
      }
    });
    return result;
  }
}
