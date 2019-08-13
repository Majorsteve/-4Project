Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :users
  resources :topics do
  resources :comments do
  end
  end
  
end
