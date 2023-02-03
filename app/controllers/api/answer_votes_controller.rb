class Api::AnswerVotesController < ApplicationController
    before_action :require_logged_in

    def create
        @answer_vote = AnswerVote.new(answer_vote_params)
        @answer_vote.user_id = current_user.id
        if @answer_vote.save
            render json: @answer_vote
        else
            render json: @answer_vote.errors.full_messages, status: 422
        end
    end

    def destroy
        @answer_vote = AnswerVote.find_by(id: params[:id])
        if @answer_vote
            @answer_vote.delete
        end
    end

    def update
        @answer_vote = AnswerVote.find_by(answer_id: params[:answer_id])
        if @answer_vote.update(answer_vote_params)
            render json: @answer_vote
        end
    end

    private
    def answer_vote_params
        params.require(:answer_vote).permit(:answer_id, :upvote)
    end
end