Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/tablatures', to: 'homes#index'
  get '/tablatures/:id', to: 'homes#index'
  get '/users/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :tablatures, only: [:show, :create, :update]
      resources :users, only: [:show] do
        resources :tablatures, only: [:index]
      end
    end
  end
end
