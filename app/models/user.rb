# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  email           :string           not null
#
class User < ApplicationRecord
    before_validation :ensure_session_token
    has_secure_password
    validates :username, uniqueness: true, length: { in: 3..30 }
    validates :email, uniqueness: true, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    has_many :questions,
    foreign_key: :user_id,
    class_name: :Question,
    dependent: :destroy

    has_many :answers,
    foreign_key: :user_id,
    class_name: :Answer,
    dependent: :destroy

    def self.find_by_credentials(username, password)
        if URI::MailTo::EMAIL_REGEXP.match(username)
            @user = User.find_by(email: username)
        else
            @user = User.find_by(username: username)
        end
        if @user && @user.authenticate(password)
            return @user
        else
            return nil
        end
    end
    
    
    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    private 
    def generate_unique_session_token 
        token = SecureRandom::urlsafe_base64 
        while User.exists?(session_token: token)
            token = SecureRandom::urlsafe_base64 
        end
        token
    end
    
    def ensure_session_token 
        self.session_token ||= generate_unique_session_token
    end
end
