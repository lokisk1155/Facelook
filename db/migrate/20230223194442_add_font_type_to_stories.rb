class AddFontTypeToStories < ActiveRecord::Migration[7.0]
  def change
    add_column :stories, :font_type, :string
  end
end
