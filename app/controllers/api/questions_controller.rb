class Api::QuestionsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        num_results = 20
        page = params[:page].to_i
        query_arr = params[:query].downcase.split(" ") if params[:query]
       
        @filtered_questions = []
        if params[:query]
            query_arr.each do |query|
                @filtered_questions << Question.where("LOWER(title) LIKE ?", "%#{query}%").or(Question.where("LOWER(body) LIKE ?", "%#{query}%"))
            end
            @filtered_questions = @filtered_questions.reduce(:and)
        else
            @filtered_questions = Question.all
        end

        

        order = params[:order]
        case order
        when "new"
            @questions = @filtered_questions.order(created_at: :desc)
        when "modified"
            @questions = @filtered_questions.order(updated_at: :desc)
        when "score"
            #todo
            # debugger
            @questions = Question.joins(:votes).sum('questions.id')
        else
            @questions = @filtered_questions.joins(:votes).count('questions.id')
        end

        @questions = @questions.limit(num_results).offset(num_results * (page - 1))

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
        if current_user
            @user_id = current_user.id
        else
            @user_id = nil
        end
        render :show
    end

    def update
        @question = Question.find(params[:id])
        if @question.update!(question_params.except(:question_id))
            render :show
        else
            render json: @question.errors.full_messages
        end
    end

    def destroy
        @question = Question.find_by(id: params[:id])
        if @question
            @question.answers.destroy_all
            @question.votes.destroy_all
            @question.delete
        end
    end

    private
    def question_params
        params.require(:question).permit(:title, :body, :question_id)
    end
end