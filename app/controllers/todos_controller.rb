class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]
  before_action :new_todo, only: [:create]

  # GET /todos
  # GET /todos.json
  def index
    @todos = Todo.all
  end

  # GET /todos/1
  # GET /todos/1.json
  def show
  end

  # GET /todos/new
  def new
    @todo = Todo.new
  end

  # GET /todos/1/edit
  def edit
  end

  # POST /todos
  # POST /todos.json
  def create
    respond_to do |format|
      if @todo.save
        format.html do
          redirect_to @todo, notice: 'Todo was successfully created.'
        end
        format.json { render :show, status: :created, location: @todo }
      else
        render_errors :new
      end
    end
  end

  # PATCH/PUT /todos/1
  # PATCH/PUT /todos/1.json
  def update
    respond_to do |format|
      if @todo.update(todo_params)
        format.html do
          redirect_to @todo, notice: 'Todo was successfully updated.'
        end
        format.json { render :show, status: :ok, location: @todo }
      else
        render_errors :edit
      end
    end
  end

  # DELETE /todos/1
  # DELETE /todos/1.json
  def destroy
    @todo.destroy
    respond_to do |format|
      format.html do
        redirect_to todos_url, notice: 'Todo was successfully destroyed.'
      end
      format.json { head :no_content }
    end
  end

  private

  def render_errors(action)
    format.html { render action }
    format.json { render json: @todo.errors, status: :unprocessable_entity }
  end

  def new_todo
    @todo = Todo.new(todo_params)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_todo
    @todo = Todo.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list
  # through.
  def todo_params
    params.require(:todo).permit(:content, :due_date, :done)
  end
end
