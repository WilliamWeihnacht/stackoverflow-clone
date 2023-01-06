class Api::QuestionVotesController < ApplicationController

    def create
        @question_vote = QuestionVote.new(question_vote_params)
        @question.user_id = current_user.id
        if @question_vote.save
            render json: @question_vote
        else
            render json: @question_vote.errors.full_messages, status: 422
        end
    end

    def destroy

    end

    def update

    end

    private
    def question_vote_params
        params.require(:question_vote).permit(:question_id, :upvote)
    end
end