class Api::QuestionsController < ApplicationController

    def index
        @questions = Question.all
        render json: @questions
        #render :index
    end
    
    def create
        @question = Question.new(question_params)
        if @question.save
            render :show #consider changing to info
        else
            render json: @question.errors.full_messages, status: 422
        end
    end

    def show
        @question = Question.find(params[:id])
        render :show
    end

    def update

    end

    def destroy

    end

    private
    def question_params
        params.require(:question).permit(:title, :body)
    end
end