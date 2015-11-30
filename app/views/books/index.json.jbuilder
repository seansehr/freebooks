json.array!(@books) do |book|
  json.extract! book, :id, :title, :description, :image_url, :average_rating, :reviews_widget, :isbn, :author, :format, :url, :category_full, :category_id, :category
end
