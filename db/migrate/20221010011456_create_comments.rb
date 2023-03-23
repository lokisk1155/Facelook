# frozen_string_literal: true

class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :content, null: false
      t.timestamps
    end
    add_reference :comments, :user, index: true, foreign_key: true
    add_reference :comments, :post, index: true, foreign_key: true
    add_reference :users, :user, index: true
  end
end
