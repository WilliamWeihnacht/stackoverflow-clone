class Api::QuestionsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        num_results = 10
        page = params[:page].to_i

        if params[:query]
            @questions = Question.all.limit(num_results).offset(num_results * (page - 1)).where("LOWER(title) LIKE ?", "%#{params[:query].downcase}%")
        else
            @questions = Question.all.limit(num_results).offset(num_results * (page - 1))
        end

        # debugger

        order = params[:order]
        case order
        when "new"
            @questions = @questions.order(created_at: :desc)
        when "modified"
            @questions = @questions.order(updated_at: :desc)
        when "score"
            #@join_table = Question.left_outer_joins(:votes).select('question_votes.*')
            #@questions = @questions.order()
        else
            @questions = @questions.order(created_at: :desc)
        end

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
        @user_id = current_user.id
        render :show
    end

    def update
        @question = Question.find(params[:id])
        if @question.update!(question_params.except(:question_id))
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
        params.require(:question).permit(:title, :body, :question_id)
    end
end