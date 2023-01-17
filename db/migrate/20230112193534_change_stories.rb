class ChangeStories < ActiveRecord::Migration[7.0]
  def change
    add_column :stories, :background_color, :string
    add_column :stories, :font_size, :string
    add_column :stories, :padding_left, :string
    add_column :stories, :padding_right, :string
    add_column :stories, :padding_y, :string
    add_column :stories, :color, :string
    add_column :stories, :text_content, :string
  end
end
