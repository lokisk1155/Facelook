# frozen_string_literal: true

class AddArray < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :places_lived, :string
  end
end
