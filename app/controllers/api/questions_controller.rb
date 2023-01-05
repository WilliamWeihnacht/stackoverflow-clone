class Api::QuestionsController < ApplicationController

    def index
        @questions = Question.all
        render :index
    end
    
    def create
        @question = Question.new(question_params)
        @question.user_id = current_user.id
        if @question.save
            render json: @question
        else
            render json: @question.errors.full_messages, status: 422
        end
    end

    def show
        @question = Question.find(params[:id])
        render :show
    end

    def update
        @question = Question.find(params[:id])
        if @question.update(question_params)
            render json: @question
        else
            render json: @question.errors.full_messages
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
        params.require(:question).permit(:title, :body)
    end
end