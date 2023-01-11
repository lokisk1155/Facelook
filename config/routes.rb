Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :index]
    resources :posts, only: [:create, :show, :index, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :friends, only: [:create, :index, :update, :destroy, :show]
    resources :stories, only: [:create]
  end
  
  get '*path', to: "static_pages#frontend_index"
end