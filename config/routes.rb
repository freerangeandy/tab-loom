Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/tablatures', to: 'homes#index'
  get '/tablatures/:id', to: 'homes#index'
  get '/users/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :chords do
        get '/api/v1/chords', to: 'chords#index'
      end
      resources :tablatures, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show] do
        resources :tablatures, only: [:index]
      end
    end
  end
end
