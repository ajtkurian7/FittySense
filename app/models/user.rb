class User < ActiveRecord::Base
  validates :email, :fname, :lname,
            :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :session_token, :username, session_token: true

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by({email: email})
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::password.new(self.password_digest).is_password?(password)
  end

  def password(password)
    @password = password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end
end
