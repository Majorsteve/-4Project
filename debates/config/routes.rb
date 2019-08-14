Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/users/verify', to: 'user#verify'
  resources :users
  resources :topics do
    resources :comments
  end
  
end
