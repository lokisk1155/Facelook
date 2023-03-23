# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[create show update index]
    resources :posts, only: %i[create show index destroy update]
    resource :session, only: %i[show create destroy]
    resources :friends, only: %i[create index update destroy show]
    resources :stories, only: %i[create index]
  end

  get '*path', to: 'static_pages#frontend_index'
end
