# frozen_string_literal: true

class AddAnotherArray < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :places_worked, :string
  end
end
