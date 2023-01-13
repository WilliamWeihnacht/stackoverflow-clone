class Api::QuestionsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        num_results = 10
        page = params[:page].to_i
        query_arr = params[:query].downcase.split(" ") if params[:query]
        
        #@questions = Question.all.limit(num_results).offset(num_results * (page - 1))#.where("LOWER(title) LIKE ?", "%#{query}%"))

        
        if params[:query]
            @filtered_questions = []
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
            #@join_table = Question.left_outer_joins(:votes).select('question_votes.*')
            #@questions = @questions.order()
        else
            @questions = @filtered_questions.order(created_at: :desc)
        end

        @questions = @questions.limit(num_results).offset(num_results * (page - 1))

        if @questions
            render :index
        else
            render json: @questions.errors.full_messages
        end
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