# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    QuestionVote.destroy_all
    AnswerVote.destroy_all
    Question.destroy_all
    Answer.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('questions')
    ApplicationRecord.connection.reset_pk_sequence!('answers')
    ApplicationRecord.connection.reset_pk_sequence!('question_votes')
    ApplicationRecord.connection.reset_pk_sequence!('answer_votes')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'demouser', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating questions..."
    Question.create!(
      user_id: 1,
      title: "How to center a div?",
      body: "I'm having some difficulty centering my div"
    )

    Question.create!(
      user_id: 1,
      title: "Update an entity in database",
      body: "I have these two entities:

      public class TblUser
      {
          public long Userid { get; set; }
          public string Username { get; set; }
          public string Password { get; set; }
          public string PasswordSalt { get; set; }
          public string FullName { get; set; }
          public virtual ICollection<TblNotify> TblNotifies { get; set; }
      }
      
      public partial class TblNotify
      {
          public Guid NotifyId { get; set; }
          public string Message { get; set; }
          public virtual TblUser ApprovalUser { get; set; }
      }
      The table tblNotify has a foreign key Userid.
      
      DbContext was initially built as singleton service.
      
      I call an update method:"
    )

    Question.create!(
      user_id: 1,
      title: "Generate multiple random datetime stamps between two dates based on size",
      body: "I'm trying to generate multiple random datetime stamps between two dates,

      I tried with using the below code based on the existing post and question, but it generates only a single random date time.
      
      
      import datetime
      import random
      import pandas as pd
      
      min_date = pd.to_datetime('2019-01-01 00:00:00')
      max_date = pd.to_datetime('2019-01-01 23:59:59')
      
      start + datetime.timedelta(seconds=random.randint(0, int((end - start).total_seconds())),)
      
      >>> Timestamp('2019-09-27 05:58:40')
      Is there a way to generate multiple date time based on the size mentioned. Say if the size is mentioned as 100, it should generate 100 random date timestamps objects similar to the output as mentioned above. Also I want to store the 100 time stamps in a pandas dataframe.
      "
    )

    Question.create!(
      user_id: 1,
      title: "Unable to reset password using django test client",
      body: "I'm using pytest-django to test for password reset. When a request is sent to the reset url, the response contains a form with new_password1 and new_password2 which means, the reset url works successfully. When I send the new password and try using it to login, it doesn't work and the old password remains active"
    )

    Question.create!(
      user_id: 6,
      title: "flutter run is not working on my phone after upgrading to android 13",
      body: "When I run flutter apk on vs code it showing some error \"Error waiting for a debug connection: The log reader stopped unexpectedly Error launching application on I2012.\"

      When I am running my app in vs code it will show some error after updating my phone to Android 13."
    )

    Question.create!(
      user_id: 9,
      title: "How to enable the experimental functions of NebulaGraph?",
      body: "I noticed that TOSS in Nebula Graph is an experimental function, how can I use it?"
    )

    # Question.create!(
    #   user_id: ,
    #   title: "",
    #   body: ""
    # )

    puts "Creating answers..."
    Answer.create!(
      user_id: 2,
      question_id: 1,
      body: "Try Margin: Auto, width: 70%"
    )

    Answer.create!(
      user_id: 1,
      question_id: 1,
      body: "Answer #2"
    )

    Answer.create!(
      user_id: 5,
      question_id: 2,
      body: "insert helpful answer"
    )

    # Answer.create!(
    #   user_id: ,
    #   question_id: ,
    #   body: 
    # )


    puts "Creating question votes..."

    i = 1
    while i <= 10
      QuestionVote.create!(
        user_id: i,
        question_id: 1,
        upvote: true
      )
      i += 1
    end

    i = 1
    while i <= 10
      QuestionVote.create!(
        user_id: i,
        question_id: 2,
        upvote: i%2 == 0
      )
      i += 1
    end

    i = 1
    while i <= 10
      QuestionVote.create!(
        user_id: i,
        question_id: 3,
        upvote: false
      )
      i += 1
    end

    puts "Creating answer votes..."

    AnswerVote.create!(
      user_id: 1,
      answer_id: 1,
      upvote: true
    )
  
    puts "Done!"
end