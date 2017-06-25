Rails.application.routes.draw do
  resources :todos
  get 'react/todos', to: 'react_todos#index'
end
