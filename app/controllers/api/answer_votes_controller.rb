class Api::AnswerVotesController < ApplicationController

    def create
        @answer_vote = AnswerVote.new(answer_vote_params)
        @answer_vote.user_id = current_user.id
        if @answer_vote.save
            render json: @answer_vote
        else
            render json: @answer_vote.errors.full_messages, status: 422
        end
    end

    def update

    end

    def destroy

    end

    private
    def answer_vote_params
        params.require(:answer_vote).permit(:answer_id, :upvote)
    end
end