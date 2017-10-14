Rails.application.routes.draw do
  root to: 'pages#home'
  resources :todos
  get 'react/todos', to: 'react_todos#index'
end
