class Api::QuestionsController < ApplicationController

    def index
        @questions = Question.all
        render json: @questions
        #render :index
    end
    
    def create
        @question = Question.new(question_params)
        # puts current_user
        # @question.user_id = current_user.id
        if @question.save
            #render :show
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

    end

    def destroy
        if logged_in?
            @question = Question.find_by(id: params[:id])
            if current_user.id == @question.user_id
                @question.answers.destroy_all
                @question.delete
            end
        end
    end

    private
    def question_params
        params.require(:question).permit(:user_id, :title, :body)
    end
end