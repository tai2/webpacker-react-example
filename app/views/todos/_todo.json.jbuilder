json.extract! todo, :id, :content, :due_date, :done, :created_at, :updated_at
json.url todo_url(todo, format: :json)
