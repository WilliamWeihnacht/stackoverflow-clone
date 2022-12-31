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
        @question = Question.find_by(id: params[:id])
        if @question.update(goal_params)
        else
            flash[:errors] = @goal.errors.full_messages
        end
    end

    def destroy
        # @goal = current_user.goals.find_by(id: params[:id])
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