require "rails_helper"

landslide_verse = %Q(
e|-----------------|----------------|----------------|----------------|
B|-------1---------|------3---------|------1---------|------3---------|
G|---0-------0-----|--0-------0-----|--0-------0-----|--0-------0-----|
D|-----2-------2---|----0-------0---|----2-------2---|----0-------0---|
A|-3-------3-------|2-------2-------|0-------0-------|2-------2-------|
E|-----------------|----------------|----------------|----------------|
)

landslide_chorus = %Q(
e|-------3-------|-------------|-------0-----|-0-----0-----|
B|---0-------0---|-1-----1-----|-3-----------|---1---------|
G|---------------|---0---------|---0---------|-----0-------|
D|---------------|-----2-----2-|-----0-----0-|-----2-----2-|
A|-----2-------2-|-0-------0---|-2-------2---|-0-------0---|
E|-3-------3-----|-------------|-------------|-------------|
)

describe Tablature do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }

  let(:sample_tab1) { Tablature.new( title: "Sample 1", content: landslide_verse, user: user1 ) }
  let(:sample_tab2) { Tablature.new( title: "Sample 2", content: landslide_chorus, user: user2 ) }
  let(:tab_initialized_without_arguments) { Tablature.new }

  describe ".new" do
    it "should return a Tablature object" do
      expect(sample_tab1).to be_a(Tablature)
    end

    it "should not raise an error when initialized without any arguments" do
      expect{tab_initialized_without_arguments }.to_not raise_error
    end
  end

  describe "#title" do
    it "should return the title" do
      expect(sample_tab1.title).to eq("Sample 1")
    end

    it "should return '' for a tablature initialized without arguments" do
      expect(tab_initialized_without_arguments.title).to eq("")
    end
  end

  describe "#content" do
    it "should return the content" do
      expect(sample_tab1.content).to eq(landslide_verse)
    end

    it "should return '' for a tablature initialized without arguments" do
      expect(tab_initialized_without_arguments.content).to eq("")
    end
  end

  describe "#user" do
    it "should return the associated user" do
      expect(sample_tab1.user).to eq(user1)
    end

    it "should return nil for a tablature initialized without arguments" do
      expect(tab_initialized_without_arguments.user).to eq(nil)
    end
  end

  describe ".all" do
    it "should return an array of Tablature objects from the database" do
      first_tab_data = [
        "Sample 1",
        landslide_verse,
        user1.id
      ]

      last_tab_data = [
        "Sample 2",
        landslide_chorus,
        user2.id
      ]

      Tablature.create(title: first_tab_data.first, content: first_tab_data.second, user_id: first_tab_data.last)
      Tablature.create(title: last_tab_data.first, content: last_tab_data.second, user_id: last_tab_data.last)

      tabs = Tablature.all

      first_tab = tabs.first
      first_tab_attributes = [
        first_tab.title,
        first_tab.content,
        first_tab.user_id,
      ]
      last_tab = tabs.last
      last_tab_attributes = [
        last_tab.title,
        last_tab.content,
        last_tab.user_id
      ]

      expect(tabs.length).to eq(2)
      expect(first_tab).to be_a(Tablature)
      expect(last_tab).to be_a(Tablature)
      expect(first_tab_attributes).to eq(first_tab_data)
      expect(last_tab_attributes).to eq(last_tab_data)
    end
  end

  describe "#errors" do
    it "should return an empty array for a newly initialized object" do
      expect(sample_tab1.errors.messages).to eq({})
    end
  end

  describe "#valid?" do
    context "for a valid object" do
      it "should return true" do
        expect(sample_tab1.valid?).to eq(true)
      end

      it "should not add any error messages" do
        sample_tab1.valid?
        expect(sample_tab1.errors.messages).to eq({})
      end
    end

    context "for an invalid object" do
      let(:tab_with_blank_title) do
        Tablature.new({ title: "", content: landslide_verse, user: user1 })
      end

      let(:tab_with_blank_content) do
        Tablature.new({ title: "Sample 1", content: "", user: user1 })
      end

      let(:tab_with_no_user) do
        Tablature.new({ title: "Sample 1", content: landslide_verse, user: nil })
      end

      let(:tab_with_blank_attributes) do
        Tablature.new({ title: "", content: "", user: nil })
      end

      let(:blank_title_message) {"Title can't be blank"}
      let(:blank_content_message) {"Content can't be blank"}
      let(:blank_user_message) {"User can't be blank"}
      let(:missing_user_message) {"User must exist"}
      let(:all_error_messages) {[missing_user_message,
        blank_user_message,
        blank_content_message,
        blank_title_message
      ]}

      it "should return false" do
        expect(tab_with_blank_attributes.valid?).to eq(false)
      end

      it "should add an error message if any of the attributes are blank" do
        tab_with_blank_title.valid?
        tab_with_blank_content.valid?
        tab_with_no_user.valid?
        expect(tab_with_blank_title.errors.full_messages).to eq([blank_title_message])
        expect(tab_with_blank_content.errors.full_messages).to eq([blank_content_message])
        expect(tab_with_no_user.errors.full_messages).to include(blank_user_message, missing_user_message)
      end

      it "should be able to add multiple error messages" do
        tab_with_blank_attributes.valid?
        expect(tab_with_blank_attributes.errors.full_messages).to include(
          missing_user_message,
          blank_user_message,
          blank_content_message,
          blank_title_message
        )
      end
    end
  end

  describe "#save" do
    context "valid object" do
      it "should return true" do
        expect(sample_tab1.save).to eq(true)
      end

      it "should add the attributes to the database" do
        sample_tab1.save

        tab_attributes = [
          sample_tab1.title,
          sample_tab1.content,
          sample_tab1.user_id
        ]

        tabs_data = nil

        tabs_data = Tablature.all
        tab_data = tabs_data.last

        expect(tab_attributes[0]).to eq(tab_data["title"])
        expect(tab_attributes[1]).to eq(tab_data["content"])
        expect(tab_attributes[2]).to eq(tab_data["user_id"])
      end
    end

    context "invalid object" do
      let(:tab_with_blank_attributes) do
        Tablature.new({ title: "", content: "", user: nil })
      end

      it "should return false" do
        expect(tab_with_blank_attributes.save).to eq(false)
      end

      it "should not add the attributes to the database" do
        tab_with_blank_attributes.save

        tabs_data = nil

        tabs_data = Tablature.all
        expect(tabs_data.count).to eq(0)
      end
    end
  end
end
