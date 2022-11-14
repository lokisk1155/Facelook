class AddAnotherArray < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :places_worked, :integer, array: true, default: []
  end
end
