# frozen_string_literal: true

class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.boolean :liked, default: false, null: false
      t.timestamps
    end
    add_reference :likes, :user, index: true, foreign_key: true
    add_reference :likes, :post, index: true, foreign_key: true
  end
end
