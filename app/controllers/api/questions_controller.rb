class Api::QuestionsController < ApplicationController

    def index
        # Question.joins(:votes)
        # QuestionVote.joins(:question)
        # QuestionVote.left_outer_joins(:question)
        # Question.connection.select_all('SELECT * FROM questions WHERE ')
        @questions = Question.all#.order() order by score
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
        # debugger
        @question = Question.find(params[:id])
        @user_id = current_user.id
        render :show
    end

    def update
        # debugger
        @question = Question.find(params[:question][:question_id])
        if @question.update!(question_params)
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

    def search
        @questions = Question.where("LOWER(title) LIKE ?", "%#{params[:query].downcase}%")#.limit(10)
        # render json: @questions
        render :index
    end

    private
    def question_params
        # params.require(:question).permit(:title, :body)
        params.require(:question).permit(:title, :body, :question_id)
    end
end