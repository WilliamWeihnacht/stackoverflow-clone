class Api::QuestionsController < ApplicationController

    def index
        @questions = Question.all
        render json: @questions
    end
    
    def create
        @question = Question.new(question_params)
        if @question.save
            render json: @question
        else
            render json: @question.errors.full_messages, status: 422
        end
    end

    def show
        @question = Question.find(params[:id])
        render json: @question
    end

    def update
        @question = Question.find(params[:id])
        debugger
        if @question.update(question_params)
            render json: @question
        else
            flash[:errors] = @question.errors.full_messages
        end
    end

    def destroy
        @question = Question.find_by(id: params[:id])
        if @question
            @question.answers.destroy_all
            @question.delete
        end
    end

    private
    def question_params
        params.require(:question).permit(:user_id, :title, :body)
    end
end