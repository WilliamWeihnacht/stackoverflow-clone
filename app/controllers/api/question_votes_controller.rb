class Api::QuestionVotesController < ApplicationController

    def create
        @question_vote = QuestionVote.new(question_vote_params)
        @question_vote.user_id = current_user.id
        if @question_vote.save
            render json: @question_vote
        else
            render json: @question_vote.errors.full_messages, status: 422
        end
    end

    def destroy
        @question_vote = QuestionVote.find_by(id: params[:id])
        if @question_vote
            @question_vote.delete
        end
    end

    def update
        @question_vote = QuestionVote.find_by(question_id: params[:question_id])
        if @question_vote.update(question_vote_params)
            render json: @question_vote
        end
    end

    private
    def question_vote_params
        params.require(:question_vote).permit(:question_id, :upvote)
    end
end