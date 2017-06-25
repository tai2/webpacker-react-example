class ReactTodosController < ApplicationController
  def index
    @todos = Todo.all
  end
end
