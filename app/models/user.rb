class User < ActiveRecord::Base
  attr_reader :password

  validates :email, :fname, :lname,
            :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :session_token, :email, uniqueness: true

  after_initialize :ensure_session_token

  has_many(
    :feeds,
    class_name: "Feed",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :exercises,
    class_name: "Exercise",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :exercise_routes,
    class_name: "ExerciseRoute",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many :workouts

  def workout_feed
    feeds = self.feeds.includes(:workout)
    return_hash = {}
    feeds.each do |feed|
      return_hash[feed.id] = {}
      feed_id = return_hash[feed.id]

      feed_id[:title] = feed.route.title
      feed_id[:description] = feed.route.description
      feed_id[:start_time] = feed.start_time.strftime('%r')
      feed_id[:total_time] =  parse_into_hours(feed.end_time - feed.start_time)
      feed_id[:date] = feed.start_time.strftime("%A, %B %y, %Y")
    end

    return_hash
  end

  def self.find_by_credentials(email, password)
    user = User.find_by({email: email})
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def parse_into_hours(val)
    (val * 24).to_f.round(2)
  end
end
