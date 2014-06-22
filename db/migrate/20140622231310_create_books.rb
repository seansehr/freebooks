class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.float :average_rating
      t.text :reviews_widget
      t.string :isbn
      t.string :author
      t.string :format
      t.string :category_full
      t.references :category, index: true

      t.timestamps
    end
  end
end
