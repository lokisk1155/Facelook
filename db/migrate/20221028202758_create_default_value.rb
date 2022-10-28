class CreateDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column_default :users, :featured, false
  end
end
