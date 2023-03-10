Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :questions
    resources :answers, only: [:create, :destroy, :update]
    resources :question_votes, only: [:create, :destroy, :update]
    resources :answer_votes, only: [:create, :destroy, :update]
  end

  get '*path', to: 'static_pages#frontend'
end