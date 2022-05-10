Rails.application.routes.draw do
  
 
  resources :likes
  resources :comments do 
    resources :likes
  end
  resources :posts do
    resources :comments, :likes
    post '/comment/:id', to: 'comments#create_comment_reply'
  end
  resources :users do 
    resources :posts
  end

  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  get '/welcome', to: 'sessions#welcome'
  delete '/logout', to: 'sessions#destroy'


  
  get '/me', to: 'users#show'
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
