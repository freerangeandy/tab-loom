class CreateChords < ActiveRecord::Migration[5.2]
  def up
    create_table :chords do |t|
      t.string :name, null: false
      t.string :root, null: false, default: ""
      t.string :variant, default: ""
      t.string :strings, null: false, default: ""

      t.timestamps null: false
    end

    add_index(:chords, :name)
  end

  def down
    drop_table :chords
  end
end
