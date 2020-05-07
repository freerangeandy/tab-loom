class CreateTablatures < ActiveRecord::Migration[5.2]
  def up
    create_table :tablatures do |t|
      t.string :title, null: false, default: ""
      t.text :e_1, null: false, default: ""
      t.text :b_2, null: false, default: ""
      t.text :g_3, null: false, default: ""
      t.text :d_4, null: false, default: ""
      t.text :a_5, null: false, default: ""
      t.text :e_6, null: false, default: ""
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end

  def down
    drop_table :tablatures
  end
end
