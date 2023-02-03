class Api::AnswersController < ApplicationController
    before_action :require_logged_in

    def create
        @answer = Answer.new(answer_params)
        @answer.user_id = current_user.id
        if @answer.save
            render :create
        else
            render json: @answer.errors.full_messages, status: 422
        end
    end

    def destroy
        @answer = Answer.find_by(id: params[:id])
        if @answer
            @answer.votes.destroy_all
            @answer.delete
        end
    end

    def edit

    end

    private
    def answer_params
        params.require(:answer).permit(:question_id, :body)
    end
end